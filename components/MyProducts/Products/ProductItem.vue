<template>
  <div class="product-item">
    <transition name="fade-opacity">
      <div class="opacity" v-if="this.isPopUpVisible" />
    </transition>
    <div class="name-category" >
      <div class="product-name" v-if="product_name.length < 20">
        {{ product_name }}
      </div>
      <div class="product-name long" v-if="product_name.length >= 20" :style='{"--content": JSON.stringify(product_name)}'>
        {{ product_name.substring(0,20) }}...
      </div>
      <div class="product-category" :style="{'color': product_color}">
          ● {{ product_category }}
        </div>
    </div>
    <div class="buttons">
      <blue-stroke-button class="edit-button" @click.native="edit">
        <div class="btn-text" v-if="windowWidth > 860">
          Edit
        </div>
        <div class="btn-text" v-if="windowWidth <= 860">
        </div>
        <edit-icon class="ico" size="18"/>
      </blue-stroke-button>
<!--      <blue-stroke-button @click.native ="move">-->
<!--        Move to other-->
<!--        <arrow-bar-right-icon class="ico" size="18"/>-->
<!--      </blue-stroke-button>-->
      <transition name="fade">
        <edit-product-pop-up  v-if="isPopUpVisible"  :product_data="product"/>
      </transition>

    </div>
<!--    <move-confirmation v-if="isMovePopUpVisible === 'visible'">Do you really want to move this product to other?</move-confirmation>-->
  </div>
</template>

<script>
import {EditIcon, XIcon, ArrowBarRightIcon} from "vue-tabler-icons"
import BlueStrokeButton from "@/components/UI/BlueStrokeButton";
import RedStrokeButton from "@/components/UI/RedStrokeButton";
import EditProductPopUp from "@/components/MyProducts/Products/EditProductPopUp";
import MoveConfirmation from "@/components/MyProducts/Products/MoveConfirmation";
import {mapActions} from "vuex";

export default {
  name: "ProductItem",
  props: ['product'],
  data () {
    return {
      isPopUpVisible: false,
      // isMovePopUpVisible: 'hidden',
      windowWidth: window.innerWidth
    }
  },
  components: {
    MoveConfirmation,
    RedStrokeButton,
    EditIcon,
    BlueStrokeButton,
    XIcon,
    EditProductPopUp,
    ArrowBarRightIcon
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  computed: {
    product_name() {
      if (this.product !== 'undefined') return this.product.product_name
    },
    product_color() {
      if (this.product !== 'undefined') return this.product.color
    },
    product_category() {
      if (this.product !== 'undefined') return this.product.product_category
    },

  },
  methods: {
    ...mapActions(['MOVE_TO_OTHER']),
    edit () {
      this.isPopUpVisible = true
    },
    // move() {
    //   this.isMovePopUpVisible = 'visible'
    //   this.isPopUpVisible = 'visible'
    // },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    // move_to_other_accepted () {
    //   console.log("move accepted")
    //   this.MOVE_TO_OTHER({
    //     "user_id": this.$store.state.state.user_id,
    //     "old_category": this.product_category,
    //     "new_category": "Other",
    //     "product_name": this.product_name
    //   })
    //   TEMPORARY
      // this.$forceUpdate()
    // },
    hide(){
      this.isPopUpVisible = false
      // this.isMovePopUpVisible = 'hidden'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/variables";


.fade-opacity-enter-active.fade-opacity-enter-active,
.fade-opacity-leave-active.fade-opacity-leave-active
{
  opacity: 0.5;
  transition: all 0.2s ease-in-out;
}

.fade-opacity-enter.fade-opacity-enter,
.fade-opacity-leave-to.fade-opacity-leave-to
{
  opacity: 0;
}


.fade-enter-active,
.fade-leave-active
{
  transition: all 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to
{
  opacity: 0;
}

    .move-confirmation{
      position: absolute;
    }

    .opacity{
      position: absolute;
      width: 100%;
      height: 100vh;
      background-color: #000000;
      opacity: 0.5;
      left:0;
      top: 0;
      //right: 0;
      //bottom: 0;
      z-index: 1004;
    }

    .product-item{
      display: flex;
      /*flex-direction: row;*/
      align-items: center;
      padding: 4px 0;
      padding-bottom: 16px;
      margin-bottom: 12px;
      gap: 8px;

      //width: 552px;
      height: 40px;

      /* Inside auto layout */

      order: 0;
      align-self: stretch;
      flex-grow: 0;
      border-bottom: #3A3C4C 1px solid;
      justify-content: space-between;
      transition: opacity 0.2s ease-in-out;
    }

    .product-name{
      //min-width: 80px;
      //max-width: 150px;
      position: relative;
      width: 180px
    }

    .long {
      cursor: pointer;
    }

    .long::after {
      background-color: $line;
      border-radius: 10px;
      color: $blue;
      display: none;
      padding: 10px 15px;
      position: absolute;
      text-align: center;
      z-index: 2;
      width: 150px;
    }

    .long::after {
      content: var(--content);
      top: 0;
      left: 50%;
      transform: translate(-50%, calc(-100% - 10px));
    }

    .long:hover::after {
      display: block;
    }

    .long::before {
      background-color: $line;
      content: ' ';
      display: none;
      position: absolute;
      width: 15px;
      height: 15px;
      z-index: 999;
    }

    .long:hover::before {
      display: block;
    }

    .long::before {
      top: 0;
      left: 50%;
      transform: translate(-50%, calc(-100% - 5px)) rotate(45deg);
    }

    .name-category{
      display: flex;
    }

    .product-item:hover {
      .buttons{
        opacity: 1;
      }
    }

    .buttons{
      display: flex;
      gap: 8px;
      flex: 1;
      justify-content: flex-end;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .blue-stroke-button{
      padding: 7px;
      padding-left: 10px;
      color: $blue;
      border-color: $blue;
    }

    .red-stroke-button{
      padding: 7px;
    }

    .btn-text{
      margin-right: 5px;
    }


    @media (max-width: $tab-size) {
      .product-item{
        .buttons{
          opacity: 1;
        }
        .btn-text{
          margin-right: 0;
        }
        .ico{
          margin-right: 3px;
        }
      }
    }

    @media (max-width: $phone-size) {
      .edit-button {
        border: none;
      }
    }

</style>
