import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authReducer'
import orderReducer from './orderReducer'
import bookingReducer from './bookingReducer'
import favoriteReducer from './favoriteReducer'
import themeReducer from './themeReducer'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorite'],
  blacklist: ['theme', 'order', 'booking'],
}
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  order: orderReducer,
  favorite: favoriteReducer,
  booking: bookingReducer,
  theme: themeReducer,
})

export default persistReducer(rootPersistConfig, rootReducer)
