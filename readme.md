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
8. dotenv


#### How to use this api
1. first install the packages
````express
    npm i mongoose, nodemon, bcryptjs, jsonwebtoken, util, path
````
2. first install the modules
````express
    npm i express
    const app = express()
    const dotenv = require('dotenv')
    dotenv.config({path : "./config.env"})
    const mongoose = require('mongoose')
    const connect = mongoose.connect(process.env.CONNECTION).then(el=>{console.log("db coneection established")})
    const port = 8600 | process.env.port
    const server = app.listen(port, ()=>{
        console.log(`server is running at ${port}`)
    })
````

3. make a **config.env** file
    **use process.env.connection** line to excess this .env file, this file is available all over the application without any import
````express
    CONNECTION = "your mongo db connection string"
    STRING = "your Jsonwebtoken secret string"
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
    * This route is used by the vendors to update their shop credentials, this is a ***PATCH*** request and the following data has to be send to the request body.
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

7. **{your local host | 127.0.0.1:8600}/api/v1/vendor/delete-shop**
    * This route is used by the vendors to delete their shop from the platform, this is a ***DELETE*** request 
````json
    ****A delete sucessfully is returns to the frontend vis res.status(404).send(--message--)****
````

8. **{your local host | 127.0.0.1:8600}/api/v1/vendor/menu/menu-addition**
    * This route is used by the vendors to add menu items to their shop on the platform, this is a ***POST*** and following data is goes with request in body 
````json
    {
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYOTBmMTc0NTMxYiIsImlhdCI6MTY4MDkzMDM2MX0.N2tl57AhXh7BWHBx17xy8toqTP_MPyN0jQ0nj-tBWic",
    "data": {
        "data": {
            "item_name": "cookies",
            "item_des": "lorem epsum the menu are",
            "item_price": 20,
            "stock": 10,
            "shop": "6430f675225e7e90f1XXXX",
            "user": "6430f639225e7e90f17XXXXb",
            "identifier": 5577552176XXXXX6000,
            "_id": "6431598d09d22dXXXX98dc",
            "__v": 0
        }
    }
}
````

9. **{your local host | 127.0.0.1:8600}/api/v1/vendor/menu/menu-list?item_price[lt]=200&fields=item_name,item_des,item_price,stock&sort=item_price,stock**
    this route is used to get all menu's items available in the shops and here we are able to filter the data by the following manners
        1. filter on price by taking lte, lt, gte, gt as less than equals, less than, greater than equals, greater than
        2. filter on stocks as same as price
        3. sort using price and stock available
        4. filter using shop name
        5. showing limited number of fields to increase the efficiency and decreasing the time loading of the data and we are also asyncronization so we are loading all the data in the backgroud
    this is how data looks like in the output
````json
    {
    "status": "ok",
    "data": {
        "data": [
            {
                "_id": "6430f6ab225e7e90f174532a",
                "item_name": "ice cream",
                "item_des": "lorem epsum the menu are",
                "item_price": 20,
                "stock": 10
            },
            {
                "_id": "6431598d09d22d8fac5098dc",
                "item_name": "cookies",
                "item_des": "lorem epsum the menu are",
                "item_price": 20,
                "stock": 10
            },
            {
                "_id": "6430f08d225e7e90f17452d6",
                "item_name": "ice cream",
                "item_des": "lorem epsum the menu are",
                "item_price": 20,
                "stock": 100
            }
            
        ]
    }
}
````

10. **{your local host | 127.0.0.1:8600}/api/v1/vendor/menu/menu-delete**
    this route is used to delete menu items from our menu, this route is used by vendors, data is automatically comes from frontend and the vendor is able to delete the menu item by just one click.
    this is a ***DELETE*** request 
````json
    ****A delete sucessfully is returns to the frontend vis res.status(404).send(--message--)****
````

11. **{your local host | 127.0.0.1:8600}/api/v1/vendor/menu/menu-update**
    this route is menu item update route where a vendor is able to update the menu items here the finder credentials comes from frontend automatically and the updating credentials are comes from frontend form using body
    this is a ***PATCH*** request , this data is passed in this request body
````json
    {
    "item_name" : "chicken wings",
    "identifier" : 65380280100020000,
    "item_price" : 399
    }
````

12. **{your local host | 127.0.0.1:8600}/api/v1/resturant/cart**
    this route is used by user to add item to the cart to buy the products, here all the data is comes from frontend automatically,

    the developer has to note here when you are displaying the menu items you have to declare shop id on the menu item so that you can pick that id to send here with the body.

    this is a ***POST*** request , this data is passed in this request body
````json
     {
        "item_name" : "soft drink",
        "item_price" : 56,
        "shopid" : "6430f040220f17452c5",
        "quantity" : 1 ,
        "subTotal" : 45,
        "shopname" : "the snackers and cafe"
    }
````

13. **{your local host | 127.0.0.1:8600}/api/v1/resturant/cart/quantity-update**
    this route is used behind the scenes to increase the quantity of the cart elements and simultaneously updating the subtotal amount of the order
    this is a ***POST*** request , this data is passed in this request body
````json
    {
    "item_name" : "soft drink",
    "item_price" : 56,
    "quantity" : 9
    }
````

14. **{your local host | 127.0.0.1:8600}/api/v1/resturant/cart/place-order**
    this route is used to place the order and proceeding further to payments via payment gate
    this is a ***GET*** request , this data will you get in output
````json
    {
    "status": "ok",
    "data": {
        "data": [
            {
                "_id": "643119d7ba53d061202a5236",
                "user": "6430f639225e7e90f174531b",
                "cartList": [
                    [
                        {
                            "item_name": "spring roll",
                            "item_price": 60,
                            "shopid": "6430f040225e7e90f17452c5",
                            "quantity": 5,
                            "subTotal": 300,
                            "shopname": "the snackers and cafe"
                        }
                    ],
                    [
                        {
                            "item_name": "ice cream",
                            "item_price": 20,
                            "shopid": "6430f040225e7e90f17452c5",
                            "quantity": 5,
                            "subTotal": 100,
                            "shopname": "the snackers and cafe"
                        }
                    ],
                    [
                        {
                            "item_name": "soft drink",
                            "item_price": 56,
                            "shopid": "6430f040225e7e90f17452c5",
                            "quantity": 9,
                            "subTotal": 504,
                            "shopname": "the snackers and cafe"
                        }
                    ]
                ],
                ****"placing_status": "placed"****,
                "accept_order": "wait",
                "__v": 3,
                "shopid": "6430f040225e7e90f17452c5",
                "shopname": "the snackers and cafe"
            }
        ]
    }
}
````

15. **{your local host | 127.0.0.1:8600}/api/v1/resturant/cart/cancel-order**
    this route is cancel order route after placing the order, used by user
    this is a ***DELETE*** request , this data is passed in this request body
````json
    ****A delete sucessfully is returns to the frontend vis res.status(404).send(--message--)****
````


16. **{your local host | 127.0.0.1:8600}/api/v1/resturant/cart/remove-item**
    this route is used to remove items from the cart, used by user, data is automatically passed by just one click by using children and parent node properties in native javaScript or Props in React
    this is a ***POST*** request , this data is passed in this request body
````json
    {
    "item_name" : "spring roll",
    "item_price" : 11
    }
````

17. **{your local host | 127.0.0.1:8600}/api/v1/order/all-orders**
    this route gives all the orders to the vendors play that are sucessfully placed by the users
    this is a ***GET*** request , this data is passed in this request body

18. **{your local host | 127.0.0.1:8600}/api/v1/order/order-accept**
    this route is used by the vendors to accept the orders, here important thing for a developer is that when we display placed orde to the vendor we have display the user id as well that comes from route body
    this is a ***POST*** request , this data is passed in this request body
````json
    {
    "user" : "6430f639225e7e90f531b"
    }
````

19. **{your local host | 127.0.0.1:8600}/api/v1/order/order-accept**
    this route is used to when the order is ready and ready to deliver to the user
    this is a ***POST*** request , this data is passed in this request body
````json
    {
    "user" : "6430f639225174531b"
    }
````

19. **{your local host | 127.0.0.1:8600}/api/v1/feedback/review**
    this route is used by users to gives review and rating to their prev placed orders
    this is a ***POST*** request , this data is passed in this request body
````json
    {
    "shopname" : "the snackers and cafe",
    "shopid" : "6430f040225e7e90f17452c5",
    "review" : "only one word i want to say that is kat lo",
    "rating" : 0.5
    }
````

20. **{your local host | 127.0.0.1:8600}/api/v1/feedback/all-review?shopname=the snackers and cafe&rating[lte]=0.1**
    this routes display all the available reviews and we can also filter the reviews as folow'

        1. filter by shop name
        2. filter by rating number as gte, gt , lte, lt functions
        3. sort by ratings
    
    this is a ***GET*** request , this type of data  you get as output
````json
    {
    "status": "ok",
    "data": {
        "data": [
            {
                "_id": "6430f3152245318",
                "rating": 0.5,
                "review": "only one word i want to say that is kat lo",
                "shopname": "the snackers and cafe",
                "shopid": "6430f0e90f17452c5",
                "user": "6430f289225306",
                "__v": 0
            },
            {
                "_id": "6430f241227e90f1745303",
                "rating": 1.5,
                "review": "worst food ever i see in my entire life WTF , BC, MC, 🙏",
                "shopname": "the snackers and cafe",
                "shopid": "6430f05e7e90f17452c5",
                "user": "6430eff1227452bd",
                "__v": 0
            }
        ]
    }
}
````

19. **{your local host | 127.0.0.1:8600}/api/v1/vendor/order/finish-orders?accept_order=finish&shopname=nc**
    this route display all the finished order by vendors and we can apply all the available filters as well as follow'

        1. filter by accept order
        2. filter byshop name

    this is a ***GET*** request , this type of data  you get as output
````json
    {
    "status": "ok",
    "data": {
        "data": [
            {
                "_id": "643119d7ba53d061202a5236",
                "user": "6430f639225e7e90f174531b",
                "cartList": [
                    [
                        {
                            "item_name": "spring roll",
                            "item_price": 60,
                            "shopid": "6430f040225e7e90f17452c5",
                            "quantity": 5,
                            "subTotal": 300,
                            "shopname": "the snackers and cafe"
                        }
                    ],
                    [
                        {
                            "item_name": "ice cream",
                            "item_price": 20,
                            "shopid": "6430f040225e7e90f17452c5",
                            "quantity": 5,
                            "subTotal": 100,
                            "shopname": "the snackers and cafe"
                        }
                    ],
                    [
                        {
                            "item_name": "soft drink",
                            "item_price": 56,
                            "shopid": "6430f040225e7e90f17452c5",
                            "quantity": 9,
                            "subTotal": 504,
                            "shopname": "the snackers and cafe"
                        }
                    ]
                ],
                ****"placing_status": "placed"****,
                ****"accept_order": "finish"****,
                "__v": 3,
                "shopid": "6430f040225e7e90f17452c5",
                "shopname": "the snackers and cafe"
            }
        ]
    }
}
````
