<template>
  <!-- 任务分配的列表 -->
  <div class="task_list">
    <div class="content_div">
      <div class="list_content" v-for="(item, index) in list" :key="index">
        <div class="list_item">
          <!-- 一级列表选择按钮 -->
          <img
            class="select_img"
            @click="parentSelect(index)"
            :src="
              item.parentChecked
                ? require('@/assets/images/selected_icon.png')
                : require('@/assets/images/unselected_icon.png')
            "
          />
          <div class="item_div">
            <span class="list_name_span">{{ item.CUSTOMERNAME }}</span>
            <key-value-txt title="授信金额" :content="item.BUSINESSSUM"></key-value-txt>
            <key-value-txt title="客户经理" :content="item.INPUTUSERNAME"></key-value-txt>
          </div>
          <!-- 一级列表右侧箭头 -->
          <img
            @click="extendClose(index,item)"
            class="list_right_img"
            :src="
              item.isExtend
                ? require('@/assets/images/jdxx_xlh_icon.png')
                : require('@/assets/images/jdxx_xlq_icon.png')
            "
          />
        </div>
        <div class="list_content_children" v-if="item.isExtend">
          <horizontal-line></horizontal-line>
          <div class="list_item_children" v-for="(cItem, cIndex) in item.children" :key="cIndex">
            <!-- 二级列表选择按钮 -->
            <img
              @click="childrenSelect(index, cIndex)"
              :src="
                cItem.childrenChecked
                  ? require('@/assets/images/selected_icon.png')
                  : require('@/assets/images/unselected_icon.png')
              "
              class="select_img"
            />
            <div class="item_div_children bcolor">
              <key-value-txt title="担保客户" :content="cItem.GUARANTORNAME"></key-value-txt>
              <key-value-txt title="担保金额" :content="cItem.GUARANTYSUM"></key-value-txt>
              <key-value-txt title="担保方式" :content="cItem.GUARANTYTYPENAME"></key-value-txt>
              <key-value-txt title="担保合同编号" :content="cItem.GCSERIALNO"></key-value-txt>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalLine from "@/components/HorizontalLine.vue";
import KeyValueTxt from "@/components/KeyValueTxt.vue";
import { ajaxPost, apiUrl } from "@/api.js";

export default {
  name: "TaskList",
  components: { KeyValueTxt, HorizontalLine },
  props: {
    taskList: Array
  },
  data() {
    return {
      list: this.taskList,
      category: localStorage.getItem("category"),

      GUARANTORNAME: [],
      SERIALNO: [],
      TASKTYPE: "",
      RELATIVESERIALNO: ""
    };
  },
  watch: {
    taskList(val, oldVal) {
      //普通的watch监听
      // console.log("数据变化：" + val.length);
      this.list = val;
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 点击展开担保人列表
    extendClose(index, item) {
      if (this.list[index].isExtend) {
        this.list[index].isExtend = false;
        this.list.forEach((element, i) => {
          if (i == index) {
            element.children = [];
          }
        });
      } else {
        this.list[index].isExtend = true;
        this.$toast.loading({
          duration: 0,
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        this.getListChild(index, item);
      }
      this.$forceUpdate();
    },
    // 一级列表左侧选中
    parentSelect(index) {
      if (this.list[index].parentChecked) {
        this.list[index].parentChecked = false;
        // 设置二级选中情况
        this.list[index].children.forEach(element => {
          element.childrenChecked = false;
          this.TASKTYPE = "";
          this.GUARANTORNAME = [];
          this.RELATIVESERIALNO = "";
          this.SERIALNO = [];
          this.$emit(
            "func",
            this.GUARANTORNAME,
            this.TASKTYPE,
            this.RELATIVESERIALNO,
            this.SERIALNO
          );
        });
      } else {
        for (let i = 0; i < this.list.length; i++) {
          if (index == i) {
            // 设置二级选中情况
            this.GUARANTORNAME = [];
            this.SERIALNO = [];
            if (this.list[index].children.length > 0) {
              this.list[index].parentChecked = true;
              this.list[index].children.forEach(element => {
                element.childrenChecked = true;
                this.TASKTYPE = element.TASKTYPE;
                this.RELATIVESERIALNO = element.RELATIVESERIALNO;
                this.$emit(
                  "func",
                  this.GUARANTORNAME,
                  this.TASKTYPE,
                  this.RELATIVESERIALNO,
                  this.SERIALNO
                );
              });
            } else {
              this.$dialog
                .alert({
                  message: "请在担保人列表中选择"
                })
                .then(() => {});
            }
          } else {
            this.list[i].parentChecked = false;
            this.list[i].children.forEach(element => {
              element.childrenChecked = false;
            });
          }
        }
      }

      this.$forceUpdate();
    },
    // 二级列表选中
    childrenSelect(pIndex, cIndex) {
      // this.GUARANTORNAME = [];
      //   this.SERIALNO = [];
      if (this.list[pIndex].children[cIndex].childrenChecked) {
        this.list[pIndex].children[cIndex].childrenChecked = false;
        this.list[pIndex].parentChecked = false;
      } else {
        for (let index = 0; index < this.list.length; index++) {
          if (pIndex == index) {
            this.list[index].children[cIndex].childrenChecked = true;
            // 传参
            this.TASKTYPE = this.list[index].children[cIndex].TASKTYPE;

            this.RELATIVESERIALNO = this.list[index].children[
              cIndex
            ].RELATIVESERIALNO;

            this.$emit(
              "func",
              this.GUARANTORNAME,
              this.TASKTYPE,
              this.RELATIVESERIALNO,
              this.SERIALNO
            );
            // 设置一级选中情况
            let selectNum = 0;
            this.list[pIndex].children.forEach(element => {
              if (element.childrenChecked) {
                selectNum++;
              }
            });
            if (selectNum === this.list[pIndex].children.length) {
              this.list[pIndex].parentChecked = true;
            } else {
              this.list[pIndex].parentChecked = false;
            }
          } else {
            this.list[index].parentChecked = false;
            this.list[index].children.forEach(element => {
              element.childrenChecked = false;
            });
          }
        }
      }

      this.$forceUpdate();
    },
    // 二级列表
    getListChild(index, item) {
      var data = {
        USERID: localStorage.getItem("userId"),
        LOGINID: localStorage.getItem("empNo"),
        TASKTYPE: item.TASKTYPE,
        RELATIVESERIALNO: item.RELATIVESERIALNO,
        STATUS: '1'
      };
      if (this.category == "zh") {
        var api = apiUrl.zhTaskList;
      } else {
        var api = apiUrl.lsTaskList;
      }
      ajaxPost(api, data)
        .then(res => {
          this.list.forEach((element, i) => {
            if (i == index) {
              element.children = res;
            }
          });
          this.$toast.clear();
        })
        .catch(error => {
          this.$toast.clear();
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.task_list {
  width: 100%;
}
/* 每条任务的样式 */
.content_div {
  /* margin-top: 170px; */
  width: 100%;
}
.list_content {
  width: calc(100% - 48px);
  margin: 24px 24px 0 24px;
  padding: 26px 24px;
  box-sizing: border-box;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}
.list_item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1px;
  width: 100%;
  position: relative;
}
.select_img {
  width: 14px;
  height: 14px;
  /* border-radius: 50%; */
  transform: scale(2);
}
.item_div {
  width: calc(100% - 32px);
  background: white;
  padding: 6px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.item_div_children {
  width: calc(100% - 24px - 32px);
  background: white;
  padding: 6px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  padding-bottom: 20px;
  margin-top: 24px;
}
.list_item_children {
  width: 100%;
  background: white;
  padding: 6px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
}
.list_name_span {
  padding: 0 24px;
  font-weight: bold;
}
.list_right_img {
  position: absolute;
  right: 0px;
  padding: 20px 0 20px 20px;
  width: 22px;
  top: 30%;
}
.list_btm {
  width: 100%;
}
.pl30 {
  padding-left: 30px;
}
.bcolor {
  background: #fff5f0;
}
.list_content_children {
  width: 100%;
  box-sizing: border-box;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 26px 0px 26px 48px;
}
</style>
