import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// react-apollo help apollo to bind with the react application
// apollo can be used with all front framework.
// ApolloProvider allow to get data from the endpoint and
// use this data inside the application

// components
import PlayerList from './components/PlayerList';
import AddPlayer from './components/AddPlayer';
import AddTeam from './components/AddTeam';

import { Main, MainTitle, Forms } from './styles/App';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <Main>
                <MainTitle>My team</MainTitle>
                <PlayerList />
                <Forms>
                    <AddPlayer />
                    <AddTeam />
                </Forms>
            </Main>
        </ApolloProvider>
    );
  }
}

export default App;
