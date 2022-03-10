import { Component, HostBinding, OnInit } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { Quote } from '../domain/quote';
import { QuotesService } from '../quotes.service';

@Component({
    selector: 'app-quote-box',
    templateUrl: './quote-box.component.html',
    styleUrls: ['./quote-box.component.css'],
})
export class QuoteBoxComponent implements OnInit {
    quote: Quote | null = null;
    fetchQuote$ = new Subject<void>();
    isLoading = true;
    errorMsg: string | null = null;

    @HostBinding('style.--random-color') color: string | null = null;

    constructor(private quoteService: QuotesService) {}

    ngOnInit(): void {
        this.fetchQuote$
            .pipe(switchMap(() => this.quoteService.getQuote()))
            .subscribe({
                next: (quote) => {
                    this.isLoading = !this.isLoading;
                    this.quote = quote.quotes[0];
                    this.color = this.generateDarkColor();
                },
                error: (error) => {
                    this.isLoading = !this.isLoading;
                    this.errorMsg = 'Unable to fetch quote!';
                    this.color = this.generateDarkColor();
                },
            });
        this.fetchQuote$.next();
    }

    newQuote() {
        this.isLoading = !this.isLoading;
        this.quote = null;
        this.fetchQuote$.next();
    }

    generateDarkColor() {
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    }
}
