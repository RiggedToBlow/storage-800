import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  tap,
  map,
  shareReplay,
  BehaviorSubject,
  switchMap,
  combineLatest,
  startWith,
  filter,
  of,
  catchError,
} from 'rxjs';
import { UserListRequest } from 'src/app/models/userPageRequest';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentPage$ = new BehaviorSubject(1);

  searchInput = new FormControl('');

  userRequest$ = this.currentPage$.pipe(
    switchMap((page) => this.userService.getUsers(page)),
    shareReplay(1)
  );

  userSearchedById$ = this.searchInput.valueChanges.pipe(
    switchMap((id) =>
      id
        ? this.userService.getUserById(+id).pipe(catchError((err) => of(err)))
        : of(null)
    ),
    map((req) => req?.data || req),
  );

  users$ = this.userRequest$.pipe(map((req) => req.data));
  constructor(private userService: UserService) {}

  moveToNextPage(req: UserListRequest) {
    console.log(req);
    if (req.page < req.total_pages) {
      this.currentPage$.next(req.page + 1);
    }
  }

  moveToPreviousPage(req: UserListRequest) {
    console.log(req, req.page > 1);
    if (req.page > 1) {
      this.currentPage$.next(req.page - 1);
    }
  }
}
