/*
{
    "startAt" : 0,
    "maxResults" : 10,
    "total": 200,
    "values": [
        { result 0 },
        { result 1 },
        { result 2 }
    ]
}
*/

export interface PagedResponse {
  startAt: number;
  maxResults: number;
  total: number;
  isLast?: boolean;
}
