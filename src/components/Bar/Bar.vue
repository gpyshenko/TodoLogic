<template>
    <div class="flexRow bar">
        <app-alert :props="alert" @confirm="deleteSelected"/>
        <h1 class="bar__title">TODOs</h1>
        <div class="flexRow bar__controls">
            <button class="bar__delete" type="button" v-if="hasSelected" @click="confirmDelete">Удалить заметки</button>
            <router-link class="flexRow bar__add" :to="{name: 'Note'}">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path
                        d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"/>
                </svg>
                Создать
            </router-link>
        </div>
    </div>
</template>

<script>
    import {Transactions} from 'mixins/transactions';
    import { Alerts } from 'mixins/alerts'

    export default {
        name: 'Bar',
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
            hasSelected() {
                return this.selected.length !== 0
            }
        },
        methods: {
            confirmDelete() {
                this.openAlert({
                    message: 'Удалить заметки?'
                })
            },
            deleteSelected() {
                this.deleteItemsDB(this.selected).then(() => {
                    this.selected.forEach((id) => {
                        const indexItem = this.list.findIndex((item) => item.id === id);
                        this.list.splice(indexItem,1);
                    });
                    this.selected.splice(0)
                })
            }
        }
    }
</script>

<style scoped>
    .bar {
        justify-content: space-between;
        align-items: center;

        &__title {
            font-size: 32px;
        }
        &__delete {
            margin-right: 36px;
            font-size: 12px;
            text-transform: uppercase;
            text-decoration: underline;
        }
        &__add {
            align-items: center;
            height: 32px;
            padding-right: 20px;
            padding-left: 20px;
            color: #000;
            background-color: #fff;
            border-radius: 32px;
            transition: box-shadow .15s ease-out;

            &:hover {
                box-shadow: 0 3px 9px rgba(0, 0, 0, .12);
            }

            svg {
                display: block;
                margin-right: 12px;
            }
        }
    }
    @media (max-width: 480px) {
        .bar {
            position: relative;
            &__title {
                font-size: 28px;
            }
            &__delete {
                position: absolute;
                right: 0;
                top: calc(100% + 18px);
                margin-right: 0;
            }
        }
    }
</style>
