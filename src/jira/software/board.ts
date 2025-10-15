import api, { route } from "@forge/api";
import type { FetchActiveSprintDetailPayload } from "../../actionpayload";
import type { EventContext } from "../../forge/events";
import type { JiraIssueDetail, RovoProductDetail } from "../../rovo/action";
import type { PagedResponse } from "./api";
import { type SprintResponse, SprintStates } from "./sprint";

/*
"boardId": "1",
"url": "https://one-atlas-iire.atlassian.net/jira/software/c/projects/PLAT/boards/1",
"resourceType": "board",
"jiraContexts": [..],
*/
interface JiraBoardDetail extends RovoProductDetail {
  boardId: string;
  jiraContexts: JiraIssueDetail[];
}

export interface RovoBoardContext extends EventContext {
  jira: JiraBoardDetail;
}

export function pickBoard(
  payload: FetchActiveSprintDetailPayload,
): RequestBoard | string {
  console.debug(`Request: Explicit Board Id "${payload.boardId}"`);
  console.debug(`Request: Rovo Context "${payload.context.jira.boardId}"`);
  if (payload.boardId) {
    return {
      boardId: payload.boardId,
      context: payload.context,
    };
  }
  if (payload.context.jira.boardId) {
    return {
      boardId: BigInt(payload.context.jira.boardId),
      context: payload.context,
    };
  }
  return "Could not find a Board Id in the current context";
}

export interface RequestBoard {
  boardId: bigint;
  context?: RovoBoardContext;
}

export async function fetchBoard(
  payload: RequestBoard,
): Promise<BoardResponse> {
  console.debug(`Request: Board Id "${payload.boardId}"`);
  try {
    const response = await api
      .asUser()
      .requestJira(route`/rest/agile/1.0/board/${payload.boardId.toString()}`, {
        headers: {
          Accept: "application/json",
        },
      });
    console.debug(`Response: ${response.status} ${response.statusText}`);
    // console.debug(JSON.stringify(await response.json()));
    if (response.ok) {
      console.debug(`Success: Board Id "${payload.boardId}"`);
      const responseJson = (await response.json()) as BoardResponse;
      console.debug(`Board: ${responseJson.id} ${responseJson.self}`);
      return responseJson;
    }
    // TODO: check status codes and throw errors
    console.error(`Failed: Board Id "${payload.boardId}"`);
    throw new Error(`Failed for Board Id "${payload.boardId}"\n`);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed for Board Id "${payload.boardId}"\n`);
  }
}

/*
{
  "id": 84,
  "location": {
    "displayName": "Example Project",
    "name": "Example Project",
    "projectId": 10040,
    "projectKey": "Example Project Key",
    "projectName": "Example Project",
    "projectTypeKey": "KEY",
    "userAccountId": "5b10a2844c20165700ede21g",
    "userId": 10040
  },
  "name": "scrum board",
  "self": "https://your-domain.atlassian.net/rest/agile/1.0/board/84",
  "type": "scrum"
}
*/

interface Location {
  projectId: number;
  projectKey: string;
  projectName: string;
  projectTypeKey: string;
  displayName: string;
  name: string;
  userAccountId: string;
  userId: number;
}

export interface BoardResponse {
  id: number;
  name: string;
  self: string;
  type: string;
  location: Location;
}

function getApiWithAuth(payload: RequestBoard) {
  console.debug(`Auth for Request: ${JSON.stringify(payload)}`);
  if (payload.context !== undefined) {
    console.debug(`Auth for Request: providing asUser()`);
    return api.asUser();
  }
  console.debug(`Auth for Request: providing asApp()`);
  return api.asApp();
}

export async function listSprintsInStateForBoard(
  payload: RequestBoard,
  state: SprintStates,
): Promise<SprintResultPage> {
  console.debug(`Request: Board Id "${payload.boardId}" for "${state}"`);
  try {
    const apiWithAuth = getApiWithAuth(payload);
    const response = await apiWithAuth.requestJira(
      route`/rest/agile/1.0/board/${payload.boardId.toString()}/sprint?state=${state}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    console.debug(`Response: ${response.status} ${response.statusText}`);
    // console.debug(JSON.stringify(await response.json()));
    if (response.ok) {
      console.debug(`Success: Board Id "${payload.boardId}"`);
      const responseJson = (await response.json()) as SprintResultPage;
      if (responseJson.startAt + responseJson.maxResults < responseJson.total) {
        // TODO: then iterate to get more pages
      }
      console.debug(`Board Sprints (${state}): total=${responseJson.total}`);
      return responseJson;
    }
    // TODO: check status codes and throw errors
    console.error(`Failed: Board Id "${payload.boardId}"`);
    throw new Error(`Failed for Board Id "${payload.boardId}"\n`);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed for Board Id "${payload.boardId}"\n`);
  }
}

export interface SprintResultPage extends PagedResponse {
  // In this API, the fields/expands seem to be fixed.
  values: SprintResponse[];
}

export async function listActiveSprintsForBoard(
  payload: RequestBoard,
): Promise<SprintResultPage> {
  return await listSprintsInStateForBoard(payload, SprintStates.active);
}
export async function listFutureSprintsForBoard(
  payload: RequestBoard,
): Promise<SprintResultPage> {
  return await listSprintsInStateForBoard(payload, SprintStates.future);
}
