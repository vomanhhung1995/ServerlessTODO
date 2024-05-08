"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosAccess = void 0;
const AWS = require("aws-sdk");
const AWSXRay = require("aws-xray-sdk");
const XAWS = AWSXRay.captureAWS(AWS);
class TodosAccess {
    constructor(docClient = createDynamoDBClient(), todosTable = process.env.TODOS_TABLE || '') {
        this.docClient = docClient;
        this.todosTable = todosTable;
    }
    async getTodosForUser(userId) {
        const result = await this.docClient.query({
            TableName: this.todosTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise();
        return result.Items;
    }
    async createTodosForUser(Item) {
        await this.docClient.put({
            TableName: this.todosTable,
            Item: Item
        }).promise();
        return Item;
    }
    async updateTodo(todoId, userId, data) {
        await this.docClient.update({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: "set #name = :name, dueDate=:dueDate, done=:done",
            ExpressionAttributeValues: {
                ":name": data.name,
                ":dueDate": data.dueDate,
                ":done": data.done
            },
            ExpressionAttributeNames: {
                "#name": "name"
            },
            ReturnValues: "UPDATED_NEW"
        }).promise();
        return data;
    }
    async deleteImageTodo(todoId, userId) {
        return await this.docClient.update({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: "set attachmentUrl=:attachmentUrl",
            ExpressionAttributeValues: {
                ":attachmentUrl": '',
            },
            ReturnValues: "UPDATED_NEW"
        }).promise();
    }
    async deleteTodo(todoId, userId) {
        return await this.docClient.delete({
            TableName: this.todosTable,
            Key: {
                todoId: todoId,
                userId: userId
            }
        }).promise();
    }
}
exports.TodosAccess = TodosAccess;
function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        console.log("Creating a local DynamoDB instance");
        return new XAWS.DynamoDB.DocumentClient({
            region: "localhost",
            endpoint: "http://localhost:8000",
        });
    }
    return new XAWS.DynamoDB.DocumentClient();
}
//# sourceMappingURL=todosAccess.js.map