import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { getPlayersQuery } from '../queries/queries';

// components
import PlayerDetails from './PlayerDetails';

function PlayerList() {
    const [selected, setSelected] = useState(null);

    return(
        <Query query={getPlayersQuery}>
            {({loading, error, data}) => {
                if(loading){
                    return( <div>Loading players...</div> );
                } else {
                    return (
                    <div>
                        <ul id="player-list">
                            {
                                data.players.map(player => (
                                    <li key={ player.id } onClick={ (e) => setSelected(player.id) }>{ player.name }</li>
                                ))
                            }
                        </ul>
                        <PlayerDetails playerId={ selected } />
                    </div>
                    )
                }
            }}
        </Query>
    );
}


// Indide PlayerList, we have access to all the data provided by getPlayersQuery via props
export default PlayerList;
