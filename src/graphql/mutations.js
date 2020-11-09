/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
