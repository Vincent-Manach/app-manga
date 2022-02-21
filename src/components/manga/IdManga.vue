<template>
    <ion-card>
      <!-- <img v-bind:src="'https://uploads.mangadex.org/covers/'+manga.data.id+'/'+coverName" /> -->
      <ion-card-header>
        <ion-card-subtitle>{{ manga.data }}</ion-card-subtitle>
        <ion-card-title>{{ manga.data }}</ion-card-title>
        <!-- <h3>Status : {{ mangaStatus }}</h3> -->
      </ion-card-header>
      <ion-card-content>Desc</ion-card-content>
      <ion-select :placeholder="mangaStatus">
        <ion-select-option value="reading">Reading</ion-select-option>
        <ion-select-option value="on_hold">On hold</ion-select-option>
        <ion-select-option value="plan_to_read">Plan to read</ion-select-option>
        <ion-select-option value="dropped">Dropped</ion-select-option>
        <ion-select-option value="re_reading">Re reading</ion-select-option>
        <ion-select-option value="completed">Completed</ion-select-option>
      </ion-select>
      <ion-button @click="updateStatus">Update status</ion-button>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import axios from 'axios';

export default {
  
  name: 'IdManga',
  data () {
    return {
      manga: [],
      mangaStatus: '',
      // coverName: '',
    }
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonButton
  },
  methods: {
      async fetchData () {
        await axios.get(`https://api.mangadex.org/manga/${this.$route.params.id}`)
        .then(resp => {
            // console.log(resp.data.data);
            this.manga = resp.data
            console.log(this.manga);
        })
        .catch(err => {
            // Handle Error Here
            console.error(err);
        });
      },

      async fetchStatus () {
        const token = localStorage.getItem('token')
        console.log(this.$route.params.id)
        await axios.get(`https://api.mangadex.org/manga/${this.$route.params.id}/status`, {
          headers: {
            'Authorization':`Bearer ${token}`
          }
        })
        .then(resp => {
            console.log(resp.data.status)
            this.mangaStatus = resp.data.status
        })
        .catch(err => {
            // Handle Error Here
            console.error(err);
        });
      },

      async updateStatus () {
        const token = localStorage.getItem('token');
        const newStatus = document.querySelector('input[type="hidden"]').value;
        console.log(newStatus);
        const data = {
          "status": `${newStatus}`
        };

        await axios.post(`https://api.mangadex.org/manga/${this.$route.params.id}/status`, data, {
          headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            // Handle Error Here
            console.error(err);
        });
      }
    },
    mounted () {
      this.fetchData();
      this.fetchStatus();

      // axios.get(`https://api.mangadex.org/cover/${this.manga.relationships[2].id}`)
      // .then(resp => {
      //     // console.log(resp.data.data);
      //     this.coverName = resp.data.data.attributes.fileName
      // })
      // .catch(err => {
      //     // Handle Error Here
      //     console.error(err);
      // });
    }
  }
</script>

<style scoped>
  .id-card {
    color: black;
    border: 1px solid gray;
    background-color: white;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.50);
    border-radius: 15px;
    width: 300px;
    margin: 25px auto;
    padding: 5px;
  }
</style>