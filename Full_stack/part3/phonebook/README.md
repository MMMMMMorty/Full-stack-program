# Full Stack Assignment

The author of the project is Jiehong Mo.

## Build

The project will run on port 3001, please sure the port is available. And please sure the Mongo DB address is availabe, set it with environment vaiable **MONGODB_URI**. Example is followed.

    Export MONGODB_URI = 'address_here'

### Frontend

    cd front-end
    npm install
    npm run build
    cp ./build ../

### Backend

    npm install
    npm run dev
    
## Deployment

This project is deployed on the fly.io platform and can be accessed through the following link.[https://pre-assignment.fly.dev/]

## TODO

This project will cause the problem of simultaneous generation of the same data when multiple clients interact with the same server at the same time, which requires the use of exclusion locks to solve the problem of simultaneous writing of data