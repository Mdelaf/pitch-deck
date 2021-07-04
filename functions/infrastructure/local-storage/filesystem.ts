import fs from 'fs'
import { StorageRepository, PitchDeck, PitchDeckImage } from '../../domain/storage-repo'
import { generateRandomString } from '../utils'

const CODE_LENGTH = 6

export class LocalFilesystemStorage implements StorageRepository {
  private rootPath: string

  constructor(rootPath: string) {
    this.rootPath = rootPath
  }

  async storePitchDeck(binaryFile: Buffer, name: string): Promise<PitchDeck> {
    const code = generateRandomString(CODE_LENGTH / 2)
    const fullPath = `${this.rootPath}/pitchdecks/${code}-${name}`
    await fs.promises.mkdir(getPath(fullPath), { recursive: true })
    await fs.promises.writeFile(fullPath, binaryFile)
    const url = `file://${fullPath}`
    return { name, code, url }
  }
  
  async getPitchDeckList(): Promise<PitchDeck[]> {
    const pitchDecksPath = `${this.rootPath}/pitchdecks`
    const filenames = await fs.promises.readdir(pitchDecksPath)
    return filenames.map(filename => ({
      name: filename.slice(CODE_LENGTH + 2),
      code: filename.slice(0, CODE_LENGTH + 1),
      url: `file://${pitchDecksPath}/${filename}`,
    }))
  }

  async storePitchDeckImage(pitchDeckCode: string, binaryImage: Buffer, imageNumber: number): Promise<PitchDeckImage> {
    const fullPath = `${this.rootPath}/images/${pitchDeckCode}/${imageNumber}.png`
    await fs.promises.mkdir(getPath(fullPath), { recursive: true })
    await fs.promises.writeFile(fullPath, binaryImage)
    const url = `file://${fullPath}`
    return { pitchDeckCode, number: imageNumber, url }
  }
  
  async getPitchDeckImageList(pitchDeckCode: string): Promise<PitchDeckImage[]> {
    const imagesPath = `${this.rootPath}/${pitchDeckCode}`
    const filenames = await fs.promises.readdir(imagesPath)
    return filenames.map(filename => ({
      pitchDeckCode,
      number: Number(filename.split('.')[0]),
      url: `file://${imagesPath}/${filename}`,
    }))
  }
}

function getPath(path: string) {
  const folders = path.split('/').slice(0, -1)
  return folders.join('/')
}
