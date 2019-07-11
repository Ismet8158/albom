<template>
  <div id="app">
    <div class="home">
      <header class="header">
        <nav class="nav">
            <router-link to="home" exact>
              <img src="./assets/album.png" alt="" class="logo">
            </router-link>
            <router-link to="/albums" class="link" exact>Альбомы</router-link>
            <router-link to="/favorites" class="link" exact>Избранное</router-link>
        </nav>
        <div class="signOut" v-if="seen">
          <a @click="exit" class="link">Выйти</a>
        </div>
      </header>
      <div class="content">
        <router-view class="view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'

export default {
  name: 'app',
  data(){
    return {
      seen: false
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      vm.$router.replace('/favorites');
    })
  },
  watch: {
    '$route'(to, from){
      this.couldExit();
    }
  },
  mounted: function(){
    this.couldExit();
  },  
  methods:{
    exit(){
      const user = this.getData();
      user.status = "";
      localStorage.setItem("user", JSON.stringify(user));
      this.$router.replace("/login");
    },
    couldExit(){
      const user = this.getData();
      this.seen = user.status === "logged_in" ? true : false;
    },
    getData(){
      return JSON.parse(localStorage.getItem("user")) || {};
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html{
  height: 100%;
}
body{
  background: #e3e3e3;
}
#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.home{
  display: inherit;
  flex-direction: column;
  align-items: center;
  width: 800px;
}
.header{
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #6c757d;
  color: #fff;
  flex-direction: row;
  justify-content: space-between;
}
.header div{
  margin-right: 30px;
}
.nav{
  display: inherit;
  justify-content: flex-start;
  margin-left: 30px;
}
.logo{
  width: 40px;
  height: 40px;
  margin-right: 20px;
}
.link{
  color: #fff;
  text-decoration: none;
  margin: 10px;
  cursor: pointer;
}
.link:hover{
  color: #ddd;
}
.content{
  width: 100%;
  display: inherit;
  justify-content: center;
}
</style>
