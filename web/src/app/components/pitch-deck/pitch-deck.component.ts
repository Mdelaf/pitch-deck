import { Component } from '@angular/core';
import { PitchDeckReference } from 'src/app/services/pitch-deck.interfaces';

const weFunderPitchDeck = {
  name: 'WeFunder',
  code: 'sadas3',
  url: 'https://wefunder.com',
}

const cocaColaPitchDeck = {
  name: 'Coca cola',
  code: 'isn37j',
  url: 'https://wefunder.com',
}

const pepsiCoPitchDeck = {
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
  pitchDeckList: PitchDeckReference[] = [
    weFunderPitchDeck,
    cocaColaPitchDeck,
    pepsiCoPitchDeck,
  ];

  selectedPitchDeck: PitchDeckReference | undefined;
}
