import { Context, Callback } from 'aws-lambda'
import { uploadPitchDeck } from '../../usecases/upload-pitchdeck'
import { LocalFilesystemStorage } from '../local-storage/filesystem'


export async function uploadPitchDeckHandler(event: any, context: Context, callback: Callback) {
  const body = parseBody(event)
  const pdName = body?.filename
  const pdFileType = body?.filetype
  const pdBase64Content = body?.base64content

  if (!pdName || !pdFileType || !pdBase64Content) {
    callback(undefined, { statusCode: 400, body: 'missing arguments' })
  }

  try {
    const localStorageRepo = new LocalFilesystemStorage('./local-bucket')
    const response = await uploadPitchDeck(localStorageRepo, pdName, pdFileType, pdBase64Content)
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
