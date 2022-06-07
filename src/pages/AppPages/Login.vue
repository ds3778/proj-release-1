<template>
  <div class="q-pa-md">
    <q-banner class="bg-primary text-white">
      <h5>Authenticated vs Unauthenticated</h5>
      <p>
        Plan object can be seen when calling github api /users if authenticated.
        Click on <b>Authenticate</b> button below to see
      </p>
      <p>
        Plan object will be absent for unauthenticated user when calling github
        api /users. Click on <b>Not Authentic</b> button below to see
      </p>
    </q-banner>

    <div class="q-pa-md q-gutter-sm">
      <q-btn @click="authorize" color="primary" label="Authenticate"></q-btn>
      <q-btn @click="notauthorize" color="secondary" label="Not Authentic" />
      <p>
        <b>Response: </b>
        {{
          JSON.stringify(
            userData != null
              ? userData.data != null
                ? userData.data.plan
                : 'No plan object'
              : 'Error in calling api'
          )
        }}
      </p>
    </div>
  </div>
  <!-- About, Background, Course, Publications, Photo-->
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
const axios = require('axios').default;
export default defineComponent({
  name: 'LoginPage',
  setup() {
    type userType = {
      data: dataType;
    };
    type dataType = {
      login: string;
      plan: planType;
    };
    type planType = {
      name: string;
      space: string;
      collaborators: string;
      private_repos: string;
    };

    const unauthorizedData = ref({});
    const notauthorize = async () => {
      try {
        const user: userType = await axios.get(
          'https://api.github.com/users/ds3778',
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );
        console.log(JSON.stringify(user.data.plan));
        unauthorizedData.value = user;
        userData.value = '';
        return unauthorizedData;
      } catch (error) {
        console.log(
          `Error in calling github api in notauthorize method ${error}`
        );
        userData.value = '';
        unauthorizedData.value =
          "Not Authorized, Please click on 'Authenticate'";
      }
    };
    const userData = ref({});
    const authorize = async () => {
      try {
        const user: userType = await axios.get(
          'https://api.github.com/users/ds3778',
          {
            headers: {
              authorization:
                'Basic ' +
                btoa('ds3778' + ':' + `${process.env.GITHUB_ACCESS_TOKEN}`),
            },
          }
        );
        console.log(JSON.stringify(user.data.plan));
        userData.value = user;
        unauthorizedData.value = '';
        return userData;
      } catch (error) {
        console.log('Error in calling github api in authorize method');
      }
    };

    return {
      userData,
      authorize,
      notauthorize,
      unauthorizedData,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
