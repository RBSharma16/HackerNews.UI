import { Component } from '@angular/core';
import { HackerNewsService } from '../hacker-news.service';
import { NewsItems } from '../news-items';

@Component({
  selector: 'app-news',
  standalone: false,
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  newsItems: NewsItems[] = [];
  pageNo: number = 1;
  total: number = 0;
  pageSize: number = 20;
  constructor(protected hackerNewsService: HackerNewsService){
  }

  ngOnInit() {
    this.getNewsItems(1);
  }

  getNewsItems(pageNumber: number, searchQuery: string = ""){    
     this.hackerNewsService.getAllNewsItems(pageNumber,this.pageSize, searchQuery).subscribe(response => {
        this.newsItems = response.items;
        this.total = response.total;
    })
  }

  pageChangeEvent(event: number){
    this.pageNo = event;
    this.getNewsItems(this.pageNo);
  }

  onSearchChange(searchValue:any){
    if(searchValue.value){
      this.getNewsItems(1, searchValue.value)
    }
    else{
      this.getNewsItems(this.pageNo);
    }
  }
}
