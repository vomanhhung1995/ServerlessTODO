"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentUtils = void 0;
const AWS = require("aws-sdk");
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
class AttachmentUtils {
    constructor(docClient = new XAWS.DynamoDB.DocumentClient(), todosTable = process.env.TODOS_TABLE, s3 = new XAWS.S3({
        signatureVersion: 'v4'
    }), bucketName = process.env.ATTACHMENT_S3_BUCKET, urlExpiration = +process.env.SIGNED_URL_EXPIRATION) {
        this.docClient = docClient;
        this.todosTable = todosTable;
        this.s3 = s3;
        this.bucketName = bucketName;
        this.urlExpiration = urlExpiration;
    }
    async updateTodoAttachmentUrl(todoId, userId, attachmentUrl) {
        return await this.docClient
            .update({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: 'set attachmentUrl=:attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl': attachmentUrl
            },
            ReturnValues: 'UPDATED_NEW'
        })
            .promise();
    }
    async getUploadUrl(imageId) {
        return this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: imageId,
            Expires: this.urlExpiration
        });
    }
}
exports.AttachmentUtils = AttachmentUtils;
//# sourceMappingURL=attachmentUtils.js.map