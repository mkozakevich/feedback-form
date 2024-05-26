import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.less',
})
export class ChartComponent {
  private readonly firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  
  constructor() {
    const feedbackCollection = collection(this.firestore, 'feedback');
    this.items$ = collectionData(feedbackCollection);
  }
}
