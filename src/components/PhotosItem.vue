<template>
    <div class="main">
        <span>{{photoItem.title}}</span>
        <img :src="photoItem.url" alt="" width="280" height="280">
        <button @click="addToFavorites" :disabled="disable">Добавить</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PhotosItem',
  props:{
      photoItem: Object,
  },
  data(){
      return {
          disable: false
      }
  },
  created(){
      //если элемент уже добавлен в избранное, то кнопка "Добавить" становится disabled
      const user = this.getData();
      for(let i = 0; i < user.photos.length; i++){
          if(user.photos[i].albumId === this.photoItem.albumId){
              this.disable = user.photos[i].id === this.photoItem.id ? true : false;
              if(this.disable) break;
          }
      }
  },
  methods:{
    addToFavorites() {
        this.disable = true;
        const user = this.getData();
        user.photos.push({...this.photoItem});
        localStorage.setItem("user", JSON.stringify(user));
    },
    getData(){
        return JSON.parse(localStorage.getItem("user") || '{}');
    },
  }
}
</script>

<style scoped>
.main{
    display: flex;
    flex-direction: column;
    align-items: center;
}
span{
  width: 100%;
}
</style>
