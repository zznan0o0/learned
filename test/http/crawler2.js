var http=require('http');
var cheerio=require('cheerio');
var url='http://localhost:2015/blibli/';

function filterChapters(html){
	var $ =cheerio.load(html);

	var chapters = $('.container-row');

	var courseData=[];

	chapters.each(function(item){
		var chapter= $(this);
		var chapterTitle=chapter.find('h2');
		var videos=chapter.find('.rm-list').children('li');
		var chapterData={
			chapterTitle: chapterTitle,
			videos: []
		}

		videos.each(function(item){
			var video = $(this).find('.v');
			var videoTitle = video.find('.t').text().split('\n')[0];
			var id = video.attr('http').split('video/')[1];

			chapterData.videos.push({
				title: videoTitle,
				id: id
			})
		})

		courseData.push(chapterData);
	})

	return courseData;
}

function printCourseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle;

		console.log(chapterTitle + '\n');

		item.videos.forEach(function(video){
			console.log(' [' + video.id + '] ' + video.title + '\n');
			console.log(html);
		})
	})
}

http.get(url,function(res){
	var html='';

	res.on('data',function(data){
		html+=data;
	})

	res.on('end',function(){
		var courseData=filterChapters(html);

		printCourseInfo(courseData);
	})
}).on('erro',function(){
	console.log('erro');
})
