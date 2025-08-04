import type { CommonEvent } from "./events";

export type Headers = { [key: string]: string[] };
export type Parameters = { [key: string]: string[] };

export interface FunctionCall {
  functionKey: string;
}

export interface WebtriggerEvent extends CommonEvent {
  method: string;
  call: FunctionCall;
  headers: Headers;
  queryParameters: Parameters;
  body: string;
  path: string;
}

export interface Response {
  body: string; // HTTP response body sent back to the caller.
  headers: Headers; // HTTP headers sent by the caller.
  statusCode: number; // HTTP status code returned to the caller.
  // The platform recognizes a status code of 204 as success, and status codes in the 500 series as errors.
  statusText: string; // Text returned to communicate status. The text provides context to the status code.
}

export function buildResponse(
  message = "OK",
  statusCode = 200,
  statusText = "OK",
): Response {
  return {
    body: JSON.stringify({ message: message }),
    headers: { "Content-Type": ["application/json"] },
    statusCode: statusCode,
    statusText: statusText,
  };
}
