import api, { route } from "@forge/api";

interface UserResponse {
  self: string;
  accountId: string;
  accountType: string;
  emailAddress: string;
  avatarUrls: {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
  };
  displayName: string;
  active: boolean;
  timeZone: string;
  locale: string;
  groups: {
    size: bigint;
    items: [];
  };
  applicationRoles: {
    size: bigint;
    items: [];
  };
  expand: string;
}

export async function myself() {
  console.debug(`Request: myself`);
  try {
    const response = await api.asUser().requestJira(route`/rest/api/3/myself`);
    console.debug(`Response: ${response.status} ${response.statusText}`);
    // console.debug(JSON.stringify(await response.json()));
    if (response.ok) {
      console.debug(`Success: myself`);
      const me = (await response.json()) as UserResponse;
      console.debug(`User: [${me.displayName}](${me.accountId})`);
      return me;
    }
    // TODO: check status codes and throw errors
    console.error(`Failed: myself`);
    throw new Error(`Failed for myself\n`);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed for myself\n`);
  }
}
