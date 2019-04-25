import { Injectable } from '@angular/core';

import { ApiGetService } from '../shared/core/apiget.service';
import { MessageService } from '../shared/message/message.service';
import { User } from '../shared/user.type';


@Injectable()
export class UserService {

  constructor(private apiGetService: ApiGetService,
              private messageService: MessageService) { }

  createUser(formData: any): Promise<void | User> {
    return this.apiGetService.post<User>('create-user/', formData)
    .catch((e) => {
      this.handleError(e, `Your account was not created.`);
    });
  }

  requestResetPassword(email: string): Promise<void | any> {
    return this.apiGetService.post<any>('auth/password/reset/', email)
    .catch((e) => {
      this.handleError(e, `The server was unable to complete your request.`);
    });
  }

  updatePassword(formData: any): Promise<void | any> {
    return this.apiGetService.post<any>('auth/password/change/', formData)
    .catch((e) => {
      this.handleError(e, `Your password was not updated.`);
    });
  }

  handleError(e, errorMessage) {
    let errorText;

    if (e.headers.get('content-type') === 'application/json') {
      errorText = e.text();
    }

    this.messageService.add(`There was a problem: ${e.status} ${e.statusText}`,
                            errorText || errorMessage);
  }
}
