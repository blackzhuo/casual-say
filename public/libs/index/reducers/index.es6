import { CHATMESSAGE, USERNAME, THEME, HEADIMG } from '../constant/index.es6';
export default function chatMessage(state = {
  chatMessage: [],
  userName: '',
  theme: 0,
  headImg: '/source/1.jpg'
}, action) {
  switch (action.type) {
    case CHATMESSAGE:
      return Object.assign({}, state, {
        chatMessage: [...state.chatMessage, ...action.data]
      });
      break;
    case USERNAME:
      return Object.assign({}, state, {
        userName: action.data
      });
      break;
    case THEME:
      return Object.assign({}, state, {
        theme: action.data
      });
      break;
    case HEADIMG:
      return Object.assign({}, state, {
        headImg: action.data
      });
      break;
    default:
      return state;
  }
}