<template>
  <error-page error="error" />
</template>

<script>
import ErrorPage from '~/components/ErrorPage.vue'

export default {
  components: {
    ErrorPage
  },

  props: {
    error: {
      default: null,
      type: String
    }
  }
}
</script>
