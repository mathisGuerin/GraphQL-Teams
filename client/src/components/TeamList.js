import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { getTeamsQuery, deleteTeamMutation } from '../queries/queries';
import { TeamListMain, TeamListItem } from '../styles/TeamList';
import { FaTrash } from 'react-icons/fa';


function TeamList() {
  const [selected, setSelected] = useState(null);

  return (
    <Query query={getTeamsQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading teams...</div>;
        } else {
          return (
            <div>
              <TeamListMain>
                {data.teams.map(team => (
                  <TeamListItem
                    key={team.id}
                    onClick={e => setSelected(team.id)}
                    colors={team.colors}
                  >
                    {team.name}
                    <Mutation
                      mutation={deleteTeamMutation}
                      refetchQueries={[
                        { query: getTeamsQuery }
                      ]}
                    >
                      {(deleteTeam, { data }) => (
                        <FaTrash onClick={() => {
                        deleteTeam({ variables: { id: team.id } });
                        }} size={10} style={{padding: '0 10px'}}/>
                      )}
                    </Mutation>
                  </TeamListItem>
                ))}
              </TeamListMain>
            </div>
          );
        }
      }}
    </Query>
  );
}

export default TeamList;
