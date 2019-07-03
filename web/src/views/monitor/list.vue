<template>
  <div class="app-container monitor-index">
    <div class="filter-container">
      <el-input v-model="params.title" class="filter-item" placeholder="标题"/>
      <router-link to="/monitor/add">
        <el-button class="filter-item" icon="el-icon-circle-plus-outline" type="primary">添加</el-button>
      </router-link>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width:100%">
      <el-table-column :index="indexMethod" label="ID" type="index" width="60"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="url" label="监控地址"/>
      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          {{ status[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="通知邮箱" />
      <el-table-column prop="comment" label="描述"/>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ formatDate(new Date(scope.row.createTime * 1000), 'yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          {{ formatDate(new Date(scope.row.createTime * 1000), 'yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="edit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="DeleteMonitor(scope.$index, scope.row)">删除</el-button>
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
import { getMonitorList, deleteMonitor } from '@/api/monitor'
import { formatDate } from '@/utils/index'

const status = {
  '0': '已下线',
  '1': '监控中',
  '2': '已停止'
}

export default {
  data() {
    return {
      total: 0,
      loading: false,
      tableData: [],
      status,
      params: {
        title: '',
        page: 1,
        pageSize: 10
      },
      formatDate
    }
  },
  watch: {
    'params.title'() {
      this.GetMonitorList()
    }
  },
  mounted() {
    this.GetMonitorList()
  },
  methods: {
    handleSizeChange(pageSize) {
      this.params.page = 1
      this.params.pageSize = pageSize
      this.GetMonitorList()
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.GetMonitorList()
    },
    indexMethod(index) {
      return (index + this.params.page * this.params.pageSize) - this.params.pageSize + 1
    },
    edit({ id }) {
      this.$router.push({
        path: '/monitor/edit',
        query: {
          id
        }
      })
    },
    GetMonitorList() {
      getMonitorList({ ...this.params }).then(res => {
        this.tableData = res.data
        this.total = res.total
      })
    },
    DeleteMonitor(index, { id }) {
      this.$confirm('此操作将永久删除此条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMonitor({ id: [id] }).then(res => {
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

