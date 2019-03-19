import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getTeamsQuery, addPlayerMutation, getPlayersQuery } from '../queries/queries';
import { AddPlayerMain } from '../styles/AddPlayer'
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
        if (this.state.name !== "" && this.state.position !== "" && this.state.teamId !== "") {
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
    }

    render() {
        return (
            <AddPlayerMain onSubmit={ this.submitForm.bind(this) } >
                <h3>Create a new player</h3>
                <div className="field">
                    <label>Player name:</label>
                    <input required type="text" onChange={ (e) => this.setState({name: e.target.value})} />
                </div>
                <div className="field">
                    <label>Position:</label>
                    <input required type="text" onChange={ (e) => this.setState({position: e.target.value})} />
                </div>
                <div className="field">
                    <label>Team:</label>
                    <select required onChange={ (e) => this.setState({ teamId: e.target.value }) } >
                        <option>Select team</option>
                        { this.displayTeams() }
                    </select>
                </div>
                <button>+</button>
            </AddPlayerMain>
        )
    }
}

export default compose (
    graphql(getTeamsQuery, {name: 'getTeamsQuery'}),
    graphql(addPlayerMutation, {name: 'addPlayerMutation'})
)(AddPlayer);
