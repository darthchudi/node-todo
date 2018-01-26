<template>
	<div>
		<div class="tabs is-centered">
		  <ul>
		  	<li v-for="tab in tabs" :class="{'is-active' : tab.active} " @click.prevent="selectTab(tab)">
		  		<a href="#"> {{tab.name}} </a>
		  	</li>
		  </ul>
		</div>

		<div class="tab-details">
			<slot> </slot>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tabs: ''
			}
		},
		created(){
			this.tabs = this.$children;
		},
		methods: {
			selectTab(tab){
				this.tabs.forEach((t)=>{
					t.active = (tab.name === t.name);
				});
			}
		}
	}
</script>