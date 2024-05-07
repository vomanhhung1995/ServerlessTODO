import * as AWS from 'aws-sdk'

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

export class AttachmentUtils {
  constructor(
    private readonly docClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly s3 = new XAWS.S3({
      signatureVersion: 'v4'
    }),
    private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
    private readonly urlExpiration: number = +process.env.SIGNED_URL_EXPIRATION
  ) {}

  async updateTodoAttachmentUrl(
    todoId: String,
    userId: String,
    attachmentUrl: String
  ) {
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
      .promise()
  }

  async getUploadUrl(imageId: String) {
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: imageId,
      Expires: this.urlExpiration
    })
  }
}
