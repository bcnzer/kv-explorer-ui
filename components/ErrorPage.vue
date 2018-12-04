<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <h1 class="text-xs-center mb-4">Cannot find page</h1>
      <p class="text-xs-center mb-4">Please enter a valid URL</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  head() {
    return {
      title: 'Cannot Find URL'
    }
  },

  props: {
    error: {
      default: null,
      type: String
    }
  },

  layout: 'blog' // you can set a custom layout for the error page
}
</script>
