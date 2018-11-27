<template>
    <div id="parent">
        <h1>Paramètres de l'application</h1>
        <div class="container">
            <div class="col-xs-12">
                <absences_component></absences_component>
            </div>
        </div>
    </div>
</template>

<script>
    import AbsencesComponent from "./plugin/AbsencesComponent"
    export default {
        name: "AdminComponent",
        components:{
            'absences_component': AbsencesComponent
        },
        data () {
            return {
                absences: []
            }
        },
        beforeCreate(){
            var url = "https://gta-ynov-cours-api.herokuapp.com/absences"
            this.$http.get(url).then((data)=>{
                this.absences = data.data.absences
            })
        }
    }
</script>

<style scoped>
    #parent{
        padding: 0 10px;
    }
</style>