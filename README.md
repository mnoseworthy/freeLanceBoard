# Free Lance Board
A DApp to faciliate free lance work and consumption of such work, utilising smart contracts to ensure both parties are fully protected unlike conventional sites where abuse is common.

# Setup Development Environment

## Install required software


Have node.js and npm installed.
### Install truffle & test RPC globally

```
npm install -g truffle // Version 3.0.5+ required.
npm install -g ethereumjs-testrpc
```

### Install MongoDb

Download and Install Mongodb:
- https://www.mongodb.com/download-center


## Clone git and install node modules


### Clone the repository 
```
git clone https://github.com/mnoseworthy/freeLanceBoard/
```

### Install node modules
```
npm install
cd rest_server
npm install
```



## Start Servers

### Start the mongo db server
```
mongod.exe --dbpath "C:\apath"
```
### Start the testrpc server
```
testrpc
```
### Start the webpack development server
```
npm run start
```
### Start the express development server
```
cd rest_server
npm run start
```



## Checklist
A fully-running and setup full-stack environment is running when:
- testrpc is running
- mongoDb is running
- rest server is running
- webpack development server is running


# Component/Contract testing

### Compile & Migrate contracts to testrpc // eth network
```
truffle compile
truffle migrate
```
### Jest
```
// Runs Jest for component tests.
npm run test

// Runs Truffle's test suite for smart contract tests.
truffle test
```

### Build Production
```
npm run build
```