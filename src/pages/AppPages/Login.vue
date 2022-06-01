<template>
  <div class="q-pa-md">
    <q-banner class="bg-primary text-white">
      <h6>Authenticated vs Unauthenticated</h6>
    </q-banner>

    <div class="q-pa-md q-gutter-sm">
      <q-btn @click="Increment" color="primary" label="Authenticate"></q-btn>
      <q-btn color="secondary" label="Unauthorized" />
      <p>{{ count }}</p>
    </div>
  </div>
  <!-- About, Background, Course, Publications, Photo-->
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { api } from 'boot/axios';
export default defineComponent({
  name: 'LoginPage',
  setup() {
    const count = ref(0);
    const Increment = async () => {
      const res = await api.get('user');
      console.log(res);
    };
    return { count, Increment };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
