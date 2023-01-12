<template>
  <div id="report">
    <template>
      <div class="title">
        Report a bug
      </div>
      <div class="container">
        <form>
          <div class="form-group">
            <label for="bugName">Name of the bug</label>
            <input type="text" class="form-control" id="bugName" v-model="bugName" placeholder="Enter the name of the bug">
          </div>
          <div class="form-group">
            <label for="bugComment">Comment</label>
            <textarea class="form-control" id="bugComment" v-model="bugComment" rows="3"></textarea>
          </div>
          <div class="form-group image">
            <label for="bugImage">Attach an image (optional)</label>
            <input type="file" class="form-control-file" id="bugImage" ref="bugImageInput" @change="onFileChange" accept="image/*">
          </div>
<!--          <button type="submit" class="btn btn-primary" @click.prevent="submitBug">Submit</button>-->
          <blue-button @click.pr.prevent.native="submitBug">Submit</blue-button>
        </form>
      </div>
    </template>
  </div>
</template>

<script>
import BlueButton from "~/components/UI/BlueButton";
export default {
  name: "ReportBug",
  components: {BlueButton},
  data() {
    return {
      bugName: 'qwe',
      bugComment: 'qwe',
      bugImage: null
    }
  },
  computed: {
    isInputsOkay(){
      return this.bugName && this.bugComment && this.bugImage;
    },
    buttonStyle(){
      if (this.isInputsOkay){
        return{

        }
      }
      return{

      }
    }
  },
  methods: {
    onFileChange(e) {
      this.bugImage = e.target.files[0]
    },
    submitBug() {
      let data = {
        user_id: this.$store.state.state.user_id,
        name: this.bugName,
        comment: this.bugComment
      }
      if (this.bugImage) {
        data['image'] = this.bugImage
      }

      const reader = new FileReader();
      reader.readAsArrayBuffer(data.image);
      const formData = new FormData();
      // formData.append("user_id", data.user_id);
      // formData.append("name", data.name);
      // formData.append("comment", data.comment);
      // formData.append("image",  reader.result);
      formData.append("image",  this.bugImage);
      console.log(formData)
      console.log(data)

      this.$axios.post("https://oe7jy3.deta.dev/report_a_bug/?user_id=" + this.$store.state.state.user_id + "&name=" + this.bugName +
         "&comment=" + this.bugComment, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error(error)
        })

      // console.log(this.bugImage)
      // this.$store.dispatch('REPORT_A_BUG', data)
      // Use axios or any other library to send formData to the server
      // ...
    }
  }
}
</script>

<style scoped lang="scss">

  #report{
    padding: 16px;
  }

  .title{
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 40px;
    margin-bottom: 40px;
  }

  form{
    display: flex;
    flex-direction: column;
    gap: 16px;

    .bttn{
      padding: 12px;
    }
    .image{
      display: block;
    }
  }

</style>
