import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { getPlayersQuery } from '../queries/queries';
import PlayerDetails from './PlayerDetails';
import { PlayerListMain, PlayerListItem } from '../styles/PlayerList';

function PlayerList() {
  const [selected, setSelected] = useState(null);

  return (
    <Query query={getPlayersQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading players...</div>;
        } else {
          return (
            <div>
              <PlayerListMain>
                {data.players.map(player => (
                  <PlayerListItem
                    key={player.id}
                    onClick={e => setSelected(player.id)}
                  >
                    {player.name}
                  </PlayerListItem>
                ))}
              </PlayerListMain>
              <PlayerDetails playerId={selected} />
            </div>
          );
        }
      }}
    </Query>
  );
}

export default PlayerList;
