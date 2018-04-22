import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Person } from '../shared/person.model';

import { PersonDetailsService } from '../shared/person-details.service';

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.css'],
})
export class PersonProfileComponent implements OnInit {

  private person$: Observable<Person>;
  private person: Person;
  public personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personDetailsService: PersonDetailsService
  ) {
    this.personForm = fb.group({
      given_name: '',
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      full_name: '',
      nickname: '',
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      mobileno: '',
      email: '',
      facebook_id: '',
      year: '',
      course: '',
      school: '',
      church: ''
    });
  }

  loadData(): void {
    this.person$.subscribe(person => {
      this.person = person;
      this.personForm.reset(this.person);
    });
  }

  submitData(): void {
    const savePerson: Person = this.personForm.value;
    savePerson._id = this.person._id;
    this.personDetailsService.updatePerson(savePerson);
    this.loadData();
  }

  revertData(): void {
    this.personForm.reset(this.person);
  }

  refreshData(): void {
    this.loadData();
  }

  ngOnInit() {
    this.person$ = this.personDetailsService.getPerson();
    this.loadData();
  }
}
