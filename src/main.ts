import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
bootstrapApplication(AppComponent, {
  providers: [ provideRouter(routes),provideFirebaseApp(() => 
    initializeApp({"projectId":"quizpluschatbot",
      "appId":"1:829903529416:web:4f7bb7f9f8c4b1303f0cfd",
      "databaseURL":"https://quizpluschatbot-default-rtdb.firebaseio.com",
      "storageBucket":"quizpluschatbot.appspot.com",
      "apiKey": "AIzaSyAcMiSuyx1QB7SZxY-_uD3_OP-Bv3JfjfA",
      "authDomain":"quizpluschatbot.firebaseapp.com",
      "messagingSenderId": "829903529416"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
}).catch((err) => console.error(err));
