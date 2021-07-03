import { Handler, Context, Callback } from 'aws-lambda'
import { pdfToImageArray } from '../../usecases/pdf-to-image'


export async function pdfToImageArrayHandler(event: any, context: Context, callback: Callback) {
  const body = parseBody(event)
  const base64Pdf = body?.base64Pdf

  if (!base64Pdf) {
    callback(undefined, { statusCode: 400, body: 'invalid arguments' })
  }

  try {
    const response = await pdfToImageArray(base64Pdf)
    callback(undefined, { statusCode: 200, body: JSON.stringify(response) })
  } catch (e) {
    callback(undefined, { statusCode: 400, body: JSON.stringify(e) })
  }
}

function parseBody(event: any) {
  try {
    return JSON.parse(event.body)
  } catch {
    return
  }
}
