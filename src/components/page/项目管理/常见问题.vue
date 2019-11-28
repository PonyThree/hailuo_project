<template>
  <div>
    <div class="info">
      <div class="title">
        <span class="f1"></span>
        <div>
          <span>常见问题</span>
          <!-- <span>首页/ 活动管理 /项目图片</span> -->
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" @click="addProbrem">新增</el-button>
      </div>
      <el-table
        :data="problemTable"
        border
        :header-cell-style="{background:'#dcd3ef'}"
        header-row-class-name="tableHead"
      >
        <el-table-column prop="num" label="序号" align="center" width="100">
          <template scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="questionName" label="问题名称" align="center"></el-table-column>
        <el-table-column prop="answer" label="问题答案" align="center"></el-table-column>
        <el-table-column label="展示位置" align="center">
          <template slot-scope="scope">
            <div>
              <span>车位详情</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <a
              style="color: #409EFF;font-size: 14px;"
              @click="modifyProblem(problemTable[scope.$index])"
            >修改</a>
            <a
              style="margin-left: 20px;color: #409EFF;font-size: 14px;"
              @click="deleteProblem(problemTable[scope.$index])"
            >删除</a>
          </template>
        </el-table-column>
      </el-table>
      <!--新增-->
      <el-dialog title="新增" :visible.sync="revise" width="30%" :close-on-click-modal="false">
        <el-form
          ref="info"
          :model="info"
          label-width="110px"
          :label-position="labelPosition"
          :rules="rules"
        >
          <el-form-item label="常见问题:" prop="questionName">
            <el-input v-model="info.questionName"></el-input>
          </el-form-item>
          <el-form-item label="答案:" prop="answer">
            <el-input type="textarea" v-model="info.answer"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveInfo(info)">保存</el-button>
          <el-button @click="revise=false">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 修改 -->
      <el-dialog title="修改" :visible.sync="revise1" width="30%" :close-on-click-modal="false">
        <el-form
          ref="info1"
          :model="info1"
          label-width="110px"
          :label-position="labelPosition"
          :rules="rules"
        >
          <el-form-item label="常见问题:" prop="questionName">
            <el-input v-model="info1.questionName"></el-input>
          </el-form-item>
          <el-form-item label="答案:" prop="answer">
            <el-input type="textarea" v-model="info1.answer"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveInfo1(info1)">保存</el-button>
          <el-button @click="revise1=false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "commonProblem",
  data() {
    return {
      revise: false,
      revise1: false,
      problemTable: [],
      labelPosition: "right",
      info: {},
      info1: {},
      rules: {
        questionName: [
          { required: true, message: "请输入常见问题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" }
        ],
        answer: [{ required: true, message: "请输入答案", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 数据初始化
    getData() {
      let tokens = localStorage.getItem("tokens");
      this.$axios
        .get(request.testUrl + "/project/auth1/questionTab/getProList")
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.problemTable = res.data.data;
          }
        });
    },
    // 新增
    addProbrem() {
      var that = this;
      // this.$nextTick(()=>{
      //     console.log(that.$refs)
      //     that.$refs.info.resetFields();
      // })
      this.info = {};
      // this.$refs.info.resetFields();
      this.revise = true;
    },
    // 新增保存
    saveInfo() {
      this.$refs.info.validate(valite => {
        if (valite) {
          this.$axios
            .get(
              request.testUrl +
                "/project/auth1/questionTab/addData?answer=" +
                this.info.answer +
                "&questionName=" +
                this.info.questionName
            )
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "新增成功"
                });
                this.revise = false;
                this.getData();
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
            });
        }
      });
    },
    // 修改
    modifyProblem(item) {
      console.log(item);
      this.info1 = item;
      this.revise1 = true;
    },
    //修改保存
    saveInfo1(info1) {
      console.log(info1.id);
      this.$refs.info1.validate(valite => {
        console.log(valite);
        if (valite) {
          this.$axios
            .get(
              request.testUrl +
                "/project/auth1/questionTab/addData?answer=" +
                this.info1.answer +
                "&questionName=" +
                this.info1.questionName +
                "&id=" +
                info1.id
            )
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.revise1 = false;
                this.getData();
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
            });
        }
      });
    },
    // 删除
    deleteProblem(item) {
      console.log(item.id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(request.testUrl + "/project/auth1/questionTab/delData", {
              params: {
                id: item.id
              }
            })
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.getData();
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style>
.el-button--primary {
  color: white;
  background-color: #9768e5 !important;
  border-color: #9768e5;
}
.info {
  width: 98%;
  margin: 40px auto;
}
/* 头部标题 */
.info .title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #000000;
  font-size: 20px;
  text-indent: 10px;
  margin-bottom: 20px;
}
.info .title::after {
  display: block;
  content: "";
  clear: both;
}
.info .title .f1 {
  float: left;
  display: inline-block;
  width: 20px;
  height: 100%;
  background: #9768e5;
}
.info .title > div {
  height: 40px;
  display: flex;
  align-items: center;
}
.info .title > div span:nth-child(1) {
  font-size: 24px;
  color: #000000;
  font-weight: 500;
  margin-right: 10px;
}
.info .title > div span:nth-child(2) {
  font-size: 12px;
  color: #aaaaaa;
}
.btn button {
  float: right;
  margin-bottom: 30px;
}
.tableHead {
  font-size: 14px;
  letter-spacing: 1px;
}
</style>