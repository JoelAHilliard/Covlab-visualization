import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-graphs-container',
  templateUrl: './graphs-container.component.html',
  styleUrls: ['./graphs-container.component.scss'],

})

export class GraphsContainerComponent implements OnInit {


  
  graphDataArr: any = [];

  constructor(private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    if(this.isMobile()){
      this.snackBar.open(
        `View on desktop for best experience`,
        'Close',
        {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'red-snackbar'
          
        }
      );
    }
  }


  graphData(event:any){
    this.graphDataArr = event;
  }
  isMobile(): boolean {
    return window.innerWidth <= 420;
  }
}
