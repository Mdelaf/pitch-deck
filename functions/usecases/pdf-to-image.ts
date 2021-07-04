
import Canvas from 'canvas'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf'
import { PDFPageProxy } from 'pdfjs-dist/types/display/api'
import { PDFStorageRepository } from '../domain/storage-repo'

export async function pdfToImageArray(storageRepo: PDFStorageRepository, pdfName: string, base64Pdf: string): Promise<string[]> {
  const pdfBinary = Buffer.from(base64Pdf, 'base64')
  const pdfObject = await getDocument({ data: pdfBinary }).promise
  const pdfReference = await storageRepo.storePDF(pdfBinary, pdfName)

  const images: string[] = []

  let currentPage = 1
  while (currentPage <= pdfObject.numPages) {
    const pdfPage = await pdfObject.getPage(currentPage)
    const pageBinaryImage = await pdfPageToBinaryImage(pdfPage)
    const imageReference = await storageRepo.storePDFImage(pdfReference.code, pageBinaryImage, currentPage)
    images.push(imageReference.url)
    currentPage += 1
  }

  return images
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
