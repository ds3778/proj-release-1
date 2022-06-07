<template>
  <div class="q-pa-md">
    <q-banner class="bg-primary text-white">
      <h6>GitHubDemo</h6>
    </q-banner>
    <div class="row">
      <q-table
        title="GitHub Data"
        dense
        :rows="rows"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body-cell-url="cell">
          <q-td :props="cell">
            <a :href="cell.value" target="_blank"
              >Click here to see the gist file</a
            >
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MyInfoPage',
};
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';

type rowType = {
  file_name: string;
  url: string;
  updated_at: string;
  type: string;
};

type responseType = {
  id: string;
  files: string[];
  values: string[];
  updated_at: string;
  public: string;
};

const columns = [
  {
    name: 'file_name',
    label: 'File Name',
    align: 'left',
    field: 'file_name',
    sortable: true,
  },
  {
    name: 'url',
    label: 'URL',
    align: 'left',
    field: 'url',
    sortable: true,
  },
  { name: 'type', label: 'Type', align: 'left', field: 'type' },
  { name: 'updated_at', label: 'Updated', align: 'left', field: 'updated_at' },
  { name: 'public', label: 'Is Public', align: 'left', field: 'public' },
];
let rows = ref([] as rowType[]);

onMounted(async () => {
  const res = await api.get('users/ds3778/gists');

  rows.value = [];
  const rList = res.data as responseType[];

  const resList = rList.map((row) => {
    const mappedRow: responseType = {
      id: row.id,
      files: Object.keys(row.files),
      values: Object.values(row.files),
      updated_at: row.updated_at,
      public: row.public,
    };
    return mappedRow;
  });
  console.log(JSON.stringify(resList));
  for (let elem of resList) {
    for (let value of elem.values) {
      rows.value.push({
        file_name: value.filename,
        url: value.raw_url,
        updated_at: elem.updated_at,
        type: value.type,
        public: elem.public,
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
