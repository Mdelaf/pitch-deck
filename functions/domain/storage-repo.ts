export interface StoredPDF {
  name: string
  code: string
  url: string
}

export interface StoredPDFImage {
  pdfCode: string
  number: number
  url: string
}

export interface PDFStorageRepository {
  storePDF(pdfBinary: Buffer, name: string): Promise<StoredPDF>
  getPDFList(): Promise<StoredPDF[]>

  storePDFImage(pdfCode: string, imageBinary: Buffer, imageNumber: number): Promise<StoredPDFImage>
  getPDFImageList(pdfCode: string): Promise<StoredPDFImage[]>
}
