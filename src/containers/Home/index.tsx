import React, { FunctionComponent, useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { getAllPosts, PostActions } from '../../actions/postsActions';
import { IAppState } from '../../store';
import { IPost, IPostState } from '../../reducers/postsReducer';
import styled from 'styled-components';

const Input = styled.div`
  display: flex;
  input {
    height: 50px;
    width: 100%;
    padding: 1rem;
    font-size: 16px;
  }
  button {
    height: 50px;
    font-size: 16px;
    cursor: pointer;
    padding: 0 1rem;
    border: 0;
    background: #DDD;
  }
`

const Items = styled.ul`
  padding: 0 0 1rem;
  list-style-type: none;
`

const Item = styled.li`
  background-color: #FFF;
  margin: 1rem 0;
  a {
    padding: 1rem;
    cursor: pointer;
    text-decoration: none;
    color: #000;
    display: flex;
    align-items: center;
    width: 100%;
  }
`

const Number = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  border-radius: 3px;
  background-color: #6694D9;
  margin-right: 1rem;
  color: #FFF;
  font-style: normal;
`

// interface Hits {
// 	title: string,
// 	objectID: number,
// 	url: string
// }

// interface getPosts =  ((query: string) => void);

interface IProps {
  getPosts: ((query: string) => void),
  posts: IPost[]
}

const Home: FunctionComponent<IProps> = (props: IProps) => {

  const [query, setQuery] = useState<'typescript' | string>('typescript');
  
  const {posts, getPosts} = props;
  
	useEffect(() => {

      console.log('posts ', posts);

      if (posts.length === 0) {
        getPosts(query)
      }

	},[]);

	return (
		<Fragment>
      <Input>
        <input type="text" value={query}
          onChange={event => setQuery(event.target.value)}
          />
        <button
          type="button"
          onClick={() => props.getPosts(query)}
        >Search</button>
      </Input>

      <Items>
        {posts && posts.length > 0 && posts[0].title ? (
          posts.map(
            (item, i) =>
              item.title && (
                <Item key={item && item.objectID}>
                  <a href={item.url} target="_blank">
                    <Number>{i + 1}</Number>
                    {item.title}
                  </a>
                </Item>
              ),
          )
        ) : (
          <div>No results found!</div>
        )}
      </Items>
		</Fragment>
	);
}

const mapStateToProps = (store: IAppState) => {
  return {
    posts: store.posts.posts
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IPostState, undefined, PostActions>) => {
  return {
    getPosts: (query: string) => dispatch(getAllPosts(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

