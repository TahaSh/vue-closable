# vue-closable

If you're looking for a quick way to detect clicks outside of an element in Vue, then this simple directive is what you need.

## Setup

```
npm install vue-closable
```

You have two ways to setup `vue-closable`:

#### CommonJS (Webpack/Browserify)

- ES6

```js
import VueClosable from 'vue-closable'
Vue.use(VueClosable)
```

- ES5

```js
var VueClosable = require('vue-closable')
Vue.use(VueClosable)
```

#### Include

Include it directly with a `<script>` tag. In this case, you don't need to write `Vue.use(VueClosable)`, this will be done automatically for you.

## Demo
You can check this [CodePen](https://codepen.io/tahazsh/pen/yGoYBb) to see how it works.

## Usage

To listen for clicks outside an element, use the `v-closable` directive on it , like this:

```
<div
  v-closable="{
    handler: 'onClose'
    exclude: ['fooElementRef', 'barElementRef']
  }"
></div>
```

`handler` has the name of the method to call when the user clicks outside the element. So you just have to define it in `methods` section.

In `exclude` we have the elements that we don't want to call the handler if clicked on.

Note that in `exclude` we use the reference name of the element. You can define them via the `ref` attribute. For example: `<button ref="button"></button>`.

# Example: Close an element on outside click

I named this directive `v-closable` because the common use case for detecting outside clicks is to close elements (like dropdowns and modals). And to do that, we have to use `v-show` or `v-if` on the element and set its value to `false` when the user clicks outside it.

Here's an example:

``` html
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
import VueClosable from 'vue-closable'

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
```

## Bonus

In case you're interested, I wrote an article on how I created this directive: [An Easy Way to Detect Clicks Outside an Element in Vue](https://tahazsh.com/detect-outside-click-in-vue).

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019 Taha Shashtari