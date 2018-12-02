<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <v-card>
        <v-card-title class="headline">About KV Explorer</v-card-title>
        <v-card-text>
          <p>This is a personal tool originally created by <a href="https://twitter.com/bcnzer">Ben Chartrand</a> to view the contents of a KV namespace.</p>
          <p>It uses the Cloudflare API to get the data. The API has a pagination limit of 20 records so I've matched that in the UI.</p>
          <p>There's two components: this UI and the backend. The backend is purely a worker. I control access with <a
            href="https://www.cloudflare.com/products/cloudflare-access/">Cloudflare Access</a> (free for up to 5 users)</p>
          <p>Source can be found on <a
            href="https://github.com/bcnzer"
            target="_blank"
            title="contribute">GitHub</a>.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  head() {
    return {
      title: 'KV Explorer - About'
    }
  }
}
</script>
