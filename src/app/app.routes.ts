import { Routes } from '@angular/router';
import { PracticeComponent } from './components/practice/practice.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CommingSoonComponent } from './components/comming-soon/comming-soon.component';
import { PaEnglishComponent } from './components/pa-english/pa-english.component';

export const pathUrl = {
  home: '',
  practices: 'practices',
  pa_english: 'pa-english',
  notFound: '404',
  commingSoon: 'comming-soon'
};

export const routes: Routes = [
  { path: pathUrl.home, component: PaEnglishComponent },
  { path: pathUrl.pa_english, component: PaEnglishComponent },
  { path: pathUrl.practices, component: PracticeComponent },
  { path: pathUrl.notFound, component: NotFoundComponent },
  { path: pathUrl.commingSoon, component: CommingSoonComponent },
  { path: '**', redirectTo: "/pa-english", pathMatch: 'full' }
];
