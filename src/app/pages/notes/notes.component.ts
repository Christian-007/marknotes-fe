import { Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  template: `
    <!-- <div class="h-100 d-flex">
      <div class="left-section d-none d-sm-block">
        <app-sidebar></app-sidebar>
      </div>
      <div class="right-section">
        <app-topbar class="d-none d-sm-block"></app-topbar>
        <app-mobile-editor-nav
          class="d-block d-sm-none"
        ></app-mobile-editor-nav>
        <div class="main-content overflow-auto">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    <app-mobile-sidebar></app-mobile-sidebar> -->
    <div class="flex bg-red-300 flex-col w-full h-full">
      <div
        class="bg-white border-b border-gray-200 w-full h-16 flex items-center"
      >
        <div class="w-1/5 px-5 py-3 flex justify-items-start">
          <a class="block" routerLink="/">
            <img
              width="114"
              height="33"
              src="assets/images/marknotes-brand.svg"
              alt="Marknotes Logo"
            />
          </a>
        </div>
        <div class="flex w-4/5">
          <div class="w-3/4 px-5 py-3">
            <div>Some Title</div>
          </div>
          <div class="flex justify-end w-1/4 px-5 py-3">
            <a
              class="flex items-center text-gray-500 hover:text-gray-700 mr-6"
              href="https://github.com/tailwindlabs/tailwindcss"
            >
              <i aria-hidden="true" class="material-icons md-18">delete</i>
            </a>
            <a
              class="flex items-center text-gray-500 hover:text-gray-700 mr-6"
              href="https://github.com/tailwindlabs/tailwindcss"
            >
              <i aria-hidden="true" class="material-icons md-18">visibility</i>
            </a>
            <a
              class="flex items-center text-gray-500 hover:text-gray-700 mr-6"
              href="https://github.com/tailwindlabs/tailwindcss"
            >
              <i aria-hidden="true" class="material-icons md-18">save</i>
            </a>
          </div>
        </div>
      </div>
      <div class="bg-gray-500 flex flex-row w-full h-full overflow-hidden">
        <div class="bg-yellow-200 w-1/5 h-full p-5 overflow-auto">Sidebar</div>
        <div class="bg-red-200 w-4/5 h-full p-5 overflow-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam lacus
          suspendisse faucibus interdum posuere lorem ipsum. Nibh mauris cursus
          mattis molestie a iaculis. At quis risus sed vulputate odio ut enim
          blandit volutpat. Nascetur ridiculus mus mauris vitae ultricies. Nunc
          mattis enim ut tellus elementum. Lectus proin nibh nisl condimentum id
          venenatis a. Donec enim diam vulputate ut pharetra sit. Enim blandit
          volutpat maecenas volutpat. In ante metus dictum at tempor commodo
          ullamcorper. Convallis tellus id interdum velit laoreet id donec.
          Posuere urna nec tincidunt praesent semper feugiat. Etiam sit amet
          nisl purus in mollis. Etiam erat velit scelerisque in dictum non.
          Volutpat est velit egestas dui id ornare. Volutpat blandit aliquam
          etiam erat velit scelerisque in. Elementum nisi quis eleifend quam
          adipiscing vitae proin sagittis. Risus ultricies tristique nulla
          aliquet enim. Proin fermentum leo vel orci porta non pulvinar neque.
          Eget mi proin sed libero enim sed. Ut sem viverra aliquet eget sit
          amet tellus. Aenean sed adipiscing diam donec adipiscing tristique
          risus. Augue neque gravida in fermentum et sollicitudin ac orci. Amet
          commodo nulla facilisi nullam vehicula. Dui vivamus arcu felis
          bibendum ut. Orci porta non pulvinar neque laoreet suspendisse
          interdum. Dui id ornare arcu odio. Vel fringilla est ullamcorper eget
          nulla facilisi. Magna etiam tempor orci eu lobortis elementum. Cras
          fermentum odio eu feugiat pretium nibh ipsum consequat. Eget mi proin
          sed libero enim sed faucibus. Lectus vestibulum mattis ullamcorper
          velit sed ullamcorper. At ultrices mi tempus imperdiet nulla malesuada
          pellentesque elit eget. Sit amet nisl purus in mollis nunc. Morbi enim
          nunc faucibus a pellentesque sit. Viverra ipsum nunc aliquet bibendum
          enim. A scelerisque purus semper eget duis at tellus. In aliquam sem
          fringilla ut morbi tincidunt augue. Mi ipsum faucibus vitae aliquet
          nec ullamcorper. Viverra suspendisse potenti nullam ac tortor vitae.
          Vitae congue mauris rhoncus aenean. Scelerisque viverra mauris in
          aliquam sem.
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {}
