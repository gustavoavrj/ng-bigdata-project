import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth.service'
import { Router, ActivatedRoute } from '@angular/router';
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ClassField } from '@angular/compiler';
import { Title } from '@angular/platform-browser';

const GetAnimeList = gql`
  mutation GetAnimeList(
    $token: String!

  ) {
    getAnimeList(token: $token) {
      AnimeList{
        title, titleJapanese, mpaaRating, numEpisodes
      }
    }
  }
`;



const SearchAnime = gql`
  mutation SearchAnime(
    $token: String!
    $title: String!

  ) {
    searchAnime(token: $token, title: $title) {
      AnimeSearch{
        title, imagePath, synopsis
      }
    }
  }
`;
class anime {
  title: string;
  titleJapanese: string;
  mpaaRating: string;
  numEpisodes: number;
}
class searchbox {
  title: string;
  imagePath: string;
  synopsis: string;
}

function getSames(data) {
  var sums = data.reduce(function(acc, obj) {
    var date = obj.date;
    if (!acc[date]) {
      acc[date] = {sum:0, count:0};
    }
    acc[date].sum += +obj.imc;
    acc[date].count++;
    return acc;
  }, Object.create(null));
  return Object.keys(sums).map(function(date) {
    return {[date]:sums[date].sum/sums[date].count};
  });
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  _COURSES = [
    'Title1',
    'Title2',
    'Title3',
    'Title4'];
    _BAR_CHART_COLORS = [
      {
        borderColor: [
          'rgba(255,0,0,0.5)',
          'rgba(54, 75, 181, 0.5)',
          'rgba(114, 155, 59, 0.5)',
          'rgba(102, 59, 155, 0.5)'
        ],
        backgroundColor: [
          'rgba(255,0,0,0.3)',
          'rgba(54, 75, 181, 0.3)',
          'rgba(114, 155, 59, 0.3)',
          'rgba(102, 59, 155, 0.3)'
        ]
      }];

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Number of animes', barThickness: 60, barPercentage: 0.1 }];
   public barChartLabels: Label[] = this._COURSES  // Array of strings
   public barChartOptions: ChartOptions = {
     responsive: true,
     scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
   };
   public barChartColors: Color[] = this._BAR_CHART_COLORS // 
   public barChartLegend = true;
   public barChartType: ChartType = 'bar';
   public barChartPlugins = [];
 



  
   public capsChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Number of episodes', barThickness: 60, barPercentage: 0.1 }];
   public capsChartLabels: Label[] = this._COURSES  // Array of strings
   public capsChartOptions: ChartOptions = {
     responsive: true,
     scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
   };
   public capsChartColors: Color[] = this._BAR_CHART_COLORS // 
   public capsChartLegend = true;
   public capsChartType: ChartType = 'line';
   public capsChartPlugins = [];


  public data: any = null;
  
  public token: string = localStorage.getItem('currentUser');
  

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private apollo: Apollo
    ) { }




   

  charts:Array<anime>;
  animetitles:Label[]= [];
  animeepisodes:number[]= [];
  searchbox:Array<searchbox>;

  isShownAi: boolean = false ;
  isShownGraph: boolean = false ;
  isShownMain: boolean = true ;
  itemsearch: boolean = false;
  searchfield;
  numbersearch;

  


  ngOnInit(): void {
    this.apollo
        .mutate({
          mutation: GetAnimeList,
          variables: {
            token: this.token,
          }})
          .subscribe(
            ({ data }) => {
              this.data = data;
              this.charts = this.data.getAnimeList.AnimeList;
              console.log(this.charts);
             
            },
            error => {
              console.log("there was an error sending the query", error);
            }
          );

          
  }
  
  
  logout(){
    this.authenticationService.logout();
    console.log("logged out");
    this.router.navigateByUrl('/');
  }

  activeGraph(){
    this.isShownAi = false;
    this.isShownGraph = true;
    this.isShownMain = false;
    let PG13 = 0;
     for (let i = 0; i < this.charts.length; i++) {
            if (this.charts[i].mpaaRating === 'PG-13 - Teens 13 or older') PG13++;
          }
          
    let R17 = 0;
          for (let i = 0; i < this.charts.length; i++) {
            if (this.charts[i].mpaaRating === 'R - 17+ (violence & profanity)') R17++;        
  
          }
    let R = 0;
          for (let i = 0; i < this.charts.length; i++) {
            if (this.charts[i].mpaaRating === 'R+ - Mild Nudity') R++;        
  
          }
    let G = 0;
          for (let i = 0; i < this.charts.length; i++) {
            if (this.charts[i].mpaaRating === 'G - All Ages') G++;        
  
          }
    let Rx = 0;
          for (let i = 0; i < this.charts.length; i++) {
            if (this.charts[i].mpaaRating === 'Rx - Hentai') Rx++;        
  
          }
    let PG = 0;
          for (let i = 0; i < this.charts.length; i++) {
            if (this.charts[i].mpaaRating === 'PG - Children') PG++;        
  
          }
          
          this.barChartData[0].data = [PG13, R17, R,G,Rx,PG]
          this.barChartLabels = ["PG-13+","R-17+", "R+", "G","Rx", "PG"]

          for (let i = 0; i < 200; i++) {
            this.animetitles.push(this.charts[i].title);       
  
          }
          for (let i = 0; i < 200; i++) {
            this.animeepisodes.push(this.charts[i].numEpisodes);       
  
          }
          
        console.log(this.animeepisodes);
        console.log( this.animetitles);

          this.capsChartData[0].data = this.animeepisodes;

          this.capsChartLabels = this.animetitles
          
     /*let result = this.chart_arr.map((o) => {
      return Object.values(o)
  }).reduce((prev, curr) => {
      return prev.concat(curr)
  }).filter((col, i, array) => {
      return array.indexOf(col) === i
  });
    this.barChartData[0].data =  result.map(v=> parseInt((result).toString())) 
    this.barChartLabels =  this.chart_arr.map((o) => {
      return Object.keys(o)
  }).reduce((prev, curr) => {
      return prev.concat(curr)
  }).filter((col, i, array) => {
      return array.indexOf(col) === i
  });
   */
  }
  activeAi(){
    this.isShownAi = true;
    this.isShownGraph = false;
    this.isShownMain = false;

    
    
    
  }
  activeMain(){
    this.isShownAi = false;
    this.isShownGraph = false;
    this.isShownMain = true;
    
   
  }

  search(){
    this.apollo
        .mutate({
          mutation: SearchAnime,
          variables: {
            token: this.token,
            title: this.searchfield
          }})
          .subscribe(
            ({ data }) => {
              this.itemsearch = true;
              this.data = data;
              this.searchbox= this.data.searchAnime.AnimeSearch;
              this.numbersearch = this.data.searchAnime.AnimeSearch.length;
              console.log("ok")
             
            },
            error => {
              console.log("there was an error sending the query", error);
            }
          );

  }


}