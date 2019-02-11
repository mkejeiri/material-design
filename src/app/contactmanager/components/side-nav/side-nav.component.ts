import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${SMALL_WIDTH_BREAKPOINT}px)`);
  users: Observable<User[]>;

  constructor(zone: NgZone, private userService: UserService) {
    this.mediaMatcher.addListener(mql =>
      // zone.run(() => this.mediaMatcher = mql));
      zone.run(() => this.isScreenSmall()));
  }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();
    this.users.subscribe(data => {
      console.log(data);
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}



