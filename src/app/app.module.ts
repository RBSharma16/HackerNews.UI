import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsDetailsComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    RouterModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
