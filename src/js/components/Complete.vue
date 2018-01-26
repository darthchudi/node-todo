<template>
	<div class="content box">
		<ul>
			<li v-for="task in tasks">
				{{task.task}}
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
			axios.get('/tasks/completed')
				.then((data)=>{
					console.log(data.data)
					this.tasks = data.data
				})
				.catch((e)=>{
					console.log(e);
				})
		},
		methods: {
			completeTask: function(taskID){
				axios.post('/complete', {id: taskID})
					.then((data)=>{
						self.tasks = data.data;
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