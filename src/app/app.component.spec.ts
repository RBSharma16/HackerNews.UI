import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { HackerNewsService } from './services/hacker-news.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let hackerNewsServiceSpy: any;

  beforeEach(async () => {
    hackerNewsServiceSpy = jasmine.createSpyObj('HackerNewsService', ['getAllNewsItems']);
    hackerNewsServiceSpy.getAllNewsItems.and.returnValue(of({ items: [], total: 0 }));

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: HackerNewsService, useValue: hackerNewsServiceSpy }
      ],
      imports: [NgxPaginationModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNewsItems on initialization', () => {
    spyOn(component, 'getNewsItems');
    component.ngOnInit();
    expect(component.getNewsItems).toHaveBeenCalledTimes(1);
    expect(component.getNewsItems).toHaveBeenCalledWith(1);
  });

  it('should retrieve news items', () => {
    const mockResponse: any = { items: [{ id: 1, title: 'News Item' }], total: 100 };
    hackerNewsServiceSpy.getAllNewsItems.and.returnValue(of(mockResponse));

    component.getNewsItems(1);
    expect(component.newsItems).toEqual(mockResponse.items);
    expect(component.total).toBe(mockResponse.total);
  });

  it('should handle page change event', () => {
    component.pageChangeEvent(2);
    expect(component.pageNo).toBe(2);
    expect(hackerNewsServiceSpy.getAllNewsItems).toHaveBeenCalledWith(2, 20, '');
  });

  it('should handle search change event with value', () => {
    const searchValue = { value: 'angular' };
    component.onSearchChange(searchValue);
    expect(hackerNewsServiceSpy.getAllNewsItems).toHaveBeenCalledWith(1, 20, 'angular');
  });

  it('should handle search change event without value', () => {
    const searchValue = { value: '' };
    component.pageNo = 2;
    component.onSearchChange(searchValue);
    expect(hackerNewsServiceSpy.getAllNewsItems).toHaveBeenCalledWith(2, 20, '');
  });
});
