<template>
  <ion-page>    
    <ion-content :fullscreen="false">    
      <div id="container">
        <!-- <strong>Welcome to Manga Manach</strong>
        <p>(Nom provisoire)</p> -->

        <p>Ici les lists</p>

        <!-- <ion-accordion-group>
          <ion-accordion value="createList">
            <ion-item slot="header">
              <ion-label>New List</ion-label>
            </ion-item>

            <ion-list slot="content">
              <ion-item>
                <ion-label>Name</ion-label>
                <ion-input type="text"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label>Visibility</ion-label>
                <ion-select placeholder="Select One">
                  <ion-select-option value="private">Private</ion-select-option>
                  <ion-select-option value="public">Public</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-label>Default Label</ion-label>
                <ion-input></ion-input>
              </ion-item>
            </ion-list>
          </ion-accordion>
        </ion-accordion-group> -->
        
        <ListsList/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';

import ListsList from '@/components/lists/ListsList.vue';

export default defineComponent({
  name: 'Lists',
  components: {
    IonContent,
    // IonHeader,
    IonPage,
    ListsList,
    // IonToolbar,
  },
  methods: {
    async createList() {
      const token = localStorage.getItem('token')
      await axios.post('https://api.mangadex.org/list', {
        headers: {
        'Authorization':`Bearer ${token}`
        },
        payload: {

        }
      })
      .then( res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      }) 
    }
  }
});
</script>

<style scoped>

ion-toolbar {
  display: flex;
  text-align: center;
}

#container {
  text-align: center;
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>