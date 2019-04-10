// Import Reducer type
import { Reducer } from 'redux';
import {
  PostActions,
  PostActionTypes,
} from '../actions/postsActions';

// Define the Post type
export interface IPost {
	title: string,
	objectID: number,
	url: string
}

// Define the Post State
export interface IPostState {
  readonly posts: IPost[];
}

// Define the initial state
const initialPostState: IPostState = {
  posts: []
};

export const postReducer: Reducer<IPostState, PostActions> = (
  state = initialPostState,
  action
) => {
  switch (action.type) {
    case PostActionTypes.GET_ALL: {
      return {
        ...state,
        posts: action.posts
      };
    }
    default:
      return state;
  }
};