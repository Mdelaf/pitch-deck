import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pitch-deck-uploader',
  templateUrl: './pitch-deck-uploader.component.html',
  styleUrls: ['./pitch-deck-uploader.component.scss']
})
export class PitchDeckUploaderComponent implements OnInit {

  fileInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
