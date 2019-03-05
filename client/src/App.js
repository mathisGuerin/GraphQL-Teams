import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// react-apollo help apollo to bind with the react application
// apollo can be used with all front framework.
// ApolloProvider allow to get data from the endpoint and
// use this data inside the application

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>My reading list</h1>
                <BookList />
                <AddBook />
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
