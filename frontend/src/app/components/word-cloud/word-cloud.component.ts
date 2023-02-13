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
    var cloud_data = [{'name': 'i', 'weight': 21341}, {'name': 'for', 'weight': 12320}, {'name': 'positive', 'weight': 6690}, {'name': 'my', 'weight': 6415}, {'name': 'tested', 'weight': 5892}, {'name': 'covid', 'weight': 3655}, {'name': 'me', 'weight': 2172}, {'name': 'you', 'weight': 1929}, {'name': 'symptoms', 'weight': 1152}, {'name': 'days', 'weight': 1117}, {'name': 'back', 'weight': 1088}, {'name': 'if', 'weight': 1062}, {'name': 'now', 'weight': 1034}, {'name': 'we', 'weight': 962}, {'name': 'your', 'weight': 927}, {'name': 'test', 'weight': 848}, {'name': 'they', 'weight': 823}, {'name': 'today', 'weight': 763}, {'name': 'feel', 'weight': 728}, {'name': 'week', 'weight': 718}, {'name': 'will', 'weight': 708}, {'name': 'stay', 'weight': 678}, {'name': 'weeks', 'weight': 676}, {'name': 'can', 'weight': 652}, {'name': 'day', 'weight': 617}, {'name': 'people', 'weight': 556}, {'name': 'negative', 'weight': 486}, {'name': 'sick', 'weight': 472}, {'name': 'time', 'weight': 471}, {'name': 'feeling', 'weight': 462}, {'name': 'wear', 'weight': 454}, {'name': 'ago', 'weight': 397}, {'name': 'safe', 'weight': 383}, {'name': 'family', 'weight': 383}, {'name': 'virus', 'weight': 377}, {'name': 'everyone', 'weight': 368}, {'name': 'he', 'weight': 363}, {'name': 'she', 'weight': 358}, {'name': 'mask', 'weight': 354}, {'name': 'quarantine', 'weight': 344}, {'name': 'never', 'weight': 341}, {'name': 'our', 'weight': 340}, {'name': 'told', 'weight': 334}, {'name': 'mild', 'weight': 326}, {'name': 'did', 'weight': 320}, {'name': 'better', 'weight': 318}, {'name': 'shit', 'weight': 309}, {'name': 'could', 'weight': 305}, {'name': 'bad', 'weight': 287}, {'name': 'hospital', 'weight': 273}];
      Highcharts.chart('wordcloud', {
        series: [{
          type: 'wordcloud',
          data: cloud_data,
          name: 'Occurrences',
          maxFontSize:25,
          minFontSize:3,
          spiral: 'rectangular',
          placementStrategy: 'random'
        }],
        title: {
          text: 'Covlab Wordcloud',
          align:'left'
        }
      });
  }

}
