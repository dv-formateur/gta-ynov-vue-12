<template>
    <div class="hello" v-if="user != null">
        <table class="uk-table uk-table-divider uk-table-striped">
            <caption></caption>
            <thead>
                <tr>
                    <td>
                        Name
                    </td>
                    <td>
                        Email
                    </td>
                    <td>
                        Role
                    </td>
                    <td>
                        Birth date
                    </td>
                    <td>
                        Address
                    </td>
                    <td>
                        Phone number
                    </td>
                </tr>
            </thead>
            <tbody>
                 <tr>
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
                        {{user.birthdate}}
                    </td>
                    <td>
                        {{user.address}}
                    </td>
                    <td>
                        {{user.phone_number}}
                    </td>
                </tr>
            </tbody>
        </table>
        <a v-on:click="startEdit()" href="#modal-overflow_edit" uk-toggle>Edit</a>
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
                            <input id="name" type="text" v-model="user_edit.name" required autofocus>
                        </div>

                        <label for="email" >E-Mail Address</label>
                        <div>
                            <input id="email" type="email" v-model="user_edit.email" required>
                        </div>

                        <label for="password-confirm">Is this an administrator account?</label>
                        <div>
                            <select v-model="user_edit.role">
                                <option value="drh">DRH</option>
                                <option value="salarie">Salarié</option>
                                <option value="responsable">Responsable d’équipe</option>
                            </select>
                        </div>
                        <label for="birthdate">Birthdate</label>
                        <div>
                            <input id="birthdate" type="birthdate" v-model="user_edit.birthdate" required>
                        </div>
                        <label for="address" >Address</label>
                        <div>
                            <input id="address" type="address" v-model="user_edit.address" required>
                        </div>
                        <label for="phone_number" >Phone number</label>
                        <div>
                            <input id="phone_number" type="phone_number" v-model="user_edit.phone_number" required>
                        </div>
                    </form>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-primary" type="button" @click="handleEdit">Update</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        loading...
    </div>
</template>

<script>
    export default {
        name: "ProfilComponent",
        data () {
            return {
                user: null,
                loading: false,
                user_edit: JSON.parse(localStorage.getItem('user'))
            }
        },
        methods: {
            startEdit(){
                this.user_edit = JSON.parse(JSON.stringify(this.user))
            },
            handleEdit() {
                this.loading = true
                var user = this.user_edit
                var url = "https://gta-ynov-cours-api.herokuapp.com/users/" + this.user.id
                this.$http.put(url, {
                    user
                })
                .then(response => {
                    var url = 'https://gta-ynov-cours-api.herokuapp.com/users/' + this.user.id
                    this.$http.get(url).then((response) => {
                        if(response.data) this.user = response.data.user
                        this.loading = false
                        UIkit.modal("#modal-overflow_edit").hide();
                    })
                })
                .catch(error => {
                    console.error(error);
                });
            }
        },
        beforeCreate(){
            this.user = JSON.parse(localStorage.getItem('user'))
            var url = 'https://gta-ynov-cours-api.herokuapp.com/users/' + this.user.id
            this.$http.get(url).then((response) => {
                if(response.data) this.user = response.data.user
                if(this.user) localStorage.setItem('user', JSON.stringify(this.user))
            })
        }
    }
</script>

<style scoped>
    li{
        width: 100vw;
        display: flex;
        justify-content: space-around;
    }
    thead tr{
        font-weight: bold;
        text-transform: capitalize;
    }
    .uk-table-striped tbody tr:nth-of-type(odd){
        background: #4f5861;
    }
</style>