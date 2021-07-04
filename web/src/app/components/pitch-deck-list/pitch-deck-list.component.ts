import { Component, OnInit } from '@angular/core';

const weFunderPdf = {
  name: 'WeFunder',
  code: 'sadas3',
}

const cocaColaPdf = {
  name: 'Coca cola',
  code: 'isn37j',
}

const pepsiCoPdf = {
  name: 'Pepsi Co',
  code: 'a03jke',
}

@Component({
  selector: 'app-pitch-deck-list',
  templateUrl: './pitch-deck-list.component.html',
  styleUrls: ['./pitch-deck-list.component.scss']
})
export class PitchDeckListComponent implements OnInit {
  selectedPdf = cocaColaPdf;
  
  pdfOptions = [
    weFunderPdf,
    cocaColaPdf,
    pepsiCoPdf,  
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
