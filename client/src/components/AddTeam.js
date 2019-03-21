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
      colors: {
        mainColor: '#dedede',
        secondaryColor: '#ab1233'
      }
    };
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addTeamMutation({
      variables: {
        name: this.state.name,
        country: this.state.country,
        colors: this.state.colors
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
        <div className="field">
          <label>Main color</label>
          <input
            type="text"
            onChange={e => this.setState({ colors: {...this.state.colors, mainColor: e.target.value}} )}
          />
        </div>
        <div className="field">
          <label>Secondary color</label>
          <input
            type="text"
            onChange={e => this.setState({ colors: {...this.state.colors, secondaryColor: e.target.value} })}
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
