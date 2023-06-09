<template>
  <div class="row">
    <div class="flex flex-col md12">
      <h2 class="va-text-center">Home</h2>
    </div>
  </div>
  <div class="row">
    <div class="flex md12">
      <NuxtLink to="/novo"><VaButton>Novo</VaButton></NuxtLink>
      <VaSpacer class="spacer" />
      <VaButton @click="updateCars">Atualizar</VaButton>  
    </div>
  </div>
  <div class="row">
    <div class="flex flex-col md12">
      <VaDataTable
        :items="cars"
        :columns="columns"
        :filter="filter"
        @filtered="filteredCount = $event.items.length"
      >
        <template #headerPrepend>
          <VaInput v-model="input" placeholder="Filtrar..."/>
        </template>
        <template #bodyAppend>
          Itens: {{ filteredCount }}
        </template>
      </VaDataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  async function fetchCars() {
    const { pending, data } = await useFetch('http://localhost:8000/api/cars');
    return data;
  }

  const filter = ref('');
  const input = ref('');
  const data = await fetchCars();
  const cars = reactive(data.value.data[0]);
  const filteredCount = ref(cars.length);
  const columns = [
    { key: 'id' },
    { key: 'brand', label: 'Marca' },
    { key: 'model', label: 'Modelo' },
    { key: 'color', label: 'Cor' },
    { key: 'year', label: 'Ano de fabricação' }
  ]

  async function updateCars() {
    this.data.value = await fetchCars();
    this.cars.value = this.data.value.data[0];
  }
  
  useHead({
    title: 'Página principal'
  });

  watch(input, (value) => {
    setTimeout(() => {
      filter.value = value;
    }, 1000)
  });
</script>

<style scoped>
  .row {
    padding: 1rem 1rem;
  }
</style>