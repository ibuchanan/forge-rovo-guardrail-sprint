import api, { route } from "@forge/api";
import * as jmespath from "jmespath";
import type { Issue, ParentedCardFields, ParentFields } from "../issue";
import { myself } from "../myself";
import type { PagedResponse } from "./api";

export enum SprintStates {
  future = "future",
  active = "active",
  closed = "closed",
}

export interface RequestSprint {
  sprintId: bigint;
}

export async function fetchSprint(
  payload: RequestSprint,
): Promise<SprintResponse> {
  console.debug(`Request: Sprint Id "${payload.sprintId}"`);
  try {
    const response = await api
      .asUser()
      .requestJira(route`/rest/agile/1.0/sprint/${payload.sprintId.toString()}`, {
        headers: {
          Accept: "application/json",
        },
      });
    console.debug(`Response: ${response.status} ${response.statusText}`);
    // console.debug(JSON.stringify(await response.json()));
    if (response.ok) {
      console.debug(`Success: Sprint Id "${payload.sprintId}"`);
      const responseJson = (await response.json()) as SprintResponse;
      console.debug(`Sprint: ${responseJson.id} ${responseJson.self}`);
      return responseJson;
    }
    // TODO: check status codes and throw errors
    console.error(`Failed: Sprint Id "${payload.sprintId}"`);
    throw new Error(`Failed for Sprint Id "${payload.sprintId}"\n`);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed for Sprint Id "${payload.sprintId}"\n`);
  }
}

/*
{
  "id": 37,
  "self": "https://your-domain.atlassian.net/rest/agile/1.0/sprint/23",
  "state": "closed",
  "name": "sprint 1",
  "startDate": "2015-04-11T15:22:00.000+10:00",
  "endDate": "2015-04-20T01:22:00.000+10:00",
  "completeDate": "2015-04-20T11:04:00.000+10:00",
  "originBoardId": 5,
  "goal": "sprint 1 goal"
}
*/

export interface SprintResponse {
  id: number;
  self: string;
  state: string;
  name: string;
  startDate: string;
  endDate: string;
  completeDate: string;
  originBoardId: number;
  goal: string;
}

export async function listIssuesForSprint(
  payload: RequestSprint,
  jql: string = "",
): Promise<SprintIssuesResultPage> {
  console.debug(`Request: Sprint Id "${payload.sprintId}"`);
  try {
    const response = await api
      .asUser()
      .requestJira(
        route`/rest/agile/1.0/sprint/${payload.sprintId.toString()}/issue?jql=${jql}`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );
    console.debug(`Response: ${response.status} ${response.statusText}`);
    // console.debug(JSON.stringify(await response.json()));
    if (response.ok) {
      console.debug(`Success: Sprint Id "${payload.sprintId}"`);
      const responseJson = (await response.json()) as SprintIssuesResultPage;
      if (responseJson.startAt + responseJson.maxResults < responseJson.total) {
        // TODO: then iterate to get more pages
      }
      console.debug(`Sprint Issues: total=${responseJson.total}`);
      return responseJson;
    }
    // TODO: check status codes and throw errors
    console.error(`Failed: Sprint Id "${payload.sprintId}"`);
    throw new Error(`Failed for Sprint Id "${payload.sprintId}"\n`);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed for Sprint Id "${payload.sprintId}"\n`);
  }
}

export async function moveIssuesToSprint(
  payload: RequestSprint,
  issues: Array<string>,
) {
  console.debug(
    `Update: Sprint Id "${payload.sprintId}" for ${JSON.stringify(issues)}`,
  );
  const _me = await myself();
  try {
    const body = { issues: issues };
    const response = await api
      .asUser()
      .requestJira(route`/rest/agile/1.0/sprint/${payload.sprintId.toString()}/issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    console.debug(`Response: ${response.status} ${response.statusText}`);
    // console.debug(JSON.stringify(await response.json()));
    if (response.ok) {
      console.debug(`Success: Sprint Id "${payload.sprintId}"`);
      return;
    }
    // TODO: check status codes and throw errors
    console.error(`Failed: Sprint Id "${payload.sprintId}"`);
    throw new Error(`Failed for Sprint Id "${payload.sprintId}"\n`);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed for Sprint Id "${payload.sprintId}"\n`);
  }
}

export enum StatusCategory {
  unstarted = "new",
  started = "indeterminate",
  completed = "done",
}

export function listIssueKeysForSprint(sprint: SprintIssuesResultPage) {
  return jmespath.search(sprint, "issues[].key") as Array<string>;
}

export function calcMetadataForSprint(sprint: SprintIssuesResultPage) {
  // TODO: Ask API which field is for estimates
  const ESTIMATE_FIELD = "customfield_10031";
  return {
    assignees: {
      count: new Set(
        jmespath.search(sprint, "issues[].fields.assignee.accountId"),
      ).size,
      unique: new Set(
        jmespath.search(sprint, "issues[].fields.assignee.displayName"),
      ),
    },
    empties: {
      assignee: jmespath.search(sprint, "issues[?fields.assignee==`null`].key"),
      description: jmespath.search(
        sprint,
        "issues[?fields.description==`null`].key",
      ),
      estimate: jmespath.search(
        sprint,
        `issues[?fields.${ESTIMATE_FIELD}==\`null\`].key`,
      ),
      parent: jmespath.search(sprint, "issues[?fields.parent==`null`].key"),
    },
    workitemVelocity: {
      unstarted: jmespath.search(
        sprint,
        `issues[?fields.statusCategory.key=='${StatusCategory.unstarted}'].key | length(@)`,
      ),
      started: jmespath.search(
        sprint,
        `issues[?fields.statusCategory.key=='${StatusCategory.started}'].key | length(@)`,
      ),
      completed: jmespath.search(
        sprint,
        `issues[?fields.statusCategory.key=='${StatusCategory.completed}'].key | length(@)`,
      ),
    },
    storypointVelocity: {
      unstarted: jmespath.search(
        sprint,
        `issues[?fields.statusCategory.key=='${StatusCategory.unstarted}'].fields.${ESTIMATE_FIELD} | sum(@)`,
      ),
      started: jmespath.search(
        sprint,
        `issues[?fields.statusCategory.key=='${StatusCategory.started}'].fields.${ESTIMATE_FIELD} | sum(@)`,
      ),
      completed: jmespath.search(
        sprint,
        `issues[?fields.statusCategory.key=='${StatusCategory.completed}'].fields.${ESTIMATE_FIELD} | sum(@)`,
      ),
    },
  };
}

export type SprintMemberIssue = Issue<ParentedCardFields>;
export type SprintParentIssue = Issue<ParentFields>;

export interface SprintIssuesResultPage extends PagedResponse {
  // In this API, the fields/expands seem to be fixed.
  issues: SprintMemberIssue[];
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type SprintBody = DeepPartial<SprintResponse>;

export async function updateSprint(
  payload: RequestSprint,
  body: SprintBody,
): Promise<SprintResponse> {
  console.debug(`Update: Sprint Id "${payload.sprintId}"`);
  console.debug(`SprintBody: ${JSON.stringify(body)}`);
  const _me = await myself();
  try {
    const response = await api
      .asUser()
      .requestJira(route`/rest/agile/1.0/sprint/${payload.sprintId.toString()}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    console.debug(`Response: ${response.status} ${response.statusText}`);
    // console.debug(JSON.stringify(await response.json()));
    if (response.ok) {
      console.debug(`Success: Sprint Id "${payload.sprintId}"`);
      const responseJson = await response.json() as SprintResponse;
      console.debug(`Sprint: ${responseJson.id} ${responseJson.self}`);
      return responseJson;
    }
    // TODO: check status codes and throw errors
    console.error(`Failed: Sprint Id "${payload.sprintId}"`);
    throw new Error(`Failed for Sprint Id "${payload.sprintId}"\n`);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed for Sprint Id "${payload.sprintId}"\n`);
  }
}

export async function startSprint(
  payload: RequestSprint,
): Promise<SprintResponse> {
  return await updateSprint(payload, { state: "active" });
}
export async function closeSprint(
  payload: RequestSprint,
): Promise<SprintResponse> {
  return await updateSprint(payload, { state: "closed" });
}
