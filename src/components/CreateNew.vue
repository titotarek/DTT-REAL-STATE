<template>
	<div class="create">
		<div class="container">
			<div class="create-content flex">
				<h1>Houses</h1>
				<div>
					<div class="create-btn">
						<router-link :to="{ name: 'CreateNewList' }">
							<img
								src="../assets/Frontend/ic_plus_grey@3x.png"
								alt="plus-icon"
							/>
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
};
</script>
