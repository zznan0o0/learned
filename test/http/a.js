var http = require('http')
var url = 'http://www.bilibili.com'
var cheerio = require('cheerio')

function filterChapters(html){
	var $ = cheerio.load(html)
	var chapters = $('.container-row')

	var courseData = []
	chapters.each(function(item){
		var chapter =$(this)
		var chapterTitle = chapter.find('h2').text()
		var videos = chapter.find('.rm-list').children('li')
		var chapterData = {
			chapterTitle:chapterTitle,
			videos: []
		}
		videos.each(function(item){
			var video = $(this).find('.v')
			var videoTitle = video.find('.t').text()
			var id = video.attr('href').split('video/')[1]
			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		})
	courseData.push(chapterData)
	})
	return courseData
}

function printCourseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle
		console.log(chapterTitle + '\n')
		item.videos.forEach(function(video){
			console.log(' 【' + video.id + '】' + video.title +'\n')
		})
	})
}


http.get(url, function(res){
	var html =' '
	res.on('data',function (data) {
		html += data
		console.log(html);
	})
	res.on('end',function(){
		//注意我们前面在function 声明的courseData只是局部变量
		//这里不声明的话 printCourseInfo 会报错
		var courseData = filterChapters(html)
		printCourseInfo(courseData)
	})
}).on('error',function(){
	console.log('获取课程数据出错')
})