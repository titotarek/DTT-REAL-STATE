<template>
	<div class="header">
		<div class="header-container container">
			<div class="header-logo">
				<img src="../assets/Frontend/img_logo_dtt@3x.png" alt="logo" />
			</div>

			<div class="header-link">
				<router-link
					:class="{
						active: currentRoute == '/' || currentRoute.includes('/house'),
					}"
					to="/"
					>Houses</router-link
				>
				<router-link :class="{ active: currentRoute == '/about' }" to="/about"
					>About</router-link
				>

				<router-link
					:class="{ active: currentRoute == '/development-team' }"
					to="/development-team"
					>Development-Team
				</router-link>
			</div>
		</div>
        <!-- mobile-nav-bar   -->
		<div class="mobile-nav-bar container">
			<router-link
				:class="{
					active: currentRoute == '/' || currentRoute.includes('/house'),
				}"
				to="/"
			>
				<img
					src="../assets/Frontend/ic_mobile_navigarion_home@3x.png"
					alt="home"
				/>
			</router-link>
			<router-link :class="{ active: currentRoute == '/about' }" to="/about">
				<img
					src="../assets/Frontend/ic_mobile_navigarion_info@3x.png"
					alt="about"
				/>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentRoute: "/",
		};
	},
	watch: {
		$route(to) {
			this.currentRoute = to.path;
		},
	},
};
</script>

<style></style>
