## Quizzordy: A Typescript & Node quiz app api

Welcome to Quizzordy(definitely not named after my favourite quiz show). The back-end api server can be accessed here and the front-end is in development. 

### Tech Stack 
- Typescript 
- Node
- Express 
- MongoDB
- Jest


### Getting started

To run the app locally, clone the repository and install the dependencies.

```bash
git clone https://github.com/Illy-hans/Quiz-ts.git
npm install
```

Set up a database connection by adding a MongoDB database URL into an .env file on the root.

```bash
#.env
DATABASE_URL="your_mongodb_database_url_here"
```

Set up a JSON Web Token secret in your .env root file and set your PORT

```bash
#.env
JWT_SECRET="mysuperdupersecret1212"
PORT="3000"
```

Ensure the tests are passing with `npm test`. 

You're ready to go! Start the server and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
npm start
```
