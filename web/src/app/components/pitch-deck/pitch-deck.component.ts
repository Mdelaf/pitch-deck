import { Component } from '@angular/core';
import { PitchDeckReference } from 'src/app/services/pitch-deck.interfaces';
import { PitchDeckService } from 'src/app/services/pitch-deck.service';

@Component({
  selector: 'app-pitch-deck',
  templateUrl: './pitch-deck.component.html',
  styleUrls: ['./pitch-deck.component.scss']
})
export class PitchDeckComponent {
  pitchDeckList: PitchDeckReference[] = [];

  selectedPitchDeck: PitchDeckReference | undefined;

  constructor(private pitchDeckService: PitchDeckService) {
    this.pitchDeckService.getPitchDeckList()
      .subscribe({
        next: pitchDecks => this.pitchDeckList = pitchDecks,
      });
  }
}
