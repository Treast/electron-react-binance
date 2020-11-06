import { ADD_MASTERNODE, IMasternode, IMasternodeAction, SET_TRANSACTIONS } from '../actions/masternodeActions';

const initialState: IMasternode[] = [];

const masternodes = (state = initialState, action: IMasternodeAction) => {
  let index;
  switch (action.type) {
    case ADD_MASTERNODE:
      index = state.findIndex((masternode) => masternode.name === action.payload.name);

      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      break;

    case SET_TRANSACTIONS:
      index = state.findIndex((masternode) => masternode.name === action.payload.name);

      if (index > -1) {
        state[index].transactions = action.payload.transactions;
      }
      break;
  }

  return [...state];
};

export default masternodes;
