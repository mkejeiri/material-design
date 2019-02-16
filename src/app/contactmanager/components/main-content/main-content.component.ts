import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      let id = p.id;
      if (!id) {
        id = 1;
      }

      // set user to null whenever we are navigating so spinner will show
      this.user = null;
      this.userService.users.subscribe(u => {
        if (u.length === 0) { return; }

        // for test purposes to see the spinner : Avoid in PRD!!!
        setTimeout(() => {
          this.user = this.userService.userById(id);
        }, 500);
      });
    });
  }

}
