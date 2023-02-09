import {LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'cases-countries',
  templateUrl: './cases-countries-line.component.html',
  styleUrls: ['./cases-countries-line.component.scss']
})

export class CasesCountries implements OnInit {
  highcharts: any;

  // x axis
  days: string[] = [];

  

  realCasesData = {
    type:'spline',
    label: 'Real Cases Number',
    data: this.generateRawCases(),
    datasetID:"realCases"
  }

  
  modelPredictedData = {
    type:'spline',
    label: 'Model Predicted',
    data:this.generateRawCases(),
    datasetID:"modelPredicted"
  }



  //replace with dynamic data
  dataFromAPI = [this.realCasesData,this.modelPredictedData]

 //replace with dynamic data
  startDate = new Date(2020, 1, 1);
  endDate = new Date(2023, 2, 1);
  
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
    this.days = this.setDateData(this.startDate,this.endDate);

    this.makeHighchart(this.dataFromAPI)
    
  }
  // code that creates the chart
  makeHighchart(datasets: any){  
    let colors = ["red","green","blue","orange","purple"]
    let seriesArray:  Highcharts.SeriesOptionsType[] = []


    let randomColorIndex = Math.floor(Math.random() * colors.length);
    let randomColor = colors[randomColorIndex];
    let tooltip = {}

    let yAxisIndex = 0;

    for(let i = 0; i < datasets.length; i++) {
      randomColorIndex = Math.floor(Math.random() * colors.length);
      randomColor = colors[randomColorIndex];

        tooltip = {
          valueSuffix: ' positive tests'
        }

        if(datasets[i].datasetID === "modelPredicted") {
          yAxisIndex = 1;
        }


        let seriesItem: Highcharts.SeriesOptionsType = {
          type: "spline",
          name: datasets[i].label,
          data: datasets[i].data,
          color: randomColor,
          yAxis:yAxisIndex,
          marker: {
            lineWidth: 1,
            lineColor: randomColor,
            fillColor: 'white',
            enabled:false
          }
        };
        seriesArray.push(seriesItem);
    }

    this.highcharts = Highcharts.chart('chartContainer', {
      scrollbar: {
        enabled: true
    },

      plotOptions: {
        spline: {
          turboThreshold: 2000
        }
      },
      title :{
        text:''
      },
      xAxis: {
          categories: this.days
      },
      yAxis: [
        { // Primary yAxis
        labels: {
            
            },
            title: {
                text: 'Real Cases',
              
            }
        },
        { // Primary yAxis
          labels: {
              
          },
          title: {
              text: 'Model Predicted',
            
          },
          opposite:true
        }
    ],
      series: seriesArray
    }); 
  }
  // fake data
  generateRawCases() {
    let startDate = new Date(2020, 2, 1);
    let endDate = new Date(2023, 2, 1);
    let arr = [];
    const dates: string[] = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      let cases = Math.floor(Math.random() * 100000);
      dates.push(d.toLocaleString());
      arr.push([d.toLocaleString(),cases])
    }
    return arr;
  }
  //when user selects a new dataset
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
    if(event.length < 1){
      this.makeHighchart(this.dataFromAPI);
      return
    }
    else {
      let selectedData = [];
      for(var i = 0;i < event.length; i++){
        for(var j = 0;j < this.dataFromAPI.length; j++){
          if(String(event[i]).toLowerCase() == String(this.dataFromAPI[j].datasetID).toLowerCase()){
            selectedData.push(this.dataFromAPI[j])
          }
        }
      }
      this.highcharts.update({
        series:selectedData
      });
      this.makeHighchart(selectedData);
    }
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
 //when the range slider is moved
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
       
        if(data[i][0] === date.toLocaleString()){
          index = i;
          break;
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
      
      this.leftSliderIndex = index;
    }
    
    // right hand was moved
    if(event.pointerType == 1){
      let index = 0;
      let date = new Date(event.highValue);
      // copy of data (this is just for the x axis. it will be stripped when data is receieved)

      //reverse order loop
      for (let i = data.length - 1; i > 0; i--){
        if(data[i][0] === date.toLocaleString()){
          index = i;
          break;
        }
      }

      console.log(index)
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
  // left in string form
  setDateData(startDate: Date, endDate: Date){
    var days = []
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(d.toLocaleDateString());
    }
    return days;
  }
  // add days to a date
  addDays(date:Date, days:number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
