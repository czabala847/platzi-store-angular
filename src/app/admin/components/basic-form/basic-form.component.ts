import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {
  nameField = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
  ]);
  emailField = new FormControl();
  phoneField = new FormControl();
  colorField = new FormControl();
  dateField = new FormControl();
  numberField = new FormControl();
  rangeField = new FormControl();
  urlField = new FormControl();

  constructor() {}

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => console.log(value));
  }

  get isNameFieldValid() {
    return this.nameField.valid && this.nameField.touched;
  }

  get isNameFieldInValid() {
    return this.nameField.invalid && this.nameField.touched;
  }
}
