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

4. **{your local host | 127.0.0.1:8600}/api/v1/vendor/register-your-shop**
    * This route is used by the vendors to register their shop on business, this is a ***POST*** and the following data has to be send to the request body
````json
    {
    "shopname" : "Night canteen",
    "description" : "best 24X7 food for your happiness",
    "opening" : "8Am",
    "closing" : "3Am",
    "openStatus" : "OPEN NOW",
    "speciality" : "120+ dishes",
    "ownername" : "tarsem singh",
    "ownerNumber" : 9478100000 
    }
````

5. **{your local host | 127.0.0.1:8600}/api/v1/vendor/all-register-shops**
    *This route gives you all the shops that are registered for business on the platform , it is a ***GET*** request
        this output is expected, here we are actually ****Populating**** the user keyword from our signUp module
````json
    {
    "status": "ok",
    "data": {
        "data": [
            {
                "_id": "6430f040225e7e90f17452c5",
                "user": {
                    "_id": "6430eff1225e7e90f17452bd",
                    "username": "tarsem",
                    "email": "ts346298@gmail.com",
                    "password": "$2a$12$F7Mkkxi1A6rV8g8uGVHeGe747D9bHAK./feAGKHU8FC0ByvSy/UEi",
                    "control": "vendor",
                    "image": "image.jpg",
                    "__v": 0
                },
                "shopname": "the snakcers and cafe",
                "description": "fineesh and cleanesh food ready to full fill your hunger",
                "opening": "8Am",
                "closing": "3Am",
                "openStatus": "OPEN NOW",
                "speciality": "120+ dishes",
                "ownername": "tarsem singh",
                "ownerNumber": 9478181139,
                "rating": 5,
                "menu": [],
                "__v": 0
            }
        ]
    }
}
````

6. **{your local host | 127.0.0.1:8600}/api/v1/vendor/update-shop**
    * This route is used by the vendors to update their shop credentials, this is a ***POST*** and the following data has to be send to the request body.
    * see updation is done on these things'
        1. shop name (shopname in body)
        2. shop description (description in body)
        3. opening time (opening in body)
        4. closing time (closing in body)
        5. open status (openStatus in body)
        6. speciality (speciality in body)
        7. owner name (ownername in body)
        8. owner number (ownerNumber in body)
    and the below provided are 2 from these.
````json
    {
    "shopname" : "the snakcers and cafe",
    "description" : "fineesh and cleanesh food ready to full fill your hunger"
    }
````