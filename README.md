# Free Lance Board
A DApp to faciliate free lance work and consumption of such work, utilising smart contracts to ensure both parties are fully protected unlike conventional sites where abuse is common.

# Setup Development Environment

Install truffle & test RPC
```
npm install -g truffle // Version 3.0.5+ required.
npm install ethereumjs-testrpc
```

Download Box
```
truffle unbox react-uport
```

Start testRPC
```
node_modules/.bin/testrpc
```

Compile & Migrate contracts
```
truffle compile
truffle migrate
```

Run webpack for front-end hot reloading
```
npm run start
```

Component/Contract testing
```
// Runs Jest for component tests.
npm run test

// Runs Truffle's test suite for smart contract tests.
truffle test
```

Build Production
```
npm run build
```