<template>
    <nav class="uk-navbar-container" uk-navbar v-if="isLogged">
        <div class="uk-navbar-left">


            <ul class="uk-navbar-nav">
                <li>
                    <a href="/">
                        GTA - {{user.role}}
                    </a>
                </li>
                <li>
                    <a href="#">Salarié</a>
                    <div class="uk-navbar-dropdown">
                        <ul class="uk-nav uk-navbar-dropdown-nav">
                            <li><a href="#">Planning</a></li>
                            <li><router-link to="/dashboard">Tableau de bord personnel</router-link></li>
                        </ul>
                    </div>
                </li>
                <li  v-if="user.role === 'responsable' || user.role === 'drh'">
                    <a href="#">Responsable</a>
                    <div class="uk-navbar-dropdown">
                        <ul class="uk-nav uk-navbar-dropdown-nav">
                            <li class="uk-active"><router-link to="/add_user">Gestion des utilisateurs</router-link></li>
                        </ul>
                    </div>
                </li>
                <li v-if="user.role === 'drh'">
                    <a href="#">DRH</a>
                    <div class="uk-navbar-dropdown">
                        <ul class="uk-nav uk-navbar-dropdown-nav">
                            <li class="uk-active"><router-link to="admin">Paramètres de l'application</router-link></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="uk-navbar-right" v-if="user != null">
            <ul class="uk-navbar-nav">
                <li>
                    <a id="dropdown_opener">{{user.name}} <span id="initiales_container">{{initiales()}}</span></a>
                    <div class="uk-navbar-dropdown">
                        <ul class="uk-nav uk-navbar-dropdown-nav">
                            <li><router-link to="profil">Profil</router-link></li>
                            <li class="uk-nav-divider"></li>
                            <li><a class="uk-active" v-on:click="logout()">Logout</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
//TODO End navbar 
    export default {
        name: "NavbarComponent",
        data() {
            return {
                user: null,
                isLogged: false
            }
        },
        beforeCreate(){
            setInterval(()=>{
                this.updateLayoutDatas()
            }, 100)
        },
        methods: {
            logout() {
                localStorage.removeItem("user")
                localStorage.removeItem("jwt")
                this.$router.push("login")
            },
            updateLayoutDatas(){
                this.isLogged = (localStorage.getItem("jwt")!=null)
                this.user = JSON.parse(localStorage.getItem("user"))
            },
            initiales(){
                var components = this.user.name.split(" ")
                var letters = ""
                components.forEach((elem)=>{
                    letters += elem.charAt(0)
                })
                return letters.toUpperCase()
            }
        }
    }
</script>

<style scoped>
    nav{
        color: #d8d8d8!important;
        background: #383e45!important;
        box-shadow: 2px 0px 10px #111;
    }
    #initiales_container{
        padding: 5px;
        border: 1px solid grey;
        background: grey;
        color: #FFF;
        border-radius: 100%;
        margin: 0px 10px;
    }
    #dropdown_opener{
        z-index: 1000;
    }
    #dropdown_opener+.uk-navbar-dropdown{
        margin-top: 0!important;
        left: inherit!important;
        right: 0!important;
        z-index: 900;
        transition: opacity ease-in-out .5s;
    }

</style>