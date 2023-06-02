import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConstructorsComponent } from './components/constructors/constructors.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PollsComponent } from './components/polls/polls.component';
import { RacesComponent } from './components/races/races.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { TranslateDirective } from './directives/translate.directive';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService, defaultInterpolationFormat } from 'angular-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '../assets/locales/en.translation.json';
import translationFR from '../assets/locales/fr.translation.json';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// gestion des langues
export function appInit(i18next: ITranslationService) {
  return () => i18next
    .use<any>(LanguageDetector)
    .init({
      supportedLngs: ['en'],
      fallbackLng: 'en',
      debug: false,
      returnEmptyString: false,
      saveMissing: true,
      resources: {
        en: { translation: translationEN },
        fr: { translation: translationFR }
      },
      ns: 'translation',
      interpolation : { format: I18NextModule.interpolationFormat(defaultInterpolationFormat) }
    })
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS = [
{
  provide: APP_INITIALIZER,
  useFactory: appInit,
  deps: [I18NEXT_SERVICE],
  multi: true
},
{
  provide: LOCALE_ID,
  deps: [I18NEXT_SERVICE],
  useFactory: localeIdFactory
}];

export const appRouteList: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'polls', component: PollsComponent },
  { path: 'polls/:round', component: PollsComponent, canActivate: [AuthGuardService] },
  { path: 'drivers', component: DriversComponent },
  { path: 'constructors', component: ConstructorsComponent },
  { path: 'races', component: RacesComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo:'' }
]

@NgModule({
  declarations: [
    AppComponent,
    ConstructorsComponent,
    DriversComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    PollsComponent,
    RacesComponent,
    RegisterComponent,
    SigninComponent,
    TranslateDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouteList),
    HttpClientModule,
    I18NextModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    I18N_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
