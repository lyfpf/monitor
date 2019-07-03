<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="userName" class="filter-item" placeholder="用户名"/>
      <el-input v-model="name" class="filter-item" placeholder="姓名"/>
      <router-link to="/user/addUser">
        <el-button class="filter-item" icon="el-icon-circle-plus-outline" type="primary">添加</el-button>
      </router-link>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width:100%">
      <el-table-column :index="indexMethod" label="ID" type="index" width="60"/>
      <el-table-column label="头像" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="头像" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户名"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="mobile" label="手机"/>
      <el-table-column label="状态" width="70">
        <template slot-scope="scope">
          <span class="update-status" @click="UpdateStatus(scope.row)">
            <i v-if="scope.row.status" class="el-icon-circle-check user-status enabled"/>
            <i v-else class="el-icon-circle-close user-status disabled"/>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="success"
            @click="setRoles(scope.row)">授权角色</el-button> -->
          <el-button
            size="mini"
            type="primary"
            @click="editUser(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="DeleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-container">
      <el-pagination
        :page-sizes="[10,7,5]"
        :page-size="1"
        :total="total"
        background
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getUserList, deleteUser, updataUserInfo } from '@/api/user'
import { debounce } from '@/utils/index'

export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      userName: '',
      name: '',
      tableData: []
    }
  },
  watch: {
    userName() {
      debounce(this.GetUserList, 500)
    },
    name() {
      debounce(this.GetUserList, 500)
    }
  },
  created() {
    this.GetUserList()
  },
  methods: {
    indexMethod(index) {
      return (index + this.page * this.pageSize) - this.pageSize + 1
    },
    handleSizeChange(pageSize) {
      this.page = 1
      this.pageSize = pageSize
      this.GetUserList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.GetUserList()
    },
    editUser({ id }) {
      this.$router.push({
        path: '/user/editUser',
        query: {
          id
        }
      })
    },
    GetUserList() {
      const data = {
        page: this.page,
        pageSize: this.pageSize,
        userName: this.userName,
        name: this.name
      }
      getUserList(data).then(response => {
        const { data, total } = response
        this.tableData = data
        this.total = total
      })
    },
    DeleteUser(index, { id }) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id }).then(() => {
          this.tableData.splice(index, 1)
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
        })
      })
    },
    UpdateStatus(row) {
      const data = { ...row }
      data.status = data.status ? 0 : 1
      updataUserInfo(data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
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
</style>
