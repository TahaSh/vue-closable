<template>
  <div id="app">
    <button
      ref="button"
      class="toggle-button"
      @click="showPopup = !showPopup"
    >
      TOGGLE
    </button>
    <div
      v-show="showPopup"
      v-closable="{
        exclude: ['button'],
        handler: 'onClose'
      }"
      class="popup-box"
    >
      Test Popup Box
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueClosable from '../vue-closable'

Vue.use(VueClosable)

export default {
  data () {
    return {
      showPopup: false
    }
  },

  methods: {
    onClose () {
      this.showPopup = false
    }
  }
}
</script>

<style scoped>
#app {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 600px;
  max-width: 100%;
  margin: 50px auto;
  position: relative;
}

.toggle-button {
  background: #1188FF;
  color: #FFF;
  border: 0;
  border-radius: 2px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: 0.2s all;
}

.toggle-button:hover {
  background: #1080F8;
}

.popup-box {
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  background: #F0F8FF;
  border-radius: 1px;
  box-shadow: 1px 1px 15px 0 rgba(0,0,0,0.2);
  padding: 40px;
  color: #555585;
}
</style>
