import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class  NewContactDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>) { }
  public user: User;
  public namefc: FormControl;
  public avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4', 'svg-5'];
  ngOnInit() {
    this.namefc = new FormControl('', [Validators.required]);
    this.user = new User();
  }
  save() {
    this.dialogRef.close(this.user);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  getErrorMessage() {
    return this.namefc.hasError('required') ? 'You must enter a name' : '';
  }

}
