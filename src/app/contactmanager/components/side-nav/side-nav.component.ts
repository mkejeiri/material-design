import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${SMALL_WIDTH_BREAKPOINT}px)`);
  users: Observable<User[]>;
  isDarkTheme = false;
  dir = 'ltr';
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(zone: NgZone, private userService: UserService, private router: Router) {
    this.mediaMatcher.addListener(/*mql*/() =>
      // zone.run(() => this.mediaMatcher = mql));
      zone.run(() => this.isScreenSmall()));
  }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    // no longer needed since if the side-nav we set the first user by default
    // this.users.subscribe(data => {
    //   if (data.length > 0) {
    //     this.router.navigate(['/contactmanager', data[0].id]);
    //   }
    // });
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });


  }

  public isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  toggleTheme() {
    console.log('toggleDir', this.isDarkTheme);
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir === 'ltr' ? 'rtl' :  'ltr';
    // this.sidenav.toggle().then(() => this.sidenav.toggle());
    // if (this.dir === 'ltr') {
    //   this.dir = 'rtl';
    // } else {
    //   this.dir = 'ltr';
    // }
  }
}



