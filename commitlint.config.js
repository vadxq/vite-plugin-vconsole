module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'upd', // update,更新某功能（不是 feat, 不是 fix
        'feat', // 新功能（feature）
        'fix', // 修补bug
        'chore', // 构建过程或辅助工具的变动,Other changes that don't modify src or test files
        'perf', // 优化了性能的代码改动
        'docs', // 文档
        'test', // 增加测试
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'revert', // 回撤
        'style', // 格式（不影响代码运行的变动）
        'release' // 正式,打包tag等发版
        // 如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中
      ]
    ]
  }
};
