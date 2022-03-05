import { Component, HostBinding, OnInit, ElementRef } from '@angular/core';
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

    constructor(
        private quoteService: QuotesService,
        private elementRef: ElementRef
    ) {}

    ngOnInit(): void {
        this.fetchQuote$
            .pipe(switchMap(() => this.quoteService.getQuote()))
            .subscribe({
                next: (quote) => {
                    this.isLoading = !this.isLoading;
                    this.quote = quote.quotes[0];
                    this.color = this.generateDarkColor();
                    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
                        this.color;
                },
                error: (error) => {
                    this.isLoading = !this.isLoading;
                    this.errorMsg = 'Unable to fetch quote!';
                    this.color = this.generateDarkColor();
                    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
                        this.color;
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
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    }
}
