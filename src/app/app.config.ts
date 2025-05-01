import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPhIXQ-1eXsKUaVKCnWtdybk30AgENIzI",
  authDomain: "just-due-it.firebaseapp.com",
  projectId: "just-due-it",
  storageBucket: "just-due-it.firebasestorage.app",
  messagingSenderId: "332183057234",
  appId: "1:332183057234:web:280eda6ff7efe6a3b8408b",
  measurementId: "G-3X66XF31VR"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideZoneChangeDetection({ eventCoalescing: true }), 
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
