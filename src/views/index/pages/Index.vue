<template>
  <div class="index">
    <model-gltf src="/asstes/3d/car/scene.gltf"></model-gltf>
  </div>
</template>

<script>
import { ModelGltf } from 'vue-3d-model'
export default {
  name: 'Index',
  components: {
    ModelGltf
  }
}
</script>

<style lang="scss" scoped></style>
