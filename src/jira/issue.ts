import type { ExpandableResponse, NamedObject, PagedResponse } from "./api";

interface FindProjectsPayload {
  query?: string;
}

interface FindIssuesPayload {
  project: string;
  query: string;
}

interface FetchContentFromIssuePayload {
  issue: string;
}

export interface ContentFields {
  summary: string;
  description: string;
}
const contentFields = ["summary", "description"];

export interface CardFields {
  issuetype: NamedObject;
  summary: string;
  status: NamedObject;
  // updated: ResultDate;
  assignee?: { displayName: string };
  priority?: NamedObject;
}
const cardFields = ["issuetype", "summary", "status", "assignee", "priority"];

export interface ParentFields {
  issuetype: NamedObject;
  summary: string;
  status: NamedObject;
  priority?: NamedObject;
}
const parentFields = ["issuetype", "summary", "status", "priority"];

export interface ParentedCardFields extends CardFields {
  description: string;
  parent: Issue<ParentFields>;
}

export interface Issue<T> extends ExpandableResponse {
  id: string;
  self: string;
  key: string;
  fields: T;
  renderedFields?: T;
}

interface IssueResultPage<T> extends ExpandableResponse, PagedResponse {
  issues: T[];
}

interface IssueCard {
  key: string;
  url: string;
  issuetype: string;
  summary: string;
  status: string;
  // updated: ResultDate;
  assignee?: string;
  priority?: string;
}

function mapResultToIssueCard(input: Issue<CardFields>) {
  const issueCard: IssueCard = {
    key: input.key,
    url: input.self,
    issuetype: input.fields.issuetype.name,
    summary: input.fields.summary,
    status: input.fields.status.name,
    // updated: ResultDate;
    // Might be null assignee
    assignee: input.fields.assignee?.displayName,
    // Might be null priority
    priority: input.fields.priority?.name,
  };
  return issueCard;
}

function mapResultToIssueContent(input: Issue<ContentFields>) {
  // console.debug(`Issue: ${input.id} ${input.self}`);
  return `<issue><h2>${input.key} ${input.fields.summary}</h2>\n${input.renderedFields?.description}</issue>`;
}
