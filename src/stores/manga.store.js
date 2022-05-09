import { defineStore } from 'pinia';
import axios from 'axios';

export const useMangaStore = defineStore({
    id: 'manga',
    state: () => ({
        recents: [],
        actions: [],
        adventures: [],
        dramas: [],
        results: [],
        followedMangas: [],
        mangaStatus: '',
        loadingRecents: true,
        loadingActions: true,
        loadingAdventures: true,
        loadingDramas: true,
        loadingResults: true,
        loadingFollows: true,
    }),
    getters: {
        // get datas
        getRecents: (state) => { return state.recents },
        getActions: (state) => { return state.actions },
        getAdventures: (state) => { return state.adventures },
        getDramas: (state) => { return state.dramas },
        getResults: (state) => { return state.results },
        getFollows: (state) => { return state.followedMangas },
        getMangaStatus: (state) => { return state.mangaStatus },

        // loaders
        getLoadingRecents: (state) => { return state.loadingRecents },
        getLoadingActions: (state) => { return state.loadingActions },
        getLoadingAdventures: (state) => { return state.loadingAdventures },
        getLoadingDramas: (state) => { return state.loadingDramas },
        getLoadingResults: (state) => { return state.loadingResults },
        getLoadingFollows: (state) => { return state.loadingFollows },
    },
    actions: {
        // init fetch datas on home
        initFetchHome() {
            this.fetchRecent();
            this.fetchAction();
            this.fetchAdventure();
            this.fetchDrama();
        },
        async fetchRecent () {
            await axios.get('https://api.mangadex.org/manga?availableTranslatedLanguage[]=en&order[latestUploadedChapter]=desc', {
              params: {
                limit: 10
              }
            })
            .then(resp => {
                this.recents = resp.data.data
                this.loadingRecents = false
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
                this.loadingActions = false
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
                this.loadingAdventures = false
            })
            .catch(err => {
                console.error(err);
            });
        },
        async fetchDrama () {
            await axios.get('https://api.mangadex.org/manga?includedTags[]=b9af3a63-f058-46de-a9a0-e0c13906197a&availableTranslatedLanguage[]=en&order[latestUploadedChapter]=desc', {
              params: {
                limit: 10
              }
            })
            .then(resp => {
                this.dramas = resp.data.data
                this.loadingDramas = false
            })
            .catch(err => {
                console.error(err);
            });
        },
        // search data
        async searchData (data) {
            this.loadingResults = true
            await axios.get(`https://api.mangadex.org/manga/?title=${data}`, {
            
            })
            .then(resp => {
                this.results = resp.data.data
                this.loadingResults = false
            })
            .catch(err => {
                console.error(err);
            });
        },
        // fetch user's followed mangas
        async fetchFollows() {
            const token = localStorage.getItem('token')
            await axios.get('https://api.mangadex.org/user/follows/manga', {
              headers: {
                'Authorization':`Bearer ${token}`
              }
            })
            .then(res => {
                this.followedMangas = res.data.data
                console.log(this.followedMangas)
                this.loadingFollows = false
            })
            .catch(err => {
                console.error(err);
            });
        },
        // fetch manga status
        async fetchStatus (mangaId) {
            const token = localStorage.getItem('token')
            await axios.get(`https://api.mangadex.org/manga/${mangaId}/status`, {
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
    }
})