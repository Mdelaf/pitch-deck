import { Component } from '@angular/core';
import { concat } from 'rxjs';
import { toArray, finalize } from 'rxjs/operators';
import { PitchDeckReference } from 'src/app/services/pitch-deck.interfaces';
import { PitchDeckService } from 'src/app/services/pitch-deck.service';

@Component({
  selector: 'app-pitch-deck',
  templateUrl: './pitch-deck.component.html',
  styleUrls: ['./pitch-deck.component.scss']
})
export class PitchDeckComponent {
  pitchDeckList: PitchDeckReference[] = [];
  uploadingFile = false;

  selectedPitchDeck: PitchDeckReference | undefined;

  constructor(private pitchDeckService: PitchDeckService) {
    this.pitchDeckService.getPitchDeckList()
      .subscribe({
        next: pitchDeckList => this.pitchDeckList = pitchDeckList,
      });
  }

  onFileSelected(file: File) {
    this.uploadingFile = true;
    concat(
      this.pitchDeckService.uploadPitchDeck(file),
      this.pitchDeckService.getPitchDeckList(),      
    ).pipe(
      toArray(),
      finalize(() => this.uploadingFile = false),
    )
    .subscribe({
      next: ([newPitchDeck, pitchDeckList]) => {
        this.pitchDeckList = pitchDeckList as PitchDeckReference[];
        this.selectedPitchDeck = this.pitchDeckList.find(pd => pd.code === (newPitchDeck as PitchDeckReference).code);
      }
    })
  }
}
