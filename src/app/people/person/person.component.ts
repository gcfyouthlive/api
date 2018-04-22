import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../shared/person.model';
import { PersonDetailsService } from '../shared/person-details.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  person$: Observable<Person>;

  constructor(
    private route: ActivatedRoute,
    private personDetailsService: PersonDetailsService
  ) { }

  getPerson(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.personDetailsService.getPersonById(id);
  }

  ngOnInit() {
    this.person$ = this.personDetailsService.getPerson();
    this.getPerson();
  }
}
