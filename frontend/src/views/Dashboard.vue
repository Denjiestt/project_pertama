<template>
    <Header/>
    <Container>
        <div class="container">
    <form>
      <div class="form-group">
        <label for="name">Nama:</label>
        <input type="text" class="form-control" id="name" v-model="name">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="submitForm">Submit</button>
    </form>
  </div>
     <!-- <form @submit.prevent="updateUserSendiri">
        <div class="form-floating mb-3">
            <input v-model="username"
            class="form-control"
            type="text"
            placeholder="username"
            />
            <label for="username">Username</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="name"
            class="form-control"
            type="text"
            placeholder="nama"/>
            <label for="nama">Nama</label>
        </div>
        <div class="col-md-4">
                <img :src="gambar" class="card-img" alt="gambar">
        </div>
        <div class="col-md-4">
            <input type="file" @change="onFileChange">
        </div>
        <div>
            <button class="btn btn-primary">Submit</button> 
        </div>
    </form>
    <h1><button class="btn btn-primary" @click="Logout">Logout</button></h1> -->
    </Container>
    <Footer/>
</template>

<script>
import axios from "axios"
import Container from "../components/Container.vue"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"

export default{
    components: {
    Container,
    Header,
    Footer
  },
    data(){
        return{
            username:"",
            name:"",
            email:"",
            gambar:"",
            image:"",
            user:{},
            file:null
        }
    },

    // created() {
    // window.addEventListener('popstate', this.handleBeforeUnload);
    // },

    mounted(){
        Promise.all([
            this.getUser(),
            // this.getImage()
    ]);
    },

    methods:{

        onFileChange(e) {
      this.file = e.target.files[0];
      console.log(this.file)
    },

        // handleBeforeUnload(){
        //     localStorage.clear();
        // },

       async Logout(){
        this.$swal
        .fire({
          title: "Are you sure you want to loggged out ?",
          text: "If you logout, you must re-login",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Logout it!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.$swal.fire({
              title: "Logged Out",
              text: "Your has been LoggedOut!",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            localStorage.clear();
            this.$router.push({path:"/"})
          }
        })
        },

        // async getImage(){
        //     this.image = (import.meta.env.VITE_APP +"/"+ this.PhotoUrl).toString()
        // },

        async getUser(){
            const token = localStorage.getItem("auth-token")
            axios.
            get(import.meta.env.VITE_APP + "/me",{
                headers:{
                    "auth-token":token
                }
            })
            .then((response)=>{
                //response untuk menampilkan data yang bisa diubah
                this.user = response.data.data
                this.username = this.user.username
                this.name = this.user.name
                this.email = this.user.email
                this.PhotoUrl = this.user.image
                this.gambar = (import.meta.env.VITE_APP +"/"+ this.PhotoUrl).toString()
                console.log(this.user)
            })
        },

        async updateUserSendiri(){
            const token = localStorage.getItem("auth-token")

            const formData = new FormData();
            formData.append('image', this.file);
            formData.append('name', this.name);
            formData.append('username', this.username)
            // const update = {
            //     name:this.name,
            //     username:this.username,
            // }
            try{
                const response = await axios
                .put(import.meta.env.VITE_APP + "/user_update",
                formData,{
                    headers:{
                        "auth-token":token
                    }
                })
                console.log(response)
                this.$swal
                .fire({
                    title: response.data.message,
                    icon:"success",
                    confirmButtonText:"OK"
                })
                .then((close) => {
                    if (close.isConfirmed) {
                        document.location.reload();
            }
          });
            }catch(error){
                this.$swal
                .fire({
                    title:error.response.data.message,
                    icon:"error"
                })
            }
        }
    }
}

</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-group {
  margin-bottom: 15px;
}
</style>