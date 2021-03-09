"use strict";

const httpMocks = require("node-mocks-http");
const ctrl = require("../../../app/controllers/groupArrayElements/groupArrayElements.controller");
let req, res;

beforeEach(() => {
    req = httpMocks.createRequest({
        params: {},
        body: {},
        headers: {
            list: '',
            divider: ''
        }
    });

    res = httpMocks.createResponse();

    spyOn(res, "send");

});

afterEach(() => {
    jest.clearAllMocks();
});

describe("Controller: groupArrayElements", function () {

    describe("Function: groupElements", () => {

        it("Should handle when an empty list is passed in - should return an empty array", () => {

            //Arrange
            const list = '';
            const divider = 0;
            const expectedResponse = [];

            //Act
            const response = ctrl.groupElements(list, divider);

            //Assert
            expect(response.length).toEqual(divider);
            expect(response).toEqual(expectedResponse);

        });

        it ("Should return an array chunked by 1 if the divider is greater than the length of the array", () => {

            //Arrange
            const list = '1,2';
            const divider = 3;
            const expectedResponse = [[1], [2]];

            //Act
            const response = ctrl.groupElements(list, divider);

            //Assert
            expect(response.length).toEqual(2);
            expect(response).toEqual(expectedResponse);
        });

        it("Should ensure that the list is best divided when it only divides in to itself once", () => {

            //Arrange
            const list = '1,2,3,4';
            const divider = 4;
            const expectedResponse = [[1], [2], [3], [4]];

            //Act
            const response = ctrl.groupElements(list, divider);

            //Assert
            expect(response.length).toEqual(divider);
            expect(response).toEqual(expectedResponse);

        });

        it("Should ensure that the array is broken up properly when there is a remainder (1)", () => {

            //Arrange
            const list = '1,2,3,4,5';
            const divider = 3;
            const expectedResponse = [[1,2], [3,4], [5]];

            //Act
            const response = ctrl.groupElements(list, divider);

            //Assert
            expect(response.length).toEqual(divider);
            expect(response).toEqual(expectedResponse);

        });

        it("Should ensure that the array is broken up properly when there is a remainder (2)", () => {

            //Arrange
            const list = '1,2,3,4,5';
            const divider = 4;
            const expectedResponse = [[1,2], [3], [4], [5]];

            //Act
            const response = ctrl.groupElements(list, divider);

            //Assert
            expect(response.length).toEqual(divider);
            expect(response).toEqual(expectedResponse);

        });

        it("Should ensure that the array is broken up properly when there is a remainder (3)", () => {

            //Arrange
            const list = '1,2,3,4,5,6,7,8,9,10,11,12,13,14';
            const divider = 5;
            const expectedResponse = [[1,2,3], [4,5,6], [7,8,9], [10,11,12], [13, 14]];

            //Act
            const response = ctrl.groupElements(list, divider);

            //Assert
            expect(response.length).toEqual(divider);
            expect(response).toEqual(expectedResponse);
        });

        it("Should ensure that the array is broken up properly when it becomes divisible by itself through the process", () => {

            //Arrange
            const list = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19';
            const divider = 6;
            const expectedResponse = [[1,2,3,4], [5,6,7], [8,9,10], [11,12,13], [14,15,16], [17,18,19]];

            //Act
            const response = ctrl.groupElements(list, divider);

            //Assert
            expect(response.length).toEqual(divider);
            expect(response).toEqual(expectedResponse);

        });

        it("Should return the array correctly seperated if it divides into N equally sized arrays", () => {

            //Arrange
            const list = '1,2,3,4,5,6,7,8,9';
            const divider = 3;
            const expectedResponse = [[1,2,3], [4,5,6], [7,8,9]];

            //Act
            const response = ctrl.groupElements(list, divider);

            //Assert
            expect(response.length).toEqual(divider);
            expect(response).toEqual(expectedResponse);
        });



    });

    describe("Function: getData", () => {

        it("Should send an error back if there are missing headers", () => {

            //Arrange

            //Act
            ctrl.getData(req, res);

            //Assert
            expect(res._getStatusCode()).toEqual(400);
            expect(res.send).toHaveBeenCalledWith({
                error: "Mandatory Header Missing: List or number to be divided into has not been supplied"
            });
        });

        it("Should send the response it gets back from the group elements function if the headers are present", () => {

            //Arrange
            req.headers.divider = 4;
            req.headers.list = "1,2,3,4";
            const response = [[1], [2], [3], [4]];

            //Act
            ctrl.getData(req, res);

            //Assert
            expect(res.send).toHaveBeenCalledWith({response});
            expect(res._getStatusCode()).toEqual(200);
        });
    });



});
