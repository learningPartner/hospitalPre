import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class UserService {
  http = inject(HttpClient);

  onLogin(loginObj: any) {
     debugger;
    return this.http.post(environment.API_URL + 'login', loginObj);
  }
}
