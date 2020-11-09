/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      type
      players {
        team
      }
      turn {
        number
        player {
          team
        }
      }
      pieces {
        player {
          team
        }
        type
        captured
        position {
          row
          col
        }
      }
      check {
        player {
          team
        }
        status
        mate
      }
      createdAt
      updatedAt
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
        type
        players {
          team
        }
        turn {
          number
        }
        pieces {
          type
          captured
        }
        check {
          status
          mate
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
