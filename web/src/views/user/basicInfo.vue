<template>
  <div class="tab-container">
    <el-form ref="basicInfo" :model="basicInfo" :rules="rules" status-icon label-width="20%" class="demo-basicInfo">
      <el-form-item label="用户名">
        <el-input v-model="basicInfo.userName" disabled placeholder="用户名"/>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="basicInfo.name" placeholder="姓名"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="basicInfo.email" placeholder="邮箱"/>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model.number="basicInfo.mobile" placeholder="手机号码"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="basicInfo.sex" placeholder="状态">
          <el-option value="男" label="男"/>
          <el-option value="女" label="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="basicInfo.status" placeholder="状态">
          <el-option :value="1" label="在用"/>
          <el-option :value="0" label="停用"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提 交</el-button>
        <el-button @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updataUserInfo } from '@/api/user'
import { validateFill, validateEmail, validateNumber } from '@/utils/validate'

export default {
  props: {
    basicInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeName: 'first',
      sourceInfo: {},
      rules: {
        name: [
          { validator: validateFill, trigger: 'blur', text: '姓名' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { validator: validateNumber, trigger: 'blur', text: '手机号' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs['basicInfo'].validate((valid) => {
        if (valid) {
          updataUserInfo({ ...this.basicInfo }).then(() => {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$emit('resetForm')
    }
  }
}
</script>
