import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuoteResponse } from './domain/quote-response';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class QuotesService {
    constructor(private http: HttpClient) {}

    getQuote(): Observable<QuoteResponse> {
        return this.http
            .get<QuoteResponse>(`${environment.server}/api/v1/random?count=1`)
            .pipe(delay(450));
    }
}
