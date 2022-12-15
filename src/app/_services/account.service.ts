import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {User, Response} from '../_models';

@Injectable({providedIn: 'root'})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<Response<User>>(`${environment.apiUrl}/flab/authentication/public/api/v1/accounts/account/login`, {
      emailOrUsername: username,
      password: password
    })
      .pipe(map(response => {
        let user = response.data as any;
        if (user == undefined) {
          user = null;
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }


  logout() {
    // remove user from local storage and set current user to null
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue?.accountId) {
          // update local storage
          const user = {...this.userValue, ...params};
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue?.accountId) {
          this.logout();
        }
        return x;
      }));
  }

  setMemberId(memberId: string){
    window.localStorage.setItem("memberId", memberId);
    this.getMemberId();
  }

  getMemberId(){
    const memberId =  window.localStorage.getItem("memberId");
    if(memberId == null){
      return this.router.navigate(["/errors"]);
    }else{
      return memberId;
    }
  }

  errorPage(): void{
    localStorage.removeItem("currentDocumentId");
    localStorage.removeItem("selectedPageId");
    this.router.navigate(["**"]);
  }

  internalServerErrorPage(){
    localStorage.removeItem("currentDocumentId");
    localStorage.removeItem("selectedPageId");
    this.router.navigate(["/errors"]);
  }
}
