import { Controller, Get, Query } from '@nestjs/common';
import { query } from 'express';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

interface SearchQueryParams {
  search: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  search(@Query() queryParams: SearchQueryParams): Observable<any> {
    console.log('params', queryParams);
    return this.appService.search(queryParams.search);
  }
}
