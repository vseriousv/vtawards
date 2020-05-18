<template>
  <div>
    <address-main-block />
    <nomination-main-block />
    <steps-main-block />
    <member-main-block />
    <prize-main-block />
    <callback-main-block />
  </div>
</template>

<script>
import AddressMainBlock from "./AddressMainBlock/AddressMainBlock";
import NominationMainBlock from "./NominationMainBlock/NominationBlock";
import StepsMainBlock from "./StepsMainBlock/StepsMainBlock";
import MemberMainBlock from "./MemberMainBlock/MemberMainBlock";
import PrizeMainBlock from "./PrizeMainBlock/PrizeMainBlock";
import CallbackMainBlock from "./CallbackMainBlock/CallbackMainBlock";

export default {
  name: "StartVoting",
  components: {
    AddressMainBlock,
    NominationMainBlock,
    StepsMainBlock,
    MemberMainBlock,
    PrizeMainBlock,
    CallbackMainBlock
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/StartVotingOther";
</style>
