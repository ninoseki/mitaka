import type { CommandType } from "~/schemas";
import { truncate } from "~/utils";

const abbreviations = ["ip", "asn", "btc", "cve", "eth", "url"];

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function commandToID(command: CommandType): string {
  return JSON.stringify(command);
}

function isAbbreviationType(commandType: string): boolean {
  return abbreviations.includes(commandType);
}

function normalizeCommandType(commandType: string): string {
  if (isAbbreviationType(commandType)) {
    return commandType.toUpperCase();
  }

  return commandType;
}

export function commandToMessage(command: CommandType): string {
  return `${capitalize(command.action)} ${truncate(
    command.query,
  )} as ${normalizeCommandType(command.type)} on ${command.name}`;
}
