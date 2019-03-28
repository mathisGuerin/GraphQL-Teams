# GraphQL-teams
Personal project to learn :

- [x] How to create a GraphQL server on Node.js
- [x] Use MongoDB to store data
- [x] Bind this data with a front-end application using React and Apollo

This application allow you to get and create informations about players and teams. You can create new players, link them to a team, create new teams, update their informations (country, colors...). You can also delete players and teams.

All the data is stored in a Mongo database. I use Mongoose, a Object Data Modeling, to convert object in code to their representation in MongoDB.
I created a NodeJS back-end with express-graphql.

## Run the app
- Install nodemon to restart server automatically when some changes are detected.

- Inside a .env file, add the URL of your Mongo database : MONGO_DB_URL='mongodb://<USER>:<PASSWORD>@cluster0-shard-00-00-nbesj.mongodb.net:27017,cluster0-shard-00-01-nbesj.mongodb.net:27017,cluster0-shard-00-02-nbesj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

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