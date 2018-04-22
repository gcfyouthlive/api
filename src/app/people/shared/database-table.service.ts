import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person } from './person.model';

@Injectable()
export class DatabaseTableService {
  private peopleUrl = 'https://api.gcfyouthlive.com/campers';
  private peopleList = new BehaviorSubject<Person[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  refreshTable(): void {
    this.http.get<Person[]>(this.peopleUrl).subscribe(people => {
      this.peopleList.next(people);
    });
  }

  getPeopleList(): Observable<Person[]> {
    return this.peopleList.asObservable();
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.peopleUrl, person);
  }

  deletePeople(people_ids): void {
    for (let id of people_ids) {
      const url = `${this.peopleUrl}/${id}`;
      this.http.delete(url).subscribe( () => {
        this.refreshTable();
      });
    }
  }
}
