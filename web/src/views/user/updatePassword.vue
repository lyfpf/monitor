<template>
  <div class="tab-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-width="20%" class="demo-ruleForm">
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="新密码长度不得少于6位"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="ruleForm.password2" type="password" placeholder="确认密码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提 交</el-button>
        <el-button @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePassword } from '@/api/user'
import { validateLength, validatePass2 } from '@/utils/validate'

export default {
  props: {
    id: {
      type: [Object],
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        password: '',
        password2: ''
      },
      rules: {
        password: [
          { validator: validateLength, trigger: 'blur', text: '密码', length: 6 }
        ],
        password2: [
          { validator: validatePass2, trigger: 'blur', component: this }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const { password } = this.ruleForm
          const { id } = this.id
          updatePassword({
            newPassword: password,
            id
          }).then(() => {
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
      this.$refs['ruleForm'].resetFields()
    }
  }
}
</script>
