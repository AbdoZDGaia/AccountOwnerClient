import { Owner } from './../../_interfaces/owner.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css'],
})
export class OwnerDetailsComponent implements OnInit {
  owner: Owner;
  errorMessage: string = '';

  constructor(
    private repository: OwnerRepositoryService,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getOwnerDetails();
  }

  getOwnerDetails() {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl: string = `api/owner/${id}/account`;
    this.repository.get(apiUrl).subscribe({
      next: (own: Owner) => (this.owner = own),
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      },
    });
  }
}
