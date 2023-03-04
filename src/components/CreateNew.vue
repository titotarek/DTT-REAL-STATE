<template>
	<div class="create ">
		<div class="container">

			<div class="create-content flex">
				<h1>Houses</h1>
				<div>
					<div class="create-btn">
						<router-link :to="{name:'CreateNewList'}">
							<img src="../assets/Frontend/ic_plus_grey@3x.png" alt="plus-icon" />
							<p>create new</p></router-link
							>
						</div>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
    // mounted() {
	// 	this.getHomeList();
	// },

	// methods: {
	// 	getHomeList() {
	// 		axios.defaults.headers.common[
	// 			"X-Api-Key"
	// 		] = `pQo86_BkVMjJeiX2WcvlC79nLNyhdtrU`;
	// 		axios
	// 			.get("https://api.intern.d-tt.nl/api/houses")
	// 			.then((res) => {
	// 				console.log(res.data);
	// 				this.houses = res.data;
    //                 this.result = this.houses.length
	// 				// console.log(this.houses)
	// 			})
	// 			.catch((err) => console.log(err));
	// 	},
	// },
};
</script>
