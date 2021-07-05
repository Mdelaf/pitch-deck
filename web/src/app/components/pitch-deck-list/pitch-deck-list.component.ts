import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PitchDeckReference } from 'src/app/services/pitch-deck.interfaces';

@Component({
  selector: 'app-pitch-deck-list',
  templateUrl: './pitch-deck-list.component.html',
  styleUrls: ['./pitch-deck-list.component.scss']
})
export class PitchDeckListComponent {
  @Input() pitchDeckOptions: PitchDeckReference[] = [];
  @Input() selectedPitchDeck: PitchDeckReference | undefined;
  @Output() selectedPitchDeckChange = new EventEmitter<PitchDeckReference | undefined>();
}
