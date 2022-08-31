<template>
  <!--   定位组件 -->
  <div class="location">
    <div class="location_div">
      <img src="@/assets/images/location1.png" />
      <span>当前位置:{{ locationInfo }}</span>
      <button @click="toLocation()">重新定位</button>
    </div>
  </div>
</template>

<script>
import { getLocation } from "@/utils/mxapi.js";
export default {
  name: "Location",
  components: {},
  props: {},
  data() {
    return {};
  },
  props: {
    locationInfo: {
      default: "定位失败",
      type: String,
    }, //位置信息
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toLocation() {
      getLocation()
        .then((res) => {
          this.locationInfo = res;
        })
        .catch((e) => {});
    },
  },
};
</script>

<style scoped>
.location {
  width: 100%;
  font-size: 28px;
  box-shadow: 0 2px 4px 0 rgba(229, 229, 229, 0.5);
}
.location_div {
  /* width: calc(100% - 48px); */
  background: white;
  /* margin: 24px 24px 0 24px; */
  display: flex;
  align-items: center;
  padding: 30px 24px;
  box-sizing: border-box;
  border-radius: 4px;
}
.location_div img {
  width: 24px;
}
.location_div span {
  margin-left: 10px;
  font-size: 28px;
  padding-right: 145px;
  color: var(--color-black-text);
  word-break: break-all;
  word-wrap: break-word;
}
.location_div button {
  font-size: 24px;
  position: absolute;
  border-radius: 50px;
  padding: 6px 24px;
  background: white;
  color: #ff6619;
  right: 24px;
  border: 1.5px solid #ff6619;
}
</style>
