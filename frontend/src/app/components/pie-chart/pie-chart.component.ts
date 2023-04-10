import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import { PieChartData } from 'src/app/interfaces/covid-data';
import axios from 'axios';
import { HostListener } from "@angular/core";
Drilldown(Highcharts);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.getScreenSize();
    }


  chartData: any;

  chart: any;

  isDataLoading = false;

  totalTweets: number = 0;

  screenHeight: number = 0;
  screenWidth: number = 0;

  previousWidth:number = 0;
  // used to display error msg

  didDataLoad = true;

  constructor() {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.fetchData()
  }

  getScreenSize() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        if(this.screenWidth == this.previousWidth){
          return
        }
        if(this.chartData != null && (this.screenWidth > 1600 || this.screenWidth < 850)){
          this.createChart(this.chartData);
          this.previousWidth = this.screenWidth;
        }

  }
  //grab data from api
  fetchData(){
    this.isDataLoading = true;

    axios.post("https://labelling.covlab.tech/statistics")
    .then((data:any) => {

      this.chartData = data;

      this.createChart(data);

      this.totalTweets = data.data.total_related_tweets_count;
      
      this.isDataLoading = false;
    
    }) 
    .catch( (error) => {
      console.error(error);
      this.didDataLoad = false;
    });
  }
  //draw pie chart
  createChart(data:any){


    let chartWidth = 400;

    if(this.screenWidth > 850){
      chartWidth = 400;
    }
    if(this.screenWidth < 850){
      chartWidth = 250;
    }
    if(this.screenWidth < 500){
      chartWidth = 175;
    }

    Highcharts.chart({
      title:{
        text:""
      },  
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
      credits: {
        text:"covlab.tech"
      },
      chart: {
        type: "pie",
        renderTo: "container",
        reflow:true,
        width:chartWidth,
        height:300
      },
      series: [
        {
          name: "Covlab Tweet Labelling",
          borderRadius: 10,
          type: 'pie',
          data: [
            {
              name:"Unlabelled Tweets",
              y: ((data.data.total_related_tweets_count - data.data.labeled_count) / data.data.total_related_tweets_count) * 100,
              color:'#EC6B56'
            }
            ,
            {
              name:"Hand Labelled Tweets",
              y: (data.data.labeled_count / data.data.total_related_tweets_count) * 100,
              color:'blue'

            },
            
            
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
      }
    });
    Highcharts.chart({
      title:{
        text:""
      },
      credits:{
        enabled:false
      },  
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
      chart: {
        type: "pie",
        renderTo: "container2",
        width:chartWidth,
        height:300
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
              color:'blue'
            }
            ,
            {
              name:"Model Irrelevant Tweets",
              y: ((data.data.total_related_tweets_count - data.data.model_positive_count )/ data.data.total_related_tweets_count) * 100,
              color:'darkred'

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
      }
    });
  }
}
