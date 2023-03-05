<template>
	<div class="create-list">
		<div class="container">
			<div class="create-list-content">
				<div class="back-btn">
					<router-link to="/">
						<img src="../assets/Frontend/ic_back_grey@3x.png" alt="" />
					</router-link>
					<p>Back to overview</p>

					<p class="mobile-title">
						{{ this.$props.houseId ? "Edit listing" : "Create new listing" }}
					</p>
				</div>
			</div>
			<h1>Create new list</h1>

			<div class="create-list__form">
				<!-- Start of the create from   -->
				<form @submit.prevent="createHomeList">
					<div>
						<label for="">street name</label>
						<input
							type="text"
							placeholder="Enter the street name"
							v-model="data.streetName"
							@change="handelError"
						/>
						<span class="error" :class="showError('streetName')">{{
							errorMsg
						}}</span>
					</div>

					<div class="flex-input">
						<div class="flex-input-right">
							<label for="">house number</label>
							<input
								type="text"
								placeholder="Enter house number"
								v-model="data.houseNumber"
								@change="handelError"
							/>
							<span class="error" :class="showError('houseNumber')">{{
								errorMsg
							}}</span>
						</div>
						<div class="flex-input-left">
							<label for="">Addition (option)</label>
							<input
								type="text"
								placeholder="e.g.A"
								v-model="data.numberAddition"
								@change="handelError"
							/>
							<span class="error" :class="showError('numberAddition')">{{
								errorMsg
							}}</span>
						</div>
					</div>

					<div>
						<label for="">Postal code</label>
						<input
							type="text"
							placeholder="e.g 1000 AA"
							v-model="data.zip"
							@change="handelError"
						/>
						<span class="error" :class="showError('zip')">{{ errorMsg }}</span>
					</div>

					<div>
						<label for="">city</label>
						<input
							type="text"
							placeholder="e.g Utrecht"
							v-model="data.city"
							@change="handelError"
						/>

						<span class="error" :class="showError('city')">{{ errorMsg }}</span>
					</div>

					<div class="create-list__upload">
						<label>Upload picture (PNG or JPG)</label>
						<label class="create-list__upload-img">
							<input type="file" @change="onFileUpload" />

							<img class="upload-img" :src="previewImg" />
							<img src="../assets/Frontend/ic_upload@3x.png" alt="upload" />
						</label>
					</div>

					<div>
						<label for="">Price</label>
						<input
							type="text"
							placeholder="e.g €150.000"
							v-model="data.price"
							@change="handelError"
						/>
						<span class="error" :class="showError('price')">{{
							errorMsg
						}}</span>
					</div>

					<div class="create-list__form-select">
						<div class="flex-input-right">
							<label for="">Size</label>
							<input
								type="text"
								placeholder="e.g. 60m2"
								v-model="data.size"
								@change="handelError"
							/>
							<span class="error" :class="showError('size')">{{
								errorMsg
							}}</span>
						</div>

						<div class="select-garage">
							<label>Garage</label>
							<select v-model="data.hasGarage" @change="handelError">
								<option value="">Select</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
							<span class="error" :class="showError('hasGarage')">{{
								errorMsg
							}}</span>
						</div>
					</div>

					<div class="flex-input">
						<div class="flex-input-right">
							<label for="">bedrooms</label>
							<input
								type="text"
								placeholder="Enter amount"
								v-model="data.bedrooms"
								@change="handelError"
							/>
							<span class="error" :class="showError('bedrooms')">{{
								errorMsg
							}}</span>
						</div>
						<div class="flex-input-left">
							<label for="">Bathrooms</label>
							<input
								type="text"
								placeholder="Enter amount"
								v-model="data.bathrooms"
								@change="handelError"
							/>
							<span class="error" :class="showError('bathrooms')">{{
								errorMsg
							}}</span>
						</div>
					</div>

					<div>
						<label for="">construction date</label>
						<input
							type="text"
							placeholder="10/08/2005"
							v-model="data.constructionYear"
							@change="handelError"
						/>
						<span class="error" :class="showError('constructionYear')">{{
							errorMsg
						}}</span>
					</div>

					<label>Description</label>
					<input
						type="text"
						placeholder="Enter Description"
						v-model="data.description"
						@change="handelError"
					/>
					<span class="error" :class="showError('description')">{{
						errorMsg
					}}</span>

					<div class="create-list__form-btn">
						<button :class="isDisabled">
							{{ this.$props.houseId ? "save" : "post" }}
						</button>
					</div>
				</form>

				<!-- End of the create from   -->
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "FormHouse",
	props: {
		houseId: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			houseId: null,
			previewImg: null,
			selectedFile: null,
			valid: false,
			// hidden: false,
			data: {
				price: "",
				bedrooms: "",
				bathrooms: "",
				size: "",
				streetName: "",
				houseNumber: "",
				numberAddition: "",
				zip: "",
				city: "",
				constructionYear: "",
				hasGarage: null,
				description: "",
			},
			errorMsg: "Required field missing",
			hasError: {},
		};
	},
	watch: {
		data: {
			//  the handler error function here compere the the data Object with hasError Object for each key item
			// if the data value of a field is empty, add the field to hasError Object otherwise remove the field from hasError object
			handler() {
				const keys = Object.keys(this.$data.data);
				keys.forEach((key) => {
					const item = this.$data.data[key];
					if (!item) {
						this.hasError[key] = key;
						this.valid = false;
					} else {
						delete this.hasError[key];
					}
				});
				delete this.hasError["madeByMe"];
				if (!Object.keys(this.hasError).length) {
					this.$data.valid = true;
				}
			},
			deep: true,
		},
	},

	methods: {
		async createHomeList() {
			try {
				axios.defaults.headers.common[
					"X-Api-Key"
				] = `pQo86_BkVMjJeiX2WcvlC79nLNyhdtrU`;
				const createHouse = await axios.post(
					`https://api.intern.d-tt.nl/api/houses${
						this.$props.houseId ? "/" + this.$props.houseId : ""
					}`,
					{
						...this.$data.data,
						hasGarage: this.data.hasGarage === "Yes" ? true : false,
						image: this.selectedFile,
					}
				);

				this.houseId = createHouse.data.id ?? this.houseId;
				this.onSubmit();
			} catch (error) {
				console.log(error);
			}
		},
		onFileUpload(event) {
			this.selectedFile = event.target.files[0];
			let uploadImage = URL.createObjectURL(event.target.files[0]);
			this.previewImg = uploadImage;
		},
		onSubmit() {
			const formData = new FormData();
			formData.append("image", this.selectedFile);

			axios.defaults.headers.common[
				"X-Api-Key"
			] = `pQo86_BkVMjJeiX2WcvlC79nLNyhdtrU`;

			axios
				.post(
					`https://api.intern.d-tt.nl/api/houses/${this.houseId}/upload`,
					formData
				)
				.then((res) => {})
				.then(this.redirectRouter)
				.catch((err) => console.log(err));
		},
		redirectRouter() {
			this.$router.push({ name: "DetailsPage", params: { id: this.houseId } });
		},
		showError(name) {
			return !(name in this.hasError) && "error-hidden";
		},

		getSingleHome(houseId) {
			axios.defaults.headers.common[
				"X-Api-Key"
			] = `pQo86_BkVMjJeiX2WcvlC79nLNyhdtrU`;
			axios
				.get(`https://api.intern.d-tt.nl/api/houses/`)
				.then((res) => {
					const re = res.data.find((house) => houseId == house.id);

					const street = re.location.street.split(" ");
					const houseNumber = street.splice([street.length - 1]).join("");

					const streetName = street[0];
					this.previewImg = re.image;

					this.data = {
						...re,
						bedrooms: re.rooms.bedrooms,
						bathrooms: re.rooms.bathrooms,
						streetName,
						houseNumber,
						zip: re.location.zip,
						hasGarage: re.hasGarage === "Yes" ? true : false,
						city: re.location.city,
					};
				})
				.catch((err) => console.log(err));
		},
	},

	computed: {
		isDisabled() {
			return !this.valid && "disabled";
		},
	},
	mounted() {
		if (this.$props.houseId) {
			this.$data.houseId = this.$props.houseId;
			this.getSingleHome(this.$props.houseId);
		}
	},
};
</script>
