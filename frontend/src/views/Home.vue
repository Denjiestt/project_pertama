<template>
    <Header/>
 <div class ="container">
    <div class ="row">
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row no-gutters">
        <div class="col-md-4">
                <img :src="gambar" class="card-img" alt="...">
            </div>
            <div class="col md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ this.username }}</h5>
                    <p class="card-text">{{ this.email }}</p>
                    <p class="card-text"><small class="text-muted">Jadi member sejak: <br><b>{{ this.createdAt }}</b></small></p>
                </div>
                <div class="btn btn-info ml-3 my-3">
                    <a href="" class="text text-white"><i class="fas fa-user-edit"></i> Ubah Profil</a>
                </div>
            </div>
    </div>
  </div>
  </div>
 </div>
<Footer/>
</template>
<script>
import axios from "axios"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
// import Container from "../components/Container.vue"
export default{
    components:{
        Header,
        Footer,
        // Container
    },
    data(){
        return{
            username:"",
            gambar:"",
            email:""
        }
    },
    mounted(){
        Promise.all([
            this.getUser(),
            // this.getImage()
    ]);
    },

    methods:{
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
                this.createdAt = this.user.createdAt
                this.gambar = (import.meta.env.VITE_APP +"/"+ this.PhotoUrl).toString()
                console.log(this.user)
            })
        },
    }
}
</script>
<style>
.container1 {
position:relative;
top:60px;
/* sesuaikan dengan tinggi header */
}
.container {
  max-width: 1200px;
  margin-top: 20px;
  padding: 0 20px;
}
</style>