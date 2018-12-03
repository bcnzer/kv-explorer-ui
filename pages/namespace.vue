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
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="primary"
        />
        <p v-if="!isLoading && cfKeys === null">No keys found</p>
        <div class="text-xs-center">
          <v-pagination
            v-if="!isLoading"
            v-model="page"
            :length="pageLength"
            :total-visible="7"
            :disabled="panelDisabled"
            @input="changedPage"
          />
        </div>
        <v-expansion-panel 
          v-if="!isLoading"
          v-model="currentPanel"
          :disabled="panelDisabled"
          popout>
          <v-expansion-panel-content
            v-for="cfKey in cfKeys.result"
            :key="cfKey.name"
          >
            <div slot="header">{{ cfKey.name }}</div>
            <v-card>
              <v-progress-circular
                v-if="!cfKey.keyValue"
                indeterminate
                color="primary"
                class="ml-4 mb-3"
              />
              <v-card-text v-if="cfKey.keyValue">{{ cfKey.keyValue }}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    pageLength: 0,
    cfKeys: null,
    isLoading: true,
    currentPanel: null,
    panelDisabled: false
  }),

  head() {
    return {
      title: `KV Explorer - ${
        this.$store.state.currentNamespace &&
        this.$store.state.currentNamespace.title
          ? this.$store.state.currentNamespace.title
          : 'Namespace'
      }`
    }
  },

  computed: {
    namespaceTitle() {
      if (
        this.$store.state.currentNamespace &&
        this.$store.state.currentNamespace.title
      ) {
        return this.$store.state.currentNamespace.title
      }
      return null
    },
    namespaceId() {
      if (
        this.$store.state.currentNamespace &&
        this.$store.state.currentNamespace.id
      ) {
        return this.$store.state.currentNamespace.id
      }
      return null
    }
  },

  watch: {
    currentPanel: async function(newPanelIndex, oldPanelIndex) {
      if (newPanelIndex == undefined) {
        // User is closing a panel
        return
      }

      this.panelDisabled = true
      await this.loadKeyValue(newPanelIndex)
      this.panelDisabled = false
    }
  },

  mounted: async function() {
    if (!this.$store.state.currentNamespace) {
      this.$router.push('/')
    }

    await this.loadValuePage(1)
  },

  methods: {
    changedPage: async function() {
      await this.loadValuePage(this.page)
    },

    loadKeyValue: async function(keyIndex) {
      // Someone expanded the panel
      const response = await fetch(
        `https://kvexplorerapi.spottersystems.com/v1/key?key=${
          this.cfKeys.result[keyIndex].name
        }&namespace=${this.$store.state.currentNamespace.id}`
      )

      const keyValue = await response.text()
      this.cfKeys.result[keyIndex].keyValue = keyValue
    },

    loadValuePage: async function(page) {
      if (
        page < 0 ||
        !this.$store.state.currentNamespace ||
        !this.$store.state.currentNamespace.id
      ) {
        return
      }

      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      this.isLoading = true

      let response = await fetch(
        `https://kvexplorerapi.spottersystems.com/v1/keys?page=${
          this.page
        }&namespace=${this.$store.state.currentNamespace.id}`
      )
      this.cfKeys = await response.json()

      this.page = this.cfKeys.result_info.page
      this.pageLength = this.cfKeys.result_info.total_pages

      this.$nuxt.$loading.finish()
      this.isLoading = false
    }
  }
}
</script>
