<template>
  <v-container>
    <v-layout
      row
      wrap>
      <v-flex
        xs12
        mb-3>
        <h1 class="mb-2">{{ namespaceTitle }}</h1>
        <h3 class="mb-3">{{ namespaceId }}</h3>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(item,i) in 5"
            :key="i"
          >
            <div slot="header">Item</div>
            <v-card>
              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  async fetch({ store, params }) {
    const fullPath = `https://api.spotterpowerlifting.com/v1/entry/${params.id}`

    let response = await fetch(fullPath, {
      method: 'GET'
    })

    const compData = await response.json()
    store.commit('setCompData', compData)
  },

  computed: {
    namespaceTitle() {
      return this.$store.state.currentNamespace.title
    },
    namespaceId() {
      return this.$store.state.currentNamespace.id
    }
  },

  mounted: async function() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })

    let response = await fetch(
      'https://kvexplorerapi.spottersystems.com/v1/namespaces'
    )
    this.namespaces = await response.json()
    this.$store.commit('setNamespaces', this.namespaces)

    this.$nuxt.$loading.finish()
    this.isLoading = false
  }
}
</script>
