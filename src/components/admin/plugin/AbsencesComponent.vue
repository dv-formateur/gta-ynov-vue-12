<template>
    <div id="absence-container">
        <h2>Motifs d'absences</h2>
        <ul v-if="absences.length > 0 && !loading">
            <li v-for="absence in absences" :key="absence.id">
                <span v-bind="{hidden: checkForHide(absence.id)}">{{absence.name}}</span>
                <div class="align-right" v-bind="{hidden: checkForHide(absence.id)}">
                    <button v-on:click="startUpdate(absence.id)">Edit</button>
                    <button v-on:click="askForDelete(absence.id)">Delete</button>
                </div>
                <form v-bind="{hidden: !checkForHide(absence.id)}">
                    <input type="text" v-model="absence_editing.name"/>
                    <input type="hidden" :value="absence_editing.id"/>
                    <input class="update-submiter" type="button" v-on:click="cancelUpdate()" value="Cancel">
                    <input class="update-submiter" type="button" v-on:click="updateAbsence()" value="Valider"/>
                </form>
            </li>
        </ul>
        <div v-if="loading">
            loading ...
        </div>
        <button id="add" v-on:click="add()">
            <img src="/static/plus.png"/>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'AbsencesComponent',
        data () {
            return {
                absence_editing: {},
                absences: [],
                id_editing: null,
                loading: false
            }
        },
        beforeCreate () {
            this.loading = true
            var url = 'https://gta-ynov-cours-api.herokuapp.com/absences'
                this.$http.get(url).then((data) => {
                    this.absences = []
                    data.data.absences.forEach((absence)=>{
                        this.absences.push(absence)
                    })
                    this.loading = false
                })
        },
        created(){
        },
        methods: {
            fetchAbsencesTypes: function(){
                var url = 'https://gta-ynov-cours-api.herokuapp.com/absences'
                this.$http.get(url).then((data) => {
                    this.absences = []
                    data.data.absences.forEach((absence)=>{
                        this.absences.push(absence)
                    })
                })
            },
            add: function(){
                this.loading = true
                var name = prompt("Please enter the name of the absence type", "");
                if(name != null && name.length > 0){
                var url = "https://gta-ynov-cours-api.herokuapp.com/absences"
                    this.$http.post(url, {
                        "name": name,
                    })
                        .then(response => {
                            if(response.data.absence_id != null){
                                console.log(this.fetchAbsencesTypes())
                                this.fetchAbsencesTypes()
                                this.loading = false
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                            this.loading = false
                        });
                }
                else{
                    alert('invalid input')
                }
            },
            checkForHide: function(absence_id){
                return this.id_editing === absence_id
            },
            updateAbsence: function(){
                this.loading = true
                var url = "https://gta-ynov-cours-api.herokuapp.com/absences/"+this.id_editing
                this.$http.put(url, {
                    "name": this.absence_editing.name,
                })
                .then(response => {
                    if(response.data.absence != null){
                        this.cancelUpdate()
                        this.fetchAbsencesTypes()
                        this.loading = false
                    }
                })
                .catch(function (error) {
                    console.error(error);
                    this.loading = false
                });
            },
            startUpdate: function(id){
                this.absence_editing = null;
                this.id_editing = null;
                this.absences.forEach((absence)=>{
                    if(absence.id == id) this.absence_editing = absence;
                })
                this.id_editing = this.absence_editing.id
            },
            cancelUpdate: function (){
                this.id_editing = null
            },
            askForDelete: function(id){
                this.loading = true
                var url = "https://gta-ynov-cours-api.herokuapp.com/absences/"+id
                this.$http.delete(url).then((response) => {
                    if(response.data.success === true){
                        this.fetchAbsencesTypes()
                        this.loading = false
                    }
                    else{
                        this.loading = false
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    #absence-container{
        width: 40%;
        margin: auto;
    }
    ul{
        text-align: left;
    }
    li{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    span{
        float:left;
    }
    .align-right{
        float: right;
    }
    #add{
        float: right;
        background: none;
        border: 0;
    }
    #add img{
        width: 20px;
    }
    .update-submiter{
        float: right;
    }
    .hidden{
        display: none;
    }
</style>
