import { Component, OnInit } from '@angular/core';
import * as am5core from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5map from '@amcharts/amcharts5/map';
import * as am5geodata_usaLow from '@amcharts/amcharts5-geodata/usaLow';
import { CovidTrackingService } from 'src/app/services/covid-tracking.service';
import { CovidData, TwitterData } from 'src/app/interfaces/covid-data';
import axios from 'axios';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  CovidData: CovidData[] = [];
  isDataLoading = false;

  didDataLoad = true;
  MapData: any = [];
  root: any;
  constructor(private trackingSevice: CovidTrackingService) { }

 
  grabMapData(){
    axios.get("https://covlab-backend-production.up.railway.app/mapData")
    .then((data:any) => {
      this.MapData = data['data'];
      this.createMap("positive");
      this.isDataLoading = false;
    })
    .catch( (error) => {
      console.error(error);
      this.didDataLoad = false;
    })
  }


  fillCovidData(type: string): any[] {
    let data: any[] = [];
    this.MapData.forEach((element:any) => {
      data.push({
        id: "US-" + element.state,
        value: element.positive
      });
    });
    return data;
  }

  createMap(type: string) {

    if(this.root != null)
      this.root.dispose();

    this.root = am5core.Root.new("mapdiv");

    // Set themes
    // this.root.setThemes([
    //   am5themes_Animated.new(this.root)
    // ]);

    // Create chart
    let chart = this.root.container.children.push(am5map.MapChart.new(this.root, {
      panX: "rotateX",
      panY: "none",
      projection: am5map.geoAlbersUsa(),
      layout: this.root.horizontalLayout,
      maxZoomLevel: 1, 
      minZoomLevel: 1  
    }));

    // Create polygon series
    let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(this.root, {
      geoJSON: am5geodata_usaLow.default,
      valueField: "value",
      calculateAggregates: true
    }));

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}: {value}"
    });

    polygonSeries.set("heatRules", [{
      target: polygonSeries.mapPolygons.template,
      dataField: "value",
      min: am5core.color(0xffd000),
      max: am5core.color(0xff0000),
      key: "fill"
    }]);

    polygonSeries.mapPolygons.template.events.on("pointerover", function (ev: { target: { dataItem: { get: (arg0: string) => any; }; }; }) {      
      heatLegend.showValue(ev.target.dataItem.get("value"));
    });

    polygonSeries.data.setAll(this.fillCovidData(type));

    let heatLegend = chart.children.push(am5core.HeatLegend.new(this.root, {
      orientation: "vertical",
      startColor: am5core.color(0xffd000),
      endColor: am5core.color(0xff0000),
      startText: "Lowest",
      endText: "Highest",
      stepCount: 5
    }));

    heatLegend.startLabel.setAll({
      fontSize: 12,
      fill: heatLegend.get("startColor")
    });

    heatLegend.endLabel.setAll({
      fontSize: 12,
      fill: heatLegend.get("endColor")
    });

    // change this to template when possible
    polygonSeries.events.on("datavalidated", function () {
      heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
      heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
    });
  }  

  ngOnInit(): void {
        
    // this.trackingSevice.getData().subscribe((data: CovidData[]) => {
    //   this.CovidData = data;
    //   this.createMap("positive");
    // });

    this.grabMapData();

   // this.trackingSevice.readJson();

  }
  
}
