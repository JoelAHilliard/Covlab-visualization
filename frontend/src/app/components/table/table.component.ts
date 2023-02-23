import { Component, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() twoWeekChangeData: any[] = [];

  @Input() apiData:any = []

  data:any = []

  isLoading: Boolean = true;
  
  columndefs : string[] = ['state','weeklyAverage','weeklyNewCasesPer1k','twoWeekChange',
  'testPositivity'];
  
  constructor() { }

  ngOnInit(): void {
    axios.get('https://covlab-backend.onrender.com/tableData')
      .then( (response) => {
        this.data = response.data;
        this.isLoading = false;
      })
    
  }
}
