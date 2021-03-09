const _ = require('lodash');

/**
 * @param list {String} comma delimited list of N numbers
 * @param N {Number} The number to divide the above list into
 * @description Function that applies the logic to break the array up
 * @returns {*} contents of the array to be returned to the user
 */
const groupElements = (list, N) => {

    list = list.split(',').map(Number);
    N = Number(N);

    const dividerGreaterThanList = N > list.length;
    const listDivisible = list.length % N === 0;

    if (dividerGreaterThanList || listDivisible) {
        return _.chunk(list, listDivisible ? list.length / N : 1);
    }

    let response = [];
    const arraySize = Math.ceil(list.length / N);

    for (let i = 0; i < N; i++) {
        const spacesLeft = N - response.length;

        if (spacesLeft === 1) {
            response.push(list);
            break;
        }

        if (list.length % spacesLeft === 0) {
            _.forEach(_.chunk(list, list.length / spacesLeft), (item) => response.push(item));
            break;
        }

        response.push(list.splice(0, arraySize));

    }

    return response;
};

/**
 * @param req
 * @param res
 * @description Function that will return a response if a list and divider has been passed in as request headers
 * @returns {*} Response to show either an array broken up into N, or an error if the required headers have not been provided
 */
const getData = (req, res) => {

    const list = req.headers.list;
    const N = req.headers.divider;

    if (!list || !N) {
        return res.status(400).send({
            error: "Mandatory Header Missing: List or number to be divided into has not been supplied"
        });
    }

    const response = groupElements(list, N);
    res.send({response});
};


module.exports = {
    getData,
    groupElements
};
