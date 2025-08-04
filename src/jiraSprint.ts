import {
  fetchSprint,
  listIssuesForSprint,
  type RequestSprint,
  type SprintIssuesResultPage,
  type SprintMemberIssue,
  type SprintParentIssue,
  type SprintResponse,
} from "./jira/software/sprint";

interface RequestFormatSprintEpicsAndIssues {
  sprint: SprintResponse;
  sprintIssues: SprintIssuesResultPage;
}

export async function fetchContentFromSprintEpicsAndIssues(
  payload: RequestSprint,
): Promise<string> {
  const sprint = await fetchSprint(payload);
  // console.debug(`sprint: ${JSON.stringify(sprint)}`);
  const sprintIssues = await listIssuesForSprint(payload);
  // console.debug(`sprintIssues: ${JSON.stringify(sprintIssues)}`);
  const dataToFormat = {
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
  let doc = `# Sprint: ${payload.sprint.name}\n`;
  doc += `\n${payload.sprint.goal}\n`;
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
      doc += `\n## ${parent.fields.issuetype.name}: ${parent.key} ${parent.fields.summary}\n`;
      memberKeys.forEach((memberKey) => {
        const member = issueList.get(memberKey) as SprintMemberIssue;
        if (member === undefined) {
          console.error(`${memberKey} not found`);
        } else {
          doc += `\n### ${member.fields.issuetype.name}: ${member.key} ${member.fields.summary}\n\n`;
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
