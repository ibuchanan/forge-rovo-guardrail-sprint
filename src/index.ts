export { lifecycle } from "./forge/lifecycle";
export { fetchBoardSprintContent, rollCurrentToNextSprint } from "./jiraSprint";

import type { FetchActiveSprintDetailPayload } from "./actionpayload";
import {
  buildResponse,
  type Response,
  type WebtriggerEvent,
} from "./forge/trigger";
import {
  listFutureSprintsForBoard,
  type RequestBoard,
} from "./jira/software/board";

export async function trigger(req: WebtriggerEvent): Promise<Response> {
  console.debug(
    `Context token (invocation identification) for invocation of trigger: ${req.contextToken}`,
  );
  // const body = await fetchBoardSprintContent(
  //   JSON.parse(req.body) as FetchActiveSprintDetailPayload,
  // );
  const jsonBody = await listFutureSprintsForBoard(
    JSON.parse(req.body) as RequestBoard,
  );
  const body = JSON.stringify(jsonBody);
  const res: Response = buildResponse(body);
  console.debug(`response: ${JSON.stringify(res)}`);
  return res;
}
