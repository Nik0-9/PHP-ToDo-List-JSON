const { createApp } = Vue;

createApp({
    data() {
        return {
            carbonara: [],
            newAction: '',
            apiUrl: 'server.php',
            lastId: null
        }
    },
    methods: {
        getData() {
            axios.get(this.apiUrl).then((res) => {
                console.log(res.data);
                this.carbonara = res.data;
                
            });
        },
        addAction() {
            const newObj = {
                id: null,
                text: this.newAction,
                done: false
            }
            let newId = 0;

            newObj.id = this.carbonara.length +1;
            const data = new FormData();
            data.append('id', newObj.id);
            data.append('text', newObj.text);
            data.append('done', newObj.done);
            axios.post(this.apiUrl, data).then((res) => {
                this.carbonara = res.data;
                
            });

            this.newAction = '';
            console.log(this.carbonara);
        },

        toggleLineThrough(id) {
            const item = this.carbonara.find((el) => el.id === id);
            console.log(item);
            if (item) {
                item.done = !item.done
            }
        },

        removeById(id) {
            const index = this.carbonara.findIndex((el) => el.id === id);
            if (index !== -1) {
                this.carbonara.splice(index, 1);
            }
        },

    },

    created() {
        this.getData();
        console.log(this.carbonara);
    }
}).mount('#app')