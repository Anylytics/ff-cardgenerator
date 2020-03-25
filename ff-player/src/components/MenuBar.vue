<template>
  <!-- <div class="menubar">
        <div class="btn-group" role="group" aria-label="Menu bar">
            <router-link to="/board" :class="buttonClass('/board')">Board</router-link>
            <router-link to="/backlog" :class="buttonClass('/backlog')">Backlog</router-link>
        </div>
  </div>-->
  <div class="container">
    <div class="row">
      Your Peer Id: {{peerId}}
    </div>
    <div class="row">
      <form action="#" method="post" v-on:submit.prevent="submitForm">
        <input class="form-control" type="text" v-model="remotePeer" placeholder="Insert Remote Peer Id" :readonly="connection != undefined"/>
        <button type="submit" class="btn btn-primary" :disabled="connection != undefined">
          <div v-if="connection === undefined"> Connect </div>
          <div v-else>Connected!</div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MenuBar",
  created() {
    let vuethis = this;
    this.$peer.on("open", function(id) {
      console.log("Peer Id " + id);
      vuethis.peerId = id;
    });
    this.$peer.on("connection", function(conn) {
      vuethis.$store.dispatch("setupConnection", {connection: conn, sendBoardState: true});
      //vuethis.connection = conn;
    });
  },
  data() {
    return {
      peerId: undefined,
      remotePeer: undefined,
    };
  },
  computed: {
    ...mapState(["connection"])
  },
  methods: {
    submitForm () {
      if (this.remotePeer != undefined) {
        console.log("attempting to connect");
         let conn = this.$peer.connect(this.remotePeer);
         this.$store.dispatch("setupConnection", {connection: conn, sendBoardState: false});
      }
    },
    buttonClass(path) {
      return {
        btn: true,
        "btn-primary": this.$route.path === path,
        "btn-seconday": this.$route.path !== path
      };
    },
  }
};
</script>

<style scoped>
.menubar {
  margin-bottom: 16px;
}
</style>

