<template>
    <form @submit.prevent="registrasi">
        <p>
            REGISTRASI
        </p>
        <div class="form-floating mb-3">
            <input v-model="nama"
            class="form-control"
            type="text"
            placeholder="Masukkan Nama">
            <label for="nama">Masukkan Nama</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="username"
            class="form-control"
            type="text"
            placeholder="Masukkan Username">
            <label for="username">Masukkan Username</label>
        </div>
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
            <label for="Password">Masukkan Password</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="confirm_password"
            class="form-control"
            type="password"
            placeholder="Masukkan Confirm Password">
            <label for="Confirm Password">Masukkan Confirm Password</label>
        </div>
        <div>
            <button class="btn btn-primary">Registrasi</button> 
        </div>
    </form>
</template>

<script>
import axios from "axios"
export default{
    data(){
        return {
            nama:"",
            username:"",
            email:"",
            password:"",
            confirm_password:"",
        }
    },
    methods:{
        async registrasi(){
            const credentials ={
                name:this.nama,
                username:this.username,
                email:this.email,
                password:this.password,
                confPassword:this.confirm_password
            }
            try{
                const response = await axios.post(
                    import.meta.env.VITE_APP+"/user/sign-up",
                    credentials
                )
                this.$swal
                .fire({
                    title:response.data.message,
                    icon:"success"
                })
            }catch(error){
                this.$swal({
                    title:error.response.data.message,
                    icon:"error"
                })
            }
        }
    }
}
</script>