define({ "api": [
  {
    "type": "post",
    "url": "/user/add_user",
    "title": "添加用户",
    "name": "addUser",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>接口详细描述</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>用户名： 只允许英文大小写和数字和长度不小于3位</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码： 不得少于6位</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>姓名： 只允许汉字且长度2-6之间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮件地址： 只允许邮件地址格式</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>手机号： 只允许1开头的11位数字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sex",
            "description": "<p>性别： 只允许字符串 男/女</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态： 只允许0/1 禁用为0/启用为1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功-响应:",
          "content": "HTTP/1.1 200 OK\n{\n  code:0,\n  msg:'success'\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误-响应:",
          "content": "HTTP/1.1 200\n{\n  code:1013,\n  msg:'用户名格式不正确！'\n}\n{\n  code:1014,\n  msg:'密码格式不正确！'\n}\n{\n  code:1015,\n  msg:'姓名格式不正确！'\n}\n{\n  code:1016,\n  msg:'邮件地址格式不正确！'\n}\n{\n  code:1017,\n  msg:'手机号格式不正确！'\n}\n{\n  code:1018,\n  msg:'性别格式不正确！'\n}\n{\n  code:1019,\n  msg:'用户名已存在！'\n}\n{\n  code:1020,\n  msg:'状态格式不正确！'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "../controllers/user/addUser.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8585/api/user/add_user"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/all_user",
    "title": "获取用户列表",
    "name": "allUser",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>接口详细描述</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>页数量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功-响应:",
          "content": "HTTP/1.1 200 OK\n{\n  code:0,\n  msg:'success'\n }",
          "type": "json"
        }
      ]
    },
    "filename": "../controllers/user/allUser.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8585/api/user/all_user"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/captcha",
    "title": "获取验证码",
    "name": "captcha",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>接口详细描述</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success</p>"
          }
        ]
      }
    },
    "filename": "../controllers/user/captcha.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8585/api/user/captcha"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/delete_user",
    "title": "删除用户",
    "name": "deleteUser",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>接口详细描述</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功-响应:",
          "content": "HTTP/1.1 200 OK\n{\n  code:0,\n  msg:'success'\n }",
          "type": "json"
        }
      ]
    },
    "filename": "../controllers/user/deleteUser.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8585/api/user/delete_user"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/detail_info",
    "title": "获取用户详情信息",
    "name": "detailInfo",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>接口详细描述</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功-响应:",
          "content": "HTTP/1.1 200 OK\n{\n  code:0,\n  msg:'success',\n  data: data\n }",
          "type": "json"
        }
      ]
    },
    "filename": "../controllers/user/detailInfo.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8585/api/user/detail_info"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "登录",
    "name": "login",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>接口详细描述</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "captcha",
            "description": "<p>验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功-响应:",
          "content": "HTTP/1.1 200 OK\n{\n  code:0,\n  msg:'success',\n  data: token\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误-响应:",
          "content": "HTTP/1.1 200\n{\n   code:1006,\n   msg:'账号或密码错误！',\n }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "token"
      }
    ],
    "filename": "../controllers/user/login.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8585/api/user/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/update_info",
    "title": "修改用户信息",
    "name": "updateInfo",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>接口详细描述</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>姓名： 只允许汉字且长度2-6之间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮件地址： 只允许邮件地址格式</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>手机号： 只允许1开头的11位数字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sex",
            "description": "<p>性别： 只允许字符串 男/女</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态： 只允许0/1 禁用为0/启用为1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功-响应:",
          "content": "HTTP/1.1 200 OK\n{\n  code:0,\n  msg:'success'\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误-响应:",
          "content": "HTTP/1.1 200\n{\n  code:1015,\n  msg:'姓名格式不正确！'\n}\n{\n  code:1016,\n  msg:'邮件地址格式不正确！'\n}\n{\n  code:1017,\n  msg:'手机号格式不正确！'\n}\n{\n  code:1018,\n  msg:'性别格式不正确！'\n}\n{\n  code:1020,\n  msg:'状态格式不正确！'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "../controllers/user/updateInfo.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8585/api/user/update_info"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/update_password",
    "title": "修改密码",
    "name": "updatePassword",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>接口详细描述</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>新密码：密码长度不得少于6位</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功-响应:",
          "content": "HTTP/1.1 200 OK\n{\n  code:0,\n  msg:'success'\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误-响应:",
          "content": "HTTP/1.1 200\n{\n   code:1023,\n   msg:'旧密码错误，修改密码失败！',\n }",
          "type": "json"
        }
      ]
    },
    "filename": "../controllers/user/updatePassword.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8585/api/user/update_password"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/verify_token",
    "title": "验证token",
    "name": "verifyToken",
    "group": "user",
    "version": "1.0.0",
    "description": "<p>接口详细描述</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功-响应:",
          "content": "HTTP/1.1 200 OK\n{\n  code:0,\n  msg:'success'\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误-响应:",
          "content": "HTTP/1.1 200\n{\n   code:1011,\n   msg:'身份验证失败！',\n }",
          "type": "json"
        }
      ]
    },
    "filename": "../controllers/user/verifyToken.js",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8585/api/user/verify_token"
      }
    ]
  }
] });
