module.exports=function(grunt){
	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				options:{
					livereload:true
				}
			},
			js:{
				files:['public/js/**','models/**/*.js','schemas/**/*.js'],
				tasks:['jshint'],
				option:{
					livereload:true
				}
			}
		},

		nodemon:{
			dev:{
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md','node_modules/**','.DS_Store'],
					watchedExtensions:['js'],
					watchedFolders:['./'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000
					},
					cwd:__dirname
				}
			}
		},

		mochaTest:{
			options:{
				reporter:'spec'
			},
			src:['test/**/*.js']
		}

		concurrent:{
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')//文件修改时重新执行
	grunt.loadNpmTasks('grunt-nodemon')//时时监听app重启时修改
	grunt.loadNpmTasks('grunt-concurrent')//慢任务监听
	grunt.loadNpmTasks('grunt-mocha-test')/

	grunt.option('force',true)//配置错误是不中断任务
	grunt.registerTask('default',['concurrent'])//注册default
	grunt.registerTask('test',['mochaTest'])
}