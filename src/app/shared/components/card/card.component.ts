import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  state = [
    { id: 1, title: 'Code of Conduct', time: '07/07/2020' },
    { id: 2, title: 'Angular Providers', time: '17/12/2019' },
    { id: 3, title: 'Flexbox Layout', time: '12/01/2020' },
  ];
  currentActiveDoc = 1;
  buttonStyles = {
    'padding-right': 0,
  };

  constructor() {}

  ngOnInit() {}

  onClickAdd(): void {
    console.log('hello on add');
  }

  onClickDocList(docId: number): void {
    console.log('Document Click: ', docId);
    this.currentActiveDoc = docId;
  }
}
