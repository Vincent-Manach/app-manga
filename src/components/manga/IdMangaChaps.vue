<template>
    <div class="showChap">
      <p>N°{{ mangaChap.attributes.chapter }}</p>
      <h3>{{ mangaChap.attributes.title }}</h3>
    </div>
</template>

<script>

export default {
  name: 'IdManga',
  props: {
    mangaChap: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
  .showChap {
    display: flex;
  }
  .showChap p {
    padding: 5px 10px;
    background-color: lightblue;
    border-radius: 3px;
    color: white;
    font-size: 16px;
    height: 30px;
    margin-right: 10px;
  }
  .showChap h3 {
    font-size: 20px;
    text-align: left;
  }
</style>