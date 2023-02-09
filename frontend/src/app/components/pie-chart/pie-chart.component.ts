import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import { PieChartData } from 'src/app/interfaces/covid-data';
import { PieChartService } from 'src/app/services/pie-chart.service';
Drilldown(Highcharts);
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  chart: any;

  data: PieChartData = {
    modelPosCount: 0,
    totalTweetCount: 0,
    totalLabelledCount: 0
  };

  totalNumTweets: number | undefined;

  constructor(private pieChartService: PieChartService) { }


  ngOnInit(): void {

    this.fetchData();
    this.createChart(null);

  }


  fetchData(){
    this.pieChartService.getData().subscribe((data:any)=>{
      console.log(data)
    });

  }
  createChart(data: any | undefined){
    Highcharts.chart({
      title:{
        text:"Model Labeled Tweets"
      },
    
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      chart: {
        type: "pie",
        renderTo: "container",
      
      },
      series: [
        {
          name: "Model Labeled Tweets",
          borderRadius: 10,
          type: 'pie',
          data: [
            {
              name:"Data1",
              y: 20,
              drilldown:"windows-versions"
            }
            ,
            {
              name:"Data2",
              y: 10,
              drilldown:"test1"
            }
            ,
            {
              name:"Data3",
              y: 40,
              drilldown:"test1"
            }
            ,
            {
              name:"Data4",
              y: 30,
              drilldown:"test1"
            }
          ]
        }
      ],
      plotOptions:{
        series: {
          dataLabels: {
              enabled: true,
              format: '{point.name}: {point.y:.1f}%'
          }
      }
      },
      drilldown:{
        
          series: [
            {
              name: 'Test1',
              id: 'windows-versions',
              type:'pie',
              data: [
                {
                  y:20
                },
                {
                  y:80
                }
              ]
            },
            {
              name: 'Test2',
              id: 'test1',
              type:'pie',
              data: [
                {
                  y:20
                },
                {
                  y:80
                }
              ]
            }
        ]
        
      }
    });
  }
}
