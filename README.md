RUN
```
npm run start
npm run database
localhost:4000/graphql
```

GET REQUESTS
```
{
  customer(id: "2"){
    id,
    name,
    email,
    age
  }
}
{
  customers{
    id,
    name,
    email,
    age
  }
}
```

POST, PUT, DELETE
```
mutation{
  addCustomer(name:"peter", email:"peter@gmail.com", age: 12){
		id,
    name,
    email,
    age
  }
}
mutation{
  deleteCustomer(id: "3"){
		id,
    name,
    email,
    age
  }
}
mutation{
  editCustomer(id: "3", name:"pop", email:"peter@gmail.com", age: 12){
		id,
    name,
    email,
    age
  }
}
```