import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {

  updatedString: string = ""

  totalTweets: number = 0;
  modelPosTweets: number = 0;
  cases14Change: number = 0;

  isLoading:boolean = true;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getLatestData();
  }
  goToApp(){
    this.router.navigate(['graphs']);
  }

  getLatestData() {
    axios.get('https://covlab-backend-production.up.railway.app/latest')
      .then( (response) => {
        this.updatedString = "Last updated: " + response.data['date'];
        this.cases14Change = response.data['cases_14_average'];
      }
    )
    axios.post("https://labelling.covlab.tech/statistics")
    .then( (data) => {
      this.modelPosTweets = data.data['model_positive_count'];
      this.totalTweets = data.data['total_related_tweets_count'];
      this.isLoading = false;
    })
  }
}
