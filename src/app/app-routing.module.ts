import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  {path: '**', component: NewsComponent},
  {path: 'detail', component: NewsDetailsComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
