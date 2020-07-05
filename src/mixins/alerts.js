import Alert from 'components/Alert/Alert';

export const Alerts = {
    components: {
        appAlert: Alert
    },
    data() {
        return {
            alert: {
                opened: false,
                params: {}
            }
        }
    },
    computed: {
        alertParams() {
            return this.alert.params
        }
    },
    methods: {
        openAlert({message, params}) {
            this.alert.message = message;
            this.alert.params = params;
            this.alert.opened = true
        }
    }
}
