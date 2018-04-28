import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPersonModalComponent } from '../add-person-modal/add-person-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatabaseTableService } from '../shared/database-table.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-people-database',
  templateUrl: './people-database.component.html',
  styleUrls: ['./people-database.component.css']
})
export class PeopleDatabaseComponent implements OnInit {

  databases = [
    {id: 0, name:'All Signups', query:""},
    {id: 1, name:'All HS Signups', query:"?camp=HS"},
    {id: 2, name:'HS Camp - Paid', query:"?camp=HS&paid=true"},
    {id: 3, name:'HS Camp - Unpaid', query:"?camp=HS&paid=false"},
    {id: 4, name:'All College - Signups', query:"?camp=Col"},
    {id: 5, name:'College Camp - Paid', query:"?camp=Col&paid=true"},
    {id: 6, name:'College Camp - Unpaid', query:"?camp=Col&paid=false"}
  ];
  activeDatabase = 0;
  bsModalRef: BsModalRef;
  selectedPeople = {};
  selectedAllPeople = false;
  peopleList$: Observable<Person[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private databaseTableService: DatabaseTableService
  ) { }

  viewPerson(person: Person) {
    this.router.navigate(['../view', person._id], {relativeTo: this.route})
  }

  addPerson() {
    this.modalService.show(AddPersonModalComponent);
  }

  deletePeople() {
    var toDelete = Object.entries(this.selectedPeople).filter(arr => arr[1]).map(arr => arr[0]);
    this.databaseTableService.deletePeople(toDelete);
    this.selectedPeople = {};
  }

  refreshTable() {
    this.databaseTableService.refreshTable();
  }

  showDatabase(database_id) {
    this.activeDatabase = database_id;
    this.peopleList$ = this.databaseTableService.getPeopleList(this.databases[database_id].query);
    this.refreshTable();
  }

  selectAllPeople(): void {
    // this.
  }

  ngOnInit() {
    this.refreshTable();
    this.peopleList$ = this.databaseTableService.getPeopleList("");
  }

}
