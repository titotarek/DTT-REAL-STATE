<template>
	<div class="page-detail container">
		<div>
			<div class="back-btn">
				<router-link to="/">
					<img src="../assets/Frontend/ic_back_grey@3x.png" alt="" />
				</router-link>
				<p>Back to overview</p>
			</div>
			<div class="page-detail-card" v-if="house">
				<img :src="house.image" />

				<div class="card-body">
					<ul class="card-content">
						<li>
							<h3>{{ house.location.street }}</h3>
						</li>
						<ul class="card-flex-icon">
							<li>
								<img src="../assets/Frontend/ic_location@3x.png" alt="" />
							</li>
							<li>
								<p>{{ house.location.zip }} {{ house.location.city }}</p>
							</li>
						</ul>

						<ul class="card-flex-icon">
							<li><img src="../assets/Frontend/ic_price@3x.png" alt="" /></li>
							<li>
								<p>{{ house.price }}</p>
							</li>
							<li><img src="../assets/Frontend/ic_size@3x.png" alt="" /></li>
							<li>
								<p>{{ house.rooms.bathrooms }}</p>
							</li>
							<li>
								<img
									src="../assets/Frontend/ic_construction_date@3x.png"
									alt=""
								/>
							</li>
							<li>
								<p>{{ house.constructionYear }}</p>
							</li>
						</ul>

						<ul class="card-flex-icon">
							<li><img src="../assets/Frontend/ic_bed@3x.png" alt="" /></li>
							<li>
								<p>{{ house.rooms.bedrooms }}</p>
							</li>
							<li><img src="../assets/Frontend/ic_bath@3x.png" alt="" /></li>
							<li>
								<p>{{ house.rooms.bathrooms }}</p>
							</li>
							<li>
								<img src="../assets/Frontend/ic_garage@3x.png" alt="" />
							</li>
							<li>
								<p>{{ house.hasGarage ? "Yes" : "No" }}</p>
							</li>
						</ul>
						<p>{{ house.description }}</p>
					</ul>

					<div class="card-img-icon" v-if="house.madeByMe">
						<router-link :to="{ name: 'EditList', params: { id: house.id } }">
							<img src="../assets/Frontend/ic_edit@3x.png" alt="" />
						</router-link>

						<div class="delete-card">
							<a href="#" @click.prevent="toggleVisible">
								<img
									src="../assets/Frontend/ic_delete@3x.png"
									alt="delete-img"
								/>
							</a>
							<transition name="bounce">
								<div class="the-message" v-show="visible">
									<h1>Deleting listing</h1>
									<p>Are you sure you want to delete this listing?</p>
									<p>This action cannot be undone</p>
									<div>
										<button type="submit" @click="deleteHouse">
											yes, delete
										</button>
										<button type="submit" class="delete" @click="toggleVisible">
											go back
										</button>
									</div>
								</div>
							</transition>
						</div>
					</div>
				</div>
			</div>

			<!-- start -->

			<!-- end -->
		</div>
		<div class="recommend-house">
			<h2>Recommend for you</h2>

			<div
				class="recommend-house-card"
				v-for="recommendHouse in recommendHouses"
				:key="recommendHouse.id"
			>
				<router-link
					:to="{
						name: 'DetailsPage',
						params: { id: recommendHouse.id },
					}"
				>
					<img :src="recommendHouse.image" />
					<ul class="card-content">
						<li>
							<h3>{{ recommendHouse.location.street }}</h3>
						</li>
						<li>
							<h5>€ {{ recommendHouse.price }}</h5>
						</li>
						<li>
							<p>
								{{ recommendHouse.location.zip }}
								{{ recommendHouse.location.city }}
							</p>
						</li>

						<ul class="card-flex-icon">
							<li>
								<img src="../assets/Frontend/ic_bed@3x.png" alt="" />
							</li>
							<li>
								<p>{{ house.rooms.bedrooms }}</p>
							</li>
							<li><img src="../assets/Frontend/ic_bath@3x.png" alt="" /></li>
							<li>
								<p>{{ house.rooms.bathrooms }}</p>
							</li>
							<li><img src="../assets/Frontend/ic_size@3x.png" alt="" /></li>

							<li>
								<p>{{ house.size }} m2</p>
							</li>
						</ul>
					</ul>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			recommendHouses: null,
			house: null,
			visible: false,
		};
	},

	mounted() {
		this.getSingleHome();
	},
	
	methods: {
		async getSingleHome() {
			axios.defaults.headers.common[
				"X-Api-Key"
			] = `pQo86_BkVMjJeiX2WcvlC79nLNyhdtrU`;
			try {
				let getHouseById = await axios.get(
					`https://api.intern.d-tt.nl/api/houses`
				);

				this.house = getHouseById.data.find((house) => this.id == house.id);


				const filterHouseById = getHouseById.data.filter(
					(houseByCity) =>
						this.house.location.city == houseByCity.location.city &&
						houseByCity.id !== this.house.id
				);
				this.recommendHouses = filterHouseById;
			} catch (error) {
				console.log(error);
			}
		},

		deleteHouse() {
			axios.defaults.headers.common[
				"X-Api-Key"
			] = `pQo86_BkVMjJeiX2WcvlC79nLNyhdtrU`;
			axios
				.delete(`https://api.intern.d-tt.nl/api/houses/${this.house.id}`)
				.then(() => {
					this.redirectRouter();
				})
				.catch((error) => {
					console.log(error);
				});
		},

		redirectRouter() {
			this.$router.push({ name: "OverView" });
		},

		toggleVisible() {
			this.visible = !this.visible;
		},
	},

	watch: {
		id() {
			this.getSingleHome();
		},
	},
};
</script>
