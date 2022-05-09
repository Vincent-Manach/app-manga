<template>
  <ion-slide>
    <router-link :to="{ path: `/manga/${manga.id}` }">
      <ion-card>
        <img v-bind:src="'https://uploads.mangadex.org/covers/'+manga.id+'/'+coverName" />
        <ion-card-header>
          <ion-card-title>{{ manga.attributes.title.en }}</ion-card-title>
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
    manga: {
      type: Object,
      required: true,
    },
  },
  components: {
    IonCard, 
    IonCardHeader,
    IonCardTitle, 
    IonCardContent, 
    IonSlide
  },
  data() {
    return {
      coverId: '',
      coverName: '',
      hideDesc: '',
      description: this.manga.attributes.description.en
    }
  },
  mounted() {
    // fetch manga cover id (depends of its place in data)
    if (this.manga.relationships[2].type == "cover_art") {
      this.coverId = this.manga.relationships[2].id
    } else if (this.manga.relationships[3].type == "cover_art") {
      this.coverId = this.manga.relationships[3].id
    }

    // fetch manga cover
    axios.get(`https://api.mangadex.org/cover/${this.coverId}`)
    .then(resp => {
        this.coverName = resp.data.data.attributes.fileName
    })
    .catch(err => {
        console.error(err);
    });

    // hide description if it is more than 250 characters
    if (this.description.length > 250) {
        this.hideDesc = this.description.substring(0, 250) + '...';
    } else {
        this.hideDesc = this.description;
    }
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
  a {
    color: transparent;
  }
</style>