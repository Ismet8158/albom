<template>
  <div class="main">
    <h2>Избранное</h2>
    <div v-if="!pageCount" class="content">Список пуст</div>
    <div v-else class="content">
      <div class="pageNav">
        <button @click="prevPage" class="button" :disabled="pageNumber == 0">Пред.</button>
        <span>{{pageNumber + 1}}/{{pageCount}}</span>
        <button @click="nextPage" class="button" :disabled="pageNumber >= pageCount - 1">След.</button>
      </div>
      <div class="photosItem">
          <FavoritesItem @rem="removeItem" :key="photo.id" v-for="photo in paginatedData" :photoItem="photo"/>
      </div>
    </div>
  </div>
</template>

<script>
import FavoritesItem from './FavoritesItem.vue'

export default {
  name: 'Favorites',
  components:{
    FavoritesItem
  },
  data(){
    return{
      user: null,
      pageNumber: 0,
      size: 2,
    }
  },
  computed:{
    pageCount(){
      return Math.ceil(this.user.photos.length / this.size);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
      end = start + this.size;
      return this.user.photos.slice(start, end);
    }
  },
  created(){
    this.user = JSON.parse(localStorage.getItem("user") || '{}');
  },
  updated(){
    localStorage.setItem("user", JSON.stringify({...this.user}));
  },
  methods: {
    removeItem(item){
      this.user.photos = this.user.photos.filter(elem => JSON.stringify(elem) !== JSON.stringify(item));
      this.$router.go();
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
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    width: 100%
}
.content{
  display: inherit;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
.photosItem{
    display: inherit;
    flex-direction: column;
    align-items: center;
    padding: 10px;
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
