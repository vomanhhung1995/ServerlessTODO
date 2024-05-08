"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("source-map-support/register");
const middy = require("middy");
const middlewares_1 = require("middy/middlewares");
const todos_1 = require("../../businessLogic/todos");
const utils_1 = require("../utils");
const uuid = require("uuid");
exports.handler = middy(async (event) => {
    const todoId = event.pathParameters.todoId;
    const userId = (0, utils_1.getUserId)(event);
    const imageId = uuid.v4();
    const bucketName = process.env.ATTACHMENT_S3_BUCKET;
    //Generate presigned url
    const uploadUrl = await (0, todos_1.getUploadUrl)(imageId);
    //Generate attachmentUrl
    const attachmentUrl = `https://${bucketName}.s3.amazonaws.com/${imageId}`;
    await (0, todos_1.createAttachmentPresignedUrl)(todoId, userId, attachmentUrl);
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            uploadUrl: uploadUrl
        })
    };
});
exports.handler
    .use((0, middlewares_1.httpErrorHandler)())
    .use((0, middlewares_1.cors)({
    credentials: true
}));
//# sourceMappingURL=generateUploadUrl.js.map