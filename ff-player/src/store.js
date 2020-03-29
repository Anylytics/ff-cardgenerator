import Vue from 'vue';
import Vuex from 'vuex';
import { indexToPos, posToIndex, randomInteger } from './utils';
import { board1, board2, board3, board4, transposeBoard } from './boards'
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
    boardSize: 16,
    elements: [
    ],
    boardMap: {

    },
    tokenList: [],
    obstacleMap: {},
    idMap: {

    },
    connection: undefined,
    selectedElement: undefined,
    selectedToken: undefined,
  },
  mutations: {
    clearBoard(state) {
      state.elements = [];
      state.boardMap = {};
      state.nextId = 1;
    },
    addObstacles(state, boards) {
      state.obstacleMap = { ...boards[0].walls, ...boards[1].walls, ...boards[2].walls, ...boards[3].walls};
    },
    addTokens(state, tokens) {
      state.tokenList = tokens;
      state.selectedToken = 0;
      state.tokenList[state.selectedToken].visible=true;
    },
    changeToken(state, payload) {
      let {direction} = payload;
      relayOverNetwork(state, payload, 'changeToken');
      let nextToken = state.selectedToken+direction;
      if (nextToken<0){
        nextToken = state.tokenList.length-1;
      }
      nextToken = nextToken % state.tokenList.length;
      state.tokenList[state.selectedToken].visible=false;
      state.selectedToken = nextToken;
      state.tokenList[state.selectedToken].visible=true;
    },
    addItem(state, item) {
      state.items.todo.push(Object.assign(item, { id: state.nextId }));
      state.nextId += 1;
    },
    addElement(state, { element }) {
      element.id = state.nextId;
      state.elements.push(element);
      const index = posToIndex(element.pos, state.boardSize);
      if (element.type === 'robot'){
        state.boardMap[index] = element;
      }
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
    async createRobot({ commit, state }, color) {
      let position = [randomInteger(0, state.boardSize - 1), randomInteger(0, state.boardSize - 1)];
      let index = posToIndex(position, state.boardSize);
      do {
        position = [randomInteger(0, state.boardSize - 1), randomInteger(0, state.boardSize - 1)];
        index = posToIndex(position, state.boardSize);
      } while (index in state.boardMap);
      const element = {
        type: 'robot',
        style: 'square',
        color: color,
        pos: position,
        size: 40,
        selected: false,
        visible: true,
      };
      commit('addElement', { element });
    },
    async createBoard({ commit, state, dispatch }) {
      commit('clearBoard');
      //select boards
      let boards = [transposeBoard(board1, [0, 0]), transposeBoard(board2, [0, 1]), transposeBoard(board3, [1, 0]), transposeBoard(board4, [1, 1])];
      commit('addObstacles', boards);
      //TODO: Move into a seperate function
      let allTokens = []
      boards.forEach( (board, idx) => {
        board.tokens.forEach( (t,idy) => {
          let element = {
            type: 'token',
            style: 'circle',
            color: 'black',
            pos: indexToPos(t, state.boardSize),
            size: 40,
            selected: false,
            visible: false,
          };
          allTokens.push(element);
          
        });
      });
      let specialIdx = randomInteger(0, allTokens.length);
      let tokenColors = ['#ee4035', '#0392cf', '#7bc043', '#fdf498'];
      allTokens.forEach( (t,idx) => {
        let element = t;
        element.color = tokenColors[idx%tokenColors.length]
        if (idx === specialIdx) {
          element.color = '#3d1e6d';
        }
        commit('addElement', {element});
      });
      commit('addTokens', allTokens);
      
      //create robots
      await dispatch('createRobot', '#ee4035');
      await dispatch('createRobot', '#0392cf');
      await dispatch('createRobot', '#7bc043');
      await dispatch('createRobot', '#fdf498');
      //commit('selectElement', { id: 1 });
    },
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
          relayOverNetwork('addTokens', state.tokenList);
        }
      });
    },
  },
});
