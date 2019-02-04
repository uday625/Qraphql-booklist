const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://uday:Password123@ds221115.mlab.com:21115/qgraphql', { useNewUrlParser: true })
                .then(()=>{
                    console.log('Connected to Database');
                })
                .catch(e =>{
                    console.log('error',e);
                });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, ()=>{
    console.log("App Started on port 4000");
});