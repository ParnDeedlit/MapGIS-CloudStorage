<template >
    <svg v-if="iconId" class="icon" aria-hidden="true">
        <use :xlink:href="iconId"></use>
    </svg>
</template>

<script>
export default {
    name: 'icon',
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    computed: {
        'iconId'() {
            return this.id ? `#${this.id}` : '';
        }
    }
};
</script>
<style>
.icon {
  width: 5em;
  height: 5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>