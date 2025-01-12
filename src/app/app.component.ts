import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from "./login/login.component";
import { AichatComponent } from './aichat/aichat.component';
import { HomeComponent } from './home/home.component';
import { SendbuttonComponent } from './sendbutton/sendbutton.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
     imports: [ SignupComponent, LoginComponent,RouterModule,RouterOutlet,AichatComponent,HomeComponent,SendbuttonComponent]
})
export class AppComponent {
 
}
