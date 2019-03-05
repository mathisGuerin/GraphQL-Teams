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

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>My team</h1>
                <PlayerList />
                <AddPlayer />
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
