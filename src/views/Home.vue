<template>
  <div>
    <div>
      起始磁道号：
      <el-input class="input" type="number" v-model.number="start"/>
      <el-button @click="createRandom" type="primary">生成随机数</el-button>
    </div>
    <random :randomData="randomData"/>
    <charts :start="start" :randomData="randomData"/>
  </div>
</template>

<script>
  import Random from "../components/Random";
  import Charts from "../components/Charts";
  import random_arr from "../assets/random";

  export default {
    name: "Home",
    data() {
      return {
        randomData: [],
        start: 0
      }
    },
    methods: {
      createRandom() {
        this.randomData = random_arr.createDiskRequest();
      }
    },
    components: {
      Random,
      Charts
    }
  }
</script>

<style scoped>
  .input {
    width: 20%;
    margin-right: 5%;
  }
</style>
