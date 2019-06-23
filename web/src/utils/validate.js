export function validateFill(rule, value, callback) {
  if (value === '') {
    callback(new Error(`请输入${rule.text}`))
  } else {
    callback()
  }
}

export function validateLength(rule, value, callback) {
  if (value === '') {
    callback(new Error(`请输入${rule.text}`))
  } else if (value.length < rule.length) {
    callback(new Error(`${rule.text}长度不得小于${rule.length}位!`))
  } else {
    callback()
  }
}

export function validatePass2(rule, value, callback) {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== rule.component.ruleForm.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

export function validateEmail(rule, value, callback) {
  /* eslint-disable */
  var reg = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
  if (!value) {
    return callback(new Error('请输入邮箱'))
  } else if (!reg.test(value)) {
    return callback(new Error('邮箱格式填写不正确'))
  }
  callback()
}

export function validateNumber (rule, value, callback) {
  if (!value) {
    callback(new Error(`请输入${rule.text}`))
  } else if (/\D/.test(value)) {
    callback(new Error(`${rule.text}输入不正确`))
  } else {
    callback()
  }
}