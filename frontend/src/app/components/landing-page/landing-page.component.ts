import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [trigger('slideInOut', [
    transition(':enter', [
      style({ transform: 'translateY(140%)' }),
      animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ transform: 'translateY(100%)' }))
    ])
  ]),trigger('slideOut', [
    transition(':leave', [
      animate('200ms ease-in', style({ 
        transform: 'translateY(-100%)',
        zIndex:-5
      }))
    ])
  ])]
})

export class LandingPageComponent implements OnInit {

  updatedString: string = ""

  totalTweets: number = 0;
  modelPosTweets: number = 0;
  cases14Change: number = 0;

  isLoading: boolean = true;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getLatestData();
  }
  goToApp(){
    this.router.navigate(['graphs']);
  }

  getLatestData() {
    const latestDataPromise = axios.get('https://covlab-backend.onrender.com/latest');
    const statisticsPromise = axios.post('https://labelling.covlab.tech/statistics');
  
    Promise.all([latestDataPromise, statisticsPromise]).then((responses) => {
      const latestDataResponse = responses[0];
      const statisticsResponse = responses[1];
  
      this.updatedString = 'Last updated: ' + latestDataResponse.data.date;
      this.cases14Change = latestDataResponse.data.cases_14_average;
      this.modelPosTweets = statisticsResponse.data.model_positive_count;
      this.totalTweets = statisticsResponse.data.total_related_tweets_count;
      this.isLoading = false;
    });
  }
}
