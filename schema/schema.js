const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

//dummy data

// const books =[
//     {name:'Name of the Wind',genre:'Fantasy',id:'1', authorid:'1'},
//     {name:'The Secret',genre:'Documentary',id:'2',authorid:'2'},
//     {name:'Kite Runner',genre:'Drama',id:'3',authorid:'3'},
//     {name:'The hero of Ages',genre:'Fantasy',id:'4',authorid:'2'},
//     {name:'The color of Magic',genre:'Sci-Fi',id:'5',authorid:'3'},
//     {name:'The Light Fantastic',genre:'Fantasy',id:'6',authorid:'3'},
// ];

// const authors = [
//     {name:'Uday Bag', age:22 , id:'1'},
//     {name:'Rakesh Sharma', age:23 , id:'2'},
//     {name:'Elon Musk', age:42 , id:'3'}
// ]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                //return _.find(authors,{id:parent.authorid});
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () =>({
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        id:{type:GraphQLID},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, {authorid:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code to get the data from db/other sources
                //return _.find(books,{id:args.id});
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(authors,{id:args.id});
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                //return books
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors;
            }
        }
        
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})