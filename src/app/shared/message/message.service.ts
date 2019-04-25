import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Message } from './message.type';

@Injectable()
export class MessageService {
  messages$: BehaviorSubject<Message[]> = new BehaviorSubject([]);

  constructor() { }

  add(title: string, message: string, key: string = undefined, classes: string | string[] = '') {
    let messages = this.messages$.value;

    const messageObject: Message = {
      id: messages.length,
      title: title,
      text: message,
      classes: classes,
      key: key,
    }

    if (key) {
      // Only allow one message of a particular key
      messages = messages.filter((message: Message) => message.key !== key);
    }

    messages.push(messageObject);
    this.messages$.next(messages);
  }

  removeMessage(removeMessage: Message) {
    let messages = this.messages$.value;

    messages = messages.filter((message: Message) =>
                               message.id !== removeMessage.id);

    this.messages$.next(messages);
  }
}
