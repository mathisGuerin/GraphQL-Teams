import React from 'react';
import { Query } from 'react-apollo';
import { getPlayerQuery } from '../queries/queries';
import { PlayerDetailsMain } from '../styles/PlayerDetails';

function PlayerDetails(props) {

  const displayPlayerDetails = (loading, error, data) => {
    if (loading || data.player == null) {
      return <div>No player selected...</div>;
    } else {
      const { player } = data;
      return (
        <div>
          <h2>{player.name}</h2>
          <p>{player.position}</p>
          <p>{player.team.name}</p>
          <p>All players on this team:</p>
          <ul className="other-players">
            {player.team.players.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
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
