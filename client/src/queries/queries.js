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
        }
    }
`;

const addPlayerMutation = gql`
    mutation AddPlayer($name: String!, $position: String!, $teamId: ID!){
        addPlayer(name: $name, position: $position, teamId: $teamId){
            name
            id
        }
    }
`;

const getPlayerQuery = gql`
    query GetPlayer($id: ID){
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

export { getTeamsQuery, getPlayersQuery, addPlayerMutation, getPlayerQuery };
