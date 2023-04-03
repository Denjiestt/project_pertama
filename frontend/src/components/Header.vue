<template>
  <nav>
    <div class="logo">
      Logo
    </div>
    <ul class="navbar-nav">
      <li>
        
        <span
          class="nav-link dropdown-toggle fw-bold"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
        <img class="img-profile rounded-circle" style="width:30px; height:30px;" :src="gambar">
        {{ this.username }}
          <!-- <img src="../assets/user.png" width="25" height="23" /> -->
        </span>
        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="/home">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile Saya
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" @click="Logout">
                            <i class="fa fa-heart"></i>
                            Logout
                        </a>
                    </div>
      </li>
    </ul>

    <!-- <Dropdown :items="user" /> -->
  </nav>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      nama: "",
      user: "",
      username:"",
      gambar:null,
      isOpenSidebar: false,
    };
  },

  props: ["isOpen"],

  mounted() {
    this.getUser();
  },

  methods: {

    openSidebar() {
      this.isOpenSidebar = !this.isOpenSidebar;
      // console.log(this.isOpenSidebar);
      this.$emit("openSidebar", this.isOpenSidebar);
    },

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

    async confirmLogout() {
      const token = localStorage.getItem("auth-token");
      var config = {
        method: "post",
        url: import.meta.env.VITE_APP + "/logout",
        headers: {
          "auth-token": token,
        },
      };

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
            this.$router.replace("/login");

            await axios(config).then(function (response) {
              // console.log(JSON.stringify(response.data));
            });
          }
        })
        .catch(async (error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.logo{
  padding-left:115px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:lightcoral;
  height: 50px;
  width:100%;
}

.hamburger {
  padding-left: 115px;
}

.navbar-nav {
  padding-right: 40px;
}

@media (min-width: 992px) {
  .hamburger {
    padding-left: 110px;
  }

  .navbar-nav {
    padding-right: 20px;
  }
}
@media (max-width: 768px) {
  .hamburger {
    padding-left: 10px;
  }

  .navbar-nav {
    padding-right: 20px;
  }
}
</style>
