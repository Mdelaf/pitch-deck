import { Handler, Context, Callback } from 'aws-lambda';
import { pdfToImageArray } from './use-cases/pdf-to-image-array'

export const pdfToImageArrayHandler: Handler = (event: any, context: Context, callback: Callback) => {
  // const base64Pdf = event && event.queryStringParameters && event.queryStringParameters.name;
  const base64Pdf = 'saddsdasd'
  const response = pdfToImageArray(base64Pdf)
  callback(undefined, { statusCode: 200, body: JSON.stringify(response) })
}
