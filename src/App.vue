<template>
  <ion-app>
    <Header :user="userStore.getUser"/>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import { useUserStore } from '@/stores/user.store';


export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Header
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
});
</script>