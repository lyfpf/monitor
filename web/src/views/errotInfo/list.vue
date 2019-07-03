<template>
  <div class="app-container monitor-index">
    <div class="filter-container">
      <el-input v-model="params.title" class="filter-item" placeholder="标题"/>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width:100%">
      <el-table-column :index="indexMethod" label="ID" type="index" width="60"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="url" label="捕获地址"/>
      <el-table-column label="捕获时间">
        <template slot-scope="scope">
          {{ formatDate(new Date(scope.row.time * 1000), 'yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="info" label="错误信息" />
      <el-table-column prop="email" label="通知邮箱" />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteErrorInfo(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-container">
      <el-pagination
        :page-sizes="[10,7,5]"
        :page-size="params.pageSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getErrorInfoList, deleteErrorInfo } from '@/api/errotInfo'
import { formatDate } from '@/utils/index'

export default {
  data() {
    return {
      total: 0,
      loading: false,
      tableData: [],
      formatDate,
      params: {
        page: 1,
        pageSize: 10,
        title: ''
      }
    }
  },
  watch: {
    'params.title'() {
      this.getErrorInfoList()
    }
  },
  mounted() {
    this.getErrorInfoList()
  },
  methods: {
    handleSizeChange(pageSize) {
      this.params.page = 1
      this.params.pageSize = pageSize
      this.getErrorInfoList()
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.getErrorInfoList()
    },
    indexMethod(index) {
      return (index + this.params.page * this.params.pageSize) - this.params.pageSize + 1
    },
    getErrorInfoList() {
      getErrorInfoList({ ...this.params }).then(res => {
        this.tableData = res.data
        this.total = res.total
      })
    },
    deleteErrorInfo(index, { id }) {
      this.$confirm('此操作将永久删除此条消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteErrorInfo({ id: [id] }).then(res => {
          this.tableData.splice(index, 1)
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
        })
      })
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss">
.monitor-index{
  .user-avatar{
    width: 40px;
  }
  .user-status{
    font-size: 20px;
  }
  .disabled{
    color: #f56c6c;
  }
  .enabled{
    color: #67c23a;
  }
  .filter-container{
    padding-bottom: 10px;
    .filter-item{
      display: inline-block;
      margin-bottom: 10px;
      vertical-align: middle;
    }
    .el-input--medium{
      font-size: 14px;
    }
    .el-input{
      width: 200px;
    }
  }
  .footer-container{
    padding: 50px 0;
  }
  .update-status{
    display: block;
    padding: 10px;
    cursor: pointer;
  }
}
</style>

