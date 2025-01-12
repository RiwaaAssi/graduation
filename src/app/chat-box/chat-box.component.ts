/*
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [ ],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {
 
}



*/
/*import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';
import { SendbuttonComponent } from '../sendbutton/sendbutton.component';

interface ChatMessage {
  text: string;
  sendDate: string;
  sender: string;
  receiver: string;
}

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, SendbuttonComponent],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  messages$!: Observable<ChatMessage[]>;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.messages$ = this.sharedService.getMessages();
  }
}
*/

/* الاصلي
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { SendbuttonComponent } from '../sendbutton/sendbutton.component';

interface ChatMessage {
  text: string;
  sendDate: string;
  sender: string;
  receiver: string;
  showDate?: boolean;  // إضافة خاصية showDate لتحديد إذا كان يجب عرض التاريخ
}

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, SendbuttonComponent],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  messages$!: Observable<ChatMessage[]>;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.messages$ = this.sharedService.getMessages().pipe(
      map(messages => this.groupMessagesByDate(messages))
    );
  }

  // دالة لتجميع الرسائل حسب اليوم وتحديد متى يجب عرض التاريخ
  groupMessagesByDate(messages: ChatMessage[]): ChatMessage[] {
    let lastDate: string | null = null;
    return messages.map((message) => {
      const messageDate = new Date(message.sendDate).toDateString();
      const showDate = lastDate !== messageDate;
      lastDate = messageDate;
      return { ...message, showDate };
    });
  }
}
*/

import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';
import { SendbuttonComponent } from '../sendbutton/sendbutton.component';


interface ChatMessage {
  text: string;
  sendDate: string;
  sender: string;
  receiver: string;
}

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, SendbuttonComponent],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, OnChanges, AfterViewChecked {

  loading = true; // Start loading as true


  @Input() conservationId!: string;
  messages$!: Observable<{ date: string, messages: ChatMessage[] }[]>;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.loading = true;
    this.loadMessages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conservationId'] && !changes['conservationId'].isFirstChange()) {
      this.loadMessages();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  loadMessages() {
   
    this.messages$ = this.sharedService.getMessages(this.conservationId).pipe(
      map(messages => this.groupMessagesByDate(messages))
    );
    this.loading = false;
   
  }

  groupMessagesByDate(messages: ChatMessage[]): { date: string, messages: ChatMessage[] }[] {
    const groupedMessages: { [key: string]: ChatMessage[] } = {};
    messages.forEach(message => {
      const messageDate = this.getDisplayDate(message.sendDate);
      if (!groupedMessages[messageDate]) {
        groupedMessages[messageDate] = [];
      }
      groupedMessages[messageDate].push(message);
    });
    return Object.keys(groupedMessages).map(date => ({
      date,
      messages: groupedMessages[date]
    }));
  }

  getDisplayDate(sendDate: string): string {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const messageDate = new Date(sendDate).toDateString();

    if (messageDate === today) {
      return 'Today';
    } else if (messageDate === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return new Date(sendDate).toLocaleDateString();
    }
  }

  scrollToBottom() {
    const container = this.messagesContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
}
