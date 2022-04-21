<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    background: var(--color-background);
    color: var(--color-text);
  }

  a {
    color: var(--color-text);
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  .clear-fix::after {
    clear: both;
    content: '';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .clear-fix {
    zoom: 1;
  }
</style>
