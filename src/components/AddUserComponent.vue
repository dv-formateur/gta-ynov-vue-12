<template>
    <div>
        <h4>Register</h4> 
        <table class="uk-table uk-table-divider uk-table-striped" v-if="!loading">
            <caption></caption>
            <thead>
                <tr>
                    <td>
                        name
                    </td>
                    <td>
                        email
                    </td>
                    <td>
                        role
                    </td>
                    <td>
                        Edit
                    </td>
                    <td>
                        Delete
                    </td>
                </tr>
            </thead>
            <tbody>
                 <tr v-for="user in users" :key="user.id">
                    <td>
                    {{user.name}}
                    </td>
                    <td>
                    {{user.email}}
                    </td>
                    <td>
                    {{user.role}}
                    </td>
                    <td>
                        <a v-on:click="startEdit(user.id)" href="#modal-overflow_edit" uk-toggle>
                            Edit
                        </a>
                    </td>
                    <td>
                        <a v-on:click="deleteUser(user.id)">X</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <button id="add" href="#modal-overflow" uk-toggle v-if="!loading">
            <img src="/static/plus.png"/>
        </button>
        <div v-if="loading">
            loading...
        </div>
        <div id="modal-overflow" uk-modal>
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header">
                    <h2 class="uk-modal-title">Headline</h2>
                </div>
                <div class="uk-modal-body" uk-overflow-auto>
                    <form>
                        <label for="name">Name</label>
                        <div>
                            <input id="name" type="text" v-model="name" required autofocus>
                        </div>

                        <label for="email" >E-Mail Address</label>
                        <div>
                            <input id="email" type="email" v-model="email" required>
                        </div>

                        <label for="password">Password</label>
                        <div>
                            <input id="password" type="password" v-model="password" required>
                        </div>

                        <label for="password-confirm">Confirm Password</label>
                        <div>
                            <input id="password-confirm" type="password" v-model="password_confirmation" required>
                        </div>

                        <label for="password-confirm">Is this an administrator account?</label>
                        <div>
                            <select v-model="role">
                                <option value="drh">DRH</option>
                                <option value="salarie">Salarié</option>
                                <option value="responsable">Responsable d’équipe</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-primary" type="button" @click="handleSubmit">Submit</button>
                </div>
            </div>
        </div>

        <div id="modal-overflow_edit" uk-modal>
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header">
                    <h2 class="uk-modal-title">Headline</h2>
                </div>
                <div class="uk-modal-body" uk-overflow-auto>
                    <form>
                        <label for="name">Name</label>
                        <div>
                            <input id="name" type="text" v-model="name_edit" required autofocus>
                        </div>

                        <label for="email" >E-Mail Address</label>
                        <div>
                            <input id="email" type="email" v-model="email_edit" required>
                        </div>

                        <label for="password-confirm">Is this an administrator account?</label>
                        <div>
                            <select v-model="role_edit">
                                <option value="drh">DRH</option>
                                <option value="salarie">Salarié</option>
                                <option value="responsable">Responsable d’équipe</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-primary" type="button" @click="handleEdit">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddUserComponent",
        props : ["nextUrl"],
        data(){
            return {
                name : "",
                email : "",
                password : "",
                password_confirmation : "",
                role : null,
                users: [],
                loading: false,

                id_edit: null,
                name_edit : "",
                email_edit : "",
                role_edit : null,
            }
        },
        beforeCreate(){
            this.loading = true
            var url = 'https://gta-ynov-cours-api.herokuapp.com/users'
            url = "http://localhost:3000/users"
            this.$http.get(url).then((response) => {
                if(response.data) this.users = response.data.users
                this.loading = false
            })
        },
        methods : {
            handleSubmit(e) {
                e.preventDefault()
                if (this.password === this.password_confirmation && this.password.length > 0)
                {
                    var url = "https://gta-ynov-cours-api.herokuapp.com/register"
                    url = "http://localhost:3000/register"
                    this.$http.post(url, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        role: this.role
                    })
                        .then(response => {
                            var url = 'https://gta-ynov-cours-api.herokuapp.com/users'
                            url = "http://localhost:3000/users"
                            this.$http.get(url).then((response) => {
                                if(response.data) this.users = response.data.users
                                this.loading = false
                                this.name = null
                                this.email = null
                                this.password = null
                                this.password_confirmation = null
                                this.role = null
                                UIkit.modal("#modal-overflow").hide();
                            })
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    this.password = ""
                    this.passwordConfirm = ""
                    return alert("Passwords do not match")
                }
            },
            deleteUser(user_id){
                if(confirm('User will be deleted')){
                    this.loading = true
                    var url = 'https://gta-ynov-cours-api.herokuapp.com/users/' + user_id
                    url = "http://localhost:3000/users/" + user_id
                    this.$http.delete(url).then((response) => {
                        var url = 'https://gta-ynov-cours-api.herokuapp.com/users'
                        url = "http://localhost:3000/users"
                        this.$http.get(url).then((response) => {
                            if(response.data) this.users = response.data.users
                            this.loading = false
                        })
                    })
                }
            },
            startEdit(user_id){
                var user = null
                this.users.forEach((user_i)=>{
                    if(user_i.id === user_id) user = user_i
                })
                if(user){
                    this.id_edit = user.id
                    this.name_edit= user.name
                    this.email_edit= user.email
                    this.role_edit = user.role
                }
            },
            handleEdit() {
                this.loading = true
                var url = "https://gta-ynov-cours-api.herokuapp.com/users/" + this.id_edit
                    url = "http://localhost:3000/users/" + this.id_edit
                    this.$http.put(url, {
                        user: {
                            name: this.name_edit,
                            email: this.email_edit,
                            role: this.role_edit
                        }
                    })
                        .then(response => {
                            var url = 'https://gta-ynov-cours-api.herokuapp.com/users'
                            url = "http://localhost:3000/users"
                            this.$http.get(url).then((response) => {
                                if(response.data) this.users = response.data.users
                                this.loading = false
                                this.name_edit = null
                                this.email_edit = null
                                this.role_edit = null
                                UIkit.modal("#modal-overflow_edit").hide();
                            })
                        })
                        .catch(error => {
                            console.error(error);
                        });
            }
        }
    }
</script>

<style scoped>
/*
// TODO : CSS for form
*/
    li{
        width: 100vw;
        display: flex;
        justify-content: space-around;
    }
    thead tr{
        font-weight: bold;
        text-transform: capitalize;
    }
    #add{
        float: right;
        background: none;
        border: 0;
        margin-right: 10vw;
    }
    #add img{
        width: 20px;
    }
    .uk-table-striped tbody tr:nth-of-type(odd){
        background: #4f5861;
    }
</style>