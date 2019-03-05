import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getTeamsQuery, addPlayerMutation, getPlayersQuery } from '../queries/queries';

class AddPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            position: '',
            teamId: ''
        };
    }

    displayTeams(){
        var data = this.props.getTeamsQuery;
        if(data.loading){
            return( <option disabled>Loading teams</option> );
        } else {
            return data.teams.map(team => {
                return( <option key={ team.id } value={team.id}>{ team.name }</option> );
            });
        }
    }

    submitForm(e){
        e.preventDefault()
        // use the addPlayerMutation
        this.props.addPlayerMutation({
            variables: {
                name: this.state.name,
                position: this.state.position,
                teamId: this.state.teamId
            },
            refetchQueries: [{ query: getPlayersQuery }]
        });
    }

    render() {
        return (
            <form id="add-player" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                    <label>Player name:</label>
                    <input type="text" onChange={ (e) => this.setState({name: e.target.value})} />
                </div>
                <div className="field">
                    <label>Position:</label>
                    <input type="text" onChange={ (e) => this.setState({position: e.target.value})} />
                </div>
                <div className="field">
                    <label>Team:</label>
                    <select onChange={ (e) => this.setState({ teamId: e.target.value }) } >
                        <option>Select team</option>
                        { this.displayTeams() }
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    }
}

export default compose (
    graphql(getTeamsQuery, {name: 'getTeamsQuery'}),
    graphql(addPlayerMutation, {name: 'addPlayerMutation'})
)(AddPlayer);
