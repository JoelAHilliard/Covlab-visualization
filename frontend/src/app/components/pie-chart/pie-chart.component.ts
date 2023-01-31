import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

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

    const tweetdata: number[] = [30, 20, 50];

    const pieChartData = {
      labels: ['Labelled', 'Unlabeled', 'Labeled + Correct'],
      datasets: [
        {
          data: tweetdata,
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
        }
      ]
    };

    this.totalNumTweets = tweetdata.length;

    this.createChart(pieChartData);
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
