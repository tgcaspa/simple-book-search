import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { UserService } from '../common/user/services/user.service';
import { createInitialUserState } from '../common/user/state/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  private readonly SUCCESS_URL = '/search';

  usernameControl = new FormControl(createInitialUserState().username);

  constructor(private router: Router,
              private userService: UserService) { }

  onContinue(): void {
    if (this.usernameControl.invalid) {
      return;
    }

    this.userService
        .loadUser({ username: this.usernameControl.value })
        .pipe(take(1))
        .subscribe(
          () => this.router.navigateByUrl(this.SUCCESS_URL),
          console.error
        );
  }
}
