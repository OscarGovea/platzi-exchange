<template>
  <div class="flex-col">
    <template>
      <div class="flex justify-center mt-10">
        <bounce-loader
          style="text-align:center"
          :loading="isLoading"
          :color="'#ED8936'"
          :size="100"
        />
      </div>

      <div
        v-if="!isLoading"
        class="flex flex-col sm:flex-row justify-around items-center"
      >
        <div class="flex flex-col items-center">
          <img
            class="w-20 h-20 mr-5"
            :src="getImg(asset.symbol)"
            :alt="asset.name"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-800 mr-10 uppercase">Ranking</b>
              <span class="font-bold"># {{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-800 mr-10 uppercase">Precio actual</b>
              <span class="font-bold">{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-800 mr-10 uppercase">Precio más bajo</b>
              <span class="font-bold">{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-800 mr-10 uppercase">Precio más alto</b>
              <span class="font-bold">{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-800 mr-10 uppercase">Precio Promedio</b>
              <span class="font-bold">{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-800 mr-10 uppercase">Variación 24hs</b>
              <span
                v-bind:class="
                  asset.changePercent24Hr.includes('-')
                    ? 'text-red-600'
                    : 'text-green-600'
                "
                class="font-bold"
                >{{ asset.changePercent24Hr | percent }}</span
              >
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
      <line-chart
        class="my-10"
        :colors="['purple']"
        :min="min"
        :max="max"
        :data="history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      />
    </template>
  </div>
</template>

<script>
import api from "@/api";
export default {
  name: "CoinDetail",
  data() {
    return {
      isLoading: true,
      asset: {},
      history: {},
    };
  },
  computed: {
    min() {
      let prices = this.history.map((h) => parseFloat(h.priceUsd).toFixed(2));
      return Math.min(...prices);
    },
    max() {
      let prices = this.history.map((h) => parseFloat(h.priceUsd).toFixed(2));
      return Math.max(...prices);
    },
    avg() {
      let prices = this.history.map((h) => parseFloat(h.priceUsd).toFixed(2));
      return Math.abs(...prices);
    },
  },
  created() {
    this.getCoin();
  },
  methods: {
    getCoin() {
      this.isLoading = true;
      const id = this.$route.params.id;

      Promise.all([api.getAsset(id), api.getAssetHistory(id)])
        .then(([asset, history]) => {
          this.asset = asset;
          this.history = history;
        })
        .finally(() => (this.isLoading = false));
    },
    getImg(symbol) {
      var symbol2 = symbol.toLowerCase();
      return `https://static.coincap.io/assets/icons/${symbol2}@2x.png`;
    },
  },
};
</script>
