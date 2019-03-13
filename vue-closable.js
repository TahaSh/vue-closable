// This variable will hold the reference to
// document's click handler

let vueClosable = {}
vueClosable.install = function (Vue) {
  let handleOutsideClick
  Vue.directive('closable', {
    bind (el, binding, vnode) {
      // Here's the click/touchstart handler
      // (it is registered below)
      handleOutsideClick = (e) => {
        e.stopPropagation()
        // Get the handler method name and the exclude array
        // from the object used in v-closable
        const { handler, exclude = [] } = binding.value

        // This variable indicates if the clicked element is excluded
        let clickedOnExcludedEl = false
        exclude.forEach(refName => {
          // We only run this code if we haven't detected
          // any excluded element yet
          if (!clickedOnExcludedEl) {
            // Get the element using the reference name
            let excludedEl = vnode.context.$refs[refName]
            // Get the actual element if it is a Vue component
            excludedEl = (excludedEl instanceof Vue)
              ? excludedEl.$el
              : excludedEl
            if (excludedEl) {
              // See if this excluded element
              // is the same element the user just clicked on
              clickedOnExcludedEl = excludedEl.contains(e.target)
            }
          }
        })

        // We check to see if the clicked element is not
        // the dialog element and not excluded
        if (!el.contains(e.target) && !clickedOnExcludedEl) {
          // If the clicked element is outside the dialog
          // and not the button, then call the outside-click handler
          // from the same component this directive is used in
          vnode.context[handler]()
        }
      }
      // Register click/touchstart event listeners on the whole page
      document.addEventListener('click', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick)
    },

    unbind () {
      // If the element that has v-closable is removed, then
      // unbind the click/touchstart listener from the whole page
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueClosable)
}

export default vueClosable
