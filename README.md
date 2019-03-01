# GraphQL-books
Personal project to learn :

- [x] How to create a GraphQL server on Node.js
- [x] Use MongoDB to store data
- [x] Bind this data with a front-end application using React and Apollo
- [x]
- [x]


## Run the app
- Install nodemon to restart server automatically when some changes are detected.

```bash
npm install nodemon -g
nodemon app
```

- You can get or create data on graphiql http://localhost:4000/graphql

Get all authors from the database and the name of their books.
```javascript
{
  authors {
    name
    age
    books {
      name
    }
  }
}
```

Get an author and the name of his books
```javascript
{
  author(id: "5c77f75f74059418190a66c9") {
    name
    age
    books {
      name
    }
  }
}
```

Add a new book
```javascript
mutation{
    addBook(
      name: "A super title",
      genre: "Sci-fi",
      authorId:"5c77f75f74059418190a66c9"
    ) 
    {
      name
      genre
    }    
}
```