import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contactmanager-app',
  template: `
      <app-side-nav></app-side-nav>
  `,
  styles: []
})
export class ContactmanagerAppComponent implements OnInit {

  constructor(public iconRegistry: MatIconRegistry,
              public sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconSet(this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/avatars.svg'));
  }

  ngOnInit() {
  }

}
