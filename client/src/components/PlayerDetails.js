import React from 'react';
import { Query } from 'react-apollo';
import { getPlayerQuery } from '../queries/queries';

const displayPlayerDetails = (loading, error, data) => {
    console.log("loading player detail ", loading);
    console.log("data player detail ", data.player);
    if(loading || data.player ==  null){
        return ( <div>No player selected...</div> );
    } else {
        const { player } = data;
        return (
            <div>
                <h2>{ player.name }</h2>
                <p>{ player.position }</p>
                <p>{ player.team.name }</p>
                <p>All players on this team:</p>
                <ul className="other-players">
                    { player.team.players.map(item => {
                        return <li key={item.id}>{ item.name }</li>
                    })}
                </ul>
            </div>
        );
    }
}

function PlayerDetails(props){
    return (
        <Query query={getPlayerQuery} variables={{id:props.playerId}}>
            {({loading, error, data}) => {
                return (
                    <div id="player-details">
                        {displayPlayerDetails(loading, error, data)}
                    </div>
                )
            }}
        </Query>
    )
}

export default PlayerDetails;
