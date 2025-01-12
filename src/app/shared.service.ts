/*
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  /*
  private messages: string[] = [];

  constructor() {}

  addMessage(message: string) {
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }
}
    */



/* الاصلي 
import { Injectable } from '@angular/core';
import { Database, ref, push, query, orderByChild, listVal } from '@angular/fire/database';
import { Observable } from 'rxjs';

interface ChatMessage {
  text: string;
  sendDate: string;
  sender: string;
  receiver: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messagesRef = ref(this.db, 'conservations/1/messages'); // تأكد من تحديث conservationId

  constructor(private db: Database) {}

  // Get messages as an observable
  getMessages(): Observable<ChatMessage[]> {
    const messagesQuery = query(this.messagesRef, orderByChild('sendDate'));
    return listVal<ChatMessage>(messagesQuery);
  }

  // Add a new message to the database
  async addMessage(messageText: string, sender: string, receiver: string) {
    if (messageText.trim() === '') return;

    await push(this.messagesRef, {
      text: messageText,
      sendDate: new Date().toISOString(),
      sender: sender,
      receiver: receiver
    });
  }
}
*/


/*
import { Injectable } from '@angular/core';
import { Database, ref, push, query, orderByChild, listVal ,set} from '@angular/fire/database';
import { Observable } from 'rxjs';

interface ChatMessage {
  text: string;
  sendDate: string;
  sender: string;
  receiver: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private db: Database) {}

  getMessages(conservationId: string): Observable<ChatMessage[]> {
    const messagesRef = ref(this.db, `conservations/${conservationId}/messages`);
    const messagesQuery = query(messagesRef, orderByChild('sendDate'));
    return listVal<ChatMessage>(messagesQuery);
  }
  
  addMessageToConservation(messageText: string, sender: string, receiver: string, conservationId: string) {
    const messagesRef = ref(this.db, `conservations/${conservationId}/messages`);
    return push(messagesRef, {
      text: messageText,
      sendDate: new Date().toISOString(),
      sender: sender,
      receiver: receiver
    });
  }
  createNewConversation(conservationId: string) {
    const conservationRef = ref(this.db, `conservations/${conservationId}`);
    return set(conservationRef, {
      createdAt: new Date().toISOString(),
      messages: []
    });
  }
  
  
}
 */


import { Injectable } from '@angular/core';
import { Database, ref, push, query, orderByChild, listVal, set, get } from '@angular/fire/database';
import { Observable } from 'rxjs';

interface ChatMessage {
  text: string;
  sendDate: string;
  sender: string;
  receiver: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private db: Database) {}

  // Get messages for a given conversation ID
  getMessages(conservationId: string): Observable<ChatMessage[]> {
    const messagesRef = ref(this.db, `conservations/${conservationId}/messages`);
    const messagesQuery = query(messagesRef, orderByChild('sendDate'));
    return listVal<ChatMessage>(messagesQuery);
  }

  // Add a new message to the specified conversation or create a new conversation if not exists
  async addMessage(messageText: string, sender: string, receiver: string, conservationId?: string): Promise<void> {
    if (conservationId) {
      await this.addMessageToConservation(messageText, sender, receiver, conservationId);
    } else {
      const newConservationId = await this.getNextConservationId(); // Get the next available ID
      await this.createNewConversationAndAddMessage(messageText, sender, receiver, newConservationId);
    }
  }

  private async addMessageToConservation(messageText: string, sender: string, receiver: string, conservationId: string): Promise<void> {
    const messagesRef = ref(this.db, `conservations/${conservationId}/messages`);
    await push(messagesRef, {
      text: messageText,
      sendDate: new Date().toISOString(),
      sender: sender,
      receiver: receiver
    });
  }

  private async createNewConversationAndAddMessage(messageText: string, sender: string, receiver: string, conservationId: string): Promise<void> {
    const conservationRef = ref(this.db, `conservations/${conservationId}`);
    const messagesRef = ref(this.db, `conservations/${conservationId}/messages`);
    
    await set(conservationRef, {
      createdAt: new Date().toISOString(),
      messages: []
    });
    await push(messagesRef, {
      text: messageText,
      sendDate: new Date().toISOString(),
      sender: sender,
      receiver: receiver
    });
  }

  private async getNextConservationId(): Promise<string> {
    const conservationRef = ref(this.db, 'conservations');
    const snapshot = await get(conservationRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const ids = Object.keys(data);
      const lastId = Math.max(...ids.map(id => parseInt(id, 10)));
      return (lastId + 1).toString();
    } else {
      return '1'; // If no data exists, start with ID '1'
    }
  }
}

