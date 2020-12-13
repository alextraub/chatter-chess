/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
      owner
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
      owner
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
      owner
    }
  }
`;
