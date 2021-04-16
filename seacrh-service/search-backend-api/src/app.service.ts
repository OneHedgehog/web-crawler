import { Injectable } from '@nestjs/common';
import {ElasticsearchService} from '@nestjs/elasticsearch';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable()
export class AppService {

  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {

  }

  search(query: string): Observable<any> {
    const elasticSearchResponse$: Observable<any> = from(this.elasticsearchService.search({
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
    })).pipe(
      map((elasticSearchResponse: any): string => {
        const hits = elasticSearchResponse.body.hits.hits;
        return hits.flatMap(hit => hit.highlight.content);
      })
    )

    return elasticSearchResponse$;
  }
}

