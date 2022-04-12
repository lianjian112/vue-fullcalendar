#! /usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const colors = require('colors');
const fetch = require('node-fetch');
const { program } = require('commander');

const formatHttpsUrl = (url) => {
  return url.startsWith('https:') ? url : `https:${url}`;
};

const downloadFile = async (url) => {
  const res = await fetch(url);
  return res.text();
};

const writeFile = async (_path, file) => {
  const absolutePath = path.resolve(__dirname, _path);
  const { dir } = path.parse(absolutePath);
  await fs.mkdir(path.resolve(__dirname, dir), { recursive: true });
  return fs.writeFile(absolutePath, file, { flag: 'w+' });
};

(async () => {
  program.version('0.1.0', '-v, --version').requiredOption('-d, --download <url>', 'iconfont font class url.');
  program.parse(process.argv);

  if (program.download) {
    try {
      console.log(colors.yellow('下载 iconfont.css 文件...'));
      const url = formatHttpsUrl(program.download);
      const file = await downloadFile(url);
      await writeFile('../src/assets/styles/iconfont.css', file);
      console.log(colors.green('iconfont.css 文件更新成功！'));
    } catch (error) {
      console.warn(colors.red(error.message));
    }
  }
})();
