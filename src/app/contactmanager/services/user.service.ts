import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataStore: { users: User[]; };
  // tslint:disable-next-line:variable-name
  private _users: BehaviorSubject<User[]>;

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users  = new  BehaviorSubject([]);
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  // loadAll(): Observable<User[]> {
  //   const usersUrl = 'https://angular-material-api.azurewebsites.net/users';
  //   return this.http.get<User[]>(usersUrl);
  // }

  loadAll() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';
    return this.http.get<User[]>(usersUrl).subscribe(data => {
      this.dataStore.users = data;
      this._users.next(Object.assign({}, this.dataStore).users);
    }, err => {
      console.log('Failed to fetch users');
    });
  }
}
