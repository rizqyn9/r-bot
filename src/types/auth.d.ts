declare type AuthProps = {
  role: AuthRoleType;
};

declare type AuthRoleType = "ADMIN_BOT" | "OWNER" | "PREMIUM" | "USER" | "GUEST";

declare type CustomCommadsProps = {
  command: Array<string>;
};
