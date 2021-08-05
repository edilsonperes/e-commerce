# E-commerce Amazon clone

## Getting started

- Make sure you have `Node.js` and `npm` installed.
- Install all dependencies by running `npm install` from the root folder.

## Configuring the server

### Listen port

Configure the server por you want your server to listen to on `server.js` file, simply changing the value on `port` variable. The default port is 3000.

```js
const port = 3000
```

### Connection to MongoDB

Create a file named `MongoDB.json` in the root folder following the template below to store the URI for your database.

```json
{
  "URI": "mongodb+srv://<user>:<password>@e-commerce.zosra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}
```

Replace `<user>` and `<password>` with your credentials to access the database. Replace `myFirstDatabase` with the name of the database that connections will use by default. Ensure any option params are [URL encoded](https://www.urlencoder.org/).

_This is used for security purpose, so you can upload your code to a public git repository without exposing access to your database_

Under construction
