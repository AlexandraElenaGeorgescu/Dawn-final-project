import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Phone } from 'src/models/phone';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { capitalLetterValidator } from 'src/app/validators/validator';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  @Input() phone!: Phone;
  phoneForm!: FormGroup;
  newPhone?: Phone;


  constructor(private fb: FormBuilder, public modalRef: NzModalRef) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.phoneForm = this.fb.group({
      brand: [this.phone?.brand, [Validators.required],],
      model: [this.phone?.model, [Validators.required]],
      storage: [this.phone?.storage, [Validators.required, Validators.min(1)]],
      price: [this.phone?.price, [Validators.required, Validators.min(1)]],
      id: [this.phone?.id, [Validators.required, Validators.min(1)]]
    });
  }

  submitForm(): void {
    if (this.phoneForm.invalid) {
      for (const i in this.phoneForm.controls) {
        if (this.phoneForm.controls.hasOwnProperty(i)) {
          this.phoneForm.controls[i].markAsDirty();
          this.phoneForm.controls[i].updateValueAndValidity();
        }
      }
      return;
    }

    this.newPhone = {
      brand: this.phoneForm.value.brand,
      model: this.phoneForm.value.model,
      storage: this.phoneForm.value.storage,
      price: this.phoneForm.value.price,
      id: this.phoneForm.value.id
    };

  }

}