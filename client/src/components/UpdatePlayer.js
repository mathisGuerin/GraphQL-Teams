import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {
  getTeamsQuery,
  getPlayersQuery,
  updatePlayerMutation,
} from '../queries/queries';
import { AddPlayerMain } from '../styles/AddPlayer';
class UpdatePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.player.id,
      name: this.props.player.name,
      position: this.props.player.position,
      team: this.props.player.team.name,
      teamId: this.props.player.team.id,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player.id !== this.props.player.id) {
      this.setState({
        id: nextProps.player.id,
        name: nextProps.player.name,
        position: nextProps.player.position,
        team: nextProps.player.team.name,
        teamId: nextProps.player.team.id,
      });
    }
  }

  displayTeams() {
    var data = this.props.getTeamsQuery;
    if (data.loading) {
      return <option disabled>Loading teams</option>;
    } else {
      return data.teams.map(team => {
        return (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        );
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    // use the addPlayerMutation
    this.props.updatePlayerMutation({
      variables: {
        id: this.state.id,
        name: this.state.name,
        position: this.state.position,
        teamId: this.state.teamId,
      },
      refetchQueries: [ {query: getPlayersQuery}, {query: getTeamsQuery} ],
    });
  }

  render() {
    return (
      <AddPlayerMain onSubmit={this.submitForm.bind(this)}>
        <h3>Update player</h3>
        <div className="field">
          <label>Player name:</label>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Position:</label>
          <input
            type="text"
            value={this.state.position}
            onChange={e => this.setState({ position: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Team:</label>
          <select
            onChange={e => this.setState({ teamId: e.target.value })}
            defaultValue={this.state.teamId}
          >
            {this.displayTeams()}
          </select>
        </div>
        <button>+</button>
      </AddPlayerMain>
    );
  }
}

export default compose(
  graphql(getTeamsQuery, { name: 'getTeamsQuery' }),
  graphql(updatePlayerMutation, { name: 'updatePlayerMutation' })
)(UpdatePlayer);
