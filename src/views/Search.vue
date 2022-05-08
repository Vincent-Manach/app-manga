<template>
  <ion-page>    
    <ion-content :fullscreen="false">
      <div id="searchBlock"> 
        <ion-input  id="searchInput" type="text" placeholder="Search..." v-model="search"></ion-input>
        <ion-button @click="searchData(search)">Search</ion-button>
      </div>

       <div class="showList" v-if="ok == true">
        <ion-slides pager="true" :options="slideOpts">
            <id-search-mangas v-for="result in results" :key="result.id" :result="result"></id-search-mangas>
        </ion-slides>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonInput, IonButton, IonSlides} from '@ionic/vue';
import IdSearchMangas from "@/components/mangas/IdSearchMangas.vue";
import { defineComponent } from 'vue';
import axios from 'axios';


export default defineComponent({
  name: 'Search',
  data () {
    return {
      results: [],
      search: null,
      ok: false
    }
  },
  components: {
    'id-search-mangas': IdSearchMangas,
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonSlides,
  },
  setup() {
    const slideOpts = {
      slidesPerView: 1,
      initialSlide: 0,
      speed: 400
    };
    return { slideOpts }
  },
  methods: {
    async searchData (data) {
      this.ok = false
        await axios.get(`https://api.mangadex.org/manga/?title=${data}`, {
         
        })
        .then(resp => {
            this.results = resp.data.data
            console.log(this.results);
            this.ok = true
            this.search = null
        })
        .catch(err => {
            console.error(err);
        });
      }
  }
});
</script>

<style scoped>

ion-searchbar {
  position: fixed;
  top: 70px;
}
ion-toolbar {
  display: flex;
  text-align: center;
}
#searchBlock {
  display: flex;
  position: relative;
  top: 120px;
  margin: 0 25px;
}
ion-input {
  border: 1px solid white;
  flex: 5;  
  border-radius: 3px;
}
ion-input input {
  color: black;
}
ion-buttton {
  flex: 1;
}
.showList {
  position: relative;
  top: 120px;
}
ion-slides {
  padding: 20px 0;
  height: auto;
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