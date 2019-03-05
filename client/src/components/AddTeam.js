import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addTeamMutation, getTeamsQuery } from '../queries/queries';
import { AddTeamForm } from '../styles/AddTeam';

class AddTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      country: '',
    };
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addTeamMutation({
      variables: {
        name: this.state.name,
        country: this.state.country,
      },
      refetchQueries: [{ query: getTeamsQuery }],
    });
  }

  render() {
    return (
      <AddTeamForm onSubmit={this.submitForm.bind(this)}>
      <h3>Create a new team</h3>
        <div className="field">
          <label>Team name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Country:</label>
          <input
            type="text"
            onChange={e => this.setState({ country: e.target.value })}
          />
        </div>
        <button>+</button>
      </AddTeamForm>
    );
  }
}

export default compose(graphql(addTeamMutation, { name: 'addTeamMutation' }))(
  AddTeam
);
