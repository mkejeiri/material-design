import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataStore: { users: User[]; };
  private usersField: BehaviorSubject<User[]>;

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this.usersField = new BehaviorSubject([]);
  }

  get users(): Observable<User[]> {
    return this.usersField.asObservable();
  }

  // loadAll(): Observable<User[]> {
  //   const usersUrl = 'https://angular-material-api.azurewebsites.net/users';
  //   return this.http.get<User[]>(usersUrl);
  // }

  loadAll() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';
    return this.http.get<User[]>(usersUrl).subscribe((data) => {
      this.dataStore.users = data;
      console.log(Object.assign({}, this.dataStore).users);
      this.usersField.next(Object.assign({}, this.dataStore).users);
    }, (err) => {
      console.error(err);
    });
  }

  public userById(id: number): User {
    return this.dataStore.users.find(u => u.id === +id);
  }

  public addUser(user: User): Promise<User> {
    return new Promise((resolver/*, reject*/) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this.usersField.next(Object.assign({}, this.dataStore).users);
      resolver(user);
    });
  }
}
