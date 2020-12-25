const gql = require('graphql-tag');

module.exports = {
	query: gql`
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
      createdAt
      updatedAt
      owner
    }
  }
	`,
	mutation: gql`
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
      createdAt
      updatedAt
      owner
    }
  }
	`
};
