<template>
  <VLayout row>
    <VFlex xs12 sm6 offset-sm3>
      <VCard>
        <VToolbar color="cyan" dark>
          <VToolbarSideIcon />
          <VToolbarTitle>Inbox</VToolbarTitle>
          <VSpacer />
          <VBtn icon>
            <VIcon>search</VIcon>
          </VBtn>
        </VToolbar>
        <VList two-line />
      </VCard>
    </VFlex>
  </VLayout>
</template>
<script>
export default {
  props: {
    items: {
      default: null,
      type: Object,
    },
  },
}
</script>
