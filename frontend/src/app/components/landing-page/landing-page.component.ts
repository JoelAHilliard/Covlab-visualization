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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getLatestData()
  }
  goToApp(){
    this.router.navigate(['graphs'])
  }

  getLatestData() {
    axios.get('https://covlab-backend-production.up.railway.app/latest')
      .then( (response) => {
        this.updatedString = "Last updated: " + response.data['date']
      }
    )
  }
}
