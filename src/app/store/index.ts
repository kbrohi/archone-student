import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromStudents from './reducers/students.reducer';


export interface State {

  [fromStudents.studentsFeatureKey]: fromStudents.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromStudents.studentsFeatureKey]: fromStudents.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
