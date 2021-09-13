import { Injectable } from '@nestjs/common';
import {ElasticsearchService} from '@nestjs/elasticsearch';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable()
export class AppService {

  private static readonly PAGE_OFFSET = 10;

  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {

  }

  search(query: string, page: string): Observable<any> {
    const fromPage =  (Number(page) - 1) * AppService.PAGE_OFFSET;
    const toPage = fromPage + AppService.PAGE_OFFSET;
    const elasticSearchResponse$: Observable<any> = from(this.elasticsearchService.search({
      index: 'web_crawler_s',
      track_total_hits: true,
      body: {
        query: {
          match_phrase: {
            content: query
          }
        },
        highlight: {
          pre_tags: ["<b>"], 
          post_tags: ["</b>"], 
          fragment_size: 300,
          number_of_fragments : 1,
          fields: {
            content: {}
          }
        },
        from: fromPage,
        size: toPage
      }
    })).pipe(
      map((elasticSearchResponse: any): any => {
        const hits = elasticSearchResponse.body.hits.hits;
        const content = hits.flatMap(hit => hit.highlight.content);

       const hitsData = hits.map(hit => {
          return {
            link: hit._source.link,
            content: hit.highlight.content[0]
          }
        })

        return {
          size: elasticSearchResponse.body.hits.total.value,
          searchResults: hitsData,
          
        }
      })
    )

    return elasticSearchResponse$;
  }
}

