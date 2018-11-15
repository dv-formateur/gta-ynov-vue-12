<template>
    <div id="login-container">
        <div id="form-container">
            <h4>Login</h4>
            <div>
                <label for="email" >E-Mail Address</label>
                <div>
                    <input id="email" type="email" v-model="email" required autofocus>
                </div>
            </div>
            <div>
                <label for="password" >Password</label>
                <div>
                    <input id="password" type="password" v-model="password" required>
                </div>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Login
                </button>
            </div>
            <!--<router-link to="/register">Register</router-link>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginComponent",
        data(){
            return {
                email : "",
                password : ""
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.password.length > 0) {
                    var url = "https://gta-ynov-cours-api.herokuapp.com/login"
                    // url = "http://localhost:3000/login"
                    this.$http.post(url, {
                        email: this.email,
                        password: this.password
                    })
                        .then(response => {
                            let role = response.data.user.role
                            localStorage.setItem('user',JSON.stringify(response.data.user))
                            localStorage.setItem('jwt',response.data.token)

                            if (localStorage.getItem('jwt') != null){
                                this.$emit('loggedIn')
                                if(this.$route.params.nextUrl != null){
                                    this.$router.push(this.$route.params.nextUrl)
                                }
                                else {
                                    switch (role){
                                        case "drh":
                                            this.$router.push('admin')
                                            break
                                        case "responsable":
                                            this.$router.push('dashboard')
                                            break
                                        case "salarie":
                                            this.$router.push('dashboard')
                                            break
                                        default:
                                            break
                                    }
                                }
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            }
        }
    }
</script>

<style scoped>
    #login-container{
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #form-container{
        width: 30vw;
        margin: auto;
        height: 300px;
        background: #333334;
        border-radius: .3em;
        box-shadow: 2px 2px 10px #000;display: flex;
        flex-flow: column;
        justify-content: space-around;
        color: #d8d8d8!important;
        padding: 20px 0;
    }
    #form-container > h4{
        color: #D8D8D8;
        margin: 0;
    }
    #form-container input{
        background: #555;
        border: 0;
        border-radius: .3em;
        width: 200px;
        box-shadow: 4px 2px 10px #222;
        max-width: 90%;
        color: #D8D8D8;
        padding: 5px;
    }
    #form-container button{
        background: #555;
        border: 0;
        border-radius: .3em;
        width: 200px;
        box-shadow: 4px 2px 10px #222;
        max-width: 90%;
        color: #D8D8D8;
        padding: 5px 0;
    }
</style>