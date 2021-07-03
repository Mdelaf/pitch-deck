
import Canvas from 'canvas'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf'
import { PDFPageProxy } from 'pdfjs-dist/types/display/api'

export async function pdfToImageArray(base64Pdf: string): Promise<string[]> {
  const pdfBinary = Buffer.from(base64Pdf, 'base64')
  const pdfObject = await getDocument({ data: pdfBinary }).promise

  const images: string[] = []

  let currentPage = 1
  while (currentPage <= pdfObject.numPages) {
    const pdfPage = await pdfObject.getPage(currentPage)
    const pageBinaryImage = await pdfPageToBinaryImage(pdfPage)
    console.log({ currentPage, pageBinaryImage })
    const imageUrl = await storeBinaryImage(pageBinaryImage)
    images.push(imageUrl)
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

async function storeBinaryImage(binaryImage: Buffer): Promise<string> {
  return 'https://wefunder-production.s3.amazonaws.com/2021/logo.svg'
}
