<template>
	<div>

		<CreateNew /> 

		<div class="search">
			<div class="container">
				<div class="search-bar">
					<div class="search-bar-content">
						<img
							class="search-icon"
							src="../assets/Frontend/ic_search@3x.png"
							alt="search-icon"
						/>
						<input
							placeholder="Search for a house"
							v-model="searchValue"
							@input="filteredCity"
						/>
						<img
							class="clear-icon"
							src="../assets/Frontend/ic_clear@3x.png"
							alt="clear-icon"
							@click="clearSearch"
						/>
					</div>
					<div class="search-bar__btn">
						<button
							:class="{'active': activeFilter === 'price'}"
							@click="() => sortList('price')"
							class="price-btn"
						>
							Price
						</button>

						<button
							:class="{'active': activeFilter === 'size'}"
							@click="() => sortList('size')"
							class="size-btn"
						>
							Size
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="over-view">
			<div class="container">
				<div class="over-view-cards">
					<div v-if="houses?.length < 1" class="not-found-img">
						<img src="../assets/Frontend/img_empty_houses@3x.png" alt="" />
						<p>
							No Result found <br />
							please try another keyword
						</p>
					</div>

					<div>
						<p v-if="this.searchValue.trim().length > 0 && houses?.length > 0">
							{{ houses.length }} results found
						</p>
					</div>
					<div v-for="(house, index) in houses" :key="house.id">
						<router-link
							class="over-view-cards__card"
							:to="{
								name: 'DetailsPage',
								params: { id: house.id },
							}"
						>
							<ul class="over-view-cards__card-left">
								<li class="card-img">
									<img :src="house.image" />
								</li>

								<ul class="card-content">
									<li>
										<h3>{{ house.location.street }}</h3>
									</li>
									<li>
										<h5>€ {{ house.price }}</h5>
									</li>
									<li>
										<p>{{ house.location.zip }} {{ house.location.city }}</p>
									</li>
									<li>
										<p>construction Year {{ house.constructionYear }}</p>
									</li>
									<ul class="card-flex-icon">
										<li>
											<img src="../assets/Frontend/ic_bed@3x.png" alt="" />
										</li>
										<li>
											<p>{{ house.rooms.bedrooms }}</p>
										</li>
										<li>
											<img src="../assets/Frontend/ic_bath@3x.png" alt="" />
										</li>
										<li>
											<p>{{ house.rooms.bathrooms }}</p>
										</li>
										<li>
											<img src="../assets/Frontend/ic_size@3x.png" alt="" />
										</li>
										<li>
											<p>{{ house.size }} m2</p>
										</li>
									</ul>
								</ul>
							</ul>

							<div v-if="house.madeByMe" class="card-img-icon">
								<router-link
									:to="{ name: 'EditList', params: { id: house.id } }"
								>
									<img src="../assets/Frontend/ic_edit@3x.png" alt="" />
								</router-link>
							
								<img src="../assets/Frontend/ic_delete@3x.png" alt="" />
							</div>

						</router-link>
                        <div   class="like-house">
                            <img :class="{selected: house?.liked }" @click="() => toggleLike(index)" src="../assets/Frontend/like.png" alt="">
                                
                      
                   
                    
                        </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import CreateNew from "../components/CreateNew.vue";


export default {
	components: { CreateNew },
	name: "Overview",

	data() {
		return {
			houses: null,
			searchValue: "",
			activeFilter: 'price',
		};
	},

	async mounted() {
		await this.getHomeList();
	},
	watch: {
		searchValue() {
			this.filteredCity();
		},
	},

	methods: {
		clearSearch() {
			this.searchValue = "";
		},
		async getHomeList() {
			axios.defaults.headers.common[
				"X-Api-Key"
			] = `pQo86_BkVMjJeiX2WcvlC79nLNyhdtrU`;
			try {
				const houses = await axios.get("https://api.intern.d-tt.nl/api/houses");

				this.houses = houses.data;
			} catch (error) {
				console.log(error);
			}
		},
            
		filteredCity() {
			if (this.searchValue.trim().length > 0) {
				this.houses = this.houses.filter((house) => {
					return house.location.city
						.toLowerCase()
						.includes(this.searchValue.toLowerCase());
				});
			} else {
				this.getHomeList();
			}
		},
		sortList(by) {
            this.activeFilter = by;
			this.houses = this.houses.sort((a, b) => {
				if (a[by] < b[by]) {
					return -1;
				} else {
					return 1;
				}
			});
		},

        toggleLike(i){
            const likedHouse = this.houses[i]
            if(likedHouse?.liked){
                likedHouse.liked = !likedHouse.liked
            } else {
                likedHouse['liked'] = true;
            }
            

            this.houses[i] = likedHouse;
        }
        
    }
	
};
</script>
