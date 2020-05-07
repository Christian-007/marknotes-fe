import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ComponentCreator } from '@app/shared/services/component-creator/component-creator';
import { NavigationsActions } from '../actions';

@Injectable()
export class DynamicComponentEffects {
  constructor(
    private actions$: Actions,
    private componentCreator: ComponentCreator,
  ) {}

  buildComponent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationsActions.buildComponent),
      switchMap(actions => {
        console.log('actions: ', actions);
        const componentRef = this.componentCreator.build(actions.payload);
        this.componentCreator.insert(componentRef);

        const payload = {
          ...actions.payload,
          component: componentRef,
        };
        return of(NavigationsActions.buildComponentSuccess({ payload }));
      }),
    ),
  );
}
