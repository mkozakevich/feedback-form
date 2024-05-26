import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: 'AIzaSyD-IuXqUzWo9N8kVGArXWlyrfmSVUkFkLY',
  authDomain: 'feedback-form-2c525.firebaseapp.com',
  projectId: 'feedback-form-2c525',
  storageBucket: 'feedback-form-2c525.appspot.com',
  messagingSenderId: '292648262485',
  appId: '1:292648262485:web:d3ee2ce38fcaf1054caddc',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
