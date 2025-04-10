import { Component } from '@angular/core';
import { HackerNewsService } from './services/hacker-news.service';
import { NewsItems } from './types/news-items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  newsItems: NewsItems[] = [];
  pageNo: number = 1;
  total: number = 0;
  pageSize: number = 20;
  errorMessage: string = ""
  constructor(protected hackerNewsService: HackerNewsService){
  }

  ngOnInit() {
    this.getNewsItems(this.pageNo);
  }

  getNewsItems(pageNumber: number, searchQuery: string = ""){     
    this.hackerNewsService.getAllNewsItems(pageNumber, this.pageSize, searchQuery).subscribe({
      next: (response) => {
        this.newsItems = response.items;
        this.total = response.total;
      },
      error: (error) => {
        this.errorMessage = "Some error in fetching news items. Please reload or try after some time.";
        console.error('Error fetching news items:', error);
      }
    });    
  }

  pageChangeEvent(event: number){
    this.pageNo = event;
    this.getNewsItems(this.pageNo);
  }

  onSearchChange(searchValue:any){
    this.pageNo = 1;
    if(searchValue.value){
      this.getNewsItems(this.pageNo, searchValue.value)
    }
    else{
      this.getNewsItems(this.pageNo);
    }
  }
}
