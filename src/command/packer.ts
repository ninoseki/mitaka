import { truncate } from "@/truncate";
import { Command, SearchableType } from "@/types";

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export class CommandPacker {
  public action: string;
  public query: string;
  public target: string;
  public type: SearchableType;

  public constructor(
    action: string,
    query: string,
    type: SearchableType,
    target: string
  ) {
    this.action = action;
    this.query = query;
    this.type = type;
    this.target = target;
  }

  private isAbbreviationType(): boolean {
    const abbreviations = ["ip", "asn", "btc", "cve", "eth", "url"];
    return abbreviations.includes(this.type);
  }

  private getNormalizedType(): string {
    if (this.isAbbreviationType()) {
      return this.type.toUpperCase();
    }
    return this.type;
  }

  public getJSON(): string {
    const command: Command = {
      action: this.action,
      query: this.query,
      type: this.type,
      target: this.target,
    };
    return JSON.stringify(command);
  }

  public getMessage(): string {
    const type = this.getNormalizedType();

    return `${capitalize(this.action)} ${truncate(this.query)} as ${type} on ${
      this.target
    }`;
  }
}
