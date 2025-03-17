import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RouterLink } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { OlympicService } from './core/services/olympic.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChartModule } from 'primeng/chart';
import { MessageModule } from 'primeng/message';
import { NoDataComponent } from './pages/no-data/no-data.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailsComponent, NoDataComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, RouterLink, ChartModule, MessageModule],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
