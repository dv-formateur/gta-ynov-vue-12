<template>
    <nav class="uk-navbar-container" uk-navbar v-if="isLogged">
        <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
                <li>
                    <a href="#">
                        GTA
                    </a>
                </li>
                <li><a href="#">Item</a></li>
            </ul>
        </div>
        <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
                <li><a v-on:click="logout()">Logout</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "NavbarComponent",
        data() {
            return {
                isLogged: false
            }
        },
        beforeCreate(){
            setInterval(()=>{
                this.isLogged = (localStorage.getItem("jwt")!=null)
            }, 100)
        },
        methods: {
            logout() {
                localStorage.removeItem("user")
                localStorage.removeItem("jwt")
                this.$router.push("login")
            }
        }
    }
</script>

<style scoped>

</style>