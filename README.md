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
{
	login(name: "sam", email: "sam@gmail.com") {
	  token
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

Understanding Session Management
There are 2 Loops
1. Login
  a. email and password => if true return sid (session id)
2. API
  a. All APIs requires the SID. This SID will expire after 1h. Where the user needs to relogin