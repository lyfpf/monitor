import { login, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    // 登录
    async Login({ commit }, { username, password, captcha }) {
      const { data } = await login(username.trim(), password, captcha)
      setToken(data.token)
      commit('SET_TOKEN', data.token)
    },

    // 获取用户信息
    getUserInfo({ commit }) {
      getUserInfo().then(({ data }) => {
        commit('SET_NAME', data.userName)
        commit('SET_AVATAR', data.avatar)
      }).catch(() => {
        removeToken()
      })
    },

    // 登出
    LogOut({ commit }) {
      commit('SET_TOKEN', '')
      removeToken()
    }
  }
}

export default user
