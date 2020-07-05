<template>
    <div class="homePage">
        <div class="homePage__bar">
            <home-bar :list="list" :selected="selected"/>
        </div>
        <div class="homePage__list">
            <home-notes :list="list" :selected="selected"/>
        </div>
    </div>
</template>

<script>
    import Bar from 'components/Bar/Bar';
    import Notes from 'components/Notes/Notes';

    export default {
        name: 'Home',
        components: {
            homeBar: Bar,
            homeNotes: Notes
        },
        data() {
            return {
                list: [],
                selected: []
            }
        }
    }
</script>

<style scoped>
    .homePage {
        &__bar {
            margin-bottom: 44px;
        }
    }
</style>
