const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList} = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1',authorId:'1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2',authorId:'2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3',authorId:'3' },
    { name: 'five point someone', genre: 'Humor', id: '4',authorId:'4' },
    { name: '2 states', genre: 'Drama', id: '5',authorId:'4' },
    { name: 'sherlock homes', genre: 'fiction', id: '3',authorId:'3' },
];
var authors = [
    { name: 'Robin', age: 23, id: '1' },
    { name: 'winstin', age: 22, id: '2' },
    { name: 'Tom', age:12, id: '3' },
    { name: 'Chetan', age:12, id: '4' },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,           
            resolve(parent, args){
                // code to get data from db / other source
                return _.find(authors, { id: parent.authorId });
            }}
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books:{ type: new GraphQLList(BookType),
            resolve(parent, args){
                // code to get data from db / other source
                return _.filter(books, { authorId: parent.id });
            }
         },
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return _.find(authors, { id: args.id });
            }
        },
        books:{ type: new GraphQLList(BookType),
            resolve(parent, args){
                // code to get data from db / other source
                return books;
            }
         },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});