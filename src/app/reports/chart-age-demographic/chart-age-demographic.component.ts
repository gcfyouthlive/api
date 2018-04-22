import { Component, OnInit } from '@angular/core';
import { ReportsDataService } from '../shared/reports-data.service';
import { AgeDemographicStats } from '../shared/age-demographic-stats.model';
import * as c3 from 'c3';

@Component({
  selector: 'app-chart-age-demographic',
  templateUrl: './chart-age-demographic.component.html',
  styleUrls: ['./chart-age-demographic.component.css']
})
export class ChartAgeDemographicComponent implements OnInit {

  stats: AgeDemographicStats[];

  getAgeDemographicStats(): void {
    this.reportsDataService.getAgeDemographicStats().subscribe(stats => {
      var chart = c3.generate({
        bindto: '#bar-example',
        data: {
          json: stats,
          keys: {
            x: 'age',
            value: ['F', 'M']
          },
          //groups: [['F', 'M']],
          type: 'bar',
          names: {
            'F': 'Female',
            'M': 'Male'
          }
        },
        axis: {
          x: {
            type: 'indexed',
            min: 12,
            tick: {
              culling: false
            }
          }
        },
        bar: {
          width: 6
        },
        legend: {
          position: 'inset',
          inset: {
            anchor: 'top-right'
          }
        }
      });
    });
  }

  constructor(private reportsDataService: ReportsDataService) { }

  ngOnInit() {
    this.getAgeDemographicStats();
  }

}
