import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Player {
  WHITE = "WHITE",
  BLACK = "BLACK"
}

export enum PieceType {
  PAWN = "PAWN",
  ROOK = "ROOK",
  KNIGHT = "KNIGHT",
  BISHOP = "BISHOP",
  QUEEN = "QUEEN",
  KING = "KING",
  GENERIC = "GENERIC"
}

export declare class Position {
  readonly row: number;
  readonly col: number;
  constructor(init: ModelInit<Position>);
}

export declare class Piece {
  readonly player: Player | keyof typeof Player;
  readonly type: PieceType | keyof typeof PieceType;
  readonly captured: boolean;
  readonly position?: Position;
  constructor(init: ModelInit<Piece>);
}

export declare class CheckStatus {
  readonly status: boolean;
  readonly mate?: boolean;
  constructor(init: ModelInit<CheckStatus>);
}

export declare class Check {
  readonly WHITE: CheckStatus;
  readonly BLACK: CheckStatus;
  constructor(init: ModelInit<Check>);
}

export declare class Game {
  readonly id: string;
  readonly turn: number;
  readonly pieces: (Piece | null)[];
  readonly check: Check;
  constructor(init: ModelInit<Game>);
  static copyOf(source: Game, mutator: (draft: MutableModel<Game>) => MutableModel<Game> | void): Game;
}