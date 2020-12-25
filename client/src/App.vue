<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>Realtime Chat App</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <Chat />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Chat from './components/Chat.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Chat
  }
})
</script>
