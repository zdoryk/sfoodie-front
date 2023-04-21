<template>
  <div class="bug-item">
    <div class="card bg-dark text-white">
      <div class="card-body">
        <h3 class="card-title">{{ name }}</h3>
        <p class="card-text text-grey">{{ comment }}</p>
        <p class="card-text">User ID: {{ user_id }}</p>
        <div class="thumbnail-container">
          <a :href="image_url" target="_blank">
            <img  :src="image_url" alt="Bug Image" class="card-img-top">
          </a>
        </div>
<!--        <a target="_blank" :href="image_url" class="card-img-top">Image link</a>-->
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
    image_url: String
  },

}
</script>

<style scoped>
.thumbnail-container {
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.thumbnail-container img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

</style>


