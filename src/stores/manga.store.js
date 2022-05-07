import { defineStore } from 'pinia';
import axios from 'axios';

export const useMangaStore = defineStore({
    id: 'manga',
    state: () => ({
        recents: [],
        actions: [],
        adventures: [],
        // dramas: [],
        // results: [],
    }),
    getters: {
        getRecents: (state) => { return state.recents },
        getActions: (state) => { return state.actions },
        getAdventures: (state) => { return state.adventures },
        // getDramas: (state) => { return state.dramas },
        // getResults: (state) => { return state.results },
    },
    actions: {
        initFetchHome() {
            this.fetchRecent();
            this.fetchAction();
            this.fetchAdventure();
        },
        async fetchRecent () {
            await axios.get('https://api.mangadex.org/manga?availableTranslatedLanguage[]=en&order[latestUploadedChapter]=desc', {
              params: {
                limit: 10
              }
            })
            .then(resp => {
                this.recents = resp.data.data
                this.loading = true
            })
            .catch(err => {
                console.error(err);
            });
            
        },
        async fetchAction () {
            await axios.get('https://api.mangadex.org/manga?includedTags[]=391b0423-d847-456f-aff0-8b0cfc03066b&availableTranslatedLanguage[]=en&order[latestUploadedChapter]=desc', {
              params: {
                limit: 10
              }
            })
            .then(resp => {
                this.actions = resp.data.data
                this.loading = true
            })
            .catch(err => {
                console.error(err);
            });
        },
        async fetchAdventure () {
            await axios.get('https://api.mangadex.org/manga?includedTags[]=87cc87cd-a395-47af-b27a-93258283bbc6&availableTranslatedLanguage[]=en&order[latestUploadedChapter]=desc', {
              params: {
                limit: 10
              }
            })
            .then(resp => {
                this.adventures = resp.data.data
                this.loading = true
            })
            .catch(err => {
                console.error(err);
            });
        },
        // async fetchDrama () {
        //     await axios.get('https://api.mangadex.org/manga?includedTags[]=b9af3a63-f058-46de-a9a0-e0c13906197a&availableTranslatedLanguage[]=en&order[latestUploadedChapter]=desc', {
        //       params: {
        //         limit: 10
        //       }
        //     })
        //     .then(resp => {
        //         this.dramas = resp.data.data
        //         this.loading = false
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
        // },
        // async searchData (data) {
        //     this.ok = false
        //     await axios.get(`https://api.mangadex.org/manga/?title=${data}`, {
            
        //     })
        //     .then(resp => {
        //         // console.log(resp.data.data);
        //         this.results = resp.data.data
        //         this.ok = true
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
        // }
    }
})