
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

export interface Draft {
  roomCode: string;
  activeGame: "3S" | "USF4" | "SFV";
  draftCharacters: string[];
  bannedCharacters: {[key: string]: string[]};
  pickedCharacters: {[key: string]: string[]};
  draftLog: string[]
}