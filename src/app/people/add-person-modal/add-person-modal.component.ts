import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../shared/person.model';
import { DatabaseTableService } from '../shared/database-table.service';

@Component({
  selector: 'app-add-person-modal',
  templateUrl: './add-person-modal.component.html',
  styleUrls: ['./add-person-modal.component.css']
})
export class AddPersonModalComponent {

  newPersonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private databaseTableService: DatabaseTableService,
    public modalRef: BsModalRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.newPersonForm = fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      nickname: '',
      gender: ['', Validators.required]
    });
  }

  savePerson(): void {
  }

  saveAndClose(): void {
    const savePerson: Person = this.newPersonForm.value;
    this.databaseTableService.addPerson(savePerson).subscribe(() => {
      this.databaseTableService.refreshTable();
      this.modalRef.hide();
    });
  }

  saveAndEdit(): void {
    const savePerson: Person = this.newPersonForm.value;
    this.databaseTableService.addPerson(savePerson).subscribe(person => {
      this.databaseTableService.refreshTable();
      this.modalRef.hide();
      this.router.navigate(['../view', person._id], {relativeTo: this.route});
    });
  }

  saveAndAddNew(): void {
    const savePerson: Person = this.newPersonForm.value;
    this.databaseTableService.addPerson(savePerson).subscribe(person => {
      this.databaseTableService.refreshTable();
    });
    this.newPersonForm.reset();
  }

}
