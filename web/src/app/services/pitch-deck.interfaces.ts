export interface PitchDeckReference {
  name: string;
  code: string;
  url: string;
  images?: PitchDeckImageReference[];
}

export interface PitchDeckImageReference {
  pitchDeckCode: string
  number: number
  url: string
}
