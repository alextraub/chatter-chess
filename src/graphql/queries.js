/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      turn
      pieces {
        player
        type
        captured
        position {
          row
          col
        }
      }
      check {
        WHITE {
          status
          mate
        }
        BLACK {
          status
          mate
        }
      }
      swapping {
        row
        col
      }
      swapList {
        type
        black
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        turn
        pieces {
          player
          type
          captured
        }
        swapping {
          row
          col
        }
        swapList {
          type
          black
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
