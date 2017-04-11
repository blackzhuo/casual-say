import { CHATMESSAGE, USERNAME } from '../constant/index.es6';
export default function chatMessage(state = {
  chatMessage: [],
  userName: ''
}, action) {
  switch (action.type) {
    case CHATMESSAGE:
      return Object.assign({}, state, {
        chatMessage: [...state.chatMessage, action.data]
      });
      break;
    case USERNAME:
      return Object.assign({}, state, {
        userName: action.data
      });
      break;
    default:
      return state;
  }
}