<template>
  <div class="q-pa-md row items-start">
    <q-card flat class="my-card bg-primary text-white">
      <q-card-section>
        <div class="text-h6">Info about me</div>
      </q-card-section>
    </q-card>
  </div>
  <!-- About, Background, Course, Publications, Photo-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MyInfo',
});
</script>

<script setup lang="ts">
import { onMounted } from 'vue';
import { api } from 'boot/axios';

type rowType = {
  name: string;
  login: string;
  repos_url: string;
  bio: string;
  updated_at: string;
};
let values: object = {};
onMounted(async () => {
  const res = await api.get<rowType>('users/ds3778');

  values = res.data as rowType;

  console.log('DEBUG : ' + JSON.stringify(values.login));
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
