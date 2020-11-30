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
      checkStatusWhite {
        status
        mate
      }
      checkStatusBlack {
        status
        mate
      }
      createdAt
      updatedAt
      version
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
        checkStatusWhite {
          status
          mate
        }
        checkStatusBlack {
          status
          mate
        }
        createdAt
        updatedAt
        version
        owner
      }
      nextToken
    }
  }
`;
