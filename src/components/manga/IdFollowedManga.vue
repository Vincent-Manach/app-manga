<template>
    <ion-card>
      <img v-bind:src="'https://uploads.mangadex.org/covers/'+mangaId+'/'+coverName" />
      <ion-card-header>
        <ion-card-title>{{ mangaTitle }}</ion-card-title>
        <div class="detailsVol">
          <p>Last Chapter : {{ mangaLastChap }}</p>
          <p>Last Volume : {{ mangaLastVol }}</p>
        </div>
        
      </ion-card-header>
      <ion-card-content>{{ mangaDesc }}</ion-card-content>
      <ion-select :placeholder="mangaStatus" interface-options="options">
        <ion-select-option value="reading">Reading</ion-select-option>
        <ion-select-option value="on_hold">On hold</ion-select-option>
        <ion-select-option value="plan_to_read">Plan to read</ion-select-option>
        <ion-select-option value="dropped">Dropped</ion-select-option>
        <ion-select-option value="re_reading">Re reading</ion-select-option>
        <ion-select-option value="completed">Completed</ion-select-option>
      </ion-select>
      <ion-button @click="updateStatus">Update status</ion-button><br>
      <ion-button @click="removeFollow">Remove</ion-button>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import axios from 'axios';

export default {
  
  name: 'IdFollowedManga',
  data () {
    return {
      manga: [],
      mangaId: '', 
      mangaStatus: '',
      mangaTitle: '',
      mangaDesc: '',
      mangaLastVol: '',
      mangaLastChap: '',
      coverId: '',
      coverName: '',
    }
  },
  components: {
    IonCard,
    IonCardHeader,
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
            this.manga = resp.data
            this.mangaId = resp.data.data.id
            this.mangaTitle = resp.data.data.attributes.title.en
            this.mangaDesc = resp.data.data.attributes.description.en
            this.mangaLastChap = resp.data.data.attributes.lastChapter
            this.mangaLastVol = resp.data.data.attributes.lastVolume
            this.coverId = resp.data.data.relationships[2].id
            console.log(this.manga);
            this.fetchImg()
        })
        .catch(err => {
            console.error(err);
        });
      },

      async fetchImg () {
        await axios.get(`https://api.mangadex.org/cover/${this.coverId}`)
        .then(resp => {
            this.coverName = resp.data.data.attributes.fileName
        })
        .catch(err => {
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
            this.mangaStatus = resp.data.status
        })
        .catch(err => {
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
            console.error(err);
        });
      },

      async removeFollow () {
        const token = localStorage.getItem('token')
        await axios.delete(`https://api.mangadex.org/manga/${this.mangaId}/follow`, {
          headers: {
            'Authorization':`Bearer ${token}`
          }
        })
        .then( res => {
            console.log(res)
            this.$forceUpdate()
            this.$router.push('/profile')

        })
        .catch(err => {
            console.log(err)
        })
      },

      async fetchFollows() {
        const token = localStorage.getItem('token')
        await axios.get('https://api.mangadex.org/user/follows/manga', {
          headers: {
            'Authorization':`Bearer ${token}`
          }
        })
        .then(res => {
            this.followedMangas = res.data.data
            this.countData = res.data
            console.log(this.followedMangas)
            this.loading = false
        })
        .catch(err => {
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
    padding: 15px;
  }
  ion-card {
    padding: 15px;
  }
  ion-card-title {
    font-size: 26px;
  }
  .detailsVol {
    display: flex;
    justify-content: space-around;
  }
  .detailsVol p {
    padding: 5px 10px;
    background-color: orange;
    border-radius: 3px;
    color: white;
    font-size: 16px;
  }
  ion-card-content {
    color: white;
  }
  ion-select {
    width: 150px;
    margin: auto;
  }
</style>