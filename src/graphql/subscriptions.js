/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame($owner: String!) {
    onCreateGame(owner: $owner) {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($owner: String!) {
    onUpdateGame(owner: $owner) {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame($owner: String!) {
    onDeleteGame(owner: $owner) {
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
