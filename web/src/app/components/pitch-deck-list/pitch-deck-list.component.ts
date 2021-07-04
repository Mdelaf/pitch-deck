import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PdfReference } from 'src/app/services/interfaces';

@Component({
  selector: 'app-pitch-deck-list',
  templateUrl: './pitch-deck-list.component.html',
  styleUrls: ['./pitch-deck-list.component.scss']
})
export class PitchDeckListComponent {
  @Input() pdfOptions: PdfReference[] = [];
  @Output() fileSelectedEvent = new EventEmitter<PdfReference>();
}
