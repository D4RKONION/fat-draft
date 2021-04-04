export type User = {
  name: string;
  level: "unset" | "host" | "guest";
  state: "start" | "inactive" | "ban" | "pick" | "finished" | "requesting-redraft";
}

export type Opponent = {
  name: string;
  isConnected: Boolean;
  state: "unset" | "requesting-redraft";
}