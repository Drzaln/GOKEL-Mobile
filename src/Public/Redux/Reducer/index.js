import { combineReducers } from 'redux';
import user from './User';
import transaksi from './Transaksi'

const appReducer = combineReducers({
   user,
   transaksi
});

export default appReducer;