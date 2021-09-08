<template>
	<div>
		<committee-block />
	</div>
</template>

<script>
import CommitteeBlock from "../components/CommitteeBlock/CommitteeBlock";
export default {
	name: "CommitteePage",

	components: {
		CommitteeBlock
	},

	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
</style>
