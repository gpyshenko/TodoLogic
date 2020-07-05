<template>
    <div class="notePage">
        <card-note/>
    </div>
</template>

<script>
    import Card from 'components/Card/Card';

    export default {
        name: 'Note',
        components: {
            cardNote: Card
        }
    }
</script>
