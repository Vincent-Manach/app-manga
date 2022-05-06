<template>
  <!-- <div class="id-card">
    <img v-bind:src="'https://uploads.mangadex.org/covers/'+manga.id+'/'+coverName" alt="">
    <h2> {{ manga.attributes.title.en }} </h2>
    <h3>Description :</h3>
    <p> {{ manga.attributes.description.en }} </p>
    <br>
    <p><strong>Status</strong> : {{ manga.attributes.status }}</p>
  </div> -->
  <ion-slide>
    <router-link :to="{ path: `/manga/${result.id}` }">
      <ion-slide>
        <ion-card>
          <img v-bind:src="'https://uploads.mangadex.org/covers/'+result.id+'/'+coverName" />
          <ion-card-header>
            <ion-card-title>{{ result.attributes.title.en }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>{{ hideDesc }}</ion-card-content>
        </ion-card>
      </ion-slide>
    </router-link>
  </ion-slide>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSlide } from '@ionic/vue';
import axios from 'axios';

export default {
  
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  components: {
    IonCard, 
    IonCardHeader,
    IonCardTitle, 
    IonCardContent, 
    IonSlide,
  },
  data() {
    return {
      coverId: this.result.relationships[2].id,
      coverName: '',
      hideDesc: '',
      description: this.result.attributes.description.en
    }
  },
  mounted() {
    axios.get(`https://api.mangadex.org/cover/${this.coverId}`)
    .then(resp => {
        // console.log(resp.data.data);
        this.coverName = resp.data.data.attributes.fileName
        console.log(this.coverName);
    })
    .catch(err => {
        // Handle Error Here
        console.error(err);
    });
    console.log(this.result.attributes.description.en)

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
    width: 350px !important;
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