<template>
  <v-container 
    fluid
    grid-list-sm>
    <h1 class="mb-3">Namespaces</h1>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="primary"
    />
    <p v-if="!isLoading && namespaces === null">No namespaces were found</p>
    <v-layout
      row
      wrap>
      <v-flex 
        v-for="namespace in namespaces"
        :key="namespace.id"
        xs12
        sm12
        md6
        lg6
        xl3
        class="pa-2">
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2} ${hover ? 'accent--text' : ''}`"
            class="mx-auto">
            <v-card-title 
              primary
              class="title">
              {{ namespace.title }}
            </v-card-title>
            <v-card-text>ID: {{ namespace.id }}</v-card-text>
            <v-card-actions>
              <v-btn
                outline
                class="ml-2 mb-1"
                @click="openNamespace(namespace)">
                Open
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import readCookie from '../helpers/readCookie.js'

export default {
  data: () => ({
    namespaces: null,
    isLoading: true
  }),

  head() {
    return {
      title: 'KV Explorer - Namespaces'
    }
  },

  mounted: async function() {
    if (this.$store.state.namespaces) {
      this.namespaces = this.$store.state.namespaces
      this.isLoading = false
      return
    }

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
  },

  methods: {
    openNamespace: function(namespace) {
      if (!namespace) {
        return
      }

      console.log(namespace)
      this.$store.commit('currentNamespace', namespace)
      this.$router.push('namespace')
    }
  }
}
</script>
