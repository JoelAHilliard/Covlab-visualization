import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Wordcloud from 'highcharts/modules/wordcloud';
Wordcloud(Highcharts);

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
    var cloud_data = [{'name': 'i', 'weight': 21341}, {'name': 'positive', 'weight': 6690}, {'name': 'my', 'weight': 6415}, {'name': 'tested', 'weight': 5892}, {'name': 'covid', 'weight': 3655}, {'name': 'me', 'weight': 2172}, {'name': 'symptoms', 'weight': 1152}, {'name': 'days', 'weight': 1117}, {'name': 'back', 'weight': 1088}, {'name': 'if', 'weight': 1062}, {'name': 'now', 'weight': 1034}, {'name': 'we', 'weight': 962}, {'name': 'your', 'weight': 927}, {'name': 'test', 'weight': 848}, {'name': 'they', 'weight': 823}, {'name': 'today', 'weight': 763}, {'name': 'feel', 'weight': 728}, {'name': 'week', 'weight': 718}, {'name': 'will', 'weight': 708}, {'name': 'stay', 'weight': 678}, {'name': 'weeks', 'weight': 676}, {'name': 'can', 'weight': 652}, {'name': 'day', 'weight': 617}, {'name': 'people', 'weight': 556}, {'name': 'negative', 'weight': 486}, {'name': 'sick', 'weight': 472}, {'name': 'time', 'weight': 471}, {'name': 'feeling', 'weight': 462}, {'name': 'wear', 'weight': 454}, {'name': 'ago', 'weight': 397}, {'name': 'safe', 'weight': 383}, {'name': 'family', 'weight': 383}, {'name': 'virus', 'weight': 377}, {'name': 'everyone', 'weight': 368}, {'name': 'he', 'weight': 363}, {'name': 'she', 'weight': 358}, {'name': 'mask', 'weight': 354}, {'name': 'quarantine', 'weight': 344}, {'name': 'never', 'weight': 341}, {'name': 'our', 'weight': 340}, {'name': 'told', 'weight': 334}, {'name': 'mild', 'weight': 326}, {'name': 'did', 'weight': 320}, {'name': 'better', 'weight': 318}, {'name': 'shit', 'weight': 309}, {'name': 'could', 'weight': 305}, {'name': 'bad', 'weight': 287}, {'name': 'hospital', 'weight': 273}, {'name': 'yesterday', 'weight': 265}, {'name': 'testing', 'weight': 262}, {'name': 'fever', 'weight': 257}, {'name': 'im', 'weight': 253}, {'name': 'taste', 'weight': 252}, {'name': 'again', 'weight': 252}, {'name': 'them', 'weight': 246}, {'name': 'myself', 'weight': 245}, {'name': 'may', 'weight': 241}, {'name': 'her', 'weight': 227}, {'name': 'care', 'weight': 223}, {'name': 'smell', 'weight': 222}, {'name': 'hope', 'weight': 217}, {'name': 'wife', 'weight': 214}, {'name': 'call', 'weight': 208}, {'name': 'started', 'weight': 206}, {'name': 'health', 'weight': 205}, {'name': 'too', 'weight': 204}, {'name': 'month', 'weight': 204}, {'name': 'contact', 'weight': 201}, {'name': 'love', 'weight': 194}, {'name': 'fine', 'weight': 188}, {'name': 'husband', 'weight': 187}, {'name': 'fucking', 'weight': 186}, {'name': 'body', 'weight': 184}, {'name': 'their', 'weight': 183}, {'name': 'god', 'weight': 178}, {'name': 'gonna', 'weight': 176}, {'name': 'finally', 'weight': 175}, {'name': 'antibodies', 'weight': 175}, {'name': 'guys', 'weight': 174}, {'name': 'vaccinated', 'weight': 172}, {'name': 'prayers', 'weight': 171}, {'name': 'every', 'weight': 170}, {'name': 'mom', 'weight': 168}, {'name': 'doctor', 'weight': 165}, {'name': 'guess', 'weight': 163}, {'name': 'months', 'weight': 163}, {'name': 'fuck', 'weight': 163}, {'name': 'pray', 'weight': 162}, {'name': 'quarantined', 'weight': 161}, {'name': 'morning', 'weight': 160}, {'name': 'lost', 'weight': 158}, {'name': 'his', 'weight': 155}, {'name': 'isolation', 'weight': 154}, {'name': 'real', 'weight': 153}, {'name': 'april', 'weight': 153}, {'name': 'lot', 'weight': 152}, {'name': 'literally', 'weight': 152}, {'name': 'recently', 'weight': 150}, {'name': 'life', 'weight': 146}, {'name': 'flu', 'weight': 145}, {'name': 'masks', 'weight': 144}, {'name': 'live', 'weight': 141}, {'name': 'house', 'weight': 140}, {'name': 'called', 'weight': 140}, {'name': 'without', 'weight': 138}, {'name': 'daughter', 'weight': 138}]
    this.createWordCloud(cloud_data)
  }

  createWordCloud(cloud_data:any){
    Highcharts.chart('wordcloud', {
      series: [{
        type: 'wordcloud',
        data: cloud_data,
        name: 'Occurrences',
        maxFontSize:45,
        minFontSize:13,
        colors:["black","blue","grey"]
      }],
      title: {
        text: 'Covlab Wordcloud',
        align:'center'
      },
    });
  }

}
