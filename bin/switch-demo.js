#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const commander = require('commander');

function readCurrentProjectPackageJSON() {
  var packageJsonPath = path.resolve(__dirname, '../package.json');
  var json = fs.readJsonSync(packageJsonPath);
  return json;
}

function getDemoName(currentPakageJson) {
  var demoName;
  var program = new commander.Command(currentPakageJson.name)
    .version(currentPakageJson.version)
    .arguments('<demo-name>')
    .usage(`${chalk.green('<demo-name>')}`)
    .action(name => {
      demoName = name;
    })
    .allowUnknownOption()
    .parse(process.argv);
  if (!demoName) {
    console.error('Please specify the demo name:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<demo-name>')}`
    );
    console.log();
    console.log('For example:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('demo-xxx')}`);
    console.log();
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }
  return demoName;
}
function readCwdPackageJSON() {
  var packageJsonPath = path.resolve(process.cwd(), 'package.json');
  var json = fs.readJsonSync(packageJsonPath);
  return json;
}
var packageJson = readCwdPackageJSON();
var currentPakageJson = readCurrentProjectPackageJSON();
var demoName = getDemoName(currentPakageJson);
var switchDemoConfig = currentPakageJson['switch-demo'];
var demoFolderName = (switchDemoConfig && switchDemoConfig.demoDir) || 'demo';
var config = packageJson['react-boilerplate-app-scripts'];
if (!config) {
  console.log(
    `  ${chalk.red('package.json未配置react-boilerplate-app-scripts字段！')}`
  );
  console.log();
  process.exit(1);
}
config.appSrcPath = `${demoFolderName}/${demoName}/src`;
config.appPublicPath = `${demoFolderName}/${demoName}/public`;
packageJson['react-boilerplate-app-scripts'] = config;
try {
  fs.writeFileSync(
    path.resolve(process.cwd(), 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  console.log(chalk.green('Switched successfully!'));
} catch (e) {
  console.log(e);
}
