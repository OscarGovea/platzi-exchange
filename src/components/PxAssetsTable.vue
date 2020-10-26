<template>
  <table class="myTable .text-xl">
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="a in assets"
        :key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            width="50"
            height="50"
            :src="
              `https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`
            "
            :alt="a.name"
          />
        </td>
        <td>
          <b># {{ a.rank }}</b>
        </td>
        <td>
          <b class="hover:underline text-orange-600 font-bold"><router-link :to="{name:'coin-detail',params:{id:a.id}}">{{ a.name }}</router-link></b>
          <small class="text-gray-600" style="font-size:0.875rem !important">
            {{ a.symbol }}</small>
        </td>
        <td>
          <b>{{ a.priceUsd | dollar }}</b>
        </td>
        <td>
          <b>{{ a.marketCapUsd | dollar }}</b>
        </td>
        <td>
          <b
            :class="
              a.changePercent24Hr.includes('-')
                ? 'text-red-600'
                : 'text-green-600'
            "
            >{{ a.changePercent24Hr | percent }}</b
          >
        </td>
        <td class="hidden sm:block">
            <px-button v-on:custom-click="goToCoin(a.id)">Detalle</px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from '@/components/PxButton'
export default {
  name: "PxAssetsTable",
  components:{
      PxButton
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  methods:{
      goToCoin(id){
          this.$router.push({name:'coin-detail',params:{id}})
      },
  }
};
</script>

<style scoped>
.myTable {
  width: 100%;
}
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
