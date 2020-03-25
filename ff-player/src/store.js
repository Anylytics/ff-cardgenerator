import Vue from 'vue';
import Vuex from 'vuex';
import { indexToPos, posToIndex } from './utils';

Vue.use(Vuex);

/* eslint-disable no-param-reassign, no-console */
function relayOverNetwork(state, payload, functionName) {
  if (payload.fromNetwork === undefined && state.connection !== undefined) {
    console.log('relaying ', functionName);
    payload.functionName = functionName;
    state.connection.send(payload);
  }
}

/* eslint-disable no-param-reassign, camelcase, no-console */
export default new Vuex.Store({
  state: {
    items: {
      todo: [],
      inProgress: [],
      done: [],
    },
    nextId: 1,
    boardSize: 5,
    elements: [
    ],
    boardMap: {

    },
    idMap: {

    },
    connection: undefined,
    selectedElement: undefined,
  },
  mutations: {
    clearBoard(state) {
      state.elements = [];
      state.boardMap = {};
      state.nextId = 1;
    },
    addItem(state, item) {
      state.items.todo.push(Object.assign(item, { id: state.nextId }));
      state.nextId += 1;
    },
    addElement(state, { element }) {
      element.id = state.nextId;
      state.elements.push(element);
      const index = posToIndex(element.pos, state.boardSize);
      state.boardMap[index] = element;
      state.idMap[element.id] = element;
      state.nextId += 1;
    },
    selectElement(state, payload) {
      relayOverNetwork(state, payload, 'selectElement');
      const { id } = payload;
      console.log(`selectElement ${id}`);
      if (state.selectedElement !== undefined) {
        state.selectedElement.selected = false;
      }
      const element = state.idMap[id];
      console.log(element);
      if (element !== undefined) {
        element.selected = true;
        state.selectedElement = element;
      }
    },
    updateItems(state, { items, id }) {
      console.log(id);
      state.items[id] = items;
    },
    moveElement(state, payload) {
      relayOverNetwork(state, payload, 'moveElement');
      const { id, to_index } = payload;
      const element = state.idMap[id];
      const from_position = element.pos;
      const from_index = posToIndex(from_position, state.boardSize);
      const to_position = indexToPos(to_index, state.boardSize);
      console.log(`moving element ${id} to ${to_position}`);

      delete state.boardMap[from_index];
      element.pos = to_position;
      state.boardMap[to_index] = element;

      console.log(state.boardMap);
    },
  },
  actions: {
    setupConnection({ commit, state }, { connection, sendBoardState }) {
      // Setup all the handlers with a connection
      state.connection = connection;
      connection.on('open', () => {
        console.log('Connection open, setting up handlers');
        connection.on('data', (payload) => {
          payload.fromNetwork = true;
          console.log('recieved ', payload.functionName);
          commit(payload.functionName, payload);
        });

        if (sendBoardState === true) {
          console.log('sendingBoardState');
          relayOverNetwork(state, {}, 'clearBoard');
          for (const element of state.elements) {
            relayOverNetwork(state, { element }, 'addElement');
            if (element.selected) {
              relayOverNetwork(state, { id: element.id }, 'selectElement');
            }
          }
        }
      });
    },
  },
});
