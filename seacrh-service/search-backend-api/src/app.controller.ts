import { Controller, Get, Query } from '@nestjs/common';
import { query } from 'express';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';

interface SearchQueryParams {
  search: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  search(@Query() queryParams: SearchQueryParams): Observable<any> {
    try {
      return this.appService.search(queryParams.search);
    } catch (err: Error | any) {
      return of({
        name: 'error prototype',
        message: 'message prototype'
      })
    }

  }
}
