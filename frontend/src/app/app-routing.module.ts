import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { RelatedWordsComponent } from './components/related-words/related-words.component';
import { GraphsContainerComponent } from './components/graphs-container/graphs-container.component';
const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'related-words', component: RelatedWordsComponent},
  {path: 'graphs', component: GraphsContainerComponent},
  {path: '', redirectTo: '/related-words', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
