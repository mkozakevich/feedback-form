import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TuiRingChartModule } from '@taiga-ui/addon-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, TuiRingChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.less',
})
export class ChartComponent {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly labels = [
    'Оценок "1"',
    'Оценок "2"',
    'Оценок "3"',
    'Оценок "4"',
    'Оценок "5"',
  ];
  items$: Observable<any[]>;
  chartValues: number[] = [];

  index = NaN;

  constructor() {
    const feedbackCollection = collection(this.firestore, 'feedback');
    this.items$ = collectionData(feedbackCollection);

    this.items$.subscribe((item) => {
      this.chartValues = [0, 0, 0, 0, 0];
      item.forEach((data) => {
        this.chartValues[data.grade - 1] += 1;
      });
    });
  }

  get sum(): number | null {
    return Number.isNaN(this.index) ? null : this.chartValues[this.index];
  }

  get label(): string {
    return Number.isNaN(this.index) ? '' : this.labels[this.index];
  }
}
