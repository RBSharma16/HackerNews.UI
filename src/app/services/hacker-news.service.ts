import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private env: any;
  constructor(private http: HttpClient) {
  }

  getAllNewsItems(pageNumber: number, pageSize: number, searchQuery: string = "") {
    var status = this.http.get<any>('https://localhost:44300/api/HackerNews/' + pageNumber + '/' + pageSize + '/items?title=' + searchQuery)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
    return status;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        'Backend returned code ${error.status}, body was: ', error.error);
    }

    return throwError(() => new Error('Failed http request'));
  }
}
