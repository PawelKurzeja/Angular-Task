import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, defaultIfEmpty, map, retry } from 'rxjs';
import { Id } from '../core/models/object.models';
import { UserModel, UserModifyModel } from '../models/user.model';
import { UserReadDTO, fromUserReadDTO } from './dto/user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private url = 'api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserReadDTO[]>(this.url).pipe(
      map((dtos) => dtos.map((dto) => fromUserReadDTO(dto))),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return EMPTY;
      }),
      defaultIfEmpty([])
    );
  }

  getUserById(id: Id): Observable<UserModel | null> {
    return this.http.get<UserReadDTO>(`${this.url}/${id}`).pipe(
      map((dto) => fromUserReadDTO(dto)),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return EMPTY;
      }),
      defaultIfEmpty(null)
    );
  }

  updateUserById(user: UserModel): Observable<UserModel | null> {
    return this.http.put<UserReadDTO>(`${this.url}/${user.id}`, user).pipe(
      map((dto) => fromUserReadDTO(dto)),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return EMPTY;
      }),
      defaultIfEmpty(null)
    );
  }

  deleteUserById(user: UserModel): Observable<UserModel | null> {
    return this.http.delete<null>(`${this.url}/${user.id}`).pipe(
      map(() => user),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return EMPTY;
      }),
      defaultIfEmpty(null)
    );
  }

  createUser(user: UserModifyModel): Observable<UserModel | null> {
    return this.http.post<UserReadDTO>(`${this.url}`, { name: user.name, email: user.email }).pipe(
      map((dto) => fromUserReadDTO(dto)),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return EMPTY;
      }),
      defaultIfEmpty(null)
    );
  }
}
