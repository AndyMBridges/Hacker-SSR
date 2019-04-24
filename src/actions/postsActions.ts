// Import redux types
import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'

// Import Post Typing
import { IPost, IPostState } from '../reducers/postsReducer'

// Create Action Constants
export enum PostActionTypes {
  GET_ALL = 'GET_ALL'
}

// Interface for Get All Action Type
export interface IPostGetAllAction {
  type: PostActionTypes.GET_ALL
  posts: IPost[]
}

/* 
Combine the action types with a union (we assume there are more)
example: export type PostActions = IGetAllAction | IGetOneAction ... 
*/
export type PostActions = IPostGetAllAction

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllPosts: ActionCreator<
  ThunkAction<Promise<any>, IPostState, undefined, IPostGetAllAction>
> = query => {
  return async (dispatch: Dispatch) => {
    try {
      const searchTerm = query ? query : 'typescript'

      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${searchTerm}`
      )
      dispatch({
        posts: response.data.hits,
        type: PostActionTypes.GET_ALL
      })
    } catch (err) {
      console.error(err)
    }
  }
}
