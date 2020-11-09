/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
