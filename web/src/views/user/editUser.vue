<template>
  <div class="app-container">
    <router-link to="/user/list"><el-button class="btn-return" icon="el-icon-back" type="text">返回</el-button></router-link>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本参数" name="first">
        <v-basic-info :basic-info="info" @resetForm="getInfo"/>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="password">
        <v-update-password :id="info"/>
      </el-tab-pane>
      <el-tab-pane v-if="info.id" label="修改头像" name="avatar">
        <v-update-avatar :avatar="info"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import vUpdatePassword from './updatePassword'
import vUpdateAvatar from './updateAvatar'
import vBasicInfo from './basicInfo'

import { userDetailInfo } from '@/api/user'

export default {
  components: {
    vUpdatePassword,
    vUpdateAvatar,
    vBasicInfo
  },
  data() {
    return {
      activeName: 'first',
      info: {}
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      const { id } = this.$route.query
      userDetailInfo({ id }).then(response => {
        this.info = response.data
      })
    }
  }
}
</script>
