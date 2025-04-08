import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HackerNewsService } from "./hacker-news.service";
import { of } from "rxjs";


describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new HackerNewsService(httpClientSpy);
  });

  it('should retrieve news items successfully', (done: DoneFn) => {
    const pageNumber = 1;
    const pageSize = 2;
    const mockResponse: any = {
      items: [
        {
          id: 43621007,
          by: "norbert_kehrer",
          type: "story",
          title: "Show HN: Connecting an IBM 3151 terminal to a mainframe [video]",
          url: "https://www.youtube.com/watch?v=V14ac9cRi9Q"
        },
        {
          id: 43620125,
          by: "kwiktrip",
          type: "story",
          title: "LLM-hacker-news: LLM plugin for pulling content from Hacker News",
          url: "https://github.com/simonw/llm-hacker-news"
        }
      ],
      total: 220
    };

    httpClientSpy.get.and.returnValue(of(mockResponse));
  
    service.getAllNewsItems(pageNumber, pageSize).subscribe({
      next: (response) => {
        expect(response.items).withContext('expected news').toEqual(mockResponse.items);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });  

  it('should retrieve news items successfully with search', (done: DoneFn) => {
    const pageNumber = 1;
    const pageSize = 2;
    const searchQuery = "Show HN"
    const mockResponse: any = {
      items: [
        {
          id: 43621007,
          by: "norbert_kehrer",
          type: "story",
          title: "Show HN: Connecting an IBM 3151 terminal to a mainframe [video]",
          url: "https://www.youtube.com/watch?v=V14ac9cRi9Q"
        }
      ],
      total: 220
    };

    httpClientSpy.get.and.returnValue(of(mockResponse));
  
    service.getAllNewsItems(pageNumber, pageSize, searchQuery).subscribe({
      next: (response) => {
        expect(response.items).withContext('expected news').toEqual(mockResponse.items);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});

