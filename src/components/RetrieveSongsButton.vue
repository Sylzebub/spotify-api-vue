<template>
  <button @click="emitAPICall">Make API Call</button>
</template>

<script>
export default {
  methods: {
    emitAPICall() {
      this.$emit("call-api");
    },
  },
};
</script>
