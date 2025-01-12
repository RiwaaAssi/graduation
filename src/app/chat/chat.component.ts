import { Component } from '@angular/core';
import { NgFor , NgIf } from '@angular/common';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor,NgIf,ChatBoxComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
 
  showChatBox = false; // للتحكم في عرض محتوى الدردشة
  messages: string[] = []; // قائمة الرسائل

  onSendMessage(message: string) {
    if (message) {
      this.messages.push(message); // إضافة الرسالة إلى القائمة
      this.showChatBox = true; // عرض واجهة المحادثة
    }
  }
}
