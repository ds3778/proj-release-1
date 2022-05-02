<template>
  <div class="q-pa-md row items-start">
    <q-card flat class="my-card bg-primary text-white">
      <q-card-section>
        <div class="text-h6">
          <q-list highlight separator>
            <q-item
              v-for="(item, index) in data"
              highlight
              separator
              :key="index"
            >
              <q-item-main>
                <q-item-section>
                  <q-item-label caption>Name</q-item-label>{{ item.name }}
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Full Name</q-item-label
                  >{{ item.full_name }}
                </q-item-section>
              </q-item-main>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <!-- About, Background, Course, Publications, Photo-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'MyRepos',
  setup() {
    const $q = useQuasar();
    const data = ref(null);
    onMounted(() => {
      api
        .get('users/ds3778/repos')
        .then((response) => {
          data.value = response.data;
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem',
          });
        });
    });

    return { data };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
