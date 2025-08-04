import api, { route } from "@forge/api";
import type { Issue, ParentedCardFields, ParentFields } from "../issue";
import type { PagedResponse } from "./api";

export interface RequestSprint {
  sprintId: number;
}

export async function fetchSprint(
  payload: RequestSprint,
): Promise<SprintResponse> {
  console.debug(`Request: Sprint Id "${payload.sprintId}"`);
  try {
    const sprintId = payload.sprintId;
    const response = await api
      .asUser()
      .requestJira(route`/rest/agile/1.0/sprint/${sprintId}`, {
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
): Promise<SprintIssuesResultPage> {
  console.debug(`Request: Sprint Id "${payload.sprintId}"`);
  try {
    const sprintId = payload.sprintId;
    const response = await api
      .asUser()
      .requestJira(route`/rest/agile/1.0/sprint/${sprintId}/issue`, {
        headers: {
          Accept: "application/json",
        },
      });
    console.debug(`Response: ${response.status} ${response.statusText}`);
    // console.debug(JSON.stringify(await response.json()));
    if (response.ok) {
      console.debug(`Success: Sprint Id "${payload.sprintId}"`);
      const responseJson = (await response.json()) as SprintIssuesResultPage;
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

export type SprintMemberIssue = Issue<ParentedCardFields>;
export type SprintParentIssue = Issue<ParentFields>;

export interface SprintIssuesResultPage extends PagedResponse {
  // In this API, the fields/expands seem to be fixed.
  issues: SprintMemberIssue[];
}
