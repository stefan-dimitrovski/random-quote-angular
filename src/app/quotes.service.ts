import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from './domain/quote';
import { delay, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class QuotesService {
    constructor(private http: HttpClient) {}

    getQuote(): Observable<Quote> {
        return this.http.get<Quote>('/api/quotes').pipe(delay(300));
    }
}
