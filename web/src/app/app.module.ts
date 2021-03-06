import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PitchDeckComponent } from './components/pitch-deck/pitch-deck.component';
import { PitchDeckListComponent } from './components/pitch-deck-list/pitch-deck-list.component';
import { PitchDeckUploaderComponent } from './components/pitch-deck-uploader/pitch-deck-uploader.component';
import { PitchDeckViewerComponent } from './components/pitch-deck-viewer/pitch-deck-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    PitchDeckComponent,
    PitchDeckListComponent,
    PitchDeckUploaderComponent,
    PitchDeckViewerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
