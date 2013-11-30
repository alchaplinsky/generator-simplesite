"use strict";
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var SimpleGenerator = module.exports = function SimpleGenerator(args, options, config) {
		yeoman.generators.Base.apply(this, arguments);
		this.on('end', function () {
			this.installDependencies({
				skipInstall: options['skip-install']
			});
		});
		this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
	};
util.inherits(SimpleGenerator, yeoman.generators.Base);
SimpleGenerator.prototype.askFor = function askFor() {
	var cb = this.async();
	// have Yeoman greet the user.
	console.log(this.yeoman);
	console.log("This is a simple generator for fast creating static websites");
	var prompts = [{
		name: 'websiteName',
		message: 'What do you want to call your project?'
	},{
		name: 'blocks',
		message: 'What blocks you will use in your project? (separated by spaces) \n For example: search button common menu \n'
	}];
	this.prompt(prompts, function (props) {
		this.websiteName = props.websiteName;
		this.blocks = props.blocks.split(" ");
		cb();
	}.bind(this));
};
SimpleGenerator.prototype.app = function app() {
	this.mkdir('js');
	this.mkdir('css');
	this.mkdir('css/blocks')
	this.mkdir('img');
	for (var i in this.blocks) {
		this.write('css/blocks/_' + this.blocks[i] + '.css', '/* Block: ' + this.blocks[i]);
	}
	this.write('index.html', 'index.html');
	this.write('css/styles.css', 'css/styles.css');

	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
};
SimpleGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');
};