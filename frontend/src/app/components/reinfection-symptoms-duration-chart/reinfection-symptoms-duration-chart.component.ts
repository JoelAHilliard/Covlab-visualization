import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'
@Component({
  selector: 'app-reinfection-symptoms-duration-chart',
  templateUrl: './reinfection-symptoms-duration-chart.component.html',
  styleUrls: ['./reinfection-symptoms-duration-chart.component.scss']
})
export class ReinfectionSymptomsDurationChartComponent implements OnInit{

  chartContainer: string = "reinfection-symptoms-box-chart"


  ngOnInit(){
    this.drawChart([]);
  }
  drawChart(chartData: any){
    const options: Highcharts.Options = {
      chart:{
        type:'boxplot'
      },
    //   series:[{
    //   //   name:'test',
    //   //   data: [
    //   //     [760, 801, 848, 895, 965],
    //   //     [733, 853, 939, 980, 1080],
    //   //     [714, 762, 817, 870, 918],
    //   //     [724, 802, 806, 871, 950],
    //   //     [834, 836, 864, 882, 910]
    //   // ],
    //   // }]
    // }
  }}
}
