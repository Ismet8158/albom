<template>
    <div class="main">
        <span>{{photoItem.title}}</span>
        <img :src="photoItem.url" alt="" width="280" height="280">
        <button @click="removePhoto">Удалить</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PhotosItem',
  props:{
      photoItem: Object,
  },
  methods:{
      removePhoto(){
          this.$emit("rem", this.photoItem);
      }
  }
}
</script>

<style scoped>
.main{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
