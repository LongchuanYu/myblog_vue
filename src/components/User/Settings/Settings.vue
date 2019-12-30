<template>
	<div class="container">
		<div class="row">
			<div class="col-3">
					<div class="border p-4" style="height:400px;">
						avatar
						<hr>
						<div class="list-group">
							<router-link :to="{name:'Profile'}" href="#" class="list-group-item list-group-item-action border-0">Profile</router-link>
							<router-link :to="{name:'Account'}" href="#" class="list-group-item list-group-item-action border-0">Account</router-link>
							<router-link :to="{name:'Email'}" href="#" class="list-group-item list-group-item-action border-0">Email</router-link>
							<router-link :to="{name:'Notiffication'}" href="#" class="list-group-item list-group-item-action border-0">Notiffication</router-link>
						</div>
					</div>
			</div>
			<div class="col-8">
				<div class="border" style="">
					<router-view></router-view>
				</div>
			</div>
				
		</div>
	</div>
</template>

<script>
export default {
    
}
</script>