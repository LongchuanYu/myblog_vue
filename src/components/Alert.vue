<template>
    <!--
        v-bind用于动态绑定属性
        这里可以动态的改变class属性
      -->
    <div class="alert" role="alert" v-bind:class="'alert-'+variant">
        {{message}}
    </div>
</template>
<script>
export default {
    props:['variant','message']
}
</script>