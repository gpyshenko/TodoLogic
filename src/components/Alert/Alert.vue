<template>
    <div class="alert" v-if="isOpened">
        <div class="alert__inner">
            <p class="alert__title">{{getMessage}}</p>
            <div class="flexRow alert__controls">
                <button class="btn alert__btn" data-design="filled" type="button" @click="action(btn.value)" v-for="(btn,index) in controls" :key="index">
                    {{btn.text}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Alert',
        props: {
            props: {
                type: Object
            }
        },
        data() {
            return {
                controls: [
                    {
                        text: 'Да',
                        value: true
                    },
                    {
                        text: 'Нет',
                        value: false
                    }
                ]
            }
        },
        computed: {
            isOpened() {
                return this.props.opened
            },
            getMessage() {
                return this.props.message
            }
        },
        methods: {
            action(value) {
                this.props.opened = false;
                if(!value) return;
                this.$emit('confirm');
            }
        }
    }
</script>

<style scoped>
    .alert {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-top: 24px;
        background-color: rgba(0, 0, 0, .3);

        &__inner {
            width: 300px;
            padding: 24px 14px 16px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 5px;
        }

        &__title {
            margin-bottom: 16px;
            font-size: 18px;
            line-height: 22px;
            text-align: center;
        }
        &__controls {
            justify-content: center;
        }
        &__btn {
            margin-right: 20px;
            margin-left: 20px;
            font-weight: 500;
            &:first-child:hover {
                color: rgb(var(--ceruleanBlue));
            }
            &:last-child:hover {
                color: rgb(var(--bittersweet));
            }
        }
    }
</style>
