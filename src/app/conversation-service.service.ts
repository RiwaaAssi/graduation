// conversation.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private selectedConversationSubject = new BehaviorSubject<string | null>(null);
  selectedConversation$ = this.selectedConversationSubject.asObservable();

  setSelectedConversation(conversationId: string) {
    this.selectedConversationSubject.next(conversationId);
  }

  getSelectedConversation() {
    return this.selectedConversationSubject.getValue();
  }
}
