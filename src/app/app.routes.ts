import { Routes } from '@angular/router';
import { PracticeComponent } from './components/practice/practice.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CommingSoonComponent } from './components/comming-soon/comming-soon.component';

export const pathUrl = {
  home: '',
  practices: 'practices',
  notFound: '404',
  commingSoon: 'comming-soon'
};

export const routes: Routes = [
  { path: pathUrl.home, component: PracticeComponent },
  { path: pathUrl.practices, component: PracticeComponent },
  { path: pathUrl.notFound, component: NotFoundComponent },
  { path: pathUrl.commingSoon, component: CommingSoonComponent },
  { path: '**', redirectTo: pathUrl.home, pathMatch: 'full' }
];
