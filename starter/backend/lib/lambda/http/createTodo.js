"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("source-map-support/register");
const middy = require("middy");
const middlewares_1 = require("middy/middlewares");
const uuid = require("uuid");
const utils_1 = require("../utils");
const todos_1 = require("../../businessLogic/todos");
exports.handler = middy(async (event) => {
    const newTodo = JSON.parse(event.body);
    newTodo.userId = (0, utils_1.getUserId)(event);
    newTodo.todoId = uuid.v4();
    try {
        const newTodos = await (0, todos_1.createTodosForUser)(newTodo);
        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                item: newTodos
            })
        };
    }
    catch (error) {
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            statusCode: 500,
            body: JSON.stringify({ Error: error })
        };
    }
});
exports.handler.use((0, middlewares_1.cors)({
    credentials: true
}));
//# sourceMappingURL=createTodo.js.map