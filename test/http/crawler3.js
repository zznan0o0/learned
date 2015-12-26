var http = require('http');
var cheerio = require('cheerio');
var url = 'http://localhost:2015/imooc/';
 
function filterChapters(html) {
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var courseData = [];
    //console.log(chapters);
    chapters.each(function(item) {
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text();
        var videos = chapter.find('.video').children('li');
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        };
 
        videos.each(function(item) {
            var video = $(this).find('.studyvideo');
            var videoTitle = video.text().split('\n')[0];
            var id = video.attr('href').split('video/')[1];
 
            chapterData.videos.push({
                title: videoTitle,
                id: id
            });
        });
 
        courseData.push(chapterData);
        console.log(chapterData);
 
    });
 
    return courseData;
}
 
function printCourseInfo(courseData){
    courseData.forEach(function(item) {
        var chapterTitle = item.chapterTitle;
 
        console.log(chapterTitle + '\n');
 
        item.videos.forEach(function(video) {
            console.log('   [' + video.id + ']' + video.title + '\n');
        });
    });
}
 
http.get(url, function(res) {
    var html = '';
 
    res.on('data', function(data) {
        html += data;
    });
 
    res.on('end', function() {
        var courseData = filterChapters(html);
        //printCourseInfo(courseData);
        // console.log(courseData);
    });
}).on('error', function() {
    console.log('获取课程数据出错');
});