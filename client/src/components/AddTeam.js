import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addTeamMutation, getTeamsQuery } from '../queries/queries';
import { AddTeamForm } from '../styles/AddTeam';
import { HuePicker } from 'react-color';

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

  handleChangeCompleteMain = (color) => {
    this.setState({ colors: {...this.state.colors, mainColor: color.hex}} )
  };

  handleChangeCompleteSecondary = (color) => {
    this.setState({ colors: {...this.state.colors, secondaryColor: color.hex}} )
  };

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
          <HuePicker
            color={this.state.colors.mainColor}
            onChangeComplete={ this.handleChangeCompleteMain }
            width= {'185px'}
          />
        </div>
        <div className="field">
          <label>Secondary color</label>
          <HuePicker
            color={this.state.colors.secondaryColor}
            onChangeComplete={ this.handleChangeCompleteSecondary }
            width= {'185px'}
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
