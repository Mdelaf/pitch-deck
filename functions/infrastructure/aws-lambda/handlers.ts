import { Context, Callback } from 'aws-lambda'
import { pdfToImageArray } from '../../usecases/pdf-to-image'
import { LocalPDFStorage } from '../local-storage/filesystem'


export async function pdfToImageArrayHandler(event: any, context: Context, callback: Callback) {
  const body = parseBody(event)
  const pdfName = body?.filename
  const base64Pdf = body?.base64content

  if (!base64Pdf || !pdfName) {
    callback(undefined, { statusCode: 400, body: 'invalid arguments' })
  }

  try {
    const localStorageRepo = new LocalPDFStorage('./local-bucket')
    const response = await pdfToImageArray(localStorageRepo, pdfName, base64Pdf)
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
