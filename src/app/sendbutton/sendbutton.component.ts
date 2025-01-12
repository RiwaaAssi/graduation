/*
import { Component,Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-sendbutton',
  standalone: true,
  imports: [FormsModule], // Import FormsModule here
  templateUrl: './sendbutton.component.html',
  styleUrls: ['./sendbutton.component.css'],
})
export class SendbuttonComponent {

  message: string = '';
  @Output() send = new EventEmitter<void>();
  constructor(private sharedService: SharedService) {}

  sendMessage() {
    if (this.message.trim()) {
      this.sharedService.addMessage(this.message.trim());
      this.message = ''; // Clear the input after sending
    }
    this.send.emit();
    
  }

 


}
*/

/*  الاصلي

import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-sendbutton',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sendbutton.component.html',
  styleUrls: ['./sendbutton.component.css'],
})
export class SendbuttonComponent {
  message: string = '';
  @Output() send = new EventEmitter<void>();

  constructor(private sharedService: SharedService) {}

  sendMessage() {
    const sender = 'jubran@gmail.com'; // يمكنك تحديث هذا ليكون ديناميكيًا حسب الحاجة
    const receiver = 'chat@gmail.com'; // يمكنك تحديث هذا ليكون ديناميكيًا حسب الحاجة

    if (this.message.trim()) {
      this.sharedService
        .addMessage(this.message.trim(), sender, receiver)
        .then(() => {
          console.log('Message sent');
          this.send.emit();
        });
      this.message = ''; // تنظيف حقل الإدخال بعد الإرسال
    }
  }
}
*/

// sendbutton.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sendbutton',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sendbutton.component.html',
  styleUrls: ['./sendbutton.component.css'],
})
export class SendbuttonComponent {
  message: string = '';
  @Output() send = new EventEmitter<void>();

  @Input() conservationId!: string; // استقبال conservationId كـ Input

  constructor(private sharedService: SharedService, private router: Router) {}

  async sendMessage() {
    const sender = 'jubran@gmail.com'; // تحديد المرسل
    const receiver = 'chat@gmail.com'; // تحديد المستقبل

    if (this.message.trim()) {
      try {
        // إضافة الرسالة إلى المحادثة
        await this.sharedService.addMessage(this.message.trim(), sender, receiver, this.conservationId);
        console.log('Message sent');

        // بعد إرسال الرسالة، توجيه المستخدم إلى المحادثة مباشرة
        this.send.emit(); 

        // التوجيه تلقائيًا إلى المحادثة
        this.router.navigate(['/home', this.conservationId]);

      } catch (error) {
        console.error('Error sending message:', error);
      }

      // مسح حقل الرسالة بعد الإرسال
      this.message = ''; 
    }
  }
}
