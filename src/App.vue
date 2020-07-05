<template>
  <div id="app" class="flexColumn app">
      <div class="container app__inner" v-if="isLoadedDB">
          <router-view/>
      </div>
  </div>
</template>

<script>
    export default {
        name: 'App',
        computed: {
            isLoadedDB() {
                return this.$store.getters['db/loaded']
            }
        },
        methods: {
            initDatabase() {
                const openRequest = indexedDB.open("database", 1.1);
                let db;
                openRequest.onupgradeneeded = (event) => {
                    db = event.target.result;
                    if(!db.objectStoreNames.contains('notes')) {
                        db.createObjectStore('notes', {autoIncrement: true, keyPath: 'id'})
                    }
                    this.$store.dispatch('db/init', db)
                }
                openRequest.onsuccess = (event) => {
                    db = event.target.result;
                    this.$store.dispatch('db/init', db);
                }
            }
        },
        mounted() {
            this.initDatabase();
        }
    }
</script>

<style>
    @import "styles/main.css";
    .app {
        min-height: 100vh;
        padding-top: 60px;
        padding-bottom: 60px;
        background-color: rgb(var(--whisper));
        &__inner {
            height: 100%;
        }
    }
</style>
