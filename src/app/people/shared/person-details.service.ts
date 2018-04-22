import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person } from './person.model';
import { DatePipe } from '@angular/common';

@Injectable()
export class PersonDetailsService {
  private peopleUrl = 'https://api.gcfyouthlive.com/campers';
  private person = new BehaviorSubject<Person>(new Person);

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  getPersonById(id: string): void {
    const url = `${this.peopleUrl}/${id}`;
    this.http.get<Person>(url).subscribe(person => {
      person.birthdate = this.datePipe.transform(person.birthdate, 'y-MM-dd');
      this.person.next(person);
    });
  }

  updatePerson(person: Person): void {
    const url = `${this.peopleUrl}/${person._id}`;
    this.http.put<Person>(url, person).subscribe(person => {
      this.person.next(person);
    });
  }

  getPerson(): Observable<Person> {
    return this.person.asObservable();
  }
}
