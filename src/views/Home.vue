<template>
  <div>
    <div class="flex justify-center mt-10">
        <bounce-loader
          style="text-align:center"
          :loading="isLoading"
          :color="'#ED8936'"
          :size="100"
        />
      </div>
    <px-assets-table v-if="!isLoading" :assets="assets" class="mt-2" />
  </div>
</template>

<script>
import api from "@/api";
import PxAssetsTable from "@/components/PxAssetsTable";
export default {
  name: "Home",
  components: { PxAssetsTable },
  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },
  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  },
};
</script>
