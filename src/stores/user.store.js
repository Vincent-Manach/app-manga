import { defineStore } from 'pinia';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        loggedUser: [],
    }),
    getters: {
        getUser: (state) => { return state.loggedUser },
    },
    actions: {
        async addUser(username, password) {
            await axios.post('https://api.mangadex.org/auth/login', {
                username: username,
                password: password
            })
            .then( res => {
                this.errorLog = '';
                const tokenUser = res.data.token.session
                const jwtToken = jwtDecode(tokenUser)
                // const userId = jwtToken.test
                this.loggedUser = jwtToken;

                console.log(jwtToken)

                localStorage.setItem('token', tokenUser)
                console.log(localStorage.getItem('token'))
                window.dispatchEvent(new CustomEvent('localstorage-changed', {
                    detail: {
                        storage: localStorage.getItem('token')
                    }
                }))
                // localStorage.setItem('log', 'LogOn')
                // console.log(localStorage.getItem('log'))
                // localStorage.setItem('userId', userId)
                // console.log(localStorage.getItem('userId'))
                // this.$router.push({ path: '/home' })
                // this.$router.push('/home');
                // window.location.reload();
                // this.refreshToken()
            })
            .catch(err => {
                console.log(err)
                this.errorLog = 'Your crendentials are invalid. Please try again'
            })
            // if (!this.hasShow(show.id)) {
            //     this.showsList = [...this.showsList, show];
            // }
        },
        removeUser(show) {
            this.showsList = this.showsList.filter(function(el) {
                return el.id !== show.id
            });
        }
    }
})