import { Context, Callback } from 'aws-lambda'
import { uploadPitchDeck } from '../../usecases/upload-pitchdeck'
import { getPitchDeckList } from '../../usecases/get-pitchdeck-list'
import { getPitchDeckImageList } from '../../usecases/get-pitchdeck-img-list'

export async function uploadPitchDeckHandler(event: any, context: Context, callback: Callback) {
  const body = parseBody(event)
  const pdName = body?.filename
  const pdFileType = body?.filetype
  const pdBase64Content = body?.base64content

  if (!pdName || !pdFileType || !pdBase64Content) {
    callback(undefined, { statusCode: 400, body: 'missing arguments' })
  }

  try {
    const storageRepo = undefined
    const response = await uploadPitchDeck(storageRepo, pdName, pdFileType, pdBase64Content)
    callback(undefined, { statusCode: 200, body: JSON.stringify(response) })
  } catch (e) {
    callback(undefined, { statusCode: 400, body: JSON.stringify(e) })
  }
}

export async function getPitchDeckListHandler(event: any, context: Context, callback: Callback) {
  try {
    const storageRepo = undefined
    const response = await getPitchDeckList(storageRepo)
    callback(undefined, { statusCode: 200, body: JSON.stringify(response) })
  } catch (e) {
    callback(undefined, { statusCode: 400, body: JSON.stringify(e) })
  }
}

export async function getPitchDeckImageListHandler(event: any, context: Context, callback: Callback) {
  const pitchDeckCode = event?.queryStringParameters?.pitchDeckCode
  if (!pitchDeckCode) {
    callback(undefined, { statusCode: 400, body: 'missing arguments' })
  }

  try {
    const storageRepo = undefined
    const response = await getPitchDeckImageList(storageRepo, pitchDeckCode)
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
