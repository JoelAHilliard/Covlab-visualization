import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { RelatedWordsComponent } from './components/related-words/related-words.component';
import { GraphsContainerComponent } from './components/graphs-container/graphs-container.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [

  {path: 'map', component: MapComponent},
  {path: 'related-words', component: RelatedWordsComponent},
  {path: 'graphs', component: GraphsContainerComponent},
  {path: 'home', component: LandingPageComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'team', component: TeamComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
