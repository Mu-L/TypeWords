<script setup lang="ts"></script>

<template>
  <div class="w-full flex box-border cp color-white">
    <div class="option-wrap">
      <slot></slot>
    </div>
    <div class="relative group">
      <div
        class="w-10 rounded-r-lg h-full center bg-[var(--btn-primary)] hover:bg-gray border-solid border-1 border-l-gray/50 border-transparent box-border transition-all duration-300"
      >
        <IconFluentChevronDown20Regular />
      </div>
      <div
        class="space-y-2 btn-no-margin pt-2 absolute z-2 right-0 border rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 pointer-events-none group-hover:pointer-events-auto"
      >
        <slot name="options"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.option-wrap {
  width: 100%;
  display: flex;
  :deep(.base-button) {
    width: 100%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
