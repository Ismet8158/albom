<template>
  <div class="main">
      <div v-if="loading" class="content">Загрузка...</div>
      <div v-else class="content">
          <div class="pageNav">
            <button @click="prevPage" class="button" :disabled="pageNumber == 0" >Пред.</button>
            <span>{{pageNumber + 1}}/{{pageCount}}</span>
            <button @click="nextPage" class="button" :disabled="pageNumber >= pageCount - 1">След.</button>
          </div>
          <div class="photoItems">
            <PhotosItem :key="photo.id" v-for="photo in paginatedData" :photoItem="photo"/>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import PhotosItem from './PhotosItem.vue'

export default {
  name: 'Photos',
  components: {
    PhotosItem
  },
  data(){
      return {
          photos: null,
          loading: true,
          baseUrl: 'https://jsonplaceholder.typicode.com/photos/',
          pageNumber: 0,
          size: 2
      }
  },
  computed:{
    pageCount(){
      return Math.ceil(this.photos.length/this.size);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
      end = start + this.size;
      return this.photos.slice(start, end);
    }
  },
  created(){
    this.getPhotos();
  },
  methods: {
    getPhotos() {
      axios.get(`${this.baseUrl}?albumId=${this.$route.params.id}`)
        .then(response => {
          this.photos = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },
    nextPage(){
         this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      }
  }
}
</script>

<style scoped>
.main{
    display: flex;
    background-color: #fff;
    width: 100%;
}
.content{
  display: inherit;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
.photoItems{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
}
.link{
  text-decoration: none;
  margin: 10px;
}
span{
  width: 100%;
}
.pageNav{
  display: inherit;
  align-items: center;
}
.button{
  border-radius: 2px;
  border: none;
  padding: 5px 12px;
  outline: none;
  transition: all .1s;
  cursor: pointer;
  font-weight: 400;
  border: 1px solid #6c757d;
  font-size: 16px;
  line-height: 1.5;
  color: #6c757d;
  background-color: transparent;
  }
.button:hover{
    background-color: #6c757d;
    color: #fff;
}
</style>
