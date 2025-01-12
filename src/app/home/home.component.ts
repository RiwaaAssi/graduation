import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AichatComponent } from '../aichat/aichat.component';
import { ChatComponent } from '../chat/chat.component';
import { SendbuttonComponent } from '../sendbutton/sendbutton.component';
import { NgFor, NgIf } from '@angular/common';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,AichatComponent, ChatComponent, SendbuttonComponent,ChatBoxComponent, NgFor, NgIf, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  showChat = true;
  isChatBoxActive = false;
  selectedConservationId!: string;
  show=true;
  Riwaa=false;
  isAichatVisible = false;
  constructor(private route: ActivatedRoute, private router: Router, private sharedService: SharedService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedConservationId = params.get('conservationId') || '';
      if (this.selectedConservationId) {
        // If conservationId exists, show the chat box
        this.showChat = false;
        this.isChatBoxActive = true;
      }
    });
  }

  onConversationSelected(conservationId: string) {
    this.selectedConservationId = conservationId;
    this.showChat = false;
    this.isChatBoxActive = true;
    
    // Update the URL to reflect the new conservationId
    this.router.navigate(['/home', conservationId]);

    
  }

  toggleChatBox() {
    if (this.showChat) {
      this.showChat = false;
      this.isChatBoxActive = true;
    }
  }

  resetToChat() {
    this.showChat = true;
    this.isChatBoxActive = false;
  }

  sendMessage(messageText: string, sender: string) {
    this.sharedService.addMessage(messageText, sender, 'receiver@example.com', this.selectedConservationId).then(() => {
      // Switch to the conversation view after message is sent
      this.onConversationSelected(this.selectedConservationId);
    }).catch(error => {
      console.error('Error sending message:', error);
    });
  }

  // Handle the event emitted by the SendbuttonComponent
 // home.component.ts
onSendMessage() {
  if (this.selectedConservationId) {
    this.router.navigate(['/home', this.selectedConservationId]);
  } else {
    console.error('No conservationId available for routing');
  }
}
DisplayAichat(){
  this.show=false;

  
}


toggleAichat() {
  this.isAichatVisible = !this.isAichatVisible;
  this.show=!this.show;
  this.router.navigate(['/aichat']);
 
}
goHome(){
  this.router.navigate(['/home']);
}



}

