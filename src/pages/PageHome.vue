<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!LoadingPosts && posts.length">
          <q-card
            class="card-post q-p-mb-md"
            v-for="post in posts"
            :key="post.id"
            flat
            bordered
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="Ken Kaneki.jpg" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">Ken Kaneki</q-item-label>
                <q-item-label caption> Japan </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-img :src="post.imageUrl" />

            <q-card-section>
              <div class="text-h6">{{ post.caption }}</div>
              <div class="text-caption">{{ post.date | niceDate() }}</div>
            </q-card-section>
          </q-card>
        </template>
        <template v-else-if="!LoadingPosts && !posts.length">
          <h5 class="text-center text-grey">No posts yet</h5>
        </template>
        <template v-else>
        <q-card flat bordered>
          <q-item>
            <q-item-section>
              <q-skeleton type="QAvatar" animation="fade" size="40px"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" animation="fade" />
              </q-item-label>
              <q-item-label>
                <q-skeleton type="text" animation="fade" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-skeleton height="200px" square animation="fade" />

          <q-card-section>
            <q-skeleton  type="text" class="text-subtitle2" animation="fade" />
            <q-skeleton  type="text" width="50" class="text-subtitle2" animation="fade" />
          </q-card-section>
        </q-card>
        </template>
      </div>

      <div class="col-4 large-screen-only">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="Ken Kaneki.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">Ken Kaneki</q-item-label>
            <q-item-label caption> Japan </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
export default {
  name: "PageHome",
  data() {
    return {
      posts: [],
      LoadingPosts: false,
    };
  },
  methods: {
    getPosts() {
      this.LoadingPosts = true;
      fetch(`http://localhost:3000/posts`)
        .then((res) => res.json())
        .then((data) => {
          this.posts = data.results
          this.LoadingPosts = false
        }).catch((err) => {
        this.$q.dialog({
          title: "Error",
          message: "Could not find your posts",
        });
        this.LoadingPosts = false
    });
  },
},
filters: {
    niceDate(value) {
      return date.formatDate(value, "MMMM D h:mmA");
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style lang="sass">
.card-post
  .q-img
    min-height: 200px
</style>
