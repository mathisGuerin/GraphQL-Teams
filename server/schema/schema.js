const graphql = require('graphql');
const Player = require('../models/player');
const Team = require('../models/team');

// The schema describe the objects types, the relations between them, how to interact with...

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        team: {
            type: TeamType,
            resolve(parent, args){
                return Team.findById(parent.teamId);
            }
        }
    })
});

const TeamType = new GraphQLObjectType({
    name: 'Team',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args){
                return Player.find({ teamId: parent.id });
            }
        }
    })
});

// RootQuery : How the user can grab data.
// Fields define how the front can get the data.
// resolve : how to get data from database.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        player: {
            type: PlayerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                console.log("Getting player ", args.id)
                return Player.findById(args.id);
            }
        },
        team: {
            type: TeamType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                console.log("Getting team ", args.id)
                return Team.findById(args.id);
            }
        },
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args){
                console.log("Getting players ")
                return Player.find({});
            }
        },
        teams: {
            type: new GraphQLList(TeamType),
            resolve(parent, args){
                console.log("Getting teams ")
                return Team.find({});
            }
        }
    }
});

// Create, Update or Delete data.
// .save() is a mongoose function to save data inside database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTeam: {
            type: TeamType,
            args: {
                name: { type: GraphQLString },
                country: { type: GraphQLString }
            },
            resolve(parent, args){
                let team = new Team({
                    name: args.name,
                    country: args.country
                });
                return team.save();
            }
        },
        addPlayer: {
            type: PlayerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                position: { type: new GraphQLNonNull(GraphQLString) },
                teamId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let player = new Player({
                    name: args.name,
                    position: args.position,
                    teamId: args.teamId
                });
                return player.save();
            }
        },
        updatePlayer: {
            type: PlayerType,
            args: {
                id:  { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                position: { type: GraphQLString },
                teamId: { type: GraphQLID }
            },
            resolve(parent, args){
                console.log("Updating player ", args.name)
                return Player.findByIdAndUpdate(
                    args.id,
                    {$set:{name: args.name, position: args.position, teamId: args.teamId}},
                    {new: true, multi: true},
                    function(err, doc) {console.log(doc)}
                )
            }
        },
        deletePlayer: {
            type: PlayerType,
            args: {
                id:  { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args){
                console.log("DELETING player ", args.id)
                return Player.findByIdAndDelete(args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
