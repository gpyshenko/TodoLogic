<template>
    <div class="notes">
        <app-alert @confirm="deleteNote" :props="alert"/>
        <div class="notes__empty" v-if="isEmpty">
            <p class="notes__empty-title">Заметок нет</p>
            <p class="notes__empty-text">Для создания заметки нажмите на кнопку "Создать"</p>
        </div>
        <div class="flexGrid notes__list" v-else>
            <div class="flexCell notes__list-item" v-for="(note,index) in list" :key="index + note.id">
                <list-note :id="note.id" :name="note.name" :todos="note.todos" @select="selectedNote(note.id)" @confirmDelete="confirmDelete"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { Transactions } from 'mixins/transactions';
    import { Alerts } from 'mixins/alerts';
    import Note from 'components/Note/Note';

    export default {
        name: 'Notes',
        components: {
            listNote: Note
        },
        mixins: [Transactions,Alerts],
        props: {
            list: {
                type: Array,
                required: true
            },
            selected: {
                type: Array,
                required: true
            }
        },
        computed: {
            isEmpty() {
                return this.list.length === 0
            }
        },
        methods: {
            loadNotes() {
                this.getItemsDB().then((result) => {
                    this.list.push(...result);
                })
            },
            selectedNote(id) {
                if(!this.selected.includes(id)) {
                    this.selected.push(id)
                } else {
                    const index = this.selected.indexOf(id);
                    this.selected.splice(index,1);
                }
            },
            confirmDelete(value) {
                this.openAlert(value);
            },
            deleteNote() {
                const noteId = this.alertParams.id;
                this.deleteItemDB(noteId).then(() => {
                    const index = this.list.findIndex(({id}) => noteId === id);
                    this.list.splice(index,1);
                })
            }
        },
        mounted() {
            this.loadNotes()
        }
    }
</script>

<style scoped>
    .notes {
        &__empty {
            padding: 40px;
            background-color: #fff;
            border-radius: 4px;
            &-title {
                margin-bottom: 20px;
                font-size: 18px;
                font-weight: 500;
            }
        }
        &__list {
            &-item {
                width: 25%;
                margin-bottom: 28px;
            }
        }
    }
    @media (max-width: 992px) {
        .notes {
            &__list {
                &-item {
                    width: 33.33%;
                    margin-bottom: 24px;
                }
            }
        }
    }
    @media (max-width: 767px) {
        .notes {
            &__list {
                &-item {
                    width: 50%;
                    margin-bottom: 20px;
                }
            }
        }
    }
    @media (max-width: 568px) {
        .notes {
            &__list {
                &-item {
                    margin-bottom: 16px;
                }
            }
        }
    }
    @media (max-width: 420px) {
        .notes {
            &__list {
                &-item {
                    padding-right: 8px;
                    padding-left: 8px;
                }
            }
        }
    }
</style>
