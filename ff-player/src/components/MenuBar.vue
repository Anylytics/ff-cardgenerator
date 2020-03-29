<template>
  <div class="container">
    <div class="row">Your Peer Id: {{peerId}}</div>
    <div class="row">
      <form action="#" method="post" v-on:submit.prevent="submitForm">
        <input
          class="form-control"
          type="text"
          v-model="remotePeer"
          placeholder="Insert Remote Peer Id"
          :readonly="connection != undefined"
        />
        <button type="submit" class="btn btn-primary" :disabled="connection != undefined">
          <div v-if="connection === undefined">Connect</div>
          <div v-else>Connected!</div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
/* eslint-disable no-console */
export default {
  name: "MenuBar",
  created() {
    const vuethis = this;
    this.$peer.on("open", id => {
      console.log(`Peer Id ${id}`);
      vuethis.peerId = id;
    });
    this.$peer.on("connection", conn => {
      vuethis.$store.dispatch("setupConnection", {
        connection: conn,
        sendBoardState: true
      });
      // vuethis.connection = conn;
    });
  },
  data() {
    return {
      peerId: undefined,
      remotePeer: undefined
    };
  },
  computed: {
    ...mapState(["connection"])
  },
  methods: {
    submitForm() {
      if (this.remotePeer !== undefined) {
        console.log("attempting to connect");
        const conn = this.$peer.connect(this.remotePeer);
        this.$store.dispatch("setupConnection", {
          connection: conn,
          sendBoardState: false
        });
      }
    },
    buttonClass(path) {
      return {
        btn: true,
        "btn-primary": this.$route.path === path,
        "btn-seconday": this.$route.path !== path
      };
    }
  }
};
</script>

<style scoped>
.menubar {
  margin-bottom: 16px;
}
</style>

