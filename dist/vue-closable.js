/**
 * vue-closable v0.0.3
 * (c) 2019 Taha Shashtari
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueClosable = factory());
}(this, function () { 'use strict';

  // This variable will hold the reference to
  // document's click handler

  var vueClosable = {};
  vueClosable.install = function (Vue) {
    var handleOutsideClick;
    Vue.directive('closable', {
      bind: function bind (el, binding, vnode) {
        // Here's the click/touchstart handler
        // (it is registered below)
        handleOutsideClick = function (e) {
          e.stopPropagation();
          // Get the handler method name and the exclude array
          // from the object used in v-closable
          var ref = binding.value;
          var handler = ref.handler;
          var exclude = ref.exclude; if ( exclude === void 0 ) exclude = [];

          // This variable indicates if the clicked element is excluded
          var clickedOnExcludedEl = false;
          exclude.forEach(function (refName) {
            // We only run this code if we haven't detected
            // any excluded element yet
            if (!clickedOnExcludedEl) {
              // Get the element using the reference name
              var excludedEl = vnode.context.$refs[refName];
              // Get the actual element if it is a Vue component
              excludedEl = (excludedEl instanceof Vue)
                ? excludedEl.$el
                : excludedEl;
              if (excludedEl) {
                // See if this excluded element
                // is the same element the user just clicked on
                clickedOnExcludedEl = excludedEl.contains(e.target);
              }
            }
          });

          // We check to see if the clicked element is not
          // the dialog element and not excluded
          if (!el.contains(e.target) && !clickedOnExcludedEl) {
            // If the clicked element is outside the dialog
            // and not the button, then call the outside-click handler
            // from the same component this directive is used in
            vnode.context[handler]();
          }
        };
        // Register click/touchstart event listeners on the whole page
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
      },

      unbind: function unbind () {
        // If the element that has v-closable is removed, then
        // unbind the click/touchstart listener from the whole page
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('touchstart', handleOutsideClick);
      }
    });
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vueClosable);
  }

  return vueClosable;

}));
