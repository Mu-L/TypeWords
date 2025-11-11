<script setup lang="ts">

</script>

<template>
  <div class="h-12 text-xs text-gray-400">
    <span>
      继续操作即表示你阅读并同意我们的
    <router-link to="/user-agreement" className="link">用户协议</router-link>
    与
    <router-link to="/privacy-policy" className="link">隐私政策</router-link>
    </span>
    <slot/>
  </div>
</template>
