import { Controller, Get, Query } from '@nestjs/common';
import { query } from 'express';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppService } from './app.service';

interface SearchQueryParams {
  search: string,
  page: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  search(@Query() queryParams: SearchQueryParams): Observable<any> {
    try {
      return this.appService.search(queryParams.search, queryParams.page);
    } catch (err: Error | any) {
      return of({
        name: 'error prototype',
        message: 'message prototype'
      })
    }

  }
}
