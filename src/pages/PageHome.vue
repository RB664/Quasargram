<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card class="card-post q-p-mb-md" v-for="post in posts" :key="post.id" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="Ken Kaneki.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Ken Kaneki</q-item-label>
          <q-item-label caption>
            Japan
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-img :src="post.imageUrl" />

      <q-card-section>
        <div class="text-h6">{{post.caption}}</div>
        <div class="text-caption">{{post.date | niceDate()}}</div>
      </q-card-section>
    </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="Ken Kaneki.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Ken Kaneki</q-item-label>
          <q-item-label caption>
            Japan
          </q-item-label>
        </q-item-section>
        </q-item>
      </div>
    </div>

  </q-page>
</template>

<script>
  import {date} from 'quasar'
export default {
  name: 'PageHome',
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: 'Mine :)',
          date: 1665064097293,
          location: 'Japan',
          imageUrl: 'Touka.jpg'
        },
        {
          id: 2,
          caption: 'Mine :)',
          date: 1665064097293,
          location: 'Japan',
          imageUrl: 'Eru Chitanda.webp'
        },
        {
          id: 3,
          caption: 'Mine :)',
          date: 1665064097293,
          location: 'Japan',
          imageUrl: 'Lucy Heartfilia.webp'
        }
      ]
    }
  },
  filters: {
    niceDate(value){
      return date.formatDate(value, 'MMMM D h:mmA')
    }
  }
}
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height: 200px
</style>
