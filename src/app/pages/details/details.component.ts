import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympics } from 'src/app/core/models/Olympics';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { BasicOptions, ChartsData } from 'src/app/core/models/Charts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  })
export class DetailsComponent implements OnInit{
  public olympics$: Observable<any> = of(null);
  public totalJOsPerCountry!:number;
  public totalMedalsPerCountry!:number;
  public totalAthletesPerCountry!:number;
  
  public totalJOs!:number;
  public totalMedals!:number;

  public countryName!: string;
  public participationOfCountry!: number;
  public medalsOfCountry!: number;
  public totalAthletes!: number;

  basicData!: ChartsData;
  basicOptions!: BasicOptions;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    console.log(id);
    this.olympics$ = this.olympicService.getOlympics();
    this.olympicService.getOlympics().subscribe (
      (datasPerCountry:Olympics[]) => {
        if (datasPerCountry == undefined)return;
        let medalsCount:number[]=[];
        this.totalMedals = 0;
        for(let olympic of datasPerCountry){
					medalsCount.push(this.calcMedals(olympic));
          if(id == olympic.id) {
            this.countryName = olympic.country;
            let medals = this.listMedalsPerJOs(olympic);
            let years = this.listYearsPerJOs(olympic);
            this.graphCountry(years,medals);
            this.participationOfCountry = olympic.participations.length;
            this.medalsOfCountry = this.calcMedals(olympic);
            this.totalAthletes = this.calcAthletes(olympic);
          }
         }
  
      }
    );

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: textColor,
              },
          },
      },
      scales: {
        x: {
            ticks: {
                color: textColorSecondary,
            },
            grid: {
                color: surfaceBorder,
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                color: textColorSecondary,
            },
            grid: {
                color: surfaceBorder,
            },
        },
    },
};   
  }

  private calcMedals(olympic:Olympics):number{
  let totalMedals = 0;
  for(let participation of olympic.participations){
    totalMedals += participation.medalsCount;
    }
  return totalMedals
  }

  private listMedalsPerJOs(olympic:Olympics):number[]{
    let medalsPerJOs: number[] = [];
    for(let participation of olympic.participations){
      medalsPerJOs.push(participation.medalsCount);
    }
    return medalsPerJOs
  }

  private listYearsPerJOs(olympic:Olympics):string[]{
    let yearsPerJOs: string[] = [];
    for(let participation of olympic.participations){
      yearsPerJOs.push(participation.year+'');
    }
    return yearsPerJOs
  }

  private calcAthletes(olympic:Olympics):number{
    let totalAthletes = 0;
    for(let participation of olympic.participations){
      totalAthletes += participation.athleteCount;
    }
    return totalAthletes
  }
 
  private graphCountry(years:string[], medals:number[]){
    this.basicData = {
      labels: years,
      datasets: [
          {
              label: 'Number of medals',
              data: medals,
              backgroundColor: [
                  'rgba(249, 115, 22, 0.2)',
                  'rgba(6, 182, 212, 0.2)',
                  'rgba(107, 114, 128, 0.2)',
                  'rgba(139, 92, 246, 0.2)',
              ],
              borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
              borderWidth: 1,
          },
      ],
  };
  }
  
}
