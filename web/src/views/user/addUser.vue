<template>
  <div class="app-container">
    <router-link to="/user/list"><el-button class="btn-return" icon="el-icon-back" type="text">返回</el-button></router-link>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本参数" name="first">
        <div class="tab-container">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-width="20%" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="ruleForm.userName" placeholder="用户名"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" type="password" placeholder="密码"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input v-model="ruleForm.password2" type="password" placeholder="确认密码"/>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="姓名"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" placeholder="邮箱"/>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model.number="ruleForm.mobile" placeholder="手机号码"/>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="ruleForm.sex" placeholder="状态">
                <el-option value="男" label="男"/>
                <el-option value="女" label="女"/>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="ruleForm.status" placeholder="状态">
                <el-option :value="1" label="在用"/>
                <el-option :value="0" label="停用"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
              <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { addUser } from '@/api/user'
import { validateFill, validateLength, validatePass2, validateEmail, validateNumber } from '@/utils/validate'

export default {
  data() {
    return {
      activeName: 'first',
      ruleForm: {
        userName: '',
        password: '',
        password2: '',
        name: '',
        email: '',
        mobile: '',
        sex: '男',
        status: 1
      },
      rules: {
        userName: [
          { validator: validateFill, trigger: 'blur', text: '用户名' }
        ],
        password: [
          { validator: validateLength, trigger: 'blur', text: '密码', length: 6 }
        ],
        password2: [
          { validator: validatePass2, trigger: 'blur', component: this }
        ],
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUser({ ...this.ruleForm }).then(() => {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
