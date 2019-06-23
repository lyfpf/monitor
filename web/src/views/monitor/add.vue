<template>
  <div class="app-container">
    <router-link to="/monitor/list"><el-button class="btn-return" icon="el-icon-back" type="text">返回</el-button></router-link>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本参数" name="first">
        <div class="tab-container">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-width="20%" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleForm.title" placeholder="标题"/>
            </el-form-item>
            <el-form-item label="监控地址" prop="url">
              <el-input v-model="ruleForm.url" placeholder="监控地址"/>
            </el-form-item>
            <el-form-item label="接收邮箱" prop="email">
              <el-input v-model="ruleForm.email" placeholder="邮箱"/>
            </el-form-item>
            <el-form-item label="接收邮箱" prop="email">
              <el-input
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="ruleForm.comment"
                type="textarea"
                placeholder="请输入内容"/>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="ruleForm.status" placeholder="状态">
                <el-option :value="1" label="监控中"/>
                <el-option :value="0" label="已下线"/>
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
import { addMonitor } from '@/api/monitor'
import { validateFill, validateEmail } from '@/utils/validate'

export default {
  data() {
    return {
      activeName: 'first',
      ruleForm: {
        title: '',
        url: '',
        email: '',
        comment: '',
        status: 1
      },
      rules: {
        title: [
          { validator: validateFill, trigger: 'blur', text: '标题' }
        ],
        url: [
          { validator: validateFill, trigger: 'blur', text: '监控地址' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur', text: '接口邮箱' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMonitor({ ...this.ruleForm }).then(() => {
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
