const { createApp } = Vue;

createApp({
    data() {
        return {
            carbonara: [],
            newAction: '',
            apiUrl: 'server.php',

        }
    },
    methods: {
        getData() {
            axios.get(this.apiUrl).then((res) => {
                this.carbonara = res.data;

            });
        },
        addAction() {
            const newObj = {
                id: null,
                text: this.newAction,
                done: false
            }
            newObj.id = this.carbonara.length + 1;
            const data = new FormData();
            data.append('id', newObj.id);
            data.append('text', newObj.text);
            data.append('done', newObj.done);
            
            axios.post(this.apiUrl, data).then((res) => {
                this.carbonara = res.data;

            });

            this.newAction = '';
        },

        toggleLineThrough(index) {
            this.carbonara[index].done = !this.carbonara[index].done;
            if (this.carbonara[index]) {
                const data = this.carbonara[index];
                data.inde = index;
                axios.put(this.apiUrl, data).then((res) => {
                    this.carbonara = res.data;
                });
            }
        },
        removeById(index) {
            const data = {
                id: index
            }
            axios.delete(this.apiUrl, { data }).then((res) => {
                this.carbonara = res.data;
            });
        },
    },

    created() {
        this.getData();
    }
}).mount('#app')