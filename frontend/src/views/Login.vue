<template>
  <div class ="container">
  <form @submit.prevent="Login">
    <h1>Login</h1>
    <div class="form-floating mb-3">
      <input v-model="email"
      class="form-control"
      type="text"
      placeholder="Masukkan Email">
      <label for="Email">Masukkan Email</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="password"
      class="form-control"
      type="password"
      placeholder="Masukkan Password">
      <label for="Email">Masukkan Password</label>
    </div>
    <div>
      <button class="btn btn-primary">Login</button>
    </div>
  </form>
</div>
</template>
<script>
import axios from "axios"

export default{
  data(){
    return{
      email:"",
      password:""
    }
  },
  methods:{
    async Login(){
      const credentials ={
        email:this.email,
        password:this.password
      }
      try{
        const response = await axios.post(
          import.meta.env.VITE_APP+"/login",
          credentials
        )
        const token = response.data.data.token
        localStorage.setItem("auth-token", token);
        localStorage.setItem("authenticated", true);
        console.log(token)
        this.$swal
        .fire({
          title:response.data.message,
          icon:"success"
        })
        .then((ok)=>{
          if(ok){
          this.$router.push({path:'/dashboard'})
          }
        })
      }catch(error){
        this.$swal
        .fire({
          title:error.response.data.message,
          icon:"error"
        })
      }
    },
    async Logout(){
      this.$swal
      .fire({
        title:"berhasil login",
        icon:"question"
      })
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
}
</style>