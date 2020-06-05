<template>
  <div>
    <h2>生成的随机数：</h2>
    {{randomData}}
  </div>
</template>

<script>
  export default {
    name: "Random",
    props: ['randomData']
  }
</script>

<style scoped>

</style>
