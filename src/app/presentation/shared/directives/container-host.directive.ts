import { ViewContainerRef, Directive } from '@angular/core';

@Directive({
  selector: '[appContainerHost]',
})
export class ContainerHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
