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

function formatSprintEpicsAndIssues(
  payload: RequestFormatSprintEpicsAndIssues,
): string {
  let doc = `# Sprint: ${payload.sprint.name}\n`;
  doc += `\n${payload.sprint.goal}\n`;
  const issueTree = new Map<SprintParentIssue, Array<SprintMemberIssue>>();
  payload.sprintIssues.issues.forEach((issue) => {
    if (Object.hasOwn(issue.fields, "parent")) {
      if (!issueTree.has(issue.fields.parent)) {
        issueTree.set(issue.fields.parent, [issue]);
      } else {
        issueTree.get(issue.fields.parent)?.push(issue);
      }
    }
  });
  issueTree.forEach((members, parent) => {
    doc += `\n## ${parent.fields.issuetype.name}: ${parent.key} ${parent.fields.summary}\n`;
    members.forEach((member) => {
      doc += `\n### ${member.fields.issuetype.name}: ${member.key} ${member.fields.summary}\n`;
      doc += `\n${member.fields.description}`;
    });
  });
  console.debug(`doc: ${doc}`);
  return doc;
}
