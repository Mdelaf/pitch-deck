export interface PitchDeck {
  name: string
  code: string
  url: string
}

export interface PitchDeckImage {
  pitchDeckCode: string
  number: number
  url: string
}

export interface StorageRepository {
  storePitchDeck(binaryFile: Buffer, name: string): Promise<PitchDeck>
  getPitchDeckList(): Promise<PitchDeck[]>

  storePitchDeckImage(pitchDeckCode: string, binaryImage: Buffer, imageNumber: number): Promise<PitchDeckImage>
  getPitchDeckImageList(pitchDeckCode: string): Promise<PitchDeckImage[]>
}
