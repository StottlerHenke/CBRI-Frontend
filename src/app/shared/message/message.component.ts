import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from './message.type';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.messages$ = this.messageService.messages$;
  }

  removeMessage(removeMessage: Message) {
    this.messageService.removeMessage(removeMessage);
  }

}
