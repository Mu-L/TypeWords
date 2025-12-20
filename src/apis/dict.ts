import http from '@/utils/http.ts'
import { Dict } from '@/types/types.ts'

export function addDict(params?, data?) {
  return http<Dict>('dict/addDict', data, params, 'post')
}
