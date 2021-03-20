import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  search(query: string): string {
    return 'Hello World fd!';
  }
}

