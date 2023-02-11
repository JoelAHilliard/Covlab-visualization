import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import { PieChartData } from 'src/app/interfaces/covid-data';
import axios from 'axios';
Drilldown(Highcharts);
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  chart: any;

  isDataLoading = false;

  constructor() { }

  ngOnInit(): void {
    this.fetchData()
  }
  //grab data from api
  fetchData(){
    this.isDataLoading = true;
    axios.post("https://labelling.covlab.tech/statistics")
    .then((data:any) => {

      this.createChart(data);
      
      this.isDataLoading = false;
    
    })
  }
  //draw pie chart
  createChart(data:any){

    Highcharts.chart({
      title:{
        text:"Covlab Tweet Labelling"
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
          name: "Covlab Tweet Labelling",
          borderRadius: 10,
          type: 'pie',
          data: [
            {
              name:"Model Positive Tweets",
              y: (data.data.model_positive_count / data.data.total_related_tweets_count) * 100,
              color:'black'
            }
            ,
            {
              name:"Hand Labelled Tweets",
              y: (data.data.labeled_count / data.data.total_related_tweets_count) * 100,
              color:'grey'

            },
            {
              name:"Unlabelled Tweets",
              y: (((data.data.total_related_tweets_count) - (data.data.labeled_count + data.data.model_positive_count)) / data.data.total_related_tweets_count) * 100,
              color:'blue'

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
