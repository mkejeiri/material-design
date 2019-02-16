import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter();
  @Output() toggleThemeEvent: EventEmitter<void> = new EventEmitter();
  @Output() toggleDirEvent: EventEmitter<void> = new EventEmitter();
  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private route: Router) { }

  ngOnInit() {
  }

  onClick() {
    this.toggleSidenav.emit();
  }

  openAddContactDialog() {
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed', result);
      if (result) {
        this.openSnackBar('Contact added', 'Navigate').onAction().subscribe(() => {
          this.route.navigate(['contactmanager/', result.id]);
        });
      }
    });

  }
  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
