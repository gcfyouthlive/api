import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AgeDemographicStats, AgeDemographicStatsD3 } from './age-demographic-stats.model';

const credentials = require('../../../../config/credentials.json');

@Injectable()
export class ReportsDataService {

  private peopleUrl = credentials.API_URL + '/campers';

  constructor(
    private http: HttpClient
  ) { }

  getAgeDemographicStats(): Observable<AgeDemographicStats[]> {
    const url = `${this.peopleUrl}/stats/age_demographic`;
    return this.http.get<AgeDemographicStats[]>(url);
  }

  getAgeDemographicStatsD3(): Observable<AgeDemographicStatsD3[]> {
    const url = `${this.peopleUrl}/stats/age_demographic_d3`;
    return this.http.get<AgeDemographicStatsD3[]>(url);
  }
}
