<template>
  <div class="app-container">
    <router-link to="/user/list"><el-button class="btn-return" icon="el-icon-back" type="text">返回</el-button></router-link>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="授权角色" name="first">
        <div class="tab-container">
          <el-form label-width="20%" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="userName" disabled placeholder="用户名"/>
            </el-form-item>
            <el-form-item label="授权角色" prop="userName">
              <el-checkbox-group v-model="checkedRoles">
                <el-checkbox v-for="item in roles" :key="item.id" :label="item.name"/>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提 交</el-button>
              <el-button @click="resetForm">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getUserRoleById, setRoles } from '@/api/user'
import { getRoles } from '@/api/role'

export default {
  data() {
    return {
      activeName: 'first',
      userName: '',
      roles: [],
      checkedRoles: [],
      id: '',
      roleId: []
    }
  },
  created() {
    this.GetRoles()
  },
  methods: {
    submitForm() {
      const { id } = this.$route.query
      const role = this.checkedRoles.map(name => {
        const item = this.roles.filter(item => { return item.name === name })
        return item[0].id
      })
      setRoles({ id, role }).then(response => {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
      })
    },
    resetForm() {
      this.GetRoles()
    },
    GetRoles() {
      const { id, username } = this.$route.query
      this.userName = username
      getRoles({
        page: 1,
        pageSize: 10000
      }).then(response => {
        const { data } = response.data.data
        this.roles = data
      })
      getUserRoleById({ id }).then(response => {
        const { data } = response.data
        this.checkedRoles = data.map(item => {
          return item.name
        })
      })
    }
  }
}
</script>
