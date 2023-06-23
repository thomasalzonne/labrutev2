import axios from 'axios'
import { BehaviorSubject } from 'rxjs';

class AuthService {
    user = new BehaviorSubject(undefined)
    logForm = new BehaviorSubject(true)
    token = null
    constructor() {
        this.me()
    }
    me() {
        this.setToken(localStorage.getItem('token'))
        if(this.token){
            axios.get('/user/me')
                .then(e => this.user.next({id: e.data.id, username :e.data.username}))
        }
    }
    setToken(token){
        this.token = token
        axios.defaults.headers.common["Authorization"] = this.token;
    }
    register(user) {
        axios.post("/user/create", {
          username: user.username,
          password: user.password,
        }).then((e) => {
          this.token = e.data.token
          this.user.next({id: e.data.id, username :e.data.username})
          axios.defaults.headers.common["Authorization"] = e.data.token;
          localStorage.setItem("token", e.data.token);
        })
      }
      login(values) {
        return axios.post("/user/login", {
          username: values.username,
          password: values.password,
        }).then((e) => {
          this.token = e.data.token
          this.user.next({id: e.data.id, username :e.data.username});
          axios.defaults.headers.common["Authorization"] = e.data.token;
          localStorage.setItem("token", e.data.token);
        });
      }
      logout() {
        this.user.next(null);
        axios.defaults.headers.common["Authorization"] = undefined;
        this.token = null;
        localStorage.removeItem('token')
      }
      getUser() {
        return this.user
      }
      registerForm() {
        return this.logForm.next(!this.logForm.value)
      }
}

export default new AuthService()