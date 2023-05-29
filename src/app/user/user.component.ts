import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  id$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((val) => !!val)
  );

  user$ = this.id$.pipe(
    switchMap((id) =>
      this.userService.getUserById(+id!).pipe(catchError((err) => of(err)))
    ),
    tap(console.log),
    map(req=>req?.data || req)
  );

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
}
