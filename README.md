# GraphQL-books
Personal project to learn :

- [x] How to create a GraphQL server on Node.js
- [x] Use MongoDB to store data
- [x] Bind this data with a front-end application using React and Apollo


## Run the app
- Install nodemon to restart server automatically when some changes are detected.

```bash
npm install nodemon -g
nodemon app
```

- You can get or create data on graphiql http://localhost:4000/graphql

Get all teams from the database and the name of their players.
```javascript
{
  teams {
    name
    country
    players {
      name
    }
  }
}
```

Get an team and the name of its players
```javascript
{
  team(id: "5c7e5cba50835148053dce3d") {
    name
    country
    players {
      name
    }
  }
}
```

Add a new player
```javascript
mutation {
  addPlayer(
    name: "Mario Balotelli",
    position: "Stricker",
    teamId: "5c7e5cba50835148053dce3d"
  ) 
  {
    name
  }
}
```