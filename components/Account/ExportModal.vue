<template>
  <div id="export-modal">
    <div class="header">
      <div class="title">
        Export data
      </div>
    </div>
    <div class="body">
      <div class="body-block">
        <div class="block-title">
          Select data
        </div>
        <div class="check-box-block">
          <check-box-item
            v-for="(value, key) in this.data_categories"
            :data_obj="{name: key, isChecked: value, category_name: 'data_categories'}"/>
        </div>
      </div>
      <div class="body-block">
        <div class="block-title">
          Select format
        </div>
        <div class="check-box-block">
          <check-box-item
            v-for="(value, key) in this.data_format"
            :data_obj="{name: key, isChecked: value, category_name: 'data_format'}"/>
        </div>
      </div>
    </div>
    <div class="footer">
      <red-stroke-button @click.native="close">Cancel</red-stroke-button>
      <blue-button @click.native="export_data">Export</blue-button>
    </div>
  </div>
</template>

<script>
import RedStrokeButton from "@/components/UI/RedStrokeButton.vue";
import BlueButton from "@/components/UI/BlueButton.vue";
import CheckBox from "@/components/UI/CheckBox.vue";
import CheckBoxItem from "@/components/Account/CheckBoxItem.vue";

export default {
  name: "ExportModal",
  components: {CheckBoxItem, CheckBox, BlueButton, RedStrokeButton},
  data(){
    return{
      data_format: {
        // ".xslx": false,
        ".json": false,
        ".csv": false
      },
      data_categories: {
        "Products": false,
        "All receipts": false
      }
    }
  },

  methods: {
    change_state(name, state, category){
      if (category === 'data_categories'){
        this.data_categories[name] = state
      }
      else {
        this.data_format[name] = state
      }
    },
    close(){
      this.$parent.closeAll()
    },
    export_data(){
      console.group()
      console.log(this.data_format)
      console.log(this.data_categories)
      console.groupEnd()

      // this.$axios.get('')
      this.getFiles()
    },
    async getFiles() {
      const data = {
        "user_id": this.$store.state.state.user_id,
        "categories": {
          "products": this.data_categories.Products,
          "all_receipts": this.data_categories["All receipts"]
        },
        "formats": {
          // "xslx": this.data_format[".xslx"],
          "csv": this.data_format[".csv"],
          "json_": this.data_format[".json"]
        }
      }

      try {
        const response = await this.$axios.post('http://10.9.179.156:8080/account/export_data', data, {
          // responseType: 'arraybuffer'
        })
        // Iterate over the responses in the tuple
        for (const res of response.data) {
          // Check the Content-Disposition header to determine the file type
          if (res.raw_headers[0][1].includes('xlsx')) {
            // Download the Excel file
            this.download(res.body, res.raw_headers[0][1], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          } else if (res.raw_headers[0][1].includes('csv')) {
            // Download the CSV file
            this.download(res.body, res.raw_headers[0][1], 'text/csv')
          } else if (res.raw_headers[0][1].includes('json')) {
            // Download the JSON file
            this.download(res.body, res.raw_headers[0][1], 'application/json')
          }
        }
        // const files = response.data
        console.log(response.data)
        // Handle the files here
      } catch (error) {
        console.error(error)
      }
    },
    download(data, filename, mimeType) {
      const blob = new Blob([data], { type: mimeType })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }
  // computed
}
</script>

<style scoped lang="scss">
@import "assets/variables.scss";

  #export-modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    gap: 40px;

    width: 430px;
    //height: 410px;

    background: $grey-background;
    box-shadow: 0px -4px 40px $receipt-view-shadow;
    border-radius: 8px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1004;
  }

  .title{
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 40px;
  }

  .footer, .body{
    display: flex;
    width: 100%;
  }

  .body{
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;

    .body-block{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      gap: 8px;

      .block-title{
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: $white;
      }

      .check-box-block{
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
    }
  }


  .footer{
    justify-content: space-between;

    .red-stroke-button, .bttn{
      padding: 12px;
      gap: 10px;
      width: 48%;
    }
  }





</style>
