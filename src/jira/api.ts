export interface NamedObject {
  name: string;
}

// https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion
export interface ExpandableResponse {
  expand?: string;
}

export interface ArrayedResponse {
  total: number;
}

// https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination
export interface PagedResponse extends ArrayedResponse {
  startAt: number;
  maxResults: number;
  isLast?: boolean;
}

export function sanitizeKey(key: string) {
  // Strip spaces
  return key.replace(/\s+/g, "").toUpperCase();
}

export function sanitizeTextQuery(query: string) {
  // Strip characters that aren't word or space characters
  return query.replace(/[^\w\s]+/g, "").toLowerCase();
}
