import type { EventContext } from "../forge/events";

interface RovoProductDetail {
  url: string;
  resourceType: string;
}

/*
"payload": {
  "input1ToYourAction": 1241,
  "input2ToYourAction": 12412,
  "context": {
    "cloudId": "7607d59e-650b-4c16-adcf-c19d17c915ac",
    "moduleKey": "sum-2-numbers-new-action",
    "jira": {
      "url": "https://mysite.atlassian.com/browse/FAA-1",
      "resourceType": "issue",
      "issueKey": 1,
      "issueId": 123,
      "issueType": "story",
      "issueTypeId": 1234,
      "projectKey": "FAA",
      "projectId": 5678
    }
  }
}
*/
interface JiraIssueDetail extends RovoProductDetail {
  issueKey: string;
  issueId: string;
  issueType: string;
  issueTypeId: number;
  projectKey: string;
  projectId: number;
}

/*
"payload": {
  "input1ToYourAction": 1241,
  "input2ToYourAction": 12412,
  "context": {
    "cloudId": "7607d59e-650b-4c16-adcf-c19d17c915ac",
    "moduleKey": "sum-2-numbers-new-acion",
    "confluence": {
      "url": "https://mysite.atlassian.com/wiki/spaces/~65536301eb7512314748ebb489aba9d526b0f8/blog/2024/06/27/44662787/Holiday+in+Japan",
      "resourceType": "blog",
      "contentId": "44662787",
      "spaceKey": "~65536301eb7512314748ebb489aba9d526b0f8",
      "spaceId": "2064386"
    }
  }
}
*/
interface ConfluenceDetail extends RovoProductDetail {
  contentId: string;
  spaceKey: string;
  spaceId: string;
}

export interface RovoContext extends EventContext {
  jira?: JiraIssueDetail;
  confluence?: ConfluenceDetail;
}
