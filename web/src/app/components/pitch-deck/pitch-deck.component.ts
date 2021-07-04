import { Component } from '@angular/core';
import { PdfReference } from 'src/app/services/interfaces';

const weFunderPdf = {
  name: 'WeFunder',
  code: 'sadas3',
  url: 'https://wefunder.com',
}

const cocaColaPdf = {
  name: 'Coca cola',
  code: 'isn37j',
  url: 'https://wefunder.com',
}

const pepsiCoPdf = {
  name: 'Pepsi Co',
  code: 'a03jke',
  url: 'https://wefunder.com',
}

@Component({
  selector: 'app-pitch-deck',
  templateUrl: './pitch-deck.component.html',
  styleUrls: ['./pitch-deck.component.scss']
})
export class PitchDeckComponent {
  pdfList: PdfReference[] = [
    weFunderPdf,
    cocaColaPdf,
    pepsiCoPdf,
  ];

  selectedPdf: PdfReference | undefined;
}
