import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Directive({
  selector: '[appTranslate]'
})
export class TranslateDirective {
  @Input('translation') key: string;
  value: any;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    // récupération de la langue
    this.value = this.i18NextService.getDataByLanguage(this.i18NextService.language);
    this.elementRef.nativeElement.innerHTML = this.value['translation'][this.key];
  }

}
