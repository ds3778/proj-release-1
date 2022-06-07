<template>
  <div class="q-pa-md">
    <q-banner class="bg-primary text-white">
      <h6>Create New Repo</h6>
    </q-banner>

    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <p>
          <b>{{ JSON.stringify(repoName != null ? repoName : undefined) }}</b>
        </p>
        <q-input
          filled
          v-model="name"
          label="Repo name *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-toggle v-model="auto_init" label="Auto Init" />
        <q-toggle v-model="is_private" label="Is private" />
        <q-input
          filled
          v-model="gitignore_template"
          label="gitignore_template *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref, methods } from 'vue';
const axios = require('axios').default;

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const repoName = ref(null);
    const gitignore_template = ref(null);
    const auto_init = ref(false);
    const is_private = ref(false);
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    };
    return {
      name,
      gitignore_template,
      auto_init,
      is_private,
      repoName,
      onSubmit() {
        axios
          .post(
            'https://api.github.com/user/repos',
            {
              name: name.value,
              auto_init: auto_init.value,
              private: is_private.value,
              gitignore_template: gitignore_template.value,
            },
            axiosConfig
          )
          .then((resp) => {
            repoName.value = 'Created repo ' + resp.data.name + ' successfully';
          })
          .catch((error) => {
            repoName.value =
              'Error crateing repo, please try again ' + error.message;
          });
      },

      onReset() {
        name.value = null;
        gitignore_template.value = null;
        auto_init.value = false;
        is_private.value = false;
      },
    };
  },
  methods: {
    // required! should return a Boolean
    // or a Promise resolving to a Boolean
    validate() {
      console.log('called my-comp.validate()');
      return true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
