# General booking's CRUD Api
### welcome to "General booking's CRUD Api"
this is a general CRUD api's , any developer who want to make a booking application such as swiggy, zomato etc... can use this open source api to build their apps no matter is it a web application or android applicartion.
futher now we see all the basics things and technologies needed to use this application programming interface(Api)

#### Technologies used
1. Express.js
2. MongoDb
3. Node.js

#### Libraries or modules needed
1. Mongoose
2. jsonwebtokens
3. bcrypt
4. nodemon
5. promisify
6. path
7. util


#### How to use this api
1. first install the packages
```express
    as npm i mongoose, nodemon, bcryptjs, jsonwebtoken, util, path
````
2. first install the modules
```express
    npm i express
    const app = express()
    const port = 8600 | process.env.port
    const server = app.listen(port, ()=>{
        console.log(`server is running at ${port}`)
    })
````