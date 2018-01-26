<template>
	<div v-if="active">
		<slot> </slot>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				active: ''
			}
		},
		props: {
			name: '', selected: false
		}
		,
		created(){
			this.active = this.selected;
		}
	}
</script>