## Description

Test for Nexton: Simple calculator using Nestjs as a nodeJs framework.

## Installation

```bash

$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

```

## Using the app

You can use for example postman to make a request to the only endpoint in this app:
http://localhost:3000/calculator

You need to send a body parameter with the key "expression", is a required field.

Note: You can also use swagger to make the request using the the link in the "Doc" section in this readme file.

## Test

```bash
# unit tests
$ yarn test
```

Note: You can change the data for testing in src/TestData/calculatorData.json file.

## Doc

You can enter in swagger using this link: 
http://localhost:3000/api

## License

Nest is [MIT licensed](LICENSE).
