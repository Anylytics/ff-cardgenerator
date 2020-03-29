<template>
  <div class="map-frame" :style="{height: boardSize*blockSize*mapScale+'px'}">
    <div class="map" :style="getMapStyle()" tabindex="0">
      <div
        class="tile"
        v-for="i in Array.from(Array(boardSize**2).keys())"
        :key="i"
        :style="setBlockStyle({}, i)"
        @click="tileClicked(i)"
      ></div>
      <div v-for="element of elements" :key="'element'+element.id">
        <!-- This div represents all the elements (robots) !-->
        <!-- <transition name="fade"> -->
        <div :style="elementStyle(element)" v-show="element.visible" :class="elementClass(element)"></div>
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { board1, board2, board3, board4, transposeBoard } from "@/boards";
import "../css/global.css";
/* eslint-disable no-param-reassign, no-mixed-operators, no-console */
export default {
  name: "RicochetBoard",
  data() {
    return {
      nrows: 5,
      ncolumns: 5,
      blockSize: 80,
      robotSize: 50
    };
  },
  created() {
    this.$store.dispatch("createBoard");
  },
  computed: {
    mapScale() {
      const smallest =
        window.innerWidth > window.innerHeight
          ? window.innerHeight
          : window.innerWidth;
      const size = smallest > 800 ? 800 : smallest;
      return (size / (this.boardSize * this.blockSize)) * 0.9;
    },
    ...mapState([
      "boardSize",
      "elements",
      "boardMap",
      "obstacleMap",
      "selectedElement",
      "connection"
    ])
  },
  methods: {
    setBlockStyle(obj = {}, index) {
      obj.width = `${this.blockSize}px`;
      obj.height = `${this.blockSize}px`;
      if (this.obstacleMap[index] !== undefined) {
        this.obstacleMap[index].forEach(element => {
          obj["border-" + element] = "5px solid #4a4e4d";
        });
      }
      return obj;
    },
    setPieceSize(obj = {}, width, height) {
      obj.width = `${width}px`;
      obj.height = `${height}px`;
      return obj;
    },
    getMapStyle() {
      return {
        width: `${this.boardSize * this.blockSize + 8}px`,
        transform: `scale(${this.mapScale})`
      };
    },
    posToStyle(pos, itemsize = 80) {
      const [x, y] = pos;
      const offset = (this.blockSize - itemsize) / 2;
      return {
        top: `${x * this.blockSize + offset}px`,
        left: `${y * this.blockSize + offset}px`
      };
    },
    elementStyle(element) {
      const style = this.posToStyle(element.pos, element.size);
      style["background-color"] = element.color;
      if (element.style === 'triangle'){
        delete style['background-color']
        style['border-bottom-color'] = element.color;
      }
      if (element.selected === true) {
        style.animation = "pulsing 0.5s ease-in-out infinite alternate both";
      }
      return this.setPieceSize(style, element.size, element.size);
    },
    elementClass(element) {
      let style = ["unit"];
      style.push(element.style);
      return style;
    },
    tileClicked(tileIndex) {
      console.log(tileIndex);
      if (tileIndex in this.boardMap) {
        const element = this.boardMap[tileIndex];
        if (element.type === "robot") {
          this.$store.commit("selectElement", { id: element.id });
        }
      } else if (this.selectedElement !== undefined) {
        this.$store.commit("moveElement", {
          id: this.selectedElement.id,
          to_index: tileIndex
        });
      }
    }
  }
};
</script>

<style scoped>
.tile {
  display: inline-block;
  background-color: #70c7da;
  border: #71b4c3 solid 1px;
  box-sizing: border-box;
}
.map {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  outline: none;
  border: 4px solid #4f8490;
}
.map-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem auto;
}
.unit {
  background-color: black;
  border: grey solid 5px;
  box-sizing: border-box;
  position: absolute;
  transition: all 0.5s;
  pointer-events: none;
}

.square {
  background-color: #363636;
  border-color: #141414;
}

.circle {
  border-radius: 50%;
  border-color: #141414;
}
</style>
