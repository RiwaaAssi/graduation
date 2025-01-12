import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AichatComponent } from './aichat/aichat.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { SendbuttonComponent } from './sendbutton/sendbutton.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';

export const routes: Routes = [
    { path: '', component: SignupComponent, title: 'chatbot-signup' },
    { path: 'login', component: LoginComponent, title: 'chatbot-login' },
    { path: 'signup', component: SignupComponent },
    { path: 'aichat', component: AichatComponent, title: 'ai-chat' },
    { path: 'home', component: HomeComponent, title: 'chatbot' },
    { path: 'home/:conservationId', component: HomeComponent, title: 'chatbot' }
  ];
  