<template>
  <q-page class="constrain q-pa-md">
    <q-card class="card-post" flat bordered>
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
      <q-img src="Touka.jpg" />

      <q-card-section>
        <div class="text-h6">Mine :)</div>
        <div class="text-caption">October 6 15:18</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageHome'
}
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height: 200px
</style>
