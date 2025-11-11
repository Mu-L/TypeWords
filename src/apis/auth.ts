import http from '@/utils/http.ts'
// 用户登录接口
export interface LoginParams {
  email?: string
  phone?: string
  password?: string
  code?: string
  type: 'email' | 'phone' | 'wechat'
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email?: string
    phone?: string
    nickname?: string
    avatar?: string
  }
}

// 用户注册接口
export interface RegisterParams {
  email?: string
  phone: string
  password: string
  code: string
  nickname?: string
}

export interface RegisterResponse {
  token: string
  user: {
    id: string
    email?: string
    phone: string
    nickname?: string
    avatar?: string
  }
}

// 发送验证码接口
export interface SendCodeParams {
  email?: string
  phone: string
  type: 'login' | 'register' | 'reset_password'
}

// 重置密码接口
export interface ResetPasswordParams {
  email?: string
  phone: string
  code: string
  newPassword: string
}

// 微信登录接口
export interface WechatLoginParams {
  code: string
  state?: string
}

// API 函数定义
export function login(params: LoginParams) {
  // 暂时直接返回成功响应，等待后端接入
  return Promise.resolve({
    success: true,
    code: 200,
    msg: '登录成功',
    data: {
      token: 'mock_token_' + Date.now(),
      user: {
        id: '1',
        email: params.email,
        phone: params.phone,
        nickname: '测试用户',
        avatar: ''
      }
    }
  })
  // return http<LoginResponse>('auth/login', params, null, 'post')
}

export function register(params: RegisterParams) {
  return http<RegisterResponse>('auth/register', params, null, 'post')
}

export function sendCode(params: SendCodeParams) {
  return Promise.resolve({
    success: true,
    code: 200,
    msg: '登录成功',
  })
  return http<boolean>('auth/sendCode', params, null, 'post')
}

export function resetPassword(params: ResetPasswordParams) {
  return http<boolean>('auth/resetPassword', params, null, 'post')
}

export function wechatLogin(params: WechatLoginParams) {
  return http<LoginResponse>('auth/wechatLogin', params, null, 'post')
}

export function logout() {
  return http<boolean>('auth/logout', null, null, 'post')
}

export function refreshToken() {
  return http<{ token: string }>('auth/refreshToken', null, null, 'post')
}

// 获取用户信息
export function getUserInfo() {
  return http<LoginResponse['user']>('auth/userInfo', null, null, 'get')
}
