export const Transactions = {
    computed: {
        database() {
            return this.$store.getters['db/instance']
        }
    },
    methods: {
        getStoreDB(mode = 'readonly') {
            const transaction = this.database.transaction('notes', mode);
            return transaction.objectStore('notes');
        },
        handleEventsDB(request,resolve,reject) {
            request.onsuccess = ({ target }) => {
                resolve(target.result)
            }
            request.onerror = ({target}) => {
                console.error(target.error)
                reject();
            }
        },
        getItemDB(key) {
            return new Promise((resolve,reject) => {
                const store = this.getStoreDB();
                const request = store.get(key);
                this.handleEventsDB(request,resolve,reject);
            })
        },
        getItemsDB() {
            return new Promise((resolve,reject) => {
                const store = this.getStoreDB();
                const request = store.getAll();
                this.handleEventsDB(request,resolve,reject);
            })
        },
        addOrUpdateItemDB(method,value) {
            return new Promise((resolve,reject) => {
                const store = this.getStoreDB('readwrite');
                const request = store[method](value);
                this.handleEventsDB(request,resolve,reject);
            })
        },
        deleteItemDB(key) {
            return new Promise((resolve,reject) => {
                const store = this.getStoreDB('readwrite');
                const request = store.delete(key);
                this.handleEventsDB(request,resolve,reject);
            })
        },
        deleteItemsDB(list) {
            const store = this.getStoreDB('readwrite');
            const promises = list.map((item) => {
                return new Promise((resolve,reject) => {
                    const request = store.delete(item);
                    this.handleEventsDB(request,resolve,reject);
                })
            })
            return Promise.all(promises)
        }
    }
};
