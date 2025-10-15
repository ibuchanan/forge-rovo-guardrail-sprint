import YAML from "yaml";
import type {
  FetchActiveSprintDetailPayload,
  RollSprintPayload,
} from "./actionpayload";
import {
  type BoardResponse,
  fetchBoard,
  listActiveSprintsForBoard,
  listFutureSprintsForBoard,
  pickBoard,
} from "./jira/software/board";
import {
  calcMetadataForSprint,
  closeSprint,
  fetchSprint,
  listIssuesForSprint,
  type RequestSprint,
  type SprintIssuesResultPage,
  type SprintMemberIssue,
  type SprintParentIssue,
  type SprintResponse,
  startSprint,
} from "./jira/software/sprint";

interface RequestFormatSprintEpicsAndIssues {
  board: BoardResponse;
  sprint: SprintResponse;
  sprintIssues: SprintIssuesResultPage;
}

export async function fetchBoardSprintContent(
  payload: FetchActiveSprintDetailPayload,
): Promise<string> {
  const boardId = pickBoard(payload);
  if (typeof boardId === "string") {
    return boardId;
  }
  const board = await fetchBoard(boardId);
  const activeSprints = await listActiveSprintsForBoard(boardId);
  // Assume there is only 1 active sprint per board
  if (activeSprints.values[0] === undefined) {
    return `Could not find any active sprints for Board Id ${boardId.boardId}`;
  }
  const sprintId: RequestSprint = {
    sprintId: BigInt(activeSprints.values[0].id),
  };
  const sprint = await fetchSprint(sprintId);
  // console.debug(`sprint: ${JSON.stringify(sprint)}`);
  const sprintIssues = await listIssuesForSprint(sprintId);
  // console.debug(`sprintIssues: ${JSON.stringify(sprintIssues)}`);
  const dataToFormat = {
    board: board,
    sprint: sprint,
    sprintIssues: sprintIssues,
  } as RequestFormatSprintEpicsAndIssues;
  const content = formatSprintEpicsAndIssues(dataToFormat);
  return content;
}

export async function rollCurrentToNextSprint(
  payload: RollSprintPayload,
): Promise<string> {
  const boardId = pickBoard(payload);
  if (typeof boardId === "string") {
    return boardId;
  }
  const board = await fetchBoard(boardId);

  const activeSprints = await listActiveSprintsForBoard(boardId);
  // Assume there is only 1 active sprint per board
  if (activeSprints.values[0] === undefined) {
    return `Could not find any active sprints for Board Id ${boardId.boardId}`;
  }
  const sprintToClose: RequestSprint = {
    sprintId: BigInt(activeSprints.values[0].id),
  };

  const openSprints = await listFutureSprintsForBoard(boardId);
  if (openSprints.values[0] === undefined) {
    // TODO: When there are no future sprints, create one.
    return `Could not find any open sprints for Board Id ${boardId.boardId}`;
  }
  const nextSprint: RequestSprint = {
    // Assume next sprint is
    // just the next one by id
    // TODO: handle sprint corner cases by looking at start dates
    sprintId: BigInt(openSprints.values[0].id),
  };

  // TODO: Move open work items to next sprint, before closing.
  const _closedSprint = await closeSprint(sprintToClose);
  // TODO: handle case where future sprint has no work items
  const sprint = await startSprint(nextSprint);
  // console.debug(`sprint: ${JSON.stringify(sprint)}`);
  const sprintIssues = await listIssuesForSprint(nextSprint);
  // console.debug(`sprintIssues: ${JSON.stringify(sprintIssues)}`);
  const dataToFormat = {
    board: board,
    sprint: sprint,
    sprintIssues: sprintIssues,
  } as RequestFormatSprintEpicsAndIssues;
  const content = formatSprintEpicsAndIssues(dataToFormat);
  return content;
}

const NO_PARENT = "NO_PARENT";
const NULL_EPIC = {
  id: "0",
  key: "NONE",
  self: "https://atlassian.com/",
  fields: {
    summary: "No parent epic",
    status: {
      name: "None",
    },
    priority: {
      name: "None",
    },
    issuetype: {
      name: "Epic",
    },
  },
};

function formatSprintEpicsAndIssues(
  payload: RequestFormatSprintEpicsAndIssues,
): string {
  let doc = `# Board: ${payload.board.name} (${payload.board.type})\n`;
  doc += `\n## Sprint: ${payload.sprint.name}\n`;
  if (payload.sprint.goal) {
    doc += `\nGoal: ${payload.sprint.goal}\n`;
  }
  const sprintMetadata = calcMetadataForSprint(payload.sprintIssues);
  doc += YAML.stringify(sprintMetadata);
  // console.debug(`doc: ${doc}`);
  const issueList = new Map<string, SprintMemberIssue | SprintParentIssue>([
    [NO_PARENT, NULL_EPIC],
  ]);
  const issueTree = new Map<string, Array<string>>([[NO_PARENT, []]]);
  payload.sprintIssues.issues.forEach((issue) => {
    issueList.set(issue.key, issue);
    if (Object.hasOwn(issue.fields, "parent")) {
      const parent = issue.fields.parent;
      issueList.set(parent.key, parent);
      if (!issueTree.has(parent.key)) {
        issueTree.set(parent.key, [issue.key]);
      } else {
        issueTree.get(parent.key)?.push(issue.key);
      }
    } else {
      issueTree.get(NO_PARENT)?.push(issue.key);
    }
  });
  issueTree.forEach((memberKeys, parentKey) => {
    const parent = issueList.get(parentKey) as SprintParentIssue;
    if (parent === undefined) {
      console.error(`${parentKey} not found`);
    } else {
      doc += `\n### ${parent.fields.issuetype.name}: ${parent.key} ${parent.fields.summary}\n`;
      memberKeys.forEach((memberKey) => {
        const member = issueList.get(memberKey) as SprintMemberIssue;
        if (member === undefined) {
          console.error(`${memberKey} not found`);
        } else {
          doc += `\n#### ${member.fields.issuetype.name}: ${member.key} ${member.fields.summary}\n\n`;
          doc += `* Assignee: ${member.fields.assignee?.displayName}\n`;
          doc += `* Status: ${member.fields.status.name}\n`;
          if (member.fields.description) {
            doc += `\n${member.fields.description}\n`;
          }
        }
      });
    }
  });
  // console.debug(`doc: ${doc}`);
  return doc;
}
