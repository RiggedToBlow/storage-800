import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleUserRequest, UserListRequest } from './models/userPageRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUsers(page=1){
    return this.http.get<UserListRequest>(`https://reqres.in/api/users`, {params:{page}})
  }
  getUserById(id:number){
    return this.http.get<SingleUserRequest>(`https://reqres.in/api/users/${id}`)
  }
}
