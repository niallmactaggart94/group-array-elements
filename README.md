# Twig Assessment API

A REST API built for the Twig assessment. This task was completed by Niall MacTaggart.

## Modules used
This project uses the following modules:

- **Development:**
    - Uses Express as its framework for NodeJS, to handle all routing
- **Testing:** 
    - Unit tests are written in Jest, making use of node-mocks-http to mock the request and response, providing full coverage. 
    - Code styling is checked via eslint 
    - Integration tests - Uses supertest to run e2e integration testing which will test a number of scenarios detailed below.


## Using the API
To use the api you will firstly need to run the following commands
```
npm install
npm run start
```
This will start the application on port 2020. You will then be able to call this using Postman **(SSL Certificate Verification needs set to OFF)** or cURL.

Example:

#### GET
Below is how to call the API with a comma delimited list, being divided by divider N. The below is the example detailed in the 
initial problem

```
curl --location --request GET 'https://localhost:2020/groupArrayElements' \
--header 'list: 1,2,3,4,5' \
--header 'divider: 3' -vk
```


## Testing
The following commands can be run to test the application
```
Code stying - npm run test:lint
Unit testing - npm run test:unit
Integration testing - npm run test:integration
```
### Approach
This was done using Test Driven Development, and the logic I opted for will firstly check if N is greater than the length of the list or if it is perfectly divisible.
In this case you would be able to utilise Lodash's chunk method to avoid looping through the object. Otherwise it is safe to assume that the modulo of List/N will not be zero.

The next step uses Math.ceil to round up, and will start to chunk the array into these lengths, however it will check the following on each iteration:

- Last iteration - if so then the final array is the remaining contents of the list
- Perfectly divisible - if so then it can use the Lodash chunk method mentioned above

Otherwise, it will use the splice method to remove the first X characters from the array and push it into the response list, where X is the outcome of the Math.ceil command mentioned above.

### Scenarios Tested
- No headers passed in - this will result in a 400 error being returned.
- N is greater than the length of the list i.e. wanting a list of length 2 to be split into 3 arrays - this will return the list separated into arrays of length 1
- List is the same length as N - Return array of length N, each an array of length of 1
- Remainder - when the list is not perfectly divisible
- Remainder instance where list becomes divisible i.e. 19/6 would start breaking into arrays of length 4, but after 1 iteration, would have 15 numbers left, with 5 spaces to fill - This would result in 5 arrays of length 3.
- List perfectly divisible by N

## Further improvements
- **CI/CD** - An improvement would be to add the project to a Gitlab project, which would run the relevant assurance steps
  as part of its pipeline i.e. Lint/Unit/Integration/Audit testing. This could then publish to AWS to be hosted.

- **Different approach** - This could have been done differently, either by hosting this within AWS, and making it serverless i.e. using API Gateway and Lambda, this would
  also give the option of scaling/authenticating via cognito. It could also have been made as a SwaggerJS project, which would have been easier to handle headers, ensuring that
  mandatory ones are supplied and that it matches what is expected (potentially via a pattern/regex)
  
