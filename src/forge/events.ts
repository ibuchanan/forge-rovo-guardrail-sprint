export interface UniquelyIdentifiedObject {
  id: string;
}

export interface EventContext {
  cloudId: string; // The cloud ID.
  moduleKey: string; // The key identifying the module in the manifest
  userAccess?: { enabled: boolean };
}

export interface App extends UniquelyIdentifiedObject {
  version: string;
  name?: string;
  ownerAccountId?: string;
}

export interface CommonEvent {
  context: EventContext;
  app?: App;
  environment?: UniquelyIdentifiedObject;
  // Undocumented attributes
  eventType?: string;
  selfGenerated?: boolean;
  contextToken?: string;
}
