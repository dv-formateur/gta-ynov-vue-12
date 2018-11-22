<template>
    <div class="hello">
        <h1>Welcome to regular users page</h1>
        <div>
            <div v-if="!loading">
                <ul>
                    <li v-for="event in events" :key="event.id">
                        <h2 style="color: #FFF;">{{event.name}}</h2>
                        Start : {{event.debut}}
                        </br>
                        End: {{event.fin}}
                    </li>
                </ul>
            </div>
            <div v-else>
                loading...
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DashboardComponent",
        data () {
            return {
                events: [],
                loading: false
            }
        },
        beforeCreate(){
            this.loading = true
            const user_id = JSON.parse(localStorage.getItem('user')).id
            this.$http.get('http://localhost:3000/user/' + user_id + '/events').then((response)=>{
                if(response.data) this.events = response.data.events
                this.loading = false
            })
        }
    }
</script>

<style scoped>

</style>