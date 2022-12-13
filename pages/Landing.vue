<template>
  <div class="Landing">
    <header>
      <img id="logo" :src="require('static/logo.svg')">
      <div class="buttons">
        <blue-stroke-button class="button" @click.native="push_to_login">Log in</blue-stroke-button>
        <blue-button class="button" @click.native="push_to_signup">Sign Up</blue-button>
      </div>
    </header>
    <main>
      <div class="unique-value-proposition">
        <div class="heavy-text">
          Stay on top of your grocery expenses<br> and save money.
        </div>
        <div class="regular-text">
          Sfoodie offers a simple way to track your grocery expenses and gain insight on your eating habits.
        </div>
      </div>
      <div class="app-preview-block">
        <div class="elipse-1"/>
        <div class="elipse-2"/>
        <div class="elipse-3"/>
        <div class="elipse-4"/>
        <img id='app-preview-img' :src="require('assets/landing/app_preview.png')">
      </div>
<!--      <div class="features-block">-->
<!--        <div class="features-with-icons">-->
<!--          <div class="features-with-icons-item">-->
<!--            <div class="ico first">-->
<!--                <ReceiptIcon/>-->
<!--            </div>-->
<!--            <div class="text-content">-->
<!--              <div class="features-heavy">-->
<!--                Save receipts-->
<!--              </div>-->
<!--              <div class="regular-text">-->
<!--                Upload receipts from your groceries shopping, sort by date and price to find your purchases.-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="features-with-icons-item">-->
<!--            <div class="ico second">-->
<!--              <AppleIcon/>-->
<!--            </div>-->
<!--            <div class="text-content">-->
<!--              <div class="features-heavy">-->
<!--                Product list-->
<!--              </div>-->
<!--              <div class="regular-text">-->
<!--                Sort products into convenient categories - always know what you usually buy.-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="features-with-icons-item">-->
<!--            <div class="ico third">-->
<!--              <ChartInfographicIcon/>-->
<!--            </div>-->
<!--            <div class="text-content">-->
<!--              <div class="features-heavy">-->
<!--                Statistics-->
<!--              </div>-->
<!--              <div class="regular-text">-->
<!--                Get insights on your spending habits over time from our advanced statistics dashboard-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="features-images">-->
<!--          <img :src="require('assets/landing/image_receipts.svg')">-->
<!--          <img :src="require('assets/landing/image-categories.svg')">-->
<!--          <img :src="require('assets/landing/image_stats.svg')">-->
<!--        </div>-->
<!--      </div>-->
      <div class="features-block">
        <div class="features-with-icons">
          <div class="column">
            <div class="features-with-icons-item">
              <div class="ico first">
                <ReceiptIcon/>
              </div>
              <div class="text-content">
                <div class="features-heavy">
                  Save receipts
                </div>
                <div class="regular-text">
                  Upload receipts from your groceries shopping, sort by date and price to find your purchases.
                </div>
              </div>
            </div>
            <div class="feature-img">
              <div class="elipse-5"/>
              <img :src="require('assets/landing/image_receipts.svg')">
            </div>
          </div>
          <div class="column">
            <div class="features-with-icons-item">
              <div class="ico second">
                <AppleIcon/>
              </div>
              <div class="text-content">
                <div class="features-heavy">
                  Product list
                </div>
                <div class="regular-text">
                  Sort products into convenient categories - always know what you usually buy.
                </div>
              </div>
            </div>
            <div class="feature-img">
              <div class="elipse-6"/>
              <img :src="require('assets/landing/image-categories.svg')">
            </div>
          </div>
          <div class="column">
            <div class="features-with-icons-item">
              <div class="ico third">
                <ChartInfographicIcon/>
              </div>
              <div class="text-content">
                <div class="features-heavy">
                  Statistics
                </div>
                <div class="regular-text">
                  Get insights on your spending habits over time from our advanced statistics dashboard
                </div>
              </div>
            </div>
            <div class="feature-img translate">
              <div class="elipse-7"/>
              <img :src="require('assets/landing/image_stats.svg')">
            </div>
          </div>

        </div>
      </div>
      <div class="call-to-action-block">
        <div class="heavy-text">
          Want to improve your budgeting?
        </div>
        <blue-button id="start-tracking-button" @click.native="push_to_signup">Start tracking!</blue-button>
      </div>
    </main>
    <footer>
      <img class="footer-logo" :src="require('static/logo.svg')" alt="logo">
      <a href="https://github.com/zdoryk" target="_blank">
        <img :src="require('assets/landing/githab.svg')" alt="github logo">
      </a>
    </footer>
  </div>
</template>

<script>
import BlueButton from "@/components/UI/BlueButton";
import BlueStrokeButton from "@/components/UI/BlueStrokeButton";
import {ReceiptIcon, AppleIcon, ChartInfographicIcon} from 'vue-tabler-icons'
export default {
  name: "Landing",
  components: {BlueStrokeButton, BlueButton, ReceiptIcon, AppleIcon, ChartInfographicIcon},
  layout: 'notProgram',
  methods: {
    push_to_login(){
      this.$nuxt.$router.push('/Login')
    },
    push_to_signup(){
      this.$nuxt.$router.push('/SignUp')
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/variables";

  .Landing{
    width: 100%;
    height: fit-content;
    background: radial-gradient(50% 50% at 50% 50%, #1D1E26 0%, #101117 100%);
    overflow-y: auto;
  }

  .regular-text{
    width: 414px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: $grey;
  }

  header{
    height: 96px;
    max-height: 96px;
    display: flex;
    justify-content: space-between;
    padding: 0 80px;
    align-items: center;


    img#logo{
      height: 32px;
      padding: 0;
    }

    .buttons{
      display: flex;
      min-width: 224px;
      justify-content: space-between;
    }

    .button{
      padding: 12px 24px;
    }
  }

  main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: fit-content;

    .unique-value-proposition{
      max-width: 780px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-top: 40px;

      .heavy-text{

        font-weight: 700;
        font-size: 40px;
        line-height: 120%;
        /* or 48px */
        text-align: center;
        color: $white;
        text-shadow: 0 0 4px rgba(237, 239, 255, 0.2);
      }


    }

    .app-preview-block{
      margin-top: 64px;
      filter: drop-shadow(0px 0px 200px rgba(237, 239, 255, 0.1));
      border-radius: 20px; /*1*/
      border: 2px solid transparent; /*2*/
      background: linear-gradient(rgba(105, 106, 233, 0.5), rgba(29, 30, 38, 1)) border-box; /*3*/
      --webkit-mask: /*4*/
        linear-gradient(rgba(105, 106, 233, 0.5), rgba(29, 30, 38, 1)) padding-box,
        linear-gradient(rgba(105, 106, 233, 0.5), rgba(29, 30, 38, 1));
      -webkit-mask-composite: xor; /*5'*/
      mask-composite: exclude; /*5*/

      #app-preview-img{
        border-radius: 20px;
      }

      .elipse-1{
        position: absolute;
        width: 311px;
        height: 311px;
        left: 719px;
        top: 173px;

        background: #696AE9;
        filter: blur(200px);
        z-index: -1;
      }

      .elipse-2{
        position: absolute;
        width: 311px;
        height: 311px;
        transform: translate(-36px, 18px);

        background: #696AE9;
        filter: blur(200px);
        z-index: -1;
      }

      .elipse-3{
        position: absolute;
        width: 209px;
        height: 209px;
        left: 155px;
        top: 82px;

        background: #FF7955;
        filter: blur(150px);
        z-index: -1;
      }

      .elipse-4{
        position: absolute;
        width: 209px;
        height: 209px;
        left: 719px;
        top: 275px;

        background: #FF7955;
        filter: blur(150px);
        z-index: -1;
      }
    }

    .features-block{
      margin-top: 160px;

      .features-with-icons{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 134px;
        height: 560px;

        //width: 1162px;
        //height: 192px;
        .column {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;

          .feature-img{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .translate{
            transform: translateX(3%);
          }

          img{
            //height: 400px;
            z-index: 1;
          }

          .elipse-5{
            position: absolute;
            width: 121.13px;
            height: 121.13px;
            left: 321px;
            top: 1266px;
            background: $blue;
            filter: blur(100px);
            z-index: 0;
          }

          .elipse-6{
            position: absolute;
            width: 121.13px;
            height: 121.13px;
            transform: translate(-110px, 80px);
            background: $peach;
            opacity: 0.5;
            filter: blur(100px);
          }

          .elipse-7{
            position: absolute;
            width: 121.13px;
            height: 121.13px;
            transform: translate(-140px, -40px);
            background: $blue;
            filter: blur(100px);
          }

          .features-with-icons-item {
            display: flex;
            gap: 24px;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .ico {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              //padding: 0px 5px;
              gap: 10px;
              width: 48px;
              height: 48px;

              border-radius: 100px;

              &.first {
                background: #78909C;
                box-shadow: 0 0 20px rgba(183, 185, 202, 0.3);
              }

              &.second {
                background: $blue;
                box-shadow: 0 0 20px $blue-shadow;
              }

              &.third {
                background: $peach;
                box-shadow: 0 0 20px $peach-shadow;
              }
            }

            .text-content {
              .features-heavy {
                font-style: normal;
                font-weight: 700;
                font-size: 28px;
                line-height: 40px;
                text-align: center;
                color: $white;
              }

              .regular-text {
                max-width: 298px;
                text-align: center;
              }
            }
          }
        }

      }

      //.features-images{
      //  display: flex;
      //  gap: 134px
      //}
    }

    .call-to-action-block{
      margin-top: 160px;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;

      .heavy-text{
        font-weight: 700;
        font-size: 28px;
        line-height: 40px;
        display: flex;
        color: $white;
      }

      #start-tracking-button{
        padding: 12px 24px;

        max-width: 156px;
        height: 48px;
      }
    }

  }

  footer{
    margin: 152px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }


</style>
