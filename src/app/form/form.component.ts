import { Component, inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import {
  TuiAlertModule,
  TuiAlertService,
  TuiButtonModule,
  TuiRootModule,
} from '@taiga-ui/core';
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
    TuiRootModule,
    TuiAlertModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.less',
})
export class FormComponent {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly alerts: TuiAlertService = inject(TuiAlertService);
  readonly grades = [1, 2, 3, 4, 5];
  feedbackCollection: CollectionReference;

  form = new FormGroup({
    grade: new FormControl<number>(1, Validators.required),
    positives: new FormControl<string>('', Validators.required),
    negatives: new FormControl<string>('', Validators.required),
  });

  constructor() {
    this.feedbackCollection = collection(this.firestore, 'feedback');
  }

  setGrade(grade: number) {
    this.form.patchValue({ grade });
  }

  submit() {
    if (this.form.valid) {
      const formControls = this.form.controls;

      addDoc(this.feedbackCollection, {
        grade: formControls.grade.value,
        positives: formControls.positives.value,
        negatives: formControls.negatives.value,
      }).then(() => {
        this.form.reset({
          grade: 1,
          positives: '',
          negatives: ''
        });

        this.alerts
          .open('Отзыв успешно отправлен', {
            status: 'success',
          })
          .subscribe();
      });
    } else {
      tuiMarkControlAsTouchedAndValidate(this.form);
    }
  }
}
