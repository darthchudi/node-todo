window.Event = new Vue();

import Vue from 'vue';
import axios from 'axios';
import All from './components/All.vue';
import Tabs from './components/Tabs.vue';
import Tab from './components/Tab.vue';
import Complete from './components/Complete.vue';
import Uncomplete from './components/Uncomplete.vue';

var app = new Vue({
	el: '#root',
	data: {
		task: '',
		content: '',
	},
	components: {All, Tabs, Tab, Complete, Uncomplete},
	methods: {
		addTask: function(){
			axios.post('/add', {
				task: this.task
			})
			.then((data)=>{
				this.task = '';
				Event.$emit('update', data.data);
			})
			.catch((error)=>{
				console.log(error);
			});
		},
		show: function(item){
			console.log(item);
		}
	}
})