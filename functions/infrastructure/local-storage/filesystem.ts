import fs from 'fs'
import { StorageRepository, PitchDeck, PitchDeckImage } from '../../repositories/storage-repo'
import { generateRandomString } from '../utils'

const CODE_LENGTH = 6
const PITCHDECKS_FOLDER = 'pitchdecks'
const IMAGES_FOLDER = 'images'
const IMAGES_EXTENSION = 'png'

export class LocalFilesystemStorage implements StorageRepository {
  private storageDir: string
  private baseUrl: string

  constructor(storageDir: string, baseUrl: string) {
    this.storageDir = storageDir
    this.baseUrl = baseUrl
  }

  async storePitchDeck(binaryFile: Buffer, name: string): Promise<PitchDeck> {
    const code = generateRandomString(CODE_LENGTH / 2)
    const filepath = `${PITCHDECKS_FOLDER}/${code}-${name}`
    const absoluteFilePath = `${this.storageDir}/${filepath}`
    await fs.promises.mkdir(getPath(absoluteFilePath), { recursive: true })
    await fs.promises.writeFile(absoluteFilePath, binaryFile)
    const url = `${this.baseUrl}/${filepath}`
    return { name, code, url }
  }
  
  async getPitchDeckList(): Promise<PitchDeck[]> {
    const absolutePitchDecksPath = `${this.storageDir}/${PITCHDECKS_FOLDER}`
    const filenames = await fs.promises.readdir(absolutePitchDecksPath)
    return filenames
      .filter(filename => !filename.startsWith('.'))
      .map(filename => ({
        name: filename.slice(CODE_LENGTH + 1),
        code: filename.slice(0, CODE_LENGTH),
        url: `${this.baseUrl}/${PITCHDECKS_FOLDER}/${filename}`,
      }))
  }

  async storePitchDeckImage(pitchDeckCode: string, binaryImage: Buffer, imageNumber: number): Promise<PitchDeckImage> {
    const filepath = `${IMAGES_FOLDER}/${pitchDeckCode}/${imageNumber}.${IMAGES_EXTENSION}`
    const absoluteFilePath = `${this.storageDir}/${filepath}`
    await fs.promises.mkdir(getPath(absoluteFilePath), { recursive: true })
    await fs.promises.writeFile(absoluteFilePath, binaryImage)
    const url = `${this.baseUrl}/${filepath}`
    return { pitchDeckCode, number: imageNumber, url }
  }
  
  async getPitchDeckImageList(pitchDeckCode: string): Promise<PitchDeckImage[]> {
    const imagesPath = `${IMAGES_FOLDER}/${pitchDeckCode}`
    const absoluteImagesPath = `${this.storageDir}/${imagesPath}`
    const filenames = await fs.promises.readdir(absoluteImagesPath)
    return filenames
      .filter(filename => !filename.startsWith('.'))
      .map(filename => ({
        pitchDeckCode,
        number: Number(filename.split('.')[0]),
        url: `${this.baseUrl}/${imagesPath}/${filename}`,
      }))
  }
}

function getPath(path: string) {
  const folders = path.split('/').slice(0, -1)
  return folders.join('/')
}
