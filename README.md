# Running this project
- Clone this repo to your local environment
- run npm install in the root folder of the project
- run npm start to load the project into your browser

# About this project

I always immediately go into the Postman application whenever I am given an API endpoint to test what the response object will be. I tested the top level Boomtown organization
endpoint in Postman and saw that there were several other endpoints through that url. I then created an array with the endpoint names and wrote a map function that allows us to
asynchronously reach each of the endpoints, and call their data object on demand by clicking on the corresponding endpoint name. I then put together a very basic HTML table to display the information to the end user in a visual way. This allows the user to see ID numbers and corresponding information based off the specific endpoint and its response object data. 

If I were to flesh this out further, I would work on writing out some helper functions to programmatically loop through the top level response object, and then return each url endpoint's response object. 

Overall, I alwasy enjoy getting to work with different API's and coming up with ways to take the response data and present it to the end user in a clear way. 