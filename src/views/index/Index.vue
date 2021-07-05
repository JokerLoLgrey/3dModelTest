<template>
  <div class="indexPage">
    <div class="indexPageContent">
      <transition name="van-fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style lang="scss" scoped></style>
