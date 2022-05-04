module.exports = {
  /* type(scope?): subject  例子：feat(server): test */
  extends: ['@commitlint/config-conventional'], // 使用预设的配置 https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert']], // 改变预设中的提交类型
    'type-case': [2, 'always', 'lower-case'], // 提交类型必须使用小写
    'type-empty': [2, 'never'], // type不能为空
  },
};
