"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("source-map-support/register");
const middy = require("middy");
const middlewares_1 = require("middy/middlewares");
const todos_1 = require("../../businessLogic/todos");
const utils_1 = require("../utils");
exports.handler = middy(async (event) => {
    const todoId = event.pathParameters.todoId;
    const userId = (0, utils_1.getUserId)(event);
    try {
        await (0, todos_1.deleteTodosForUser)(todoId, userId);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: ''
        };
    }
    catch (err) {
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            statusCode: 500,
            body: JSON.stringify({ Error: err })
        };
    }
});
exports.handler.use((0, middlewares_1.httpErrorHandler)()).use((0, middlewares_1.cors)({
    credentials: true
}));
//# sourceMappingURL=deleteTodo.js.map