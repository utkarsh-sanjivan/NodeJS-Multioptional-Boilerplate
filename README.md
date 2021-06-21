# Node JS Multioptional Boilerplate 
nodejs-multioptional-boilerplate

## 📖 Description
This is a boilerplate for NodeJS and Jest along with Supertest. This has been published to NPM and can be installed globally and used for creating instant boilerplates for NodeJS. It provides an option for selecting wether or not typescript is to be used. All you have to do is pass `--script` and then pass ```ts``` or ```typescript``` for chosing typescript or pass ```js``` or ```javascript``` for chosing javascript. You can also chose to create a directory and do the setup inside or just do the setup in the current directory. For that you can pass ```--folder``` and then the name of the directory if you wish to create a directory and do the setup inside.<br />

Once the command is executed it creates all the files that are required and installs the dependencies. The application created uses Winston for logging and Morgan for logging all the incoming requests. For testing Jest is used along with supertest. It uses ESLint for formatting the code and Prettier to beautify the code.


### 🚀 Getting Started
* First install the module globally `npm i -g nodejs-multioptional-boilerplate`.
* Then use command `create-node-base-app` to create the base setup for the app. It takes in one argument `--script=` where you can pass ```ts``` or ```typescript``` for chosing to build the app using Typescript or you can chose ```js``` or ```javascript``` to chose to build the app without Javascript. For Javascript, you can also ignore this argument as the default value for this argument is ```Javascript```.
* Once the script is complete, the files and directories will be inplace all you have to do is go ahead and start working on your app.
* The app thus created will have ```Winston``` for logging purpose, ```Morgan``` for logging incoming request, ```Jest``` and ```supertest``` for testing code, ```Eslint``` for formatting the code and ```Prettier``` for beautifying the code.
<br />
Example for script, <br />

```create-node-base-app --folder node-ts-example --script ts```

### 💾 Executing scripts
The script for both Javascript and Typescript is same,

* Run the server, ```npm run start```.
* Create a build, ```npm run build```.
* Run a Prettier check, ```npm run prettier:check```.
* Overwrite files with Prettier fix, ```npm run prettier:write```.
* Run Tests, ```npm run test```.
* Run Tests with coverage, ```npm run test:coverage```.
* Run Tests in watch mode, ```npm run test:watch```.
* Run Tests in watch mode with coverage, ```npm run test:watch:coverage```.

## 😎 Authors

Contributors names and contact info,<br />
Utkarsh Sanjivan - utkarsh.sannu@gmail.com

## 📋 Version History

* 1.0.2
    * Updated tests and folder structure.

* 1.0.1
    * Fixed the spawn missing import.

* 1.0.0
    * Initial Release