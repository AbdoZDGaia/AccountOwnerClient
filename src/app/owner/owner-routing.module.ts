import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerCreateComponent } from './owner-create/owner-create.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { OwnerListComponent } from './owner-list/owner-list.component';

const routes: Routes = [
  { path: 'list', component: OwnerListComponent },
  { path: 'details/:id', component: OwnerDetailsComponent },
  { path: 'create', component: OwnerCreateComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerRoutingModule {}
