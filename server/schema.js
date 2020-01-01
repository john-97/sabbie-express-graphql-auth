const axios = require("axios");
const jwt = require('jsonwebtoken')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})
const JWT = new GraphQLObjectType({
  name: 'JWT',
  fields: () => ({
    token: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
        token: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        jwt.verify(args.token, 'secret-key', (err, authData) => {
          if (err) return null;
          console.log(authData);
          return authData;
        })
        return axios.get('http://localhost:3000/customers/' + args.id)
        .then(res => res.data)
      }
    },
    customers:{
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args){
        return axios.get('http://localhost:3000/customers')
          .then(res => res.data);
      }
    },
    login: {
      type: JWT,
      args: {
        name: {type: GraphQLString},
        email: {type: GraphQLString}
      },
      resolve(parentValue, args){
        return axios.get('http://localhost:3000/customers')
        .then((res) => {
          console.log(res.data, args)
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].email !== args.email) continue;
            if (res.data[i].name === args.name) { // using name as password
              const token = jwt.sign({user: res.data[i]}, 'secretkey', { expiresIn: '1h' });
              return { token }
            }
            return null;
          }
        });
      }
    }
  }
})

// Mutations
const mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addCustomer:{
      type:CustomerType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, args){
        return axios.post('http://localhost:3000/customers', {
          name:args.name,
          email: args.email,
          age:args.age
        })
        .then(res => res.data);
      }
    },
    deleteCustomer:{
      type:CustomerType,
      args:{
        id:{type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, args){
        return axios.delete('http://localhost:3000/customers/'+args.id)
        .then(res => res.data);
      }
    },
    editCustomer:{
      type:CustomerType,
      args:{
        id:{type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve(parentValue, args){
        return axios.patch('http://localhost:3000/customers/'+args.id, args)
        .then(res => res.data);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})