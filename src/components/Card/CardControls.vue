<template>
    <div class="flexRow cardControls">
        <div class="cardControls__add">
            <button class="cardControls__add-btn" type="button" @click="addNote">Добавить пункт</button>
        </div>
        <div class="cardControls__save" v-if="!emptyNote">
            <button class="cardControls__save-btn" type="button" @click="saveNote">{{getSaveTextBtn}}</button>
        </div>
    </div>
</template>

<script>
    import { Transactions } from 'mixins/transactions';

    export default {
        name: 'CardControls',
        mixins: [Transactions],
        props: {
            isEdit: {
                type: Boolean,
                required: true
            },
            emptyNote: {
                type: Boolean,
                required: true
            },
            id: {
                type: Number
            },
            name: {
                type: String,
                required: true
            },
            todos: {
                type: Array,
                required: true
            }
        },
        computed: {
            getSaveTextBtn() {
                return `${!this.isEdit ? 'Создать' : 'Сохранить'} заметку`
            }
        },
        methods: {
            addNote() {
                this.$emit('addTodo')
            },
            saveNote() {
                const note = {name: this.name, todos: this.todos};
                let requestMethod;
                if(!this.isEdit) {
                    requestMethod = 'add';
                } else {
                    requestMethod = 'put';
                    note.id = this.id;
                }
                this.addOrUpdateItemDB(requestMethod,note).then(() => {
                    this.$router.replace({name: 'Home'})
                })
            }
        }
    }
</script>

<style scoped>
    .cardControls {
        justify-content: space-between;
        align-items: center;
        &__add,
        &__save {
            &-btn {
                padding: 8px 16px;
                font-size: 12px;
                text-transform: uppercase;
                border-radius: 32px;
            }
        }
        &__add {
            &-btn {
                border: 1px solid #000;
                transition: .15s ease-out;
                &:hover {
                    color: #fff;
                    background-color: #000;
                }
            }
        }
        &__save {
            &-btn {
                color: #fff;
                background-color: rgb(var(--ceruleanBlue));
            }
        }
    }
    @media (max-width: 420px) {
        .cardControls {
            flex-direction: column;
            &__add {
                margin-right: auto;
                &-btn {
                    margin-bottom: 24px;
                }
            }
        }
    }
</style>
