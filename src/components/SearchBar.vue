<!-- <template>
	<div class="search">
		<div class="container">
			<div class="search-bar flex">
				<div class="search-bar-content">
					<img
						class="search-icon"
						src="../assets/Frontend/ic_search@3x.png"
						alt="search-icon"
					/>
					<input
						placeholder="Search for a house"
						@keyup="sendChange"
						:search="search"
					/>
					<img
						class="clear-icon"
						src="../assets/Frontend/ic_clear@3x.png"
						alt=""
					/>
				</div>
				<div class="search-bar__btn">
					<button class="price-btn active">Price</button>

					<button class="size-btn">Size</button>
				</div>
			</div>
		</div>
	</div>
</template> -->

<script>
export default {
	props: {
		search: String,
	},

	//     mounted(){
	//         this.sendChange()
	//     },

	computed: {
		sendChange() {
			return this.$emit("getHomeList");
		},
	},
};
</script>
