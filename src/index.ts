export { lifecycle } from "./forge/lifecycle";
export { fetchBoardSprintContent } from "./jiraSprint";

import type { FetchActiveSprintDetailsPayload } from "./actionpayload";
import {
  buildResponse,
  type Response,
  type WebtriggerEvent,
} from "./forge/trigger";
import { fetchBoardSprintContent } from "./jiraSprint";

export async function trigger(req: WebtriggerEvent): Promise<Response> {
  console.debug(
    `Context token (invocation identification) for invocation of trigger: ${req.contextToken}`,
  );
  const body = await fetchBoardSprintContent(
    JSON.parse(req.body) as FetchActiveSprintDetailsPayload,
  );
  const res: Response = buildResponse(body);
  console.debug(`response: ${JSON.stringify(res)}`);
  return res;
}
