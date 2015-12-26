var http=require('http');
var url='http://localhost:2015/imooc/';
var cheerio=require('cheerio');
// npm install cheerio

function fliterChapter(html){
	var $=cheerio.load(html);
	var containers=$('.chapter');
	var courseData=[];
	containers.each(function(item){
		var container=$(this);
		var containerTitle=container.find('strong').text();
		var videos=container.find('.video').children('li');

		var containerData={
			containerTitle:containerTitle,
			videos:[]
		};

		videos.each(function(item){
			var video=$(this).find('.studyvideo');
			var videoTitle=$(this).text().split('\n')[1];
			var videoId=video.attr('href').split('video/')[1];

			containerData.videos.push({
				title:videoTitle,
				id:videoId
			})
		});

		courseData.push(containerData);

	});

	return courseData;
};

function printCourseInfo(courseData){

	courseData.forEach(function(item){
		var containerTitle=item.containerTitle;
		console.log(containerTitle + '\n');


		item.videos.forEach(function(video){
			console.log(' ['+video.id+']'+' '+video.title);
		});
	});
};

http.get(url,function(res){
	var html='';
	res.on('data',function(data){
		html+=data;
	});

	res.on('end',function(){
		courseData=fliterChapter(html);
		printCourseInfo(courseData);

	});
}).on('erro',function(){
		console.log('数据传输出错');
	});
