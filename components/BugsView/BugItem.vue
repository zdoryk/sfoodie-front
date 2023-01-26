<template>
  <div class="bug-item">
    <div class="card bg-dark text-white">
      <div class="card-body">
        <h3 class="card-title">{{ name }}</h3>
        <p class="card-text text-grey">{{ comment }}</p>
        <p class="card-text">User ID: {{ user_id }}</p>
        <img :src="image_url" alt="Bug Image" class="card-img-top" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BugItem",
  props: {
    user_id: Number,
    name: String,
    comment: String,
    image_url: String,
  },
};
</script>

<style scoped></style>
