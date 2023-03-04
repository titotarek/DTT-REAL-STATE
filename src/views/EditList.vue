<template>
	<div>
		<FormHouse :houseId="this.id" />
	</div>
</template>

<script>
import FormHouse from "../components/FormHouse.vue";
export default {
	props: ["id"],
	name: "EditList",
	components: { FormHouse },
};
</script>
