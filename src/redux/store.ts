import { createStore, combineReducers, applyMiddleware } from 'redux';
import { booksReducer, userReducer } from './reducers';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects'
import { watcherBooks, watcherUser } from './actionCreators';

export default createStore(
    combineReducers({
      books: booksReducer,
    }),
  );

const sagaMiddleware = createSagaMiddleware()

function* rootSaga() {
    yield all([
        watcherBooks(),
        watcherUser()
      ])
  }
  
const store = createStore(
    combineReducers({
        books: booksReducer,
        user: userReducer
    }), {},
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)  

export { store }