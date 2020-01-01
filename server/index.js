const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const yup = require('yup')
const schema = require('./schema.js');

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema:schema,
  graphiql:true
}));

// EXAMPLE OF YUP (VALIDATION) - MONGOOSE HAS ITS OWN VALIDATION (you can do a double validation if you want)
let schemaFORVALIDATION = yup.object().shape({
  name: yup.string().required(),
  age: yup
    .number()
    .required()
    .positive()
    .integer(),
  email: yup.string().email(),
});

schemaFORVALIDATION.validate({ name: 'jonnie', age: 24, email: 'jonathanchowjh@gmail.com' }, { abortEarly: false })
.then((value) => {
  console.log(value);
})
.catch((err) => console.log(err));


app.listen(4000, () => console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
