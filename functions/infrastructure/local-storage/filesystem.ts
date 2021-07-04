import fs from 'fs'
import { PDFStorageRepository, StoredPDF, StoredPDFImage } from '../../domain/storage-repo'
import { generateRandomString } from '../utils'

const CODE_LENGTH = 6

export class LocalPDFStorage implements PDFStorageRepository {
  private rootPath: string

  constructor(rootPath: string) {
    this.rootPath = rootPath
  }

  async storePDF(pdfBinary: Buffer, name: string): Promise<StoredPDF> {
    const code = generateRandomString(CODE_LENGTH / 2)
    const fullPath = `${this.rootPath}/pdfs/${code}-${name}`
    await fs.promises.mkdir(getPath(fullPath), { recursive: true })
    await fs.promises.writeFile(fullPath, pdfBinary)
    const url = `file://${fullPath}`
    return { name, code, url }
  }
  
  async getPDFList(): Promise<StoredPDF[]> {
    const pdfsPath = `${this.rootPath}/pdfs`
    const filenames = await fs.promises.readdir(pdfsPath)
    return filenames.map(filename => ({
      name: filename.slice(CODE_LENGTH + 2),
      code: filename.slice(0, CODE_LENGTH + 1),
      url: `file://${pdfsPath}/${filename}`,
    }))
  }

  async storePDFImage(pdfCode: string, imageBinary: Buffer, imageNumber: number): Promise<StoredPDFImage> {
    const fullPath = `${this.rootPath}/images/${pdfCode}/${imageNumber}.png`
    await fs.promises.mkdir(getPath(fullPath), { recursive: true })
    await fs.promises.writeFile(fullPath, imageBinary)
    const url = `file://${fullPath}`
    return { pdfCode, number: imageNumber, url }
  }
  
  async getPDFImageList(pdfCode: string): Promise<StoredPDFImage[]> {
    const imagesPath = `${this.rootPath}/${pdfCode}`
    const filenames = await fs.promises.readdir(imagesPath)
    return filenames.map(filename => ({
      pdfCode,
      number: Number(filename.split('.')[0]),
      url: `file://${imagesPath}/${filename}`,
    }))
  }
}

function getPath(path: string) {
  const folders = path.split('/').slice(0, -1)
  return folders.join('/')
}
