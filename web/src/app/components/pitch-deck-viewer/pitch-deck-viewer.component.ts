import { Component, Input } from '@angular/core';
import { PitchDeckReference } from 'src/app/services/pitch-deck.interfaces';

@Component({
  selector: 'app-pitch-deck-viewer',
  templateUrl: './pitch-deck-viewer.component.html',
  styleUrls: ['./pitch-deck-viewer.component.scss']
})
export class PitchDeckViewerComponent {
  @Input() pitchDeck: PitchDeckReference | undefined;
}
