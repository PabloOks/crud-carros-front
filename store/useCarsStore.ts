import { defineStore } from "@pinia/nuxt/dist/runtime/composables";

export const useCarsStore = defineStore('carStore', {
  state: () => ({
    cars: []
  }),
  actions: {
    async retrieveCars() {
      try {
        const result = await fetch('http://localhost:8000/cars').then(res => res.json);
        console.log(result);
        // this.cars = result.data;
      } catch (e) {
        console.log(e);
      }
    }
  }
});