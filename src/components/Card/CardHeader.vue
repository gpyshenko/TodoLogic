<template>
    <div class="flexRow cardHeader">
        <div class="cardHeader__back">
            <button class="cardHeader__back-btn" type="button" @click="toBack">
                <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path
                        d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"/>
                </svg>
            </button>
        </div>
        <h1 class="cardHeader__title">Создание заметки</h1>
        <div class="flexRow cardHeader__history" v-if="hasHistory">
            <button class="cardHeader__history-btn" type="button" @click="undo" :disabled="isDisabled('prev')">
                <svg width="21" height="21" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M23.808 32c3.554-6.439 4.153-16.26-9.808-15.932v7.932l-12-12 12-12v7.762c16.718-0.436 18.58 14.757 9.808 24.238z"/>
                </svg>
            </button>
            <button class="cardHeader__history-btn" type="button" @click="redo" :disabled="isDisabled('next')">
                <svg width="21" height="21" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M18 7.762v-7.762l12 12-12 12v-7.932c-13.961-0.328-13.362 9.493-9.808 15.932-8.772-9.482-6.909-24.674 9.808-24.238z"/>
                </svg>
            </button>
        </div>
        <div class="flexRow cardHeader__controls" v-if="isEdit">
            <button class="cardHeader__controls-btn isCancel" type="button" @click="cancelChange" title="Отменить редактирование">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 32">
                    <path d="M20 2c7.732 0 14 6.268 14 14s-6.268 14-14 14v-3c2.938 0 5.701-1.144 7.778-3.222s3.222-4.84 3.222-7.778c0-2.938-1.144-5.701-3.222-7.778s-4.84-3.222-7.778-3.222c-2.938 0-5.701 1.144-7.778 3.222-1.598 1.598-2.643 3.601-3.041 5.778h5.819l-7 8-7-8h5.143c0.971-6.784 6.804-12 13.857-12zM26 14v4h-8v-10h4v6z"/>
                </svg>
            </button>
            <button class="cardHeader__controls-btn isRemove" type="button" @click="deleteNote" title="Удалить заметку">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M6 32h20l2-22h-24zM20 4v-4h-8v4h-10v6l2-2h24l2 2v-6h-10zM18 4h-4v-2h4v2z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CardHeader',
        props: {
            isEdit: {
                type: Boolean,
                required: true
            },
            emptyNote: {
                type: Boolean,
                required: true
            },
            history: {
                type: Object,
                required: true
            }
        },
        computed: {
            hasHistory() {
                return ['prev','next'].some((type) => this.history[type].length !== 0)
            }
        },
        methods: {
            toBack() {
                if(!this.isEdit && this.emptyNote) {
                    this.$router.go(-1)
                } else {
                    this.$emit('confirm', {
                        message: 'Заметка не сохранена, выйти?',
                        params: {
                            action: 'back'
                        }
                    })
                }
            },
            isDisabled(type) {
                return this.history[type].length === 0
            },
            undo() {
                this.$emit('undo')
            },
            redo() {
                this.$emit('redo')
            },
            cancelChange() {
                this.$emit('confirm', {
                    message: 'Отменить редактирование?',
                    params: {
                        action: 'cancel'
                    }
                })
            },
            deleteNote() {
                this.$emit('confirm', {
                    message: 'Удалить заметку?',
                    params: {
                        action: 'delete'
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .cardHeader {
        align-items: center;
        padding-bottom: 24px;
        margin-bottom: 24px;
        border-bottom: 1px solid #000000;

        &__back {
            display: block;
            margin-right: 16px;

            svg {
                display: block;
            }
        }

        &__title {
            margin-right: auto;
            font-size: 32px;
        }
        &__history {
            &:not(:last-child) {
                margin-right: 36px;
            }
            &-btn {
                color: #000;
                &[disabled] {
                    color: #a7a7a7;
                }
                &:not(:last-child) {
                    margin-right: 16px;
                }
                svg {
                    fill: currentColor;
                }
            }
        }
        &__controls {
            &-btn {
                width: 36px;
                height: 36px;
                color: #000;
                background-color: #fff;
                border-radius: 50%;
                transition: .2s ease-out;
                &:not(:last-child) {
                    margin-right: 16px;
                }
                svg {
                    display: block;
                    margin: 0 auto;
                    fill: currentColor;
                }
                &:hover {
                    color: #fff;
                }
                &.isCancel {
                    &:hover {
                        background-color: rgb(var(--ceruleanBlue));
                    }
                }
                &.isRemove {
                    &:hover {
                        background-color: rgb(var(--bittersweet));
                    }
                }
            }
        }
    }

    @media (max-width: 575px) {
        .cardHeader {
            flex-wrap: wrap;
            justify-content: center;
            &__back,
            &__title {
                margin-bottom: 24px;
            }
            &__title {
                width: calc(100% - 41px);
                font-size: 28px;
            }
        }
    }
    @media (max-width: 420px) {
        .cardHeader {
            &__title {
                width: calc(100% - 41px);
                font-size: 24px;
            }
        }
    }
</style>
