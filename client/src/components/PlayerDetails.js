import React, {Fragment} from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  getPlayerQuery,
  getPlayersQuery,
  deletePlayerMutation,
} from '../queries/queries';
import { PlayerDetailsMain, PlayerDetailsWrapper, DeleteButton } from '../styles/PlayerDetails';
import UpdatePlayer from './UpdatePlayer';
import { FaTrash } from 'react-icons/fa';

function PlayerDetails(props) {
  const displayPlayerDetails = (loading, error, data) => {
    if (loading || data.player == null) {
      return <div>No player selected...</div>;
    } else {
      const { player } = data;
      return (
        <PlayerDetailsWrapper>
          <h2>{player.name}</h2>
          <p>{player.position}</p>
          {player.team && (
            <Fragment>
            <p>{player.team.name}</p>
            <p>All players on this team:</p>
            <ul className="other-players">
              {player.team.players.map(item => {
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
            </Fragment>
          )}
          <UpdatePlayer player={player} />
          <Mutation
            mutation={deletePlayerMutation}
            refetchQueries={[
              { query: getPlayersQuery },
              { query: getPlayerQuery, variables: { id: player.id } },
            ]}
          >
            {(deletePlayer, { data }) => (
              <DeleteButton title="Delete this player"
                onClick={() => {
                  deletePlayer({ variables: { id: player.id } });
                }}
              >
                <FaTrash size={18}/>
              </DeleteButton>
            )}
          </Mutation>
        </PlayerDetailsWrapper>
      );
    }
  };

  return (
    <Query query={getPlayerQuery} variables={{ id: props.playerId }}>
      {({ loading, error, data }) => {
        return (
          <PlayerDetailsMain>
            {displayPlayerDetails(loading, error, data)}
          </PlayerDetailsMain>
        );
      }}
    </Query>
  );
}

export default PlayerDetails;
