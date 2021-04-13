import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { resetStores } from '@datorama/akita';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  logout(): Observable<boolean> {
    return of(true).pipe(
      tap(() => resetStores()),
      tap(() => this.router.navigateByUrl('/')),
      map(() => true)
    );
  }
}
