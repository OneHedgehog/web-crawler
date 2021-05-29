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
        from: 0,
        size: 9
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

        console.log(hitsData);
      })
    )

    return elasticSearchResponse$;
  }
}

