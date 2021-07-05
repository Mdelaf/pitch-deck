import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { PitchDeckReference, PitchDeckImageReference } from './pitch-deck.interfaces';
import { getBase64EncodedContent } from './utils'

@Injectable({
  providedIn: 'root'
})
export class PitchDeckService {

  constructor(
    private http: HttpClient,
  ) {}

  getPitchDeckList(): Observable<PitchDeckReference[]> {
    return this.http.get<PitchDeckReference[]>(`${environment.apiUrl}/pitchdeck-list`);
  }

  getPitchDeckImageList(pitchDeckCode: string): Observable<PitchDeckImageReference[]> {
    return this.http.get<PitchDeckImageReference[]>(`${environment.apiUrl}/pitchdeck-img-list?pitchDeckCode=${pitchDeckCode}`);
  }

  uploadPitchDeck(file: File): Observable<PitchDeckReference> {
    return from(getBase64EncodedContent(file)).pipe(
      mergeMap(base64content => {
        const body = {
          filename: file.name,
          filetype: file.type,
          base64content,
        }
        return this.http.post<PitchDeckReference>(`${environment.apiUrl}/upload-pitchdeck`, body);
      })
    )
  }
}
