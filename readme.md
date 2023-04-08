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
````express
    npm i mongoose, nodemon, bcryptjs, jsonwebtoken, util, path
````
2. first install the modules
````express
    npm i express
    const app = express()
    const port = 8600 | process.env.port
    const server = app.listen(port, ()=>{
        console.log(`server is running at ${port}`)
    })
````

##### The Api contains these following Routes
1. **{your local host | 127.0.0.1:8600}/api/v1/signup**

    * for signup the user this routes is used and the data as follow is passed in ***POST*** request in the body
````json
    "username" : "tarsem singh",
    "email" : "tarsemXXXX.com",
    "password" : "9478181139",
    "image" : "image.jpg"
````

2. **{your local host | 127.0.0.1:8600}/api/v1/login**

    * for login the user this routes is used and the data as follow is passed in ***POST*** request in the body
````json
    "email" : "spXXXXXXX.com",
    "password" : "478181139"
````

3. **{your local host | 127.0.0.1:8600}/api/v1/all-users**

    * for getting all registred users this routes is used this is a ***GET*** request.
        you can expect this kind of output
````json
    {
    "status": "ok",
    "data": {
        "data": [
            {
                "_id": "6430eff1225e7e90f17452bd",
                "username": "tarsem",
                "email": "ts346298@gmail.com",
                "password": "$2a$12$F7Mkkxi1A6rV8g8uGVHeGe747D9bHAK./feAGKHU8FC0ByvSy/UEi",
                "control": "vendor",
                "image": "image.jpg",
                "__v": 0
            },
            {
                "_id": "6430f289225e7e90f1745306",
                "username": "depinder",
                "email": "sp346298@gmail.com",
                "password": "$2a$12$vpRDGAfL6Wob3vQvak3VwuCkgqL1zhyBHKeo.ZB4LWdPzzSgGc8AO",
                "control": "user",
                "image": "image.jpg",
                "__v": 0
            },
            {
                "_id": "6430f639225e7e90f174531b",
                "username": "bharat",
                "email": "sp346298@gmail.com",
                "password": "$2a$12$P2Ul7daJIvLBGbm5TymG8OAmtMwigIvvfsVUAFmpbGYckhg2dxUKu",
                "control": "vendor",
                "image": "image.jpg",
                "__v": 0
            }
        ]
    }
}
````