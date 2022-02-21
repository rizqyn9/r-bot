declare type UserProps = {
  jid: string;
  pushName: string;
  region: string;
  authProps: AuthProps;
  customCommands?: CustomCommadsProps;
};

declare type GroupProps = {
  jid: string;
  pushName: string;
  region: string;
  // Aray of jid
  participants: string[];
  authProps: AuthProps;
  customCommands?: CustomCommadsProps;
};
