import { Injectable } from '@nestjs/common';
import {ElasticsearchService} from '@nestjs/elasticsearch';

@Injectable()
export class AppService {

  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {

  }

  search(query: string): string {
    const test = this.elasticsearchService.search({
      index: 'web_crawler_s',
      body: {
        query: {
          match_phrase: {
            content: query
          }
        },
        highlight: {
          fields: {
            content: {}
          }
        }
      }
    })
      .then((data) => {
        // result here
        console.log('data', data.body.hits);
      })
      .catch((err) => {
        console.log('err', err);
      });

    return 'Hello World fd!';
  }
}

