import { gql } from 'apollo-boost';

// qql : write graphQL queries inside javascript files

const getTeamsQuery = gql`
  {
    teams {
      name
      id
    }
  }
`;

const getPlayersQuery = gql`
  {
    players {
      name
      id
      team {
        id
      }
    }
  }
`;

const addPlayerMutation = gql`
  mutation AddPlayer($name: String!, $position: String!, $teamId: ID!) {
    addPlayer(name: $name, position: $position, teamId: $teamId) {
      name
      id
    }
  }
`;

const updatePlayerMutation = gql`
  mutation AddPlayer(
    $id: ID!
    $name: String!
    $position: String!
    $teamId: ID!
  ) {
    updatePlayer(id: $id, name: $name, position: $position, teamId: $teamId) {
      name
      id
      team {
        id
      }
    }
  }
`;

const addTeamMutation = gql`
  mutation AddTeam($name: String!, $country: String!, $colors: ColorInput!) {
    addTeam(name: $name, country: $country, colors: $colors) {
      name
      id
      colors {
        mainColor
        secondaryColor
      }
    }
  }
`;

const getPlayerQuery = gql`
  query GetPlayer($id: ID) {
    player(id: $id) {
      id
      name
      position
      team {
        id
        name
        country
        players {
          name
          id
        }
      }
    }
  }
`;

const deletePlayerMutation = gql`
  mutation DeletePlayer($id: ID!) {
    deletePlayer(id: $id) {
      id
    }
  }
`;

const deleteTeamMutation = gql`
  mutation DeleteTeam($id: ID!) {
    deleteTeam(id: $id) {
      id
    }
  }
`;

export {
  getTeamsQuery,
  getPlayersQuery,
  addPlayerMutation,
  updatePlayerMutation,
  addTeamMutation,
  getPlayerQuery,
  deletePlayerMutation,
  deleteTeamMutation
};
