import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, //token comunicación con los formularios reactivos.
      //componente a importar
      useExisting: forwardRef(() => StepperComponent),
      multi: true, //multiples valores
    },
  ],
})
export class StepperComponent implements OnInit, ControlValueAccessor {
  currentValue: number = 0;

  //Ejecutar algo en especifico cuando el valor cambie o sea touched
  onChange = (_: any) => {};
  onTouch = () => {};
  isDisabled: boolean;

  constructor() {}

  ngOnInit(): void {}

  add() {
    this.currentValue += 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  sub() {
    this.currentValue -= 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  //Settear un valor desde el formulario
  writeValue(value: number): void {
    if (value) {
      this.currentValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  //Deshabilitar o no el componente
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
