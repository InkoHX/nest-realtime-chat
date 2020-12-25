<template>
  <v-card class="pa-5">
    <v-virtual-scroll
      item-height="75"
      height="450"
      :items="receivedMessages"
    >
      <template v-slot:default="{ item, index }">
        <v-list-item-content :key="index">
          <v-list-item-title>
            No Name <span class="grey--text text--lighten-1">{{ item.date }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-divider></v-divider>
      </template>
    </v-virtual-scroll>
    <v-text-field
      clearable
      counter="120"
      type="text"
      label="Message"
      placeholder="Please enter the message you want to send."
      append-outer-icon="mdi-send"
      v-model="draftMessage"
      @keyup.enter="sendMessage"
      @click:append-outer="sendMessage"
      @click:clear="clearDraftMessage"
    ></v-text-field>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

interface ReceivedMessage {
  text: string
  date: string
}

@Component
export default class extends Vue {
  public readonly dateTime = new Intl.DateTimeFormat('ja-jp-u-ca-japanese')
  public draftMessage: string = ''
  public receivedMessages: ReceivedMessage[] = []
  public websocket?: WebSocket

  public sendMessage () {
    if (!this.draftMessage) return
    if (this.draftMessage.length > 120) return

    this.websocket?.send(this.draftMessage)
    this.clearDraftMessage()
  }

  public clearDraftMessage () {
    this.draftMessage = ''
  }

  public mounted () {
    this.websocket = new WebSocket('ws://localhost:3000')

    this.websocket.onmessage = event => this.receivedMessages.unshift({
      text: event.data,
      date: this.dateTime.format(Date.now())
    })
  }

  public beforeDestroy () {
    this.websocket?.close()
  }
}
</script>
