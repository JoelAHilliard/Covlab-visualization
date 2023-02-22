import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { RelatedWordsComponent } from './components/related-words/related-words.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CasesCountries } from './components/cases-countries-line/cases-countries-line';
import { GraphsContainerComponent } from './components/graphs-container/graphs-container.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { MatSliderModule } from '@angular/material/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TableComponent } from './components/table/table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableGraphComponent } from './components/table-graph/table-graph.component';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ShortNumberPipe } from './pipes/number-abbreviation.pipe';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LineChartComponent,
    RelatedWordsComponent,
    CasesCountries,
    GraphsContainerComponent,
    PieChartComponent,
    TableComponent,
    TableGraphComponent,
    WordCloudComponent,
    LandingPageComponent,
    NavBarComponent,
    ShortNumberPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSliderModule,
    NgxSliderModule,
    NgxDatatableModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
