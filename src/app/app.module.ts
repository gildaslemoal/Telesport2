import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TitleComponent } from "./graphics/title/title.component";
import { HeaderComponent } from './graphics/header/header.component';
import { ContextComponent } from './graphics/context/context.component';
import { PieComponent } from './graphics/pie/pie.component';
import { RouterLink } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { NumbersComponent } from './graphics/numbers/numbers.component';
import { LineComponent } from './graphics/line/line.component';
import { OlympicService } from './core/services/olympic.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChartModule } from 'primeng/chart';
import { MessageModule } from 'primeng/message';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, TitleComponent, HeaderComponent, ContextComponent, PieComponent, RouterLink, NumbersComponent, LineComponent, ChartModule, MessageModule],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
