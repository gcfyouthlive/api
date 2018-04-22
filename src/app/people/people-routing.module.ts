import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeopleComponent } from './people.component';
import { PeopleDatabaseComponent } from './people-database/people-database.component';
import { PersonComponent } from './person/person.component';
import { PersonProfileComponent } from './person-profile/person-profile.component';

const routes: Routes = [
  { path: '', component: PeopleComponent,
    children: [
      { path: '', component:  PeopleDatabaseComponent }
    ]
  },
  { path: 'view/:_id', component: PersonComponent,
    children: [
      { path: '', component: PersonProfileComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PeopleRoutingModule {}
