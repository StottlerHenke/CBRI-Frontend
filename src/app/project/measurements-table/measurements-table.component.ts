import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Score } from '../../shared/score.type';
import { Measurement } from '../../shared/measurement.type';
import { ApiGetService } from '../../shared/core/apiget.service';

import { ProjectMixin } from '../project.mixin';
import { ProjectService } from '../project.service';

import { MeasurementsTableService } from './measurements-table.service';
import { MeasurementsTable } from './measurements-table.type';

@Component({
  selector: 'app-measurements-table',
  templateUrl: './measurements-table.component.html',
  styleUrls: ['./measurements-table.component.css']
})
export class MeasurementsTableComponent implements OnInit {
  headerRow: string[];
  dataArray: string[][];

  measurements: Measurement[];
  measurementsScores: { [measurementGuid: string]: Score[] } = {};

  constructor(
    protected projectService: ProjectService,
    private route: ActivatedRoute,
    private apiGetService: ApiGetService,
    private measurementsTableService: MeasurementsTableService) {
      // super(projectService);
    }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const projectGuid = paramMap.get('guid');

      this.projectService.getMeasurements(projectGuid).then(
        (measurements: Measurement[]) => {
          this.measurements = measurements;

          const getScores$: Promise<void | Score[]>[] = measurements.map(
            (measurement: Measurement) => {
              const measurementGuid = this.parseGuid(
                measurement.url, true);

                return this.projectService.getScores(
                  projectGuid, measurementGuid);
            });

          Promise.all(getScores$).then(
            (measurementsScoresArray: Score[][]) => {
              measurementsScoresArray.map((scores: Score[]) => {
                if (scores && scores.length) {
                  const measurementGuid = this.parseGuid(
                    scores[0].measurement, true);

                  this.measurementsScores[measurementGuid] =
                    scores;
                }
              });

              this.buildHeaderRow(this.measurements, this.measurementsScores);
              this.buildDataArray(this.measurements, this.measurementsScores);
            });
        });
    });
  }

  _notAnHttpString(value: any) {
    return typeof value !== "string" || ! value.startsWith('http');
  }

  buildHeaderRow(measurements: Measurement[], measurementsScores: { [measurementGuid: string]: Score[] }) {
    const firstMeasurement: Measurement = measurements[0];
    const measurementGuid: string = this.parseGuid(firstMeasurement.url, true);
    const firstScores: Score[] = measurementsScores[measurementGuid];

    let measurementHeader = Object.keys(firstMeasurement);
    measurementHeader = measurementHeader.filter((measurementKey: string) => {
      const firstMeasurementValue = firstMeasurement[measurementKey];
      return this._notAnHttpString(firstMeasurementValue);
    });
    const scoreHeader = ['{score_name}_grade', '{score_name}_value'];

    const headerRow: string[] = new Array(...measurementHeader);
    for (let x = 0; x < firstScores.length; x++) {
      const score = firstScores[x];
      let scoreHeaderDynamic = scoreHeader.map((headerString: string) => {
        return headerString.replace('{score_name}', score.name);
      });
      headerRow.push(...scoreHeaderDynamic);  // Add the score header again, for each score
    }

    this.headerRow = headerRow;
  }

  buildDataArray(measurements: Measurement[], measurementsScores: { [measurementGuid: string]: Score[] }) {
    const dataArray: string[][] = measurements.map((measurement: Measurement) => {
      const measurementGuid: string = this.parseGuid(measurement.url, true);
      const measurementScores: Score[] = measurementsScores[measurementGuid];
      let dataRow: string[] = Object.values(measurement);
      dataRow = dataRow.reduce((nonUrlDataRow, measurementValue) => {
        if (this._notAnHttpString(measurementValue)) {
          nonUrlDataRow.push(measurementValue);
        }
        return nonUrlDataRow;
      }, []);
      dataRow = dataRow.map((measurementValue: any) => {
        if (typeof measurementValue === "string") {
          const tryDate = new Date(measurementValue);
          if (tryDate.valueOf()) {
            measurementValue = tryDate.toLocaleString();
          }
        }
        return measurementValue;
      });
      const measurementScoresFlat: string[] = measurementScores.reduce(
        (arr, score: Score) => {
          arr.push(...[score.grade, score.grade_value]);
          return arr;
        }, []);
      dataRow.push(...measurementScoresFlat);

      return dataRow;
    });

    this.dataArray = dataArray;
  }

  parseGuid(projectUrl: string, returnLastGuid: boolean = false): string {
    /*
     * Traverse path segments, returning a segment with four dashes
     */

    const stripTrailingSlash = projectUrl.replace(/\/$/, '');
    let pathSegments = stripTrailingSlash.split('/');

    if (returnLastGuid) {
      pathSegments = pathSegments.reverse();
    }

    for (let path of pathSegments) {
      const numDashes = path.match(/-/g);

      if (numDashes && numDashes.length === 4) {
        return path;
      }
    }
  }
}
