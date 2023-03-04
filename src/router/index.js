import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import CreateNewList from "../views/CreateNewList.vue";
import DetailsPage from "../views/DetailsPage.vue";
import OurTeam from "../views/OurTeam.vue";
import EditList from "../views/EditList.vue";
import NotFound from "../views/NotFound.vue";
import OverView from "../views/OverView.vue";

const routes = [
	//   OverView  => router page
	{
		path: "/",
		name: "OverView",
		component: OverView,
	},
	//   About page router
	{
		path: "/about",
		name: "About",
		component: About,
	},
	//   Create New List  => router page
	{
		path: "/create-new-list",
		name: "CreateNewList",
		component: CreateNewList,
	},

	//    DTT Developer  => router page
	{
		path: "/development-team",
		name: "OurTeam",
		component: OurTeam,
	},
        //    Details Page  => router 
	{
		path: "/house-detail/:id",
		name: "DetailsPage",
		component: DetailsPage,
		props: true,
	},
          //    Edit List  => router 
	{
		path: "/edit-list/:id",
		name: "EditList",
		component: EditList,
		props: true,
	},
	// redirect router
	{
		path: "/house-detail/:id",
		redirect: "OverView",
	},
	// 404 router page NotFound

	{
		path: "/:catchAll(.*)",
		name: "NotFound",
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
