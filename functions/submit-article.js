const { query, Client } = require('faunadb')
require('dotenv').config()
/* configure faunaDB Client with our secret */
const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

/* export our lambda function as named "handler" export */
const handler = async (event) => {
  /* parse the string body into a useable JS object */
 
  const data = event.body
  console.log('Function `create` invoked', data)
  const item = {
    data,
  }
  /* construct the fauna query */
  return client
    .query(query.Create(query.Ref('classes/items'), item))
    .then((response) => {
      console.log('success', response)
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      console.log('error', error)
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}

module.exports = { handler }