import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { RelatedWordsComponent } from './components/related-words/related-words.component';
import { CasesCountries } from './components/cases-countries-line/cases-countries-line';
const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'related-words', component: RelatedWordsComponent},
  {path: 'graphs', component: CasesCountries},
  {path: '', redirectTo: '/related-words', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
