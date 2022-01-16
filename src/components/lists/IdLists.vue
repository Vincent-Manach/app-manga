<template>
    <router-link :to="{ path: `/myLists/${list.id}` }">
      <h2>{{ list.attributes.name }}</h2>
      <p>{{ list.id }}</p>
      <h1>TEEEEEST</h1>
    </router-link>
</template>

<script>

export default {
  
  props: {
    list: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
  .id-card {
    color: black;
    border: 1px solid gray;
    background-color: white;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.50);
    border-radius: 15px;
    width: 300px;
    margin: 25px auto;
    padding: 5px;
  }
</style>