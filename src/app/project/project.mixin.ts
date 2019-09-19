import { Score } from '../shared/score.type';
import { Measurement } from '../shared/measurement.type';

import { ProjectService } from './project.service';

export class ProjectMixin {
  projectsScores: { [projectGuid: string]: Score[] } = {};
  baselineScores: { [projectGuid: string]: Score[] } = {};

  constructor(protected projectService: ProjectService) {}

  fetchProjectMeasurements(projectGuid: string): Promise<Measurement[]> {
    return this.projectService.getMeasurements(projectGuid).then(
      (measurements: Measurement[]) => {
        const lastMeasurement = measurements && measurements.slice(-1)[0];

        if (lastMeasurement) {
          this.onLatestMeasurement(projectGuid, lastMeasurement);
        }

        const baselineMeasurement = this._findBaselineMeasurement(measurements);
        this.onBaselineMeasurement(projectGuid, baselineMeasurement);

        return measurements;
      });
  }

  _findBaselineMeasurement(measurements: Measurement[]) {
    /* The baseline measurement is the first Measurement marked is_baseline,
     * or the first Measurement taken if none marked as baseline */
    let baselineMeasurement = measurements.find(
      (measurement: Measurement) => measurement.is_baseline);

    if (! baselineMeasurement && measurements.length) {
      baselineMeasurement = measurements[0];
    }

    return baselineMeasurement;
  }

  onBaselineMeasurement(projectGuid: string, measurement: Measurement) {
    if (! measurement) return;

    /* Store projects baseline measurement scores */
    const baselineMeasurement = this.parseGuid(measurement.url, true);

    this.projectService.getScores(projectGuid, baselineMeasurement).then(
      (scores: Score[]) => {
        this.baselineScores[projectGuid] = scores;
      });
  }

  onLatestMeasurement(projectGuid: string, measurement: Measurement) {
    if (! measurement) return;

    /* Store projects latest measurement scores */
    const lastMeasurementGuid = this.parseGuid(measurement.url, true);

    this.projectService.getScores(projectGuid, lastMeasurementGuid).then(
      (scores: Score[]) => {
        this.projectsScores[projectGuid] = scores;
      });
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

  getGradeByName(projectGuid: string, scoreName: string) {
    const projectScores = this.projectsScores[projectGuid] || [];
    for (let score of projectScores) {
      if (score.name === scoreName) {
        return score.grade;
      }
    }
    return "?";
  }

  getTrendByName(projectGuid: string, scoreName: string) {
    const projectScores = this.projectsScores[projectGuid] || [];
    const baselineScores = this.baselineScores[projectGuid] || [];

    const projectScore = projectScores.find(score => score.name === scoreName);
    const baselineScore = baselineScores.find(score => score.name === scoreName);

    if (! baselineScore || ! projectScore) {
      return '';
    }

    if (baselineScore.grade_value > projectScore.grade_value) {
      return 'down';
    }
    else if (baselineScore.grade_value < projectScore.grade_value) {
      return 'up';
    }
    else if (baselineScore.grade_value === projectScore.grade_value) {
      return 'nochange';
    }
  }

  getIconNameByGrade(grade: string) {
    let iconName = '';

    switch (grade) {
      case 'A':
        iconName = 'icon-check';
        break;
      case 'B':
        iconName = 'icon-check';
        break;
      case 'C':
        iconName = 'icon-caution';
        break;
      case 'D':
        iconName = 'icon-alert';
        break;
      case 'F':
        iconName = 'icon-alert';
        break;
    }
    return iconName;
  }

  getClassSuffixByGrade(grade: string) {
    let classSuffix = '';

    switch (grade) {
      case 'A':
        classSuffix = '-is-ok';
        break;
      case 'B':
        classSuffix = '-is-ok';
        break;
      case 'C':
        classSuffix = '-is-caution';
        break;
      case 'D':
        classSuffix = '-is-alert';
        break;
      case 'F':
        classSuffix = '-is-alert';
        break;
    }
    return classSuffix;
  }

}
