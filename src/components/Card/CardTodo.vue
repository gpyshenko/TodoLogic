<template>
    <div class="flexRow cardTodo">
        <button class="cardTodo__checkbox" :class="inChecked" type="button" @click="checkTodo">
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"/>
            </svg>
        </button>
        <input ref="input" type="text" class="cardTodo__input" :class="inChecked" :value="value" :disabled="checked"
               @input="handleInput" @keyup.enter="createNext">
        <button class="cardTodo__remove" :class="inChecked" type="button" @click="removeTodo" tabindex="-1">
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"/>
            </svg>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'CardTodo',
        props: {
            checked: {
                type: Boolean,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        },
        computed: {
            inChecked() {
                return {'checked': this.checked}
            }
        },
        methods: {
            checkTodo() {
                this.$emit('check', this.checked)
            },
            handleInput({target}) {
                this.$emit('input', target.value)
            },
            removeTodo() {
                this.$emit('remove')
            },
            createNext() {
                this.$emit('createNext')
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.input.focus()
            })
        }
    }
</script>

<style scoped>
    .cardTodo {
        align-items: center;
        &__checkbox,
        &__remove {
            width: 20px;
            height: 20px;
            svg {
                display: block;
                margin: 0 auto;
            }
        }
        &__checkbox {
            margin-right: 24px;
            color: #fff;
            border: 1px solid rgb(var(--whisper));
            border-radius: 4px;
            svg {
                fill: currentColor;
            }
            &:hover {
                border-color: rgb(var(--nero));
            }
            &.checked {
                color: rgb(var(--nero));
                background-color: rgb(var(--whisper));
            }
        }
        &__input {
            width: 100%;
            &.checked {
                text-decoration: line-through;
            }
            &[disabled] {
                background-color: transparent;
            }
            &:focus + .cardTodo__remove {
                opacity: 1;
            }
        }
        &__remove {
            margin-left: 24px;
            opacity: 0;
            transition: opacity .15s ease-out;
        }
    }

    @media (max-width: 420px) {
        .cardTodo {
            &__input {
                font-size: 14px;
            }
        }
    }
</style>
