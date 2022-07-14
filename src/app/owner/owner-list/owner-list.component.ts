import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Owner } from '../../_interfaces/owner.model';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css'],
})
export class OwnerListComponent implements OnInit {
  constructor(
    private repository: OwnerRepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}
  owners: Owner[];
  errorMessage: string = '';

  ngOnInit(): void {
    this.getAllOwners();
  }

  private getAllOwners() {
    const apiUrl: string = 'api/owner';
    this.repository.getAll(apiUrl).subscribe({
      next: (result) => {
        this.owners = result;
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
        console.error(this.errorMessage);
      },
    });
  }

  public getOwnerDetails(id) {
    const detailsUrl: string = `/owner/details/${id}`;
    this.router.navigate([detailsUrl]);
  }
}
