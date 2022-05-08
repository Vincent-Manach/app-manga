<template>  
    <ion-slide>
      <router-link :to="{ path: `/mangaFollowed/${followedManga.id}` }">
      <ion-card>
        <img v-bind:src="'https://uploads.mangadex.org/covers/'+followedManga.id+'/'+coverName" />
        <ion-card-header>
          <ion-card-title>{{ followedManga.attributes.title.en }}</ion-card-title>
          <h3>Status : {{ mangaStatus }}</h3>
        </ion-card-header>
        <ion-card-content>{{ hideDesc }}</ion-card-content>
      </ion-card>
      </router-link>
    </ion-slide>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSlide } from '@ionic/vue';
import axios from 'axios';
export default {
  
  props: {
    followedManga: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      coverId: this.followedManga.relationships[2].id,
      coverName: '',
      hideDesc: '',
      description: this.followedManga.attributes.description.en,
      mangaId: this.followedManga.id,
      mangaStatus: ''
    }
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSlide
  },
  mounted() {
    axios.get(`https://api.mangadex.org/cover/${this.coverId}`)
    .then(resp => {
        this.coverName = resp.data.data.attributes.fileName
    })
    .catch(err => {
        console.error(err);
    });

    if (this.description.length > 250) {
        this.hideDesc = this.description.substring(0, 250) + '...';
    } else {
        this.hideDesc = this.description;
    }

    const token = localStorage.getItem('token')
    axios.get(`https://api.mangadex.org/manga/${this.mangaId}/status`, {
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
  }
}
</script>

<style scoped>
  ion-slide {
    width: 100vw;
  }
  ion-slide ion-card {
    padding: 15px;
    height: 500px;
  }
  ion-slide ion-card img {
    width: 120px;
  }
  ion-card-content {
    padding: 0;
  }
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
  a {
    color: transparent;
  }
</style>