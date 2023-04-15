import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import axios from 'axios';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableEntry } from '../../interfaces/table-entry.js'
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
  didDataLoad = true;

  dataSource = new MatTableDataSource<TableEntry>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  columndefs : string[] = ['state','weeklyAverage','weeklyNewCasesPer1k','twoWeekChange',
  'testPositivity'];
  
  constructor() { }

  ngOnInit(): void {
    axios.get('https://covlab-backend-production.up.railway.app/tableData')
      .then( (response) => {
        console.log(response.data)
        this.data = response.data;

        let usPositivity = 0;

        //this should be done server side. or db side.
        for(let i = 1; i<this.data.length; i++){
          if(this.data[i].positivity != "N/A"){
            usPositivity += Number(this.data[i].positivity)
          } 
        }


        this.data[0].positivity = usPositivity / this.data.length - 1;

        this.dataSource = new MatTableDataSource<TableEntry>(this.data);
        this.isLoading = false;
        this.dataSource.paginator = this.paginator        
      })
      .catch( (error) =>{
        console.error(error)
        this.didDataLoad = false;
      })
    
  }
}
