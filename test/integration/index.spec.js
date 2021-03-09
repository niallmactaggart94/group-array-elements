const app = require('../../app/index');
const request = require('supertest');

describe("Group Elements API", () => {

    describe("Route: GET", () => {
        it('Should receive an error if no headers are passed in', async done => {
            const response = await request(app).get("/groupArrayElements").send();
            expect(response).toBeDefined();
            expect(response.status).toEqual(400)
            expect(response.body.error).toEqual('Mandatory Header Missing: List or number to be divided into has not been supplied');
            done();
        });

        it ("Should return an array chunked by 1 if the divider is greater than the length of the array", async done => {

            const expectedResponse = [[1], [2]];
            const response = await request(app).get("/groupArrayElements")
                .set('list', '1,2')
                .set('divider', 3)
                .send();

            expect(response).toBeDefined();
            expect(response.status).toEqual(200)
            expect(response.body.response).toEqual(expectedResponse);
            done();

        });

        it("Should ensure that the list is best divided when it only divides in to itself once", async done => {

            const expectedResponse = [[1], [2], [3], [4]];
            const response = await request(app).get("/groupArrayElements")
                .set('list', '1,2,3,4')
                .set('divider', 4)
                .send();

            expect(response).toBeDefined();
            expect(response.status).toEqual(200)
            expect(response.body.response).toEqual(expectedResponse);
            done();

        });

        it("Should ensure that the array is broken up properly when there is a remainder (1)", async done => {

            const expectedResponse = [[1,2], [3,4], [5]];
            const response = await request(app).get("/groupArrayElements")
                .set('list', '1,2,3,4,5')
                .set('divider', 3)
                .send();

            expect(response).toBeDefined();
            expect(response.status).toEqual(200)
            expect(response.body.response).toEqual(expectedResponse);
            done();

        });

        it("Should ensure that the array is broken up properly when there is a remainder (2)", async done => {

            const expectedResponse = [[1,2], [3], [4], [5]];
            const response = await request(app).get("/groupArrayElements")
                .set('list', '1,2,3,4,5')
                .set('divider', 4)
                .send();

            expect(response).toBeDefined();
            expect(response.status).toEqual(200)
            expect(response.body.response).toEqual(expectedResponse);
            done();

        });

        it("Should ensure that the array is broken up properly when there is a remainder (3)", async done => {

            const expectedResponse = [[1,2,3], [4,5,6], [7,8,9], [10,11,12], [13, 14]];
            const response = await request(app).get("/groupArrayElements")
                .set('list', '1,2,3,4,5,6,7,8,9,10,11,12,13,14')
                .set('divider', 5)
                .send();

            expect(response).toBeDefined();
            expect(response.status).toEqual(200)
            expect(response.body.response).toEqual(expectedResponse);
            done();

        });

        it("Should ensure that the array is broken up properly when it becomes divisible by itself through the process", async done => {

            const expectedResponse = [[1,2,3,4], [5,6,7], [8,9,10], [11,12,13], [14,15,16], [17,18,19]];
            const response = await request(app).get("/groupArrayElements")
                .set('list', '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19')
                .set('divider', 6)
                .send();

            expect(response).toBeDefined();
            expect(response.status).toEqual(200)
            expect(response.body.response).toEqual(expectedResponse);
            done();

        });

        it("Should return the array correctly seperated if it divides into N equally sized arrays", async done => {

            const expectedResponse = [[1,2,3], [4,5,6], [7,8,9]];
            const response = await request(app).get("/groupArrayElements")
                .set('list', '1,2,3,4,5,6,7,8,9')
                .set('divider', 3)
                .send();

            expect(response).toBeDefined();
            expect(response.status).toEqual(200)
            expect(response.body.response).toEqual(expectedResponse);
            done();

        });
    });

});