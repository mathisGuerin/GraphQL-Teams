import React from 'react';
import { Query } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const displayBookDetails = (loading, error, data) => {
    console.log("loading", loading)
    if(loading || data.book == null ){
        return ( <div>No book selected...</div> );
    } else {
        const { book } = data;
        return (
            <div>
                <h2>{ book.name }</h2>
                <p>{ book.genre }</p>
                <p>{ book.author.name }</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    { book.author.books.map(item => {
                        return <li key={item.id}>{ item.name }</li>
                    })}
                </ul>
            </div>
        );
    }
}

function BookDetails(props){
    return (
        <Query query={getBookQuery} variables={{id:props.bookId}}>
            {({loading, error, data}) => {
                return (
                    <div id="book-details">
                        {displayBookDetails(loading, error, data)}
                    </div>
                )
            }}
        </Query>
    )
}

export default BookDetails;
