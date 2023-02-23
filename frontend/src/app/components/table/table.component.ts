import { Component, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() twoWeekChangeData: any[] = [];

  @Input() apiData:any = []

  data:any = []
  
  columndefs : string[] = ['state','weeklyAverage','weeklyNewCasesPer1k','twoWeekChange',
  'testPositivity'];
  
  constructor() { }

  ngOnInit(): void {


    // let usAggregateData = {
    //   state:"United States",
    //   // need this data point
    //   weeklyNewCasesPer1k:this.apiData[this.apiData.length-1].weekly_new_cases_per1k[1]*100,
    //   // testPositivity:this.apiData[this.apiData.length-1].positivity[1],
    //   // weeklyAverage:this.apiData[this.apiData.length-1].cases_7_day_average[1],
    //   twoWeekChangePercent:this.apiData[this.apiData.length-1].new_tweets_count[1]
    // }

    // this.twoWeekChangeData = [{
    //   pct:0,
    //   last14Points: []
    // }];

    // for(let i = 1;i <= 3;i++){
    //   this.twoWeekChangeData[0].last14Points.push();
    // }
    // const sampleData = [
    //   {
    //     id:1,
    //     country: "America",
    //     data: [
    //       usAggregateData
    //     ]
    //   }
     
    // ];

    // this.data = sampleData[0].data;
    axios.get('https://covlab-backend.onrender.com/tableData')
      .then( (response) => {
        this.data = response.data
        console.log(this.data[1])
      })
    
  }
}
