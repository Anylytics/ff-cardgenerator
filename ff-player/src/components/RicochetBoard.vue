<template>
  <div class="map-frame" :style="{height: boardSize*blockSize*mapScale+'px'}">
    <div class="map" :style="getMapStyle()" tabindex="0">
      <div
        class="tile"
        v-for="i in boardSize * boardSize"
        :key="i"
        :style="setBlockSize()"
        @click="tileClicked(i-1)"
      ></div>
      <div v-for="element of elements" :key="'element'+element.id">
        <!-- This div represents all the elements (robots) !-->
        <!-- <transition name="fade"> -->
        <div :style="elementStyle(element)" v-show="true" :class="elementClass(element)"></div>
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "../css/global.css";

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
    this.$store.commit("clearBoard");
    this.createRobot("#ee4035");
    this.createRobot("#0392cf");
    this.createRobot("#7bc043");
    this.$store.commit("selectElement", {id: 1});
  },
  computed: {
    mapScale() {
      let smallest =
        window.innerWidth > window.innerHeight
          ? window.innerHeight
          : window.innerWidth;
      let size = smallest > 800 ? 800 : smallest;
      return (size / (this.boardSize * this.blockSize)) * 0.9;
    },
    ...mapState(["boardSize", "elements", "boardMap", "selectedElement", "connection"])
  },
  methods: {
    createRobot(color) {
      let position = [this.randomInteger(0, 4), this.randomInteger(0, 4)];
      let index = this.posToIndex(position, this.boardSize);
      do {
        position = [this.randomInteger(0, 4), this.randomInteger(0, 4)];
        index = this.posToIndex(position, this.boardSize);
      } while (index in this.boardMap);
      let element = {
        type: "robot",
        color: color,
        pos: position,
        size: 40,
        selected: false
      };
      this.$store.commit("addElement", {element:element});
    },
    setBlockSize(obj = {}) {
      obj.width = this.blockSize + "px";
      obj.height = this.blockSize + "px";
      return obj;
    },
    setPieceSize(obj = {}, width, height) {
      obj.width = width + "px";
      obj.height = height + "px";
      return obj;
    },
    getMapStyle() {
      return {
        width: this.boardSize * this.blockSize + 8 + "px",
        transform: "scale(" + this.mapScale + ")"
      };
    },
    posToStyle(pos, itemsize = 80) {
      let [x, y] = pos;
      let offset = (this.blockSize - itemsize) / 2;
      return {
        top: x * this.blockSize + offset + "px",
        left: y * this.blockSize + offset + "px"
      };
    },
    elementStyle(element) {
      let style = this.posToStyle(element.pos, element.size);
      style["background-color"] = element.color;
      if (element.selected === true) {
        style.animation = `pulsing 0.5s ease-in-out infinite alternate both`;
      }
      return this.setPieceSize(style, element.size, element.size);
    },
    elementClass(element) {
      let style = ["unit", "robot", "green"];
      return style;
    },
    tileClicked(tileIndex) {
      console.log(tileIndex);
      if (tileIndex in this.boardMap) {
        let element = this.boardMap[tileIndex];
        if (element.type === "robot"){
          this.$store.commit("selectElement", {id: element.id});
        }
      }
      else {
        if (this.selectedElement != undefined) {
          this.$store.commit("moveElement", {id: this.selectedElement.id, to_index: tileIndex});
        }
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

.robot {
  background-color: #363636;
  border-color: #141414;
}
</style>