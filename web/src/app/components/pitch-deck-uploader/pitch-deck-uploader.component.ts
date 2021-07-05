import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pitch-deck-uploader',
  templateUrl: './pitch-deck-uploader.component.html',
  styleUrls: ['./pitch-deck-uploader.component.scss']
})
export class PitchDeckUploaderComponent {
  @Input() uploadingFile = false;
  @Output() fileSelected = new EventEmitter<File>();

  fileInputChange(event: any) {
    const selectedFile = event.target.files[0];
    this.fileSelected.emit(selectedFile);
  }
}
