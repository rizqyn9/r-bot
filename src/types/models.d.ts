declare type UserProps = {
  jid: string;
  pushName: string;
  region: string;
  authProps: AuthProps;
  customCommands?: CustomCommadsProps;
} & GlobalProps;

declare type GroupProps = {
  jid: string;
  pushName: string;
  region: string;
  // Aray of jid
  participants: string[];
  authProps: AuthProps;
  customCommands?: CustomCommadsProps;
} & GlobalProps;

type GlobalProps = {
  notes?: Array<GroupNotes>;
};

declare type GroupNotes = {
  _id: object;
  title: string;
  notes: Array<unknown>;
};
