<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!show"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <!-- 展示SPU列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改sku"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除sku"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          layout="prev,pager,next,jumper, ->, sizes,total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <spu-form
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></spu-form>
      <sku-form v-show="scene == 2"></sku-form>
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: {
    SkuForm,
    SpuForm,
  },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      show: true,
      page: 1,
      limit: 3,
      records: [], // spu列表的数据
      total: 0, // 分页器总条数
      scene: 0,
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    // 获取Spu列表数据的方法
    async getSpuList() {
      const { page, limit, category3Id } = this;
      // 携带三个参数：page第几页 limit 每一页需要展示多少条数据 三级分类的id
      let result = await this.$API.spu.reSpuList(page, limit, category3Id);
      // console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // 分页器的回调
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    // 当分页器的某一个展示数据发生变化的回调
    handleSizeChange(limit) {
      // 修改参数
      this.limit = limit;
      this.getSpuList();
    },
    // 添加SPU按钮的回调
    addSpu() {
      this.scene = 1;
    },
    // 修改某一个spu
    updateSpu(row) {
      this.scene = 1;
      // 获取子组件spuForm子组件的
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件回调
    changeScene(scene) {
      // 切换结构（场景）
      this.scene = scene;
    },
  },
};
</script>

<style>
</style>