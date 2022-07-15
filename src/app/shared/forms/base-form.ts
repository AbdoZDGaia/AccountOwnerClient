import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export abstract class BaseFormComponent {
  //form model
  form!: FormGroup;

  getErrors(
    control: AbstractControl,
    displayName: string,
    customMessages: { [key: string]: string } | null = null
  ): string[] {
    var errors: string[] = [];
    Object.keys(control.errors || {}).forEach((key) => {
      switch (key) {
        case 'required':
          errors.push(
            `${displayName} ${customMessages?.[key] ?? 'is required.'}`
          );
          break;
        case 'pattern':
          errors.push(
            `${displayName} ${
              customMessages?.[key] ?? 'contains invalid characters.'
            }`
          );
          break;
        case 'maxlength':
          errors.push(
            `${displayName} ${customMessages?.[key] ?? 'exceeded max length'}`
          );
          break;
        case 'minLength':
          errors.push(
            `${displayName} ${
              customMessages?.[key] ?? 'is less than minimum length'
            }`
          );
          break;
        case 'isDupeField':
          errors.push(
            `${displayName} ${
              customMessages?.[key] ?? 'already exists, please choose another.'
            }`
          );
          break;
        case 'default':
          errors.push(`${displayName} is invalid.`);
          break;
      }
    });

    return errors;
  }

  constructor() {}
}
