<template>
    <div class="card">
        <app-alert :props="alert" @confirm="confirmAction"/>
        <card-header :isEdit="isEdit" :emptyNote="emptyNote" :history="history" @confirm="openAlert" @undo="undo"
                     @redo="redo"/>
        <div class="card__body">
            <div class="card__name">
                <label for="name" class="card__name-label">
                    <input id="name" class="card__name-input" :value="name" placeholder="Название" autocomplete="off"
                           @input="writeHistory($event,'name')"/>
                </label>
            </div>
            <div class="card__todos">
                <div class="card__todos-item" v-for="(todo,index) in todos" :key="index + 'arr'">
                    <card-todo :value="todo.value" :checked="todo.checked"
                               @check="checkTodo($event,index)" @remove="removeTodo(index)" @createNext="addTodo"
                               @input="writeHistory($event,'todo',index)"/>
                </div>
            </div>
            <card-controls :isEdit="isEdit" :id="noteID" :emptyNote="emptyNote" :name="name" :todos="todos"
                           @addTodo="addTodo"/>
        </div>
    </div>
</template>

<script>
    import { Transactions } from 'mixins/transactions'
    import { Alerts } from 'mixins/alerts'
    import CardHeader from 'components/Card/CardHeader'
    import CardTodo from 'components/Card/CardTodo'
    import CardControls from 'components/Card/CardControls'

    export default {
        name: 'Card',
        components: {
            cardHeader: CardHeader,
            cardTodo: CardTodo,
            cardControls: CardControls
        },
        mixins: [Transactions, Alerts],
        data () {
            return {
                name: '',
                todos: [
                    {
                        checked: false,
                        value: ''
                    }
                ],
                history: {
                    prev: [],
                    next: []
                },
                changed: {
                    name: false,
                    todos: false
                }
            }
        },
        computed: {
            noteID () {
                return +this.$route.query.id
            },
            isEdit () {
                return this.$route.query.id !== undefined
            },
            emptyNote () {
                return this.name.length === 0 && (this.todos.length === 0 || this.todos.every((row) => row.value.length === 0))
            }
        },
        methods: {
            loadNote () {
                if (!this.isEdit) return;
                this.getItemDB(this.noteID).then(({name,todos}) => {
                    this.name = name
                    this.todos = todos
                })
            },
            checkTodo (state, index) {
                this.todos[index].checked = !state
            },
            clearNextTimeline () {
                if (this.history.next.length !== 0) {
                    this.history.next.splice(0)
                }
            },
            removeTodo (index) {
                const removed = this.todos.splice(index, 1)
                this.history.prev.push({
                    field: 'todo',
                    action: 'delete',
                    index,
                    ...removed[0]
                })
                this.clearNextTimeline()
            },
            addTodo () {
                const todo = {
                    checked: false,
                    value: ''
                }
                this.history.prev.push({
                    field: 'todo',
                    action: 'add',
                    index: this.todos.length,
                    ...todo
                })
                this.todos.push(todo)
                this.changed.todos = true
                this.clearNextTimeline()
            },
            writeHistory (event, field, todoIndex = null) {
                const data = {
                    action: 'write',
                    field
                }
                if (field === 'name') {
                    if(this.isEdit) {
                        if(!this.changed.name) {
                            this.getItemDB(this.noteID).then(({ name }) => {
                                data.value = name;
                                this.changed.name = true;
                            })
                        } else {
                            data.value = this.name;
                        }
                    } else {
                        data.value = this.name;
                    }
                    this.name = event.target.value;
                }
                if (field === 'todo') {
                    if(this.isEdit) {
                        if(!this.changed.todos) {
                            this.getItemDB(this.noteID).then(({ todos }) => {
                                data.value = todos[todoIndex].value;
                                data.index = todoIndex;
                                this.changed.todos = true
                            })
                        } else {
                            data.value = this.todos[todoIndex].value;
                            data.index = todoIndex;
                        }
                    } else {
                        data.value = this.todos[todoIndex].value;
                        data.index = todoIndex;
                    }
                    this.todos[todoIndex].value = event;
                }
                this.clearNextTimeline();
                this.history.prev.push(data);
            },
            undo () {
                const prevTimeline = this.history.prev.pop()
                const { field, action, value, index } = prevTimeline
                const nextTimeline = Object.assign({}, prevTimeline)
                if (field === 'name') {
                    nextTimeline.value = this.name
                    this.name = value
                }
                if (field === 'todo') {
                    if (action === 'write') {
                        nextTimeline.value = this.todos[index].value
                        this.todos[index].value = value
                    }
                    if (action === 'delete') {
                        this.todos.splice(index, 0, prevTimeline)
                    }
                    if (action === 'add') {
                        this.todos.splice(index, 1)
                    }
                }
                this.history.next.push(nextTimeline)
            },
            redo () {
                const nextTimeline = this.history.next.pop()
                const { field, action, value, index } = nextTimeline
                const prevTimeline = Object.assign({}, nextTimeline)
                if (field === 'name') {
                    prevTimeline.value = this.name
                    this.name = value
                }
                if (field === 'todo') {
                    if (action === 'write') {
                        prevTimeline.value = this.todos[index].value
                        this.todos[index].value = value
                    }
                    if (action === 'delete') {
                        this.todos.splice(index, 1)
                    }
                    if (action === 'add') {
                        this.todos.splice(index, 0, nextTimeline)
                    }
                }
                this.history.prev.push(prevTimeline)
            },
            deleteNote () {
                this.deleteItemDB(this.noteID).then(() => {
                    this.$router.replace({ name: 'Home' })
                })
            },
            confirmAction () {
                const { action } = this.alertParams
                if (action === 'cancel') {
                    this.loadNote()
                }
                if (action === 'delete') {
                    this.deleteNote()
                }
                if (action === 'back') {
                    this.$router.go(-1)
                }
            }
        },
        mounted () {
            this.loadNote()
        }
    }
</script>

<style scoped>
    .card {
        &__body {
            min-height: 400px;
            padding: 40px 60px;
            background-color: #fff;
        }

        &__name {
            margin-bottom: 32px;

            &-input {
                width: 100%;
                font-size: 24px;
                font-weight: 500;
            }
        }

        &__todos {
            margin-bottom: 36px;

            &-item {
                &:not(:last-child) {
                    margin-bottom: 16px;
                }
            }
        }
    }
    @media (max-width: 575px) {
        .card {
            &__body {
                padding-right: 32px;
                padding-left: 32px;
            }
        }
    }
    @media (max-width: 420px) {
        .card {
            &__body {
                padding: 16px 20px;
            }
            &__name {
                font-size: 20px;
            }
        }
    }
</style>
