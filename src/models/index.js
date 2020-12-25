// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Player = {
  "WHITE": "WHITE",
  "BLACK": "BLACK"
};

const PieceType = {
  "PAWN": "PAWN",
  "ROOK": "ROOK",
  "KNIGHT": "KNIGHT",
  "BISHOP": "BISHOP",
  "QUEEN": "QUEEN",
  "KING": "KING",
  "GENERIC": "GENERIC"
};

const { Game, Position, Piece, CheckStatus, Check } = initSchema(schema);

export {
  Game,
  Player,
  PieceType,
  Position,
  Piece,
  CheckStatus,
  Check
};