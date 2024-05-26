import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ChartComponent } from './chart/chart.component';

export const routes: Routes = [
  {
    title: 'Обратная связь',
    path: '',
    component: FormComponent,
  },
  {
    title: 'Результаты',
    path: 'chart',
    component: ChartComponent,
  },
];
