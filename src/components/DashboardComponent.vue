<template>
    <div class="hello">
        <div id="events-container" v-bind:class="{'reduced': calendarFullPage}">
            <h1>Welcome to regular users page</h1>
            <div v-if="!loading" uk-grid class="uk-grid-small uk-child-width-expand@s uk-text-center">
                <div v-for="event in events" :key="event.id" class="uk-card uk-card-default uk-card-body">
                    <h3 class="uk-card-title">{{event.name}}</h3>
                    <p>
                        Start : {{event.debut}}
                        <br/>
                        End: {{event.fin}}  
                    </p>
                </div>
            </div>
            <div v-else>
                loading...
            </div>
        </div>
        <calendar id="calendar" ref="tuiCalendar" v-bind:class="{'extanded':calendarFullPage}"/>
        <div id="calendar-views-container" v-bind:class="{'slideBottom': calendarFullPage}">
                <button v-on:click="viewCalendarDay">1</button>
                <button v-on:click="viewCalendarWeek">7</button>
                <button v-on:click="viewCalendarMonth">30</button>
            </div>
        <button @click="toggleCalendar" v-bind:class="{'calendarOpened': calendarFullPage}" id="calendarToggler"><span>></span></button>
    </div>
</template>

<script>
    import 'tui-calendar/dist/tui-calendar.css'
    import { Calendar } from '@toast-ui/vue-calendar'


    export default {
        name: "DashboardComponent",
        components: {
            'calendar': Calendar
        },
        data () {
            return {
                calendarFullPage: false,
                storeHeightCalendar: 0,
                events: [],
                loading: false,
                calendarData: {
                    calendarList: [
                    {
                        id: '0',
                        name: 'office'
                    }
                    ],
                    scheduleList: [
                    {
                        id: '1',
                        calendarId: '1',
                        title: 'my schedule',
                        category: 'time',
                        dueDateClass: '',
                        start: '2018-10-28T22:30:00+09:00',
                        end: '2018-10-29T02:30:00+09:00'
                    },
                    {
                        id: '2',
                        calendarId: '1',
                        title: 'second schedule',
                        category: 'time',
                        dueDateClass: '',
                        start: '2018-10-18T17:30:00+09:00',
                        end: '2018-10-19T17:31:00+09:00'
                    }
                    ]}
            }
        },
        beforeCreate(){
            this.loading = true
            const user_id = JSON.parse(localStorage.getItem('user')).id
            this.$http.get('https://gta-ynov-cours-api.herokuapp.com/user/' + user_id + '/events').then((response)=>{
                if(response.data) this.events = response.data.events
                this.loading = false
            })
        },
        methods: {
            toggleCalendar: function() {
                this.calendarFullPage = !this.calendarFullPage
                this.toggleHeightOnCalendar()
            },
            toggleHeightOnCalendar: function(){
                if(this.calendarFullPage){
                    if(document.getElementsByClassName("tui-full-calendar-vlayout-area tui-full-calendar-vlayout-container")[0]){
                        this.storeHeightCalendar = document.getElementsByClassName("tui-full-calendar-vlayout-area tui-full-calendar-vlayout-container")[0].style.height
                        document.getElementsByClassName("tui-full-calendar-vlayout-area tui-full-calendar-vlayout-container")[0].style.height = "calc(100vh - 80px - 42px)";
                    }
                    if(document.querySelector("div.tui-full-calendar-month.tui-full-calendar-vlayout-container > div:nth-child(2)")){
                        this.storeHeightCalendar = document.querySelector("div.tui-full-calendar-month.tui-full-calendar-vlayout-container > div:nth-child(2)").style.height
                        document.querySelector("div.tui-full-calendar-month.tui-full-calendar-vlayout-container > div:nth-child(2)").style.height = "calc(100vh - 80px - 42px)";
                    }
                }
                else{
                    if(document.getElementsByClassName("tui-full-calendar-vlayout-area tui-full-calendar-vlayout-container")[0]){
                        document.getElementsByClassName("tui-full-calendar-vlayout-area tui-full-calendar-vlayout-container")[0].style.height = this.storeHeightCalendar;
                    }
                    if(document.querySelector("div.tui-full-calendar-month.tui-full-calendar-vlayout-container > div:nth-child(2)")){
                        document.querySelector("div.tui-full-calendar-month.tui-full-calendar-vlayout-container > div:nth-child(2)").style.height = this.storeHeightCalendar;
                    }
                }
            },
            viewCalendarDay: function () {
                this.$refs.tuiCalendar.invoke('changeView', 'day', 'true')
                this.toggleHeightOnCalendar()
            },
            viewCalendarWeek: function () {
                this.$refs.tuiCalendar.invoke('changeView', 'week', 'true')
                this.toggleHeightOnCalendar()
            },
            viewCalendarMonth: function () {
                this.$refs.tuiCalendar.invoke('changeView', 'month', 'true')
                this.toggleHeightOnCalendar()
            }
        }
    }
</script>

<style>
.tui-full-calendar-vlayout-area.tui-full-calendar-vlayout-container{
overflow-y: scroll;
}
.tui-full-calendar-vlayout-area.tui-full-calendar-vlayout-container > div:last-child{
    height: auto!important;
}
</style>

<style scoped>
#calendar-views-container{
    position: absolute;
    top: calc(100vh - 30vh - 30px);    
    transition: all ease-in-out .5s;
    width: calc(50vw + (150px / 2));
    text-align: right;
}
#calendar-views-container.slideBottom{
    top: calc(100vh - 30px - (24px/2));
    width: 95vw;
}
#calendar-views-container > *{
    width: 50px;
    height: 20px;
    color: #D8D8D8;
    background: #3e454c;
    box-shadow: 1px 1px 4px #111;
    border: 0;
}
#calendarToggler{
    position: absolute;
    top: calc(100vh - 30vh + (42px / 2) - (20px / 2));
    right: 20px;
    color: #111!important;
    background: none!important;
    text-decoration: none;
    border: 1px solid #111;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    transform: rotate(270deg);
    padding-top: 0px;
    transition: all ease-in-out .5s;
}

#calendarToggler > span{
    color: #111;
    text-shadow: 0px 0px 0px #111;
    background: none;
}

#calendarToggler.calendarOpened{
    transform: rotate(90deg);
    top:calc(80px + (22px / 2));
}

#calendar{
    height: 30vh;
    transition: height ease-in-out .5s;
}
#calendar.extanded{
    height: calc(100vh - 80px);
}
#events-container{
    height: calc(100vh - 80px - 30vh);
    transition: height ease-in-out .5s;
    overflow-y: scroll;
}
#events-container.reduced{
    height: 0;
}
*{
    color: #d8d8d8;
}
.uk-card-default .uk-card-title{
    color: #e8e8e8;
}
.uk-card-default{
    background: #3e454c;
    box-shadow: 2px 2px 10px #111;
    width: calc(80% / 3);
    margin: 20px auto;
    flex: initial;
}
@media (max-width: 768px) {
    .uk-grid-small{
        margin: auto;
    }
    .uk-card-default{
        width: calc(80% / 2);
    }
}
</style>