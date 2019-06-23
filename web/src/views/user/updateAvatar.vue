<template>
  <div class="tab-container">
    <el-form label-width="20%" class="demo-ruleForm">
      <el-upload
        ref="upload"
        :data="data"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-change="handleChange"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
        class="avatar-uploader"
        action="/api/user/update_avatar">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"/>
      </el-upload>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提 交</el-button>
        <el-button @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageUrl: '',
      userName: '',
      data: {}
    }
  },
  created() {
    const { avatar, userName } = this.avatar
    this.data.userName = userName
    this.imageUrl = avatar
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code === 0) {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '错误',
          message: res.msg,
          type: 'error'
        })
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    submitForm() {
      this.$refs.upload.submit()
    },
    resetForm() {
    }
  }
}
</script>
