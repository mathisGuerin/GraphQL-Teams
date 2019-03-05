import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

function BookList() {
    const [selected, setSelected] = useState(null);

    return(
        <Query query={getBooksQuery}>
            {({loading, error, data}) => {
                if(loading){
                    return( <div>Loading books...</div> );
                } else {
                    return (
                    <div>
                        <ul id="book-list">
                            {
                                data.books.map(book => (
                                    <li key={ book.id } onClick={ (e) => setSelected(book.id) }>{ book.name }</li>
                                ))
                            }
                        </ul>
                        <BookDetails bookId={ selected } />
                    </div>
                    )
                }
            }}
        </Query>
    );
}


// Indide BookList, we have access to all the data provided by getBooksQuery via props
export default BookList;
