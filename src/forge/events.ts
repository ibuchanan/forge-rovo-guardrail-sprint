export interface UniquelyIdentifiedObject {
  id: string;
}

export interface Enabled {
  enabled: boolean;
}

export interface EventContext {
  cloudId: string; // The cloud ID.
  moduleKey: string; // The key identifying the module in the manifest that defines the scheduled trigger function and its frequency.
  userAccess?: Enabled;
}

export interface App extends UniquelyIdentifiedObject {
  id: string;
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
