import { Action } from '@ngrx/store';
import { StudentsActions, StudentsActionTypes } from '../actions/students.actions'


export const studentsFeatureKey = 'students';

export interface State {
  students,
  error
}

export const initialState: State = {
  students: [],
  error: ""
};

export function reducer(state = initialState, action: StudentsActions): State {
  switch (action.type) {
    case StudentsActionTypes.LoadStudentss:
      return {
        ...state
      }
    case StudentsActionTypes.LoadStudentssSuccess: return {
      ...state,
      students: action.payload.data,
      error:''
    }
    case StudentsActionTypes.LoadStudentssFailure: return {
      ...state,
      students: [],
      error:action.payload.error
      
    }
    default:
      return state;
  }
}
