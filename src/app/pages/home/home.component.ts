import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympics } from 'src/app/core/models/Olympics';
import { Router } from '@angular/router';
import { BasicOptions, ChartsData } from 'src/app/core/models/Charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	
  	public olympics$: Observable<Olympics[]> = of([]);
  	public totalOlympics!:number;
  	public totalMedals!:number;
	public totalJOs!:number;
	private countries!:Olympics[];
	private subscription!: Subscription;
	
	dataChart !: ChartsData;
	options !: BasicOptions;

  	constructor(private olympicService: OlympicService, private router: Router) {}

  	ngOnInit(): void {
		
		const documentStyle = getComputedStyle(document.documentElement);
    	const textColor = documentStyle.getPropertyValue('--p-text-color');
    	
      	this.options = {
			maintainAspectRatio: false,
			plugins: {
		   		legend: {
		     		labels: {
		        		usePointStyle: true,
		       			color: '#000000'
		     		}
				}
			}
   		};
		
   		this.olympics$ = this.olympicService.getOlympics();
   		
    	this.subscription = this.olympicService.getOlympics().subscribe (
			(datas:Olympics[]) => {
				if (datas == undefined)return;
				this.totalOlympics = datas.length;
				let countryName:string[]=[];
				let medalsCount:number[]=[];
				this.totalJOs = this.calcJOs(datas).length;
				this.totalMedals = 0;
				for(let olympic of datas){
					countryName.push(olympic.country);
					medalsCount.push(this.calcMedals(olympic));
					this.totalMedals += this.calcMedals(olympic);
				}
				this.countries = datas;
				this.dataChart = {
					labels: countryName,
				 datasets: [
						{
						data: medalsCount,
						backgroundColor: ['#793d52', '#89a1db', '#9780a1','#956065', '#bfe0f1'],
						hoverBackgroundColor: ['#793d52', '#89a1db', '#9780a1','#956065', '#bfe0f1']
						}
				   ]
			   };
			 }
		);

  }
  private calcMedals(olympic:Olympics):number{
    let totalMedals = 0;
    for(
      let participation of olympic.participations
    ){
      totalMedals += participation.medalsCount;
    }
    return totalMedals
  }
  private calcJOs(olympics:Olympics[]):number[]{
	let JOsCount:number[]=[];
	for(
		let olympic of olympics
	){
		for(
			let participation of olympic.participations
		){
			if(JOsCount.indexOf(participation.year)==-1){
				JOsCount.push(participation.year);
			}
		}
	}
	return JOsCount;
  }


  public onCountryClick(event:any){
	let country = this.countries[event.element.index];
	this.router.navigateByUrl(`details/${country.id}`);
  }

  ngOnDestroy(): void {
	this.subscription.unsubscribe();
  }
}
