import { ChangeContext, LabelType, Options } from '@angular-slider/ngx-slider';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { timeHours } from 'd3-time';
import * as Highcharts from 'highcharts';
import { SeriesOptionsType } from 'highcharts';

@Component({
  selector: 'cases-countries',
  templateUrl: './cases-countries-line.component.html',
  styleUrls: ['./cases-countries-line.component.scss']
})

export class CasesCountries implements OnInit {


  highcharts: any;

  // x axis
  days: string[] = [];

  

  dataAmerican = {
    type:'spline',
    label: 'America',
    data: this.generateRawCases(),
    datasetID:"america"
  }

  tweetCountAmerican = {
    type:'bar',
    label: 'USA Tweets',
    data: this.generateRawCases(),
    datasetID:"america"
  }

  tweetCountUK = {
    type:'bar',
    label: 'UK Tweets',
    data: this.generateRawCases(),
    datasetID:"unitedKingdom"
    
  }
  
  dataUK = {
    type:'spline',
    label: 'United Kingdom',
    data:this.generateRawCases(),
    datasetID:"unitedKingdom"
  }



  //replace with dynamic data
  dataFromAPI = [this.dataAmerican,this.dataUK,this.tweetCountAmerican,this.tweetCountUK]

 //replace with dynamic data
  startDate = new Date(2023, 3, 1);
  endDate = new Date(2023, 3, 15);

  sliderOptions: Options = {
    showSelectionBar: true,
    getSelectionBarColor: (value: number): string => {
      return "red"
    }
  }


  //for the slider
  dateRange: Date[] = this.createDateRange(this.startDate,this.endDate);

  minValue: number = this.dateRange[0].getTime();
  maxValue: number = this.dateRange[this.dateRange.length-1].getTime();
  
  value: number = this.dateRange[0].getTime();
  
   
  options: Options = {
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: LabelType): string => {
      return new Date(value).toDateString();
    },
    showSelectionBar: true,
    selectionBarGradient: {
      from: 'blue',
      to: 'blue'
    },
    getPointerColor: (value: number): string => {
      return 'blue'
    }
  
  };

  leftSliderIndex: number = 0;

  rightSliderIndex: number = this.dataFromAPI[0].data.length;

  lastValue: number = 0;

  lastHighestValue: number = 0;

  ngOnInit(): void {    
    const startDate = new Date(2023, 3, 1);
    const endDate = new Date(2023, 3, 15);

    this.days = this.setDateData(startDate,endDate);

    this.makeHighchart(this.dataFromAPI)
    
  }

  generateTweetCounts(){

    let arr = [];
    for (let i = 0; i < 15; i++) {
      let cases = Math.floor(Math.random() * 10000);
      arr.push(cases);
    }
    return arr;
  }

  generateRawCases() {
    let arr = [];
    for (let i = 0; i < 15; i++) {
      let date = "4/" + (i + 1) + "/2023";
      let cases = Math.floor(Math.random() * 100000);
      arr.push([date, cases]);
    }
    return arr;
  }

  updateDatasets(event: any){
   

    //clear all data
    this.highcharts.series.forEach((element:any) => {
      element.remove();
    });
    this.highcharts.series.forEach((element:any) => {
      element.setData([]);
    });

    let colors = ["red","green","blue","orange","purple"]
    let seriesArray:  Highcharts.SeriesOptionsType[] = []


    let randomColorIndex = Math.floor(Math.random() * colors.length);
    let randomColor = colors[randomColorIndex];

    //NONE SELECTED 
    if(event.length < 1 || event.length == this.dataFromAPI.length / 2){
      this.makeHighchart(this.dataFromAPI);
      return
    }
    else {
      console.log(event);
      let selectedData = [];
      for(var i = 0;i < event.length; i++){
        for(var j = 0;j < this.dataFromAPI.length; j++){
          if(String(event[i]).toLowerCase() == String(this.dataFromAPI[j].datasetID).toLowerCase()){
            selectedData.push(this.dataFromAPI[j])
          }
        }
      }
      console.log(selectedData)
      this.highcharts.update({
        series:selectedData
      });
      this.makeHighchart(selectedData);
    }
  }

  createDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  }


  updateData(event: any) {
    
    //a fresh copy of the days array (this will be extracted dynamically)
    let daysCopy = new Array(this.days)[0];
      // copy of data (this assumes that all data lengths are equal)

    let data = new Array(this.dataFromAPI[0].data)[0];

    // left hand was moved
    if(event.pointerType == 0){
      let date = new Date(event.value);
      let index = 0;  
      let counter = 0;
      
      //find correct index to slice the dataset at
      for (let i = 0;i<data.length;i++){
        if(data[i][0] === date.toLocaleDateString()){
          index = i;
        }
      }
      // update the x axis labels
      this.highcharts.xAxis[0].update({
        categories:daysCopy.slice(index,this.rightSliderIndex+1)
      })

      //update the series'
      counter = 0

      //counter iterates through the data sets assuming that the 
      //number of datasets is equal and in the same order
      //as the series in the chart=

      this.highcharts.series.forEach((element:any) => {
        element.update({
          data: this.dataFromAPI[counter].data.slice(index,this.rightSliderIndex+1)
        })
        counter++;
      });

      console.log(counter);
      
      this.leftSliderIndex = index;
    }
    
    // right hand was moved
    if(event.pointerType == 1){
      let index = 0;
      let date = new Date(event.highValue);
      // copy of data (this is just for the x axis. it will be stripped when data is receieved)

      for (let i = 0;i<data.length;i++){
        if(data[i][0] === date.toLocaleDateString()){
          index = i;
        }
      }

      if(index == 0){
        index = this.rightSliderIndex;
      }
      let counter = 0;
      //update the x axis
      this.highcharts.xAxis[0].update({
        categories:daysCopy.slice(this.leftSliderIndex,index+1)
      })

      //update the series'
      counter = 0
      this.highcharts.series.forEach((element:any) => {
        element.update({
          data: this.dataFromAPI[counter].data.slice(this.leftSliderIndex,index+1)

        })
        counter++;
      });
      this.rightSliderIndex = index;

    }

    this.lastValue = event.value;
    this.lastHighestValue = event.lastHighestValue;
    this.highcharts.redraw();
  }

  setDateData(startDate: Date, endDate: Date){
    var days = []
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(d.toLocaleDateString());
    }
    return days;
  }
  
  // code that creates the chart

  makeHighchart(datasets: any){  
    let colors = ["red","green","blue","orange","purple"]
    let seriesArray:  Highcharts.SeriesOptionsType[] = []


    let randomColorIndex = Math.floor(Math.random() * colors.length);
    let randomColor = colors[randomColorIndex];
    let tooltip = {}

    for(let i = 0; i < datasets.length; i++) {
      randomColorIndex = Math.floor(Math.random() * colors.length);
      randomColor = colors[randomColorIndex];
      if(datasets[i].type == "spline"){

        tooltip = {
          valueSuffix: ' positive tests'
        }


        let seriesItem: Highcharts.SeriesOptionsType = {
          type: "line",
          name: datasets[i].label,
          data: datasets[i].data,
          color: randomColor,
          yAxis:0,
          zIndex:5,
          marker: {
            lineWidth: 1,
            lineColor: randomColor,
            fillColor: 'white'
          }
        };
        seriesArray.push(seriesItem);
     } else {
        tooltip = {
          valueSuffix: ' tweets'
        }
        let seriesItem: Highcharts.SeriesOptionsType = {
          type: "column",
          name: datasets[i].label,
          data: datasets[i].data,
          yAxis:1
        };
        seriesArray.push(seriesItem);
     }
    }

    this.highcharts = Highcharts.chart('chartContainer', {
      title: {
          text: 'Covtech Data',
          align: 'left'
      },
      navigator : {
          enabled:true
      },
      rangeSelector :{
        verticalAlign:'top',
        x:0,
        y:0,
        enabled:true
      },
      xAxis: {
          categories: this.days
      },
      yAxis: [{ // Primary yAxis
          labels: {
              
          },
          title: {
              text: 'Positive Cases',
            
          }
      },{ // Primary yAxis
      labels: {
          
      },
      title: {
          text: 'Tweets',
         
      },
      opposite:true
      }],
      series: seriesArray
    }); 
  }
}
