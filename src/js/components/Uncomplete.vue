<template>
	<div class="content box">
		<ul>
			<li v-for="task in tasks">
				{{task.task}}
				<a :href=" 'complete/' + task._id" class="button is-small is-success" @click.prevent="completeTask(task._id)">Mark as Complete</a>
				<a :href=" 'delete/' + task._id" class="button is-small is-danger"  @click.prevent="deleteTask(task._id)">Delete Task</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios';
	export default{
		data(){
			return{
				tasks: ''
			}
		},
		created(){
			self = this;
			this.uncompleted();

			Event.$on('update', function(data){
				// self.uncompleted();
			})
			
		},
		methods: {
			uncompleted: function(){
				self = this;
				axios.get('/tasks/uncompleted')
					.then((data)=>{
						self.tasks = data.data
						console.log(data.data)
					})
					.catch((e)=>{
						console.log(e);
					})
			},

			completeTask: function(taskID){
				self = this;
				axios.post('/complete', {id: taskID})
					.then((data)=>{
						self.uncompleted();
					})
					.catch((e)=>{
						console.log(e);
					})
			},

			deleteTask: function(taskID){
				self = this;

				axios.post('delete/', {
					id: taskID
				})
				.then((data)=>{
					self.tasks = data.data;
				})
				.catch((err)=>{
					console.log(err)
				});
			}
		}
	}
</script>