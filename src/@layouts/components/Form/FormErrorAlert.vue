<template>
  <VAlert color="error" variant="tonal" transition="scale-transition" class="col-12" closable>
    <span>{{ message }}</span>
  </VAlert>
</template>
<script>
  export default {
    name: 'FormAlert',
    props: ['message']
  }
</script>
