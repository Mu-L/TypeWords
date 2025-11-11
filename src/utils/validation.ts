// 邮箱验证
import {EMAIL_CONFIG, PHONE_CONFIG} from "@/config/auth.ts";

export const validateEmail = (email: string): boolean => {
  return EMAIL_CONFIG.emailRegex.test(email)
}
// 手机号验证（中国大陆）
export const validatePhone = (phone: string): boolean => {
  return PHONE_CONFIG.phoneRegex.test(phone)
}
