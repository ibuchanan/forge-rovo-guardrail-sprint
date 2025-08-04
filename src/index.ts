export { lifecycle } from "./forge/lifecycle";
export { fetchContentFromSprintEpicsAndIssues } from "./jiraSprint";

import {
  buildResponse,
  type Response,
  type WebtriggerEvent,
} from "./forge/trigger";
import type { RequestSprint } from "./jira/software/sprint";
import { fetchContentFromSprintEpicsAndIssues } from "./jiraSprint";

export async function trigger(req: WebtriggerEvent): Promise<Response> {
  console.debug(
    `Context token (invocation identification) for invocation of trigger: ${req.contextToken}`,
  );
  const body = await fetchContentFromSprintEpicsAndIssues(
    JSON.parse(req.body) as RequestSprint,
  );
  const res: Response = buildResponse(body);
  console.debug(`response: ${JSON.stringify(res)}`);
  return res;
}
