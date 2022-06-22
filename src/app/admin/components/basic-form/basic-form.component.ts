import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.generateForm();
  }

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => console.log(value));

    this.form.valueChanges.subscribe((value) => console.log(value));
  }

  handleSubmit(event) {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private generateForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(10)]],
      email: [''],
      phone: ['', Validators.required],
      color: [''],
      date: [''],
      number: [12],
      range: [''],
      url: [''],
    });
  }

  get isNameFieldValid() {
    return this.nameField.valid && this.nameField.touched;
  }

  get isNameFieldInValid() {
    return this.nameField.invalid && this.nameField.touched;
  }

  get nameField() {
    return this.form.get('name');
  }

  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField() {
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get numberField() {
    return this.form.get('number');
  }

  get rangeField() {
    return this.form.get('range');
  }

  get urlField() {
    return this.form.get('url');
  }
}
