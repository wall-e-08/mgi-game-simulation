const app = new Vue({
    el: '#app',
    data: {
        initial_coin: 100,
        max_coin: 500,
        add_coin_per_sec: 5,
        game_time_in_sec: 0,
        game_coin: 0,
        loadable_data: ['initial_coin', 'max_coin', 'add_coin_per_sec', 'game_time_in_sec', 'game_coin']
    },
    template: `
        <div class="row">
            <div class="col-md-8">
                <p class="mb-0">Game time: <span class="font-weight-bold">{{ formatted_game_time }}</span></p>
                <p class="mb-0">Coin: <span class="font-weight-bold">{{ game_coin }} <span class="font-weight-normal" v-if="game_coin == max_coin">(reached max)</span></span></p>
            </div>
            <div class="col-md-4">
                <aside>
                    <div class="border border-dark p-4">
                        <p class="mb-0">Initial Coin: <span class="font-weight-bold">{{ initial_coin }}</span></p>
                        <p class="mb-0">Max Coin: <span class="font-weight-bold">{{ max_coin }}</span></p>
                    </div>
                    <div class="mt-4">
                    
                    </div>
                </aside>
            </div>
        </div>
    `,
    created() {
        this.load_from_localstorage();

        if (this.game_coin === 0)
            this.game_coin = this.initial_coin;
    },
    computed: {
        formatted_game_time: function () {
            let dt = new Date(this.game_time_in_sec * 1000);
            return `${dt.getUTCHours()}h ${dt.getUTCMinutes()}m ${dt.getUTCSeconds()}s`
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            window.setInterval(() => {
                this.game_time_in_sec++;
                if (this.game_coin < this.max_coin) {
                    this.game_coin += this.add_coin_per_sec;
                }
                this.save_data_to_localstorage();
            },1000);
        })
    },
    methods: {
        save_data_to_localstorage: function () {
            for (let _key of this.loadable_data) {
                window.localStorage[_key] = this[_key];
            }
        },
        load_from_localstorage: function () {
            for (let _key of this.loadable_data) {
                let _int_val = parseInt(window.localStorage[_key]);
                if (!isNaN(_int_val)) {
                    this[_key] = _int_val;
                }
            }
        }
    },
});
