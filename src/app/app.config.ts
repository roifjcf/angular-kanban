import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp({
      projectId: "angular-chat-8a262",
      appId: "1:910918796609:web:2d90058a3fee6db5f08dc0",
      storageBucket: "angular-chat-8a262.firebasestorage.app",
      apiKey: "AIzaSyAP7DVJIPl_Uf1BK8HQGKePf09vb_5ii74",
      authDomain: "angular-chat-8a262.firebaseapp.com",
      messagingSenderId: "910918796609",
      measurementId: "G-HH915TW3Q4"
    })),
    provideFirestore(() => getFirestore())
  ]
};
