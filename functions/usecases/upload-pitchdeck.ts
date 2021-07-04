import Canvas from 'canvas'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf'
import { PDFPageProxy } from 'pdfjs-dist/types/display/api'
import { StorageRepository, PitchDeck } from '../repositories/storage-repo'

export async function uploadPitchDeck(storageRepo: StorageRepository, pdName: string, pdFileType: string, pdBase64Content: string): Promise<PitchDeck> {
  // TODO: improve error handling
  const pdBinary = Buffer.from(pdBase64Content, 'base64')
  const pdReference = await storageRepo.storePitchDeck(pdBinary, pdName)
  
  if (pdFileType.includes('pdf')) {
    await storePDFImages(storageRepo, pdReference.code, pdBinary)
  }

  return pdReference
}

async function storePDFImages(storageRepo: StorageRepository, pdCode: string, pdfBinary: Buffer) {
  const pdfObject = await getDocument({ data: pdfBinary }).promise
  let currentPage = 1
  while (currentPage <= pdfObject.numPages) {
    const pdfPage = await pdfObject.getPage(currentPage)
    const pageBinaryImage = await pdfPageToBinaryImage(pdfPage)
    await storageRepo.storePitchDeckImage(pdCode, pageBinaryImage, currentPage)
    currentPage += 1
  }
}

async function pdfPageToBinaryImage(pdfPage: PDFPageProxy): Promise<Buffer> {
  const canvas = await renderPageInCanvas(pdfPage)
  const canvasBinaryImage = canvas.toBuffer()
  return canvasBinaryImage
}

async function renderPageInCanvas(pdfPage: PDFPageProxy): Promise<Canvas.Canvas> {
  const viewport = pdfPage.getViewport({ scale: 1.0 })
  const canvas = Canvas.createCanvas(viewport.width, viewport.height)
  const canvasContext = canvas.getContext('2d')
  await pdfPage.render({ canvasContext, viewport }).promise
  return canvas
}
