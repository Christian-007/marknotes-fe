import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss'],
})
export class AppDialogComponent implements OnInit {
  buttonStyles: {};

  constructor() {
    this.buttonStyles = {
      padding: 0,
      color: '#000',
    };
  }

  ngOnInit() {}
}
