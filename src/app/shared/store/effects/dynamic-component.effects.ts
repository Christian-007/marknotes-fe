import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { ComponentCreator } from '@app/shared/services/component-creator/component-creator';
import { NavigationsActions } from '../actions';
import * as fromRoot from '../reducers';
import { DynamicComponentRef } from '@app/shared/models/dynamic-component.model';

@Injectable()
export class DynamicComponentEffects {
  constructor(
    private actions$: Actions,
    private componentCreator: ComponentCreator,
    private store: Store<fromRoot.ApplicationState>,
  ) {}

  buildComponent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationsActions.buildComponent),
      switchMap(actions => {
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

  destroyComponent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationsActions.destroyComponent),
      withLatestFrom(
        this.store.pipe(select(fromRoot.selectAllDynamicComponents)),
      ),
      switchMap(([actions, components]) => {
        const { id } = actions;
        const selectedComponent = components.find(
          (component: DynamicComponentRef) => component.data.id === id,
        );
        this.componentCreator.destroy(selectedComponent.component);

        return of(NavigationsActions.destroyComponentSuccess({ id }));
      }),
    ),
  );
}
