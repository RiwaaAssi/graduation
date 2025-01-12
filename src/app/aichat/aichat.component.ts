
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDatabase, ref, onValue, remove } from "firebase/database"; // إضافة remove لحذف المحادثة
import { RouterLink } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router'
@Component({
  selector: 'app-aichat',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './aichat.component.html',
  styleUrls: ['./aichat.component.css']
})
export class AichatComponent implements OnInit {
  loading = true; // Start loading as true
  
  @Output() conversationSelected = new EventEmitter<string>();
  conversations: any[] = [];
  selectedConversationId: string | null = null;  // Add this to track the selected conversation
  
  constructor(private router: Router) { }
  
  ngOnInit() {
    const db = getDatabase();
    const conversationsRef = ref(db, 'conservations');
  
    // Listening for changes in data
    onValue(conversationsRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data && typeof data === 'object') {
        this.conversations = Object.keys(data).map(key => {
          const conversation = data[key] as { messages?: { [key: string]: { text: string } } };
          const messages = conversation.messages;
          const firstMessage = messages ? Object.values(messages)[0].text : 'No messages';
          return {
            id: key,
            name: firstMessage
          };
        }).reverse();
        this.loading = false;
      }
    });
  }
  
  selectConversation(conversationId: string) {
    this.selectedConversationId = conversationId;  // تخزين الـ conversationId المختار
    this.conversationSelected.emit(conversationId);  // إشعار الكومبوننت الأب أو الأحداث التي تحتاج للمعالجة
    this.router.navigate(['/home', conversationId]); // التنقل إلى المسار /home/conversationId
  }
  
  
  // وظيفة لحذف المحادثة
  deleteConversation(conversationId: string) {
    const db = getDatabase();
    const conversationRef = ref(db, `conservations/${conversationId}`);
    
    // حذف المحادثة
    remove(conversationRef)
      .then(() => {
        console.log('Conversation deleted successfully');
        this.router.navigate(['/home']);  // إعادة التوجيه إلى صفحة Home
      })
      .catch((error) => {
        console.error('Error deleting conversation:', error);
      });
  }

  StartNewChat() {
    this.router.navigate(['/home']);  // Navigate to the /home route
  }

  close(){
    this.router.navigate(['/home']); 
  }
}
