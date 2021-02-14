<template>
  <div id="base">
    <Header></Header>
    <Sidebar></Sidebar>
    <div
      :class="{ 'menubar__panels--active': $root.menu_toggle }"
      class="content"
      id="content"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/TheHeader.vue";
import Sidebar from "./components/TheSidebar.vue";

export default {
  components: {
    Sidebar,
    Header,
  },
  methods: {
    errorCatcher: function (response) {
      let answer = "";
      switch (response.status) {
        case 400:
          if (Array.isArray(response.data) === false) {
            for (let [key, value] of Object.entries(response.data)) {
              answer = answer + key + ": " + value + "\n";
            }
          } else if (response.data.every((x) => typeof x === "object")) {
            for (let i = 0; i < response.data.length; i++) {
              for (let [key, value] of Object.entries(response.data[i])) {
                answer = answer + key + ": " + value + "\n";
              }
            }
          }
          alert(answer);
          break;
        case 0:
          alert("Error: API is not available. Try later.");
          break;
        default:
          console.log(response);
          break;
      }
    },
    requestStarted: async function () {
      try {
        let response = await this.$http.get(
          this.$root.urlForRequest + "languages/"
        );
        this.$root.langs = response.body;
        if (localStorage.choosenLangId)
          this.$root.choosenLangId = parseInt(localStorage.choosenLangId);
        else this.$root.choosenLangId = this.$root.langs[1].id;
      } catch (e) {
        this.errorCatcher(e);
      }
    },
  },
  watch: {
    choosenLangId() {
      localStorage.choosenLangId = this.$root.choosenLangId;
    },
  },
  created() {
    this.requestStarted();
    if (window.innerWidth <= 767) {
      if (
        this.$router.currentRoute.name !== "ContentExist" &&
        this.$router.currentRoute.name !== "ContentEditText"
      )
        this.$router.push({ name: "Content" });
    }
  },
};
</script>
<style>
@import "./assets/css/style.css";
@import "./assets/css/font-awesome.min.css";
@import "./assets/css/material-design-iconic-font.min.css";
</style>
