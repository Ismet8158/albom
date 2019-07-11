<template>
  <div class="main">
      <div v-if="loading" class="loading">Загрузка...</div>
      <div v-else>
          <div v-if="next" class="albumList">
            <h2>Альбомы</h2>
            <router-link v-for="album in albums" :key="album.id" :to="`/albums/${album.id}`" class="link">{{album.title}}</router-link>
          </div>
          <div v-else>
              <router-view></router-view>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Albums',
  data(){
      return {
          albums: null,
          loading: true,
          baseUrl: 'https://jsonplaceholder.typicode.com/albums/',
          next: true
      }
  },
  created(){
    this.getAlbums();
  },
  beforeRouteUpdate(to, from, next){
      this.next = false;
      next();
  },
  methods: {
    getAlbums() {
      axios.get(this.baseUrl)
        .then(response => {
          this.albums = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>

<style scoped>
.main{
    display: flex;
    flex-direction: column;
    width: 100%;
}
.loading,h2{
  display: inherit;
  justify-content: center;
}
.albumList{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 10px;
}
.link{
  text-decoration: none;
  margin: 10px;
  color: #6c757d;
}
.link:hover{
    color: #ddd;
}
</style>
