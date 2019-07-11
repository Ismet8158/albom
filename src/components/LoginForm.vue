<template>
    <div class="formtodo">
      <div class="formHeader">
        <h2>Авторизация</h2>
      </div>
      <input  type="text" v-model="login" placeholder="Логин" :class="{ errClass: errMsgLogin }">
      <span>{{errMsgLogin}}</span>
      <input  type="password" v-model="password" placeholder="Пароль" :class="{ errClass: errMsgPasswd }">
      <span>{{errMsgPasswd}}</span>
      <button @click="SignIn">Войти</button>
    </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data(){
    return{
      login: "",
      password: "",
      errMsgLogin: "",
      errMsgPasswd: "",
      user: {
        status: "",
        photos: JSON.parse(localStorage.getItem("user") || '{}').photos || []
      }
    }
  },
  methods: {
    SignIn(){
      if(!this.checkData(this.login, this.password)){
        //меняем статус и сохраняем
        this.user.status = "logged_in";
        localStorage.setItem("user", JSON.stringify({...this.user}));
        //переходим в home
        this.$router.replace('/favorites');
      }
    },
    checkData(login, password){    
      let error = false;
      if(login === ""){
        this.errMsgLogin = "Заполните поле";
        error = true;
      }else {
        if(login !== "login"){
          this.errMsgLogin = "Неправильный логин";
          error = true;
        }else this.errMsgLogin = "";
      }
      if(password === ""){
        this.errMsgPasswd = "Заполните поле";
        error = true;
      }else {
        if(password !== "password"){
          this.errMsgPasswd = "Неправильный пароль";
          error = true;
        }else this.errMsgPasswd = "";
      }
      return error;
    }
  }
}
</script>

<style scoped>
  .formtodo{
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 400px;
  padding: 30px;
  margin-top: 60px;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.2);
}
.formHeader{
  display: inherit;
  align-items: center;
  justify-content: center;
}
  button, input {
  border-radius: 2px;
  border: none;
  margin: 15px 0;
  padding: 16px 40px;
  outline: none;
  transition: all .2s;
}
input{
  background: #efefef;
  font-size: 14px;
  transition: all 0.2s;
}

input:focus{
  background-color: #ddd;
}
  button{
    cursor: pointer;
    font-weight: 400;
    border: 1px solid #6c757d;
    font-size: 16px;
    line-height: 1.5;
    color: #6c757d;
    background-color: transparent;
  }
    button:hover{
    background-color: #6c757d;
    color: #fff;
  }
  span{
    color: crimson;
    font-size: 14px;
  }
  .errClass{
    border: 2px solid crimson;
  }
</style>
