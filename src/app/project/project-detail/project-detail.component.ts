import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Route, Router, ParamMap } from '@angular/router';

import { ChartMouseOverEvent } from 'ng2-google-charts';

import { Benchmark } from '../../shared/benchmark.type';
import { Repository } from '../../shared/repository.type';
import { Measurement } from '../../shared/measurement.type';
import { ComponentMeasurement } from '../../shared/component-measurement.type';
import { WindowRefService } from '../../shared/core/window-ref.service';

import { ProjectMixin } from '../project.mixin';
import { ProjectService } from '../project.service';

import { slidePanel } from './project-detail.animations';
import {MessageService} from '../../shared/message/message.service';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  animations: [ slidePanel ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailComponent extends ProjectMixin implements OnInit {
  confirmDelete = false;
  project: Repository;
  benchmarks: void | Benchmark[];
  measurements: Measurement[];
  latestMeasurement: Measurement;
  baselineMeasurement: Measurement;
  previousMeasurement: Measurement;
  treeMapData: any;
  lineOptions: any = {
    chart: {
      type: 'lineChart',
      height: 72,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      showLegend: false,
      xAxis: {
        rotateLabels: -45,
        tickValues: [],
        tickFormat: function(d) {
          return d3.time.format('%b %d %Y %H:%M')(new Date(d));
        },
      },
      useInteractiveGuideline: true,
    }
  };

  readmoresAnimationState: any = {
    architecture: 'inactive',
    complexity: 'inactive',
    clarity: 'inactive',
    activity: 'inactive',
    treemap: 'inactive',
    info: 'inactive',
    coreSize: 'inactive',
    propagationCost: 'inactive',
    complexityOverall: 'inactive',
    duplicateLinesOfCode: 'inactive',
    commentDensity: 'inactive',
    readability: 'inactive'
  };

  constructor(protected projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute,
              private windowRef: WindowRefService,
              private messageService: MessageService,
              private cd: ChangeDetectorRef) { super(projectService); }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const projectGuid = paramMap.get('guid');
      this.fetchProjectData(projectGuid);
    });
  }

  fetchProjectData(projectGuid: string) {
    const [projectPromise, benchmarksPromise, measurementsPromise] =
      [this.projectService.getProject(projectGuid),
        this.projectService.getBenchmarks(projectGuid),
        this.fetchProjectMeasurements(projectGuid)];

    Promise.all([projectPromise, benchmarksPromise, measurementsPromise]).then(([project, benchmarks, measurements]) => {
        if (project) {
          this.project = <Repository>project;
        }
        this.benchmarks = benchmarks;
        this.measurements = measurements;

        if (measurements.length >= 2) {
          this.previousMeasurement = measurements.slice(-2)[0];  // Second from the last element
        }

        this.cd.detectChanges();
    });
  }

  onBaselineMeasurement(projectGuid: string, measurement: Measurement) {
    this.baselineMeasurement = measurement;
    super.onBaselineMeasurement(projectGuid, measurement);
  }

  onLatestMeasurement(projectGuid: string, measurement: Measurement) {
    this.latestMeasurement = measurement;

    const measurementGuid = this.parseGuid(measurement.url, true);
    this.buildComponentTreemap(projectGuid, measurementGuid);

    super.onLatestMeasurement(projectGuid, measurement);
  }

  createMeasurement(): void {
    const projectGuid = this.parseGuid((<Repository>this.project).url);

    this.messageService.add(
      'Analyzing project',
      'An email will be sent to you when analysis is complete.');

    this.projectService.createMeasurement(projectGuid);
    this.router.navigate(['/project', 'list']);
  }

  buildComponentTreemap(projectGuid: string, measurementGuid: string) {
    this.projectService.getComponentMeasurements(
      projectGuid, measurementGuid).then(
        (componentMeasurements: ComponentMeasurement[]) => {
          const componentMeasurementArray = componentMeasurements.map(
            (componentMeasurement: ComponentMeasurement) => {
              return [componentMeasurement.node,
                componentMeasurement.parent,
                componentMeasurement.useful_lines,
                componentMeasurement.threshold_violations,
                componentMeasurement.full_name]
          })

          this.treeMapData = {
            chartType: 'TreeMap',
            dataTable: [
              ['Node', 'Parent', 'Useful Lines', 'Threshold Violations', 'Full Name'],
              ['Project', null, 0, 0, 'Project'],
              ...componentMeasurementArray
            ],
            options: {
              minColor: '#2abb85',
              maxColor: '#fc363b',
              midColor: '#d2f2e6',
              headerHeight: 15,
              fontColor: 'black',
              showScale: true,
              useWeightedAverageForAggregation: true,
              maxDepth: 1,
              height: 345,
            }
          };

          this.cd.detectChanges();
        });
  }

  toggleReadmore(readmoreStateKey: string, ev: any) {

    this.readmoresAnimationState[readmoreStateKey] =
      (this.readmoresAnimationState[readmoreStateKey] === 'inactive'
        ? 'active' : 'inactive');

      const element = ev.currentTarget;
      element.classList.toggle('readmore-is-expanded');
  }

  getBenchmarkByName(benchmarkName: string) {
    if (this.benchmarks instanceof Array) {
      for (let benchmark of this.benchmarks) {
        if (benchmark.measurement_name === benchmarkName) {
          return benchmark;
        }
      }
    }
  }

  getStatisticStatusByPercent(latestMeasurement: Measurement, measurementProperty: string, reverse = false) {
    const benchmark = this.getBenchmarkByName(measurementProperty);
    const measurementValue = latestMeasurement[measurementProperty];

    if (benchmark && measurementValue) {

      if (! reverse) {
        if (measurementValue > benchmark.upper_threshold) {
          return "alert";
        } else if (measurementValue >= benchmark.percentile_50) {
          return "caution";
        } else {
          return "ok";
        }
      } else {
        if (measurementValue > benchmark.percentile_50) {
          return "ok";
        } else if (measurementValue > benchmark.percentile_25) {
          return "caution";
        } else {
          return "alert";
        }
      }

    }
  }

  roundObjectValues(object: any) {
    for (let propertyName in object) {
      if (object.hasOwnProperty(propertyName)) {
        let propertyValue = object[propertyName];
        if (typeof(propertyValue) === 'number') {
          object[propertyName] = this.roundPrecision(propertyValue, 1);
        }
      }
    }
  }

  roundPrecision(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

  buildLineData(valueLabel = 'Value', measurementProperty: string, measurements: Measurement[], benchmarkName: string, reverse = false) {
    let measurementsValues = [],
      zero = [],
      percentile_25 = [],
      percentile_50 = [],
      upper_threshold = [],
      measurementsLength = (measurements && measurements.length) || 0,
      benchmark = this.getBenchmarkByName(benchmarkName || measurementProperty);

    if (! benchmark) return;

    this.roundObjectValues(benchmark);

    for (let index = 0; index < measurementsLength; index++) {
      var measurement = measurements[index],
        datetimeFormat = d3.time.format('%Y-%m-%dT%H:%M:%SZ'),
        measurementDate = +datetimeFormat.parse(measurement.date);

      this.roundObjectValues(measurement);

      measurementsValues.push({ x: measurementDate, y: measurement[measurementProperty] });

      zero.push({ x: measurementDate, y: 0 });
      upper_threshold.push({ x: measurementDate, y: benchmark.upper_threshold });
      percentile_50.push({ x: measurementDate, y: benchmark.percentile_50 });
      percentile_25.push({ x: measurementDate, y: benchmark.percentile_25 });
    }

    if (measurementsLength === 1) {
      let nextDay = d3.time.day.offset(new Date(measurementDate), 1);
      // If there is only one value, still visually display a line
      measurementsValues.push({ x: nextDay, y: measurement[measurementProperty] });
      zero.push({ x: nextDay, y: 0 });
      upper_threshold.push({ x: nextDay, y: benchmark.upper_threshold });
      percentile_50.push({ x: nextDay, y: benchmark.percentile_50 });
      percentile_25.push({ x: nextDay, y: benchmark.percentile_25 });
    }

    let lineData = [
      {
        key: "75th Percentile",
        values: upper_threshold,
        color: '#fff3df',
        area: true,
      },
      {
        key: "50th Percentile",
        values: percentile_50,
        color: '#b0e7d3',
        area: true,
      },
      {
        key: "25th Percentile",
        values: percentile_25,
        color: '#6dd1ac',
        area: true,
      },
      {
        key: valueLabel,
        values: measurementsValues,
        color: 'black',
      },
    ];

    if (reverse) {
      lineData[0].color = '#b0e7d3';
      lineData[1].color = '#fff3df';
      lineData[2].color = '#fcc';
    }

    return lineData;
  }

  setYAxisRange(lineOptions, measurementProperty: string) {
    let highestValueOfProperty;

    for (let measurement of this.measurements) {
      if (! highestValueOfProperty || measurement[measurementProperty] > highestValueOfProperty) {
        highestValueOfProperty = measurement[measurementProperty];
      }
    }

    lineOptions = Object.assign({}, lineOptions);
    lineOptions.chart.forceY = [0, highestValueOfProperty + (highestValueOfProperty * 0.10)];

    return lineOptions;
  }

  deleteProject(projectUUID: string) {
    this.projectService.deleteProject(projectUUID).then((success: boolean) => {
      this.router.navigate(['..']);
    });
  }

  daysAgo(beforeDate: string, aheadDate: string): number {
    const before: any = new Date(beforeDate);
    const ahead: any = new Date(aheadDate);

    return Math.round((ahead - before) / 1000 / 60 / 60 / 24);
  }
}
