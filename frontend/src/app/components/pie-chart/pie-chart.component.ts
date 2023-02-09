import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  chart: any;

  totalNumTweets: number | undefined;

  constructor() { }

  ngOnInit(): void {

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

    // const tweetdata: number[] = [30, 20, 50];

    // const pieChartData = {
    //   labels: ['Labelled', 'Unlabeled', 'Labeled + Correct'],
    //   datasets: [
    //     {
    //       data: tweetdata,
    //       backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
    //     }
    //   ]
    // };

    // this.totalNumTweets = tweetdata.length;

    // this.createChart(pieChartData);
  }
  createChart(data: any){
    this.chart = new Chart('canvas2', {
      type:'pie',
      data:data,
    
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          subtitle: {
            display: true,
            text: String("Total Tweets: " + this.totalNumTweets),
            font: {
              size: 18
            }
          },
          title: {
            display: true,
            text: 'Labeling Status',
            font: {
              size: 20
            }
          }
        }
      },
    });
  }
}
