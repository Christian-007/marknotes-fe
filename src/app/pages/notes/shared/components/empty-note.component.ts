import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-note',
  template: `
    <div id="EmptyNote" class="flex items-center justify-center h-full">
      <div class="flex flex-col items-center">
        <img
          alt="ant-design-no-data"
          src="assets/images/ant-design-no-data.png"
        />
        <div class="text-base text-gray-400">No note</div>
      </div>
    </div>
  `,
})
export class EmptyNoteComponent {}
