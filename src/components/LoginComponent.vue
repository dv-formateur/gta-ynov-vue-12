<template>
    <div>
        <h4>Login</h4>
        <form>
            <label for="email" >E-Mail Address</label>
            <div>
                <input id="email" type="email" v-model="email" required autofocus>
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
        </form>
        <router-link to="/register">Register</router-link>
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
                    this.$http.post('http://localhost:3000/login', {
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
                            console.error(error.response);
                        });
                }
            }
        }
    }
</script>

<style scoped>

</style>