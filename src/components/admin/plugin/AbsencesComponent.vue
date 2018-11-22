<template>
    <div id="absence-container">
        <h2>Motifs d'absences</h2>
        <ul>
            <li v-for="absence in absences" :id="absence.id">
                <span v-if="id_editing !== absence.id">{{absence.name}}</span>
                <div class="align-right" v-if="id_editing !== absence.id">
                    <button v-on:click="startUpdate(absence.id)">Edit</button>
                    <button v-on:click="askForDelete(absence.id)">Delete</button>
                </div>
                <form v-else>
                    <input type="text" :value="absence.name"/>
                    <input type="hidden" :value="absence.id"/>
                    <input class="update-submiter" type="submit" v-on:click="updateAbsence">
                </form>
            </li>
        </ul>
        <button id="add">
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
                id_editing: 0
            }
        },
        beforeCreate () {
            var url = 'https://gta-ynov-cours-api.herokuapp.com/absences'
            url = 'http://localhost:3000/absences'
            this.$http.get(url).then((data) => {
                data.data.absences.forEach((absence)=>{
                    this.absences.push(absence)
                })
            })
        },
        methods: {
            updateAbsence: () => {
                console.log(this.id_editing)
                console.log(this.absence_editing)
            },
            startUpdate: function(id){
                console.log(id)
                console.log(this.absences)
                this.absence_editing = null;
                this.id_editing = null;
                this.absences.forEach((absence)=>{
                    if(absence.id == id) this.absence_editing = absence;
                })
                this.id_editing = this.absence_editing.id
            },
            askForDelete: function(id){
                console.log(id)
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
</style>
