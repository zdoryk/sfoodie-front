<template>
  <div id="report">
    <template>
      <div class="title">Report a bug</div>
      <div class="container">
        <form>
          <div class="form-group">
            <label for="bugName">Name of the bug</label>
            <input
              type="text"
              class="form-control"
              id="bugName"
              v-model="bugName"
              placeholder="Enter the name of the bug"
            />
          </div>
          <div class="form-group">
            <label for="bugComment">Comment</label>
            <textarea
              class="form-control"
              id="bugComment"
              v-model="bugComment"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group image">
            <label for="bugImage">Attach an image (mandatory)</label>
            <input
              type="file"
              class="form-control-file"
              id="bugImage"
              ref="bugImageInput"
              @change="onFileChange"
              accept="image/*"
            />
          </div>
          <!--          <button type="submit" class="btn btn-primary" @click.prevent="submitBug">Submit</button>-->
          <blue-button
            ref="sendReportButton"
            :disabled="!isInputsOkay"
            :style="buttonStyle"
            @click.pr.prevent.native="submitBug"
            >{{ buttonText }}</blue-button
          >
        </form>
      </div>
    </template>
  </div>
</template>

<script>
import BlueButton from "~/components/UI/BlueButton";
export default {
  name: "ReportBug",
  components: { BlueButton },
  data() {
    return {
      bugName: "",
      bugComment: "",
      bugImage: null,
      isSent: false,
      buttonText: "Submit",
    };
  },
  computed: {
    isInputsOkay() {
      return (
        this.bugName.length > 0 &&
        this.bugComment.length > 0 &&
        this.bugImage !== null
      );
    },
    buttonStyle() {
      if (!this.isInputsOkay) {
        this.buttonText = "Fill all the fields";
        return {
          "--back-color": "#696AE9",
          // '--cursor': 'default',
          "--opacity": "0.5",
        };
      }
      if (this.isSent) {
        this.buttonText = "Success!";
        return {
          "--back-color": "#66BB6A",
          "--box-shadow": "0 0 20px rgba(124, 179, 66, 0.2)",
          "--opacity": "1",
        };
      }
      this.buttonText = "Submit";
      return {
        "--box-shadow": "0 0 20px rgba(105, 106, 233, 0.2)",
        "--back-color": "#5D5FEF",
        // '--cursor': 'pointer',
        "--opacity": "1",
      };
    },
  },
  methods: {
    onFileChange(e) {
      this.bugImage = e.target.files[0];
    },
    submitBug() {
      let data = {
        user_id: this.$store.state.state.user_id,
        name: this.bugName,
        comment: this.bugComment,
      };
      if (this.bugImage) {
        data["image"] = this.bugImage;
      }

      const reader = new FileReader();
      reader.readAsArrayBuffer(data.image);
      const formData = new FormData();
      // formData.append("user_id", data.user_id);
      // formData.append("name", data.name);
      // formData.append("comment", data.comment);
      // formData.append("image",  reader.result);
      formData.append("image", this.bugImage);
      console.log(formData);
      console.log(data);

      this.$axios
        .post(
          "https://sfoodiedeta-1-w6589305.deta.app/report_a_bug/?user_id=" +
            this.$store.state.state.user_id +
            "&name=" +
            this.bugName +
            "&comment=" +
            this.bugComment,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((data) => {
          console.log(data);
          if (data.data.message === "Bug Report created successfully") {
            this.isSent = true;
            setTimeout(() => {
              this.isSent = false;
            }, 4000);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // console.log(this.bugImage)
      // this.$store.dispatch('REPORT_A_BUG', data)
      // Use axios or any other library to send formData to the server
      // ...
    },
  },
};
</script>

<style scoped lang="scss">
#report {
  padding: 16px;
}

.title {
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  margin-bottom: 40px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .bttn.bttn {
    padding: 12px;
    opacity: var(--opacity);
    background-color: var(--back-color);
    transition: all 0.3s ease-in-out;
  }

  .bttn.bttn:hover {
    background-color: var(--back-color);
    box-shadow: var(--box-shadow);
  }
  .image {
    display: block;
  }
}
</style>
