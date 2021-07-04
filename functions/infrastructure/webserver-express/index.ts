import express from 'express'
import { LocalFilesystemStorage } from "../local-storage/filesystem"
import { uploadPitchDeck } from "../../usecases/upload-pitchdeck"
import { getPitchDeckList } from "../../usecases/get-pitchdeck-list"
import { getPitchDeckImageList } from "../../usecases/get-pitchdeck-img-list"

const PORT = 3100
const STATIC_PATH = '/public'
const STATIC_DIR = __dirname + '/public'
const STATIC_URL = `http://localhost:${PORT}${STATIC_PATH}`

const app = express()
const storageRepo = new LocalFilesystemStorage(STATIC_DIR, STATIC_URL)

app.use(STATIC_PATH, express.static(STATIC_DIR));
app.use(express.json({limit: '16mb'}))

app.post('/upload-pitchdeck', async (req, res) => {
  const pdName = req?.body?.filename
  const pdFileType = req?.body?.filetype
  const pdBase64Content = req?.body?.base64content

  if (!pdName || !pdFileType || !pdBase64Content) {
    res.status(400).send('missing arguments')
    return
  }

  try {
    const response = await uploadPitchDeck(storageRepo, pdName, pdFileType, pdBase64Content)
    res.send(response)
  } catch (e) {
    res.status(400).send(JSON.stringify(e))
  }
})

app.get('/pitchdeck-list', async (req, res) => {
  try {
    const response = await getPitchDeckList(storageRepo)
    res.send(response)
  } catch (e) {
    res.status(400).send(JSON.stringify(e))
  }
})

app.get('/pitchdeck-img-list', async (req, res) => {
  const pitchDeckCode = req?.query?.pitchDeckCode as string
  if (!pitchDeckCode) {
    res.status(400).send('missing arguments')
    return    
  }

  try {
    const response = await getPitchDeckImageList(storageRepo, pitchDeckCode)
    res.send(response)
  } catch (e) {
    res.status(400).send(JSON.stringify(e))
  }
})

app.listen(PORT, () => {
  console.log(`Express app listening at http://localhost:${PORT}`)
})