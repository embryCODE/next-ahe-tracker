import aws from 'aws-sdk'

const client = new aws.DynamoDB.DocumentClient({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  params: {
    TableName: process.env.TABLE_NAME,
  },
})

export default {
  get: (params: any) => client.get(params).promise(),
  put: (params: any) => client.put(params).promise(),
  query: (params: any) => client.query(params).promise(),
  update: (params: any) => client.update(params).promise(),
  delete: (params: any) => client.delete(params).promise(),
}
