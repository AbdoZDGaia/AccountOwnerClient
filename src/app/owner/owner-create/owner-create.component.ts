import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
import { DatePipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Owner } from 'src/app/_interfaces/owner.model';
import { HttpErrorResponse } from '@angular/common/http';
import { OwnerForCreation } from '../../_interfaces/owner-for-creation.model';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BaseFormComponent } from '../../shared/forms/base-form';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css'],
})
export class OwnerCreateComponent extends BaseFormComponent implements OnInit {
  errorMessage: string = '';
  bsModalRef?: BsModalRef;

  constructor(
    private repository: OwnerRepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private datePipe: DatePipe,
    private modal: BsModalService,
    private location: Location
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }

  createOwner(ownerFormValue: OwnerForCreation) {
    if (this.form.valid) this.executeOwnerCreation(ownerFormValue);
  }

  private executeOwnerCreation(ownerFormValue: OwnerForCreation) {
    const owner: OwnerForCreation = {
      name: ownerFormValue.name,
      dateOfBirth: this.datePipe.transform(
        ownerFormValue.dateOfBirth,
        'yyyy-MM-dd'
      ),
      address: ownerFormValue.address,
    };
    const apiUrl = 'api/owner';
    this.repository.createOwner(apiUrl, owner).subscribe({
      next: (own: Owner) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Owner: ${own.name} created successfully`,
            okButtonText: 'OK',
          },
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe((_) =>
          this.redirectToOwnerList()
        );
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      },
    });
  }

  redirectToOwnerList = () => {
    this.router.navigate(['/owner/list']);
    // Another way of navigating back
    // this.location.back();
  };
}
