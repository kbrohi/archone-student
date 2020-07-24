import { Action } from '@ngrx/store';

export enum StudentsActionTypes {
  LoadStudentss = '[Students] Load Studentss',
  LoadStudentssSuccess = '[Students] Load Studentss Success',
  LoadStudentssFailure = '[Students] Load Studentss Failure',
}

export class LoadStudentss implements Action {
  readonly type = StudentsActionTypes.LoadStudentss;
}

export class LoadStudentssSuccess implements Action {
  readonly type = StudentsActionTypes.LoadStudentssSuccess;
  constructor(public payload: { data: any }) { }
}

export class LoadStudentssFailure implements Action {
  readonly type = StudentsActionTypes.LoadStudentssFailure;
  constructor(public payload: { error: any }) { }
}

export type StudentsActions = LoadStudentss | LoadStudentssSuccess | LoadStudentssFailure;

