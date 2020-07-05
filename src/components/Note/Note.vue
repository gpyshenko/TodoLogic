<template>
    <div class="note" :class="inChecked">
        <p class="note__name">{{name}}</p>
        <ul class="note__todo">
            <li class="note__todo-item" v-for="({value},index) in filteredListByChecked" :key="index">{{value}}</li>
        </ul>
        <note-controls :id="id" @check="selectNote" @delete="hostEventDelete"/>
    </div>
</template>

<script>
    import { Transactions } from 'mixins/transactions';
    import NoteControls from 'components/Note/NoteControls';

    export default {
        name: 'Note',
        mixins: [Transactions],
        components: {
            noteControls: NoteControls
        },
        props: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            todos: {
                type: Array,
                required: true,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                selected: false
            }
        },
        computed: {
            inChecked() {
                return {'selected': this.selected}
            },
            filteredListByChecked() {
                return this.todos.filter(({checked},index) => index < 5 && !checked)
            }
        },
        methods: {
            selectNote() {
                this.selected = !this.selected;
                this.$emit('select');
            },
            hostEventDelete(value) {
                this.$emit('confirmDelete',value);
            }
        }
    }
</script>

<style scoped>
    .note {
        padding: 16px 20px 12px;
        background-color: #fff;
        border: 1px solid rgb(var(--whisper));
        border-radius: 4px;
        transition: box-shadow .2s ease-out;
        &.selected {
            box-shadow: 0 0 9px rgba(0,0,0,.15);
        }
        &__name,
        &__todo {
            margin-bottom: 20px;
        }
        &__name {
            font-size: 18px;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &__todo {
            &-item {
                font-size: 14px;
                line-height: 16px;
                list-style-position: inside;
                &:not(:last-child) {
                    margin-bottom: 2px;
                }
            }
        }
        &:hover {
            >>> .noteControls {
                opacity: 1;
            }
        }
    }

    @media (max-width: 420px) {
        .note {
            padding: 12px 16px;
            &__name {
                font-size: 16px;
            }
            &__todo {
                &-item {
                    font-size: 12px;
                }
            }
        }
    }
</style>
