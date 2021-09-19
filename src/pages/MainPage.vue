<template>
	<div>
<!--		<info-block />-->
		<start-voting />
<!--		    {text: 'Финал', value: 'final_voting'},-->
<!--		<winner-block voting_id="4"/>-->
		<!--&lt;!&ndash;    {text: 'Полуфинал', value: 'semifinal_voting'},             &ndash;&gt;-->
		<!--    <winners-all-block voting_id="5"/>-->
		<!--&lt;!&ndash;    {text: 'Осень "звезда"', value: 'autumn_committee_voting'}, &ndash;&gt;-->
		<!--    <winners-all-block voting_id="6"/>-->
		<!--&lt;!&ndash;    {text: 'Осень "народное"', value: 'autumn_users_voting'},   &ndash;&gt;-->
		<!--    <winners-all-block voting_id="3"/>-->
		<!--&lt;!&ndash;    {text: 'Весна "звезда"', value: 'spring_committee_voting'}, &ndash;&gt;-->
		<!--    <winners-all-block voting_id="2"/>-->
		<!--&lt;!&ndash;    {text: 'Весная "народное"', value: 'spring_users_voting'},  &ndash;&gt;-->
		<!--    <winners-all-block voting_id="1"/>-->
	</div>
</template>

<script>
// import InfoBlock from "../components/InfoBlock/InfoBlock";
// import WinnerBlock from '../components/WinnerBlock/WinnerBlock';
// import WinnersAllBlock from "../components/WinnerBlock/WinnersAllBlock";
import StartVoting from "../components/MainModule/StartVoting";

export default {
	name: "MainPage",

	components: {
		// InfoBlock,
		// WinnerBlock,
		// WinnersAllBlock
		StartVoting
	},

	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
</style>
