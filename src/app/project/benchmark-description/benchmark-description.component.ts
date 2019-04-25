import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { ApiGetService } from '../../shared/core/apiget.service';

import { BenchmarkDescriptionService } from './benchmark-description.service';
import { BenchmarkDescription } from './benchmark-description.type';

@Component({
  selector: 'app-benchmark-description',
  templateUrl: './benchmark-description.component.html',
  styleUrls: ['./benchmark-description.component.css']
})
export class BenchmarkDescriptionComponent implements OnInit {
  headerRow: string[];
  dataArray: string[][];
  benchmarkDescription: BenchmarkDescription;

  constructor(
    private route: ActivatedRoute,
    private apiGetService: ApiGetService,
    private benchmarkDescriptionService: BenchmarkDescriptionService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const projectGuid = paramMap.get('guid');
      this.apiGetService.get(`repositories/${projectGuid}/benchmark_descriptions/`)
        .then((benchmarkDescriptions: BenchmarkDescription[]) => {
          if (benchmarkDescriptions.length) {
            this.benchmarkDescription = benchmarkDescriptions[0];
            const projectDescription = benchmarkDescriptions[0].project_data;
            if (projectDescription) {
              const dataArray = projectDescription.split('\n');
              this.dataArray = dataArray.map((row: string, index: number) => {
                if (index === 0) {
                  /* Don't try to parse topics from the header row */
                  return row.split(',');
                } else {
                  let topicsStartPos;
                  /* If populated, cell format will be "['a', 'b', 'c']" ... */
                  topicsStartPos = row.lastIndexOf(',"');
                  /* ... or else [] */
                  if (topicsStartPos === -1) {
                    topicsStartPos = row.lastIndexOf(',[');
                  }

                  const rowString = row.slice(0, topicsStartPos);
                  const rowArray = rowString.split(',');

                  let topicsString = row.slice(topicsStartPos + 1);
                  try {
                    /* "['a', 'b', 'c']" */
                    topicsString = JSON.parse(topicsString).replace(/'/g, '"');
                    const topicsArray: string[] = JSON.parse(topicsString);
                    topicsString = topicsArray.join(',');
                  } catch (e) {
                    /* [] */
                  }
                  rowArray.push(topicsString);

                  return rowArray;
                }
              });

              this.headerRow = this.dataArray.shift();
            }
          }
        });

    });
  }
}
