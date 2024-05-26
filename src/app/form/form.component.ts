import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiSliderModule, TuiTextareaModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiSliderModule,
    TuiTextareaModule,
    TuiButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.less',
})
export class FormComponent {
  readonly grades = [1, 2, 3, 4, 5];

  form = new FormGroup({
    grade: new FormControl<number>(1, Validators.required),
    positives: new FormControl<string>('', Validators.required),
    negatives: new FormControl<string>('', Validators.required),
  });

  setGrade(grade: number) {
    this.form.patchValue({ grade });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      tuiMarkControlAsTouchedAndValidate(this.form);
    }
  }
}
