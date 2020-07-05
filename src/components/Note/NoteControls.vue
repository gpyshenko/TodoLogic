<template>
    <div class="flexRow-C noteControls">
        <button class="noteControls__btn" type="button" title="Отметить заметку" @click="checkNote()">
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"/>
            </svg>
        </button>
        <router-link class="noteControls__btn" :to="getHref" title="Редактировать заметку">
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path
                    d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"/>
            </svg>
        </router-link>
        <button class="noteControls__btn" type="button" title="Удалить заметку" @click="deleteNote()">
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M6 32h20l2-22h-24zM20 4v-4h-8v4h-10v6l2-2h24l2 2v-6h-10zM18 4h-4v-2h4v2z"/>
            </svg>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'NoteControls',
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        computed: {
            getHref() {
                return {name: 'Note', query: {id: this.id}}
            }
        },
        methods: {
            checkNote() {
                this.$emit('check')
            },
            deleteNote() {
                this.$emit('delete',{
                    message: 'Удалить заметку?',
                        params: {
                        id: this.id
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .noteControls {
        width: 100%;
        opacity: 0;
        transition: .2s ease-out;

        &__btn {
            position: relative;
            z-index: 1;
            margin-right: 12px;
            margin-left: 12px;

            &::after {
                content: "";
                position: absolute;
                top: -50%;
                left: -50%;
                z-index: 0;
                display: block;
                width: 200%;
                height: 200%;
                border-radius: 50%;
                transition: background-color .2s ease-out;
            }

            &:hover {
                &::after {
                    background-color: rgba(var(--silver), .4);
                }
            }

            svg {
                position: relative;
                z-index: 2;
                display: block;
                width: 14px;
                height: 14px;
            }
        }
    }
</style>
