var http=require('http')
var cheerio=require('cheerio')
var html=''
var src=[]
http.get('http://www.bilibili.com',function(res){
    res.on('data',function(data){
        html+=data
        console.log(html);
    })
    res.on('end',function(){
        $=cheerio.load(html)
        var re=/^.*\/video\/av\d+.*/
        $('[href]').each(function(){
            src.push(this.attribs.href)    
        })
        src=src.filter(function(x){
            return re.test(x)     
        })
        console.log(src)
    })
}).on('error',function(){
    console.log('Error')
})