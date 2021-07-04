import { Context, Callback } from 'aws-lambda'
import { uploadPitchDeck } from '../../usecases/upload-pitchdeck'
import { getPitchDeckList } from '../../usecases/get-pitchdeck-list'
import { getPitchDeckImageList } from '../../usecases/get-pitchdeck-img-list'
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
    const localStorageRepo = new LocalFilesystemStorage('local-bucket')
    const response = await uploadPitchDeck(localStorageRepo, pdName, pdFileType, pdBase64Content)
    callback(undefined, { statusCode: 200, body: JSON.stringify(response) })
  } catch (e) {
    // TODO: improve error handling
    callback(undefined, { statusCode: 400, body: JSON.stringify(e) })
  }
}

export async function getPitchDeckListHandler(event: any, context: Context, callback: Callback) {
  try {
    const localStorageRepo = new LocalFilesystemStorage('local-bucket')
    const response = await getPitchDeckList(localStorageRepo)
    callback(undefined, { statusCode: 200, body: JSON.stringify(response) })
  } catch (e) {
    // TODO: improve error handling
    callback(undefined, { statusCode: 400, body: JSON.stringify(e) })
  }
}

export async function getPitchDeckImageListHandler(event: any, context: Context, callback: Callback) {
  const pitchDeckCode = event && event.queryStringParameters && event.queryStringParameters.pitchDeckCode
  if (!pitchDeckCode) {
    callback(undefined, { statusCode: 400, body: 'missing arguments' })
  }

  try {
    const localStorageRepo = new LocalFilesystemStorage('local-bucket')
    const response = await getPitchDeckImageList(localStorageRepo, pitchDeckCode)
    callback(undefined, { statusCode: 200, body: JSON.stringify(response) })
  } catch (e) {
    // TODO: improve error handling
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
