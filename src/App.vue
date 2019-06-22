<template>
  <div id="container">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  #container {
    overflow: hidden;
    min-width: 1200px;
  }

  .ql-editor {
    min-height: 200px;
  }

  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
    height: inherit;
    line-height: inherit;
    border-bottom: 3px solid #fff !important;
    color: #515a6e;
  }


  .ivu-menu-horizontal.ivu-menu-light:after {
    background: white;
  }

  .ql-picker.ql-header .ql-picker-label::before,
  .ql-picker.ql-header .ql-picker-item::before {
    content: '普通' !important;
  }

  .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题 1' !important;
  }

  .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题 2' !important;
  }

  .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题 3' !important;
  }

  .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题 4' !important;
  }

  .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题 5' !important;
  }

  .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题 6' !important;
  }

  .ql-picker.ql-size .ql-picker-label::before,
  .ql-picker.ql-size .ql-picker-item::before {
    content: '中等' !important;
  }

  .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '小' !important;
  }

  .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '大' !important;
  }

  .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '巨大' !important;
  }
</style>
