<template>
  <div class="id-card">
    <h2> {{ manga.attributes.title.en }} </h2>
    <h3>Description :</h3>
    <p> {{ manga.attributes.description.en }} </p>
    <br>
    <p><strong>Status</strong> : {{ manga.attributes.status }}</p>
    <h1>TEEEEEST</h1>
    <p></p>
  </div>
</template>

<script>

export default {
  
  props: {
    manga: {
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