
import {LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import axios from 'axios';
@Component({
  selector: 'app-tweet-line',
  templateUrl: './tweet-line.component.html',
  styleUrls: ['./tweet-line.component.scss']
})
export class TweetLineComponent implements OnInit {

  highcharts: any;
  // used to display error msg
  didDataLoad = true;
  // x axis vals
  days: string[] = [];

  selected:string = "New Tweets Count";

  new_tweets_count_dataset = {
    type:'spline',
    label: 'New Tweets Count',
    datasetID:'New Tweets Count',
    data:[]
  }
  

  total_tweets_count_dataset = {
    type:'spline',
    label: 'Total Tweet Count',
    datasetID:'weeklyNewCases',
    data:[]
  }

  tweets_14_average_dataset = {
    type:'spline',
    label: 'Bi-Weekly New Cases',
    datasetID:'biWeeklyNewCases',
    data:[]
  }

  tweets_7_average_dataset = {
    type:'spline',
    label: 'Cumulative New Cases',
    datasetID:'cumulativeNewCases',
    data:[]
  }

  usTableData = {
    cases_7_day_average:0,
    weekly_new_cases_per1k:0,
    new_tweets_count:0,
    positivity:0
  }
  
  
  //replace with dynamic data
  dataFromAPI = [this.new_tweets_count_dataset]

  //replace with dynamic data
  startDate = new Date(2020, 0, 21);
  endDate = new Date(2023, 1, 8);

  //for the slider
  dateRange: Date[] = this.createDateRange(this.startDate,this.endDate);

  minValue: number = this.dateRange[0].getTime();
  maxValue: number = this.dateRange[this.dateRange.length-1].getTime();
  
  value: number = this.dateRange[0].getTime();

  currentLowVal: number = this.dateRange[0].getTime();
  currentHighVal: number = this.dateRange[this.dateRange.length-1].getTime();
  




  options: Options = {
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: LabelType): string => {
      return new Date(value).toDateString();
    },
    showSelectionBar: true,
    selectionBarGradient: {
      from: 'darkred',
      to: 'darkred'
    },
    getPointerColor: (value: number): string => {
      return 'darkred'
    }
  
  };

  leftSliderIndex: number = 0;

  rightSliderIndex: number = 0;

  lastValue: number = 0;

  lastHighestValue: number = 0;

  isDataLoading = false;

  //
  ngOnInit() {
    
    this.days = this.setDateData(this.startDate,this.endDate);
    this.rightSliderIndex = this.days.length;
    //starter dataset
    this.getGraphData();    

  }
  //change which dataset is displayed on the graph
  dataSwitcher(dataset:any){

    if(dataset === 'New Tweets Count'){
      this.dataFromAPI = [this.new_tweets_count_dataset]
    } else if (dataset ==='Total Tweets Count') {
      this.dataFromAPI = [this.total_tweets_count_dataset]
    } else if (dataset ==='14dayAvg') {
      this.dataFromAPI = [this.tweets_14_average_dataset]
    } else if (dataset ==='7dayAvg') {
      this.dataFromAPI = [this.tweets_7_average_dataset]
    }

    // reset slider here

    this.makeHighchart(this.dataFromAPI);

  }

  //fetch graph data from API
  getGraphData(){
    this.isDataLoading = true;
    //daily
    let new_tweets_count:any = [];
    //weekly
    let total_tweets_count:any = [];
    let tweets_14_average:any =[];
    //bi-weekly
    let tweets_7_average:any = [];
    //Cumulative

    //tweet positivity

    axios.get('https://covlab-backend-production.up.railway.app/graphData1')
      .then( (response) => {
        for(var i =0;i<response.data.length-1;i++){
           //daily
           new_tweets_count.push([response.data[i].date,response.data[i].new_tweets_count])
           total_tweets_count.push([response.data[i].date,response.data[i].total_tweets_count])
          //weekly
          tweets_14_average.push([response.data[i].date,response.data[i].tweets_14_average])
          //biweeklu
          tweets_7_average.push([response.data[i].date,response.data[i].tweets_7_average])
        }

          //set new x axis range and slider
        let len = response.data.length;

        let tempStartDate = new Date(response.data[0].date);
        let tempEndDate = new Date(response.data[len-1].date);
        //set new range slider range
        this.minValue = tempStartDate.getTime();
        this.maxValue = tempEndDate.getTime();
        
        //set new x axis range

        this.days = this.setDateData(tempStartDate, tempEndDate);
        this.dateRange = this.createDateRange(tempStartDate,tempEndDate);

        this.options = {
          stepsArray: this.dateRange.map((date: Date) => {
            return { value: date.getTime() };
          }),
          translate: (value: number, label: LabelType): string => {
            return new Date(value).toDateString();
          },
          showSelectionBar: true,
          selectionBarGradient: {
            from: 'darkred',
            to: 'darkred'
          },
          getPointerColor: (value: number): string => {
            return 'darkred'
          }
        
        };

        //set our data
        //daily data
        this.new_tweets_count_dataset.data = new_tweets_count;
        //weekly data

        this.total_tweets_count_dataset.data = total_tweets_count;
        //bi weekly data

        this.tweets_14_average_dataset.data = tweets_14_average;

        //cumulative data
        this.tweets_7_average_dataset.data = tweets_7_average




        this.isDataLoading = false;

        this.dataSwitcher("New Tweets Count");

        // this.addNewItem([this.new_tweets_count_dataset,this.total_tweets_count_dataset,this.tweets_7_average_dataset,this.usTableData])
      })
      .catch( (error) => {
        console.error(error);
        this.didDataLoad = false;
      });
      
  }
  
  // code that creates the chart
  makeHighchart(datasets: any){
    let colors: string[] = ["bl","darkred"];
    let seriesArray:  Highcharts.SeriesOptionsType[] = [];


    let randomColorIndex = Math.floor(Math.random() * colors.length);
    let randomColor = colors[randomColorIndex];
    let tooltip = {}

    let yAxisIndex = 0;

    let yAxisLabels = []

    for(let i = 0; i < datasets.length; i++) {

        randomColor = colors.pop() as string;

        tooltip = {
          valueSuffix: ' positive tests'
        }

      


        yAxisLabels.push(datasets[i].label)
        let seriesItem: Highcharts.SeriesOptionsType = {
          type: "spline",
          name: datasets[i].label,
          data: datasets[i].data,
          color: randomColor,
          yAxis:i,
          marker: {
            lineWidth: 1,
            lineColor: randomColor,
            fillColor: 'white',
            enabled:false
          }
        };
        seriesArray.push(seriesItem);
    }

    this.highcharts = Highcharts.chart('chartContainer1', {
      chart:{
        animation:false
      },
      boost: {
        useGPUTranslations: true,
        seriesThreshold: 2
      },
      scrollbar: {
        enabled: true
      },
      legend: {
        y:-6,
        x:100,
        layout: 'vertical',
        align:'left',
        verticalAlign: 'top',
        floating: true,
      },
      plotOptions: {
        
          spline: {
            turboThreshold: 2000
          }
      },
      title :{
        text:''
      },
      credits:{
        enabled:false
      },
      xAxis: {
          categories: this.days,
          tickInterval:10,
          labels:{
            step:10,
            rotation:-20,
            y:25,    
          },
          crosshair:{
            width:2,
            color:"black",
            dashStyle:"Dash"
          }
        
      },
      yAxis: [
        { // Primary yAxis
          gridLineWidth:0,
        labels: {
            
            },
            title: {
                text: datasets[0].label,
              
            },
          min:0,
          crosshair:{
            width:2,
            color:"black",
            dashStyle:"Dash"
          }
        },
        { // Primary yAxis
          gridLineWidth:0,

          labels: {
              
          },
          title: {
              text: datasets.length == 1 ? "" : datasets[1].label,
          },
          min:0,
          opposite:true,
          crosshair:{
            width:2,
            color:"black",
            dashStyle:"Dash"
          },
          
        }
      ],
      series: seriesArray
    }); 
  }

  //when user selects a new dataset
  updateDatasets(event: any){
  
    //clear all data
    if(this.highcharts){
      this.highcharts.series.forEach((element:any) => {
        element.remove();
      });
      this.highcharts.series.forEach((element:any) => {
        element.setData([]);
      });
    }

    
    this.dataSwitcher(event);
  }

  //left in date form
  createDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    let tempStartDate = new Date(startDate)
    for (let d = tempStartDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  }
  //returns an index
  bSearchDates(dates: Date[], target: Date){
    let left = 0;
    let right = dates.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (dates[mid].getTime() === target.getTime()) {
        return mid;
      } else if (dates[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return dates.length - 1;
  }

  //when the range slider is moved
  updateData(event: any) {
    //a fresh copy of the days array (this will be extracted dynamically)
    let daysCopy = new Array(this.days)[0];

    // left hand was moved
    if(event.pointerType == 0){
      let date = new Date(event.value);
      let counter = 0;

      let index = this.bSearchDates(this.dateRange,date);

      // update the x axis labels
      this.highcharts.xAxis[0].update({
        categories:daysCopy.slice(index,this.rightSliderIndex)
      })

      this.highcharts.series.forEach((element:any) => {
        element.update({
          data: this.dataFromAPI[counter].data.slice(index,this.rightSliderIndex)
        })
        counter++;
      });
      
      this.leftSliderIndex = index;
    }
    
    // right hand was moved
    if(event.pointerType == 1){
      let date = new Date(event.highValue);

      let index = this.bSearchDates(this.dateRange,date);

      let counter = 0;


      if(index == 0){
        index = this.rightSliderIndex;
      }

      //update the x axis
      this.highcharts.xAxis[0].update({
        categories:daysCopy.slice(this.leftSliderIndex,index)
      })
      //update the series'
      this.highcharts.series.forEach((element:any) => {
        element.update({
          data: this.dataFromAPI[counter].data.slice(this.leftSliderIndex,index)

        })
        counter++;
      });
      this.rightSliderIndex = index;

    }

    this.lastValue = event.value;
    this.lastHighestValue = event.lastHighestValue;

    this.currentLowVal = event.value;
    this.currentHighVal = event.highValue;

  }

  // left in string form
  setDateData(startDate: Date, endDate: Date){
    var days = []
    let tempStartDate = new Date(startDate);
    for (let d = tempStartDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(d.toLocaleDateString());
    }
    return days;
  }
}