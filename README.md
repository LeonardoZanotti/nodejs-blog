<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" alt="NodeJS">

# NodeJS Blog
Website with blog style made with NodeJS

## Requirements
Im using NodeJS v14.13.1 and Npm v6.14.8. Probably you will need the same version or higher to run this project. You can download both from the [NodeJs website](https://nodejs.org/en/). Im also using [MongoDB v3.6.3](https://www.mongodb.com/) as non relational database. You can access the [MongoDB website](https://docs.mongodb.com/manual/installation/) to download it, or, in Debian derivades linux, you can just do:
```bash
$ sudo apt install -y mongodb
```

## Installing the project
To install the project do the following:
```bash
$ git clone https://github.com/LeonardoZanotti/nodejs-blog.git

$ cd nodejs-blog

$ npm install       # install all dependencies of the project
```

## Running
To run the project you should have mongo running in paralel, so if it doesnt start with your machine you will need to run it with:
```bash
$ mongod
```

So, you can just run the project in another terminal tab with:
```bash
$ npm start
```

The project will run on `localhost:8000` by default, but you can change this by changing the **port** constant in **app.js** file.
 
## LeonardoZanotti