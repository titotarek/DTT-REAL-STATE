<template>
	<div>
		<Header />
		<router-view />
	</div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
	components: { Header },
	data() {
		return {};
	},
};
</script>

<style>
/* 
 index.css => is the  main template css File 
*/
@import "./assets/css/global-rules.css";
@import "./assets/css/overview.css";
@import "./assets/css/detail-page.css";
@import "./assets/css/header.css";
@import "./assets/css/create-new.css";
@import "./assets/css/about.css";
@import "./assets/css/create-list-form.css";
@import "./assets/css/search.css";
@import "./assets/css/page-not-found.css";
@import "./assets/css/our-team.css";

/* 
 normalize.css => Render all element normally in all the browser 
*/
@import "./assets/normalize.css";
</style>
