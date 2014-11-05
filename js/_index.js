var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

var designColor = "#99cc00";
var techColor = "#1a4096";
var neutralColor = "#e9e9eb";

var displayCount = 0;
var originalContentHeight;
var currentId;
var currentContent;
var currentGallerySize;

var typingAnimation, initialAnimation, selectedItem;
var isfirstMoved, isDesignOn, isTechOn, itemSelected = false;

var contentData=[
  {
  'id':'mindfulunits',
  'title':"Mindful Units",
  'videoUrl':"http://player.vimeo.com/video/104657400?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1",
  'desc':"Mindful Units is a visionary model of a connected home designed for a single occupant of a small living space, such as a Micro-Unit apartment. It aims to transform the many constraints of this lifestyle into a more positive and productive experience.",
  'galleryUrl':[
    'img/mu1.jpg','img/mu2.jpg','img/mu3.jpg','img/mu4.jpg']
  },
  {
  'id':'serendiffiti',
  'title':"Serendiffiti",
  'videoUrl':"http://player.vimeo.com/video/66446293?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1",
  'desc':"This project is done as a final project for a course called Spatial Media at ITP, NYU in Spring 2013. The main purpose of this project is to create a virtual archive of memories for New Museum visitors. It is to juxtapose a virtual gallery on the rooftop of the New Museum, so that the project turns everyone into artists. //Collaborated with Ju Young Park",
  'galleryUrl':[
    'img/se1.jpg','img/se2.jpg','img/se3.jpg','img/se4.jpg','img/se5.jpg','img/se6.jpg','img/se7.jpg']
  },
  {
  'id':'chopsticking',
  'title':"Chopsticking",
  'videoUrl':"http://player.vimeo.com/video/55495229?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1",
  'desc':"Chopsticking is a two player board game designed to test and improve one's chopsticks skills. The purpose of the chopsticking score is to help players improve their chopsticking skills. This game was presented in the 2013 Word Maker Faire New York, won the Editor's Choice and featured in Gizmodo and Makezine.com //Collaborated with Christina Carter",
  'galleryUrl':[
    'img/ch1.jpg','img/ch2.jpg','img/ch3.jpg','img/ch4.jpg'],
  'code':'https://github.com/imagest108/chopstickingMF'
  },
  {
  'id':'gogetit',
  'title':'GoGetIt',
  'videoUrl':"http://player.vimeo.com/video/94441086?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1",
  'desc':"GoGetIt(GGIT) is a bluetooth-enabled motivation box to encourage a user to work out more. A GGIT iOS app tracks everyday activity by pulling down core motion data from the iPhone M7 processor. I was responsible for front-end app development (JAVASCRIPT, HTTML, CSS) and UX design for an Internet of Things system flow between an app and a physical box.",
  'galleryUrl':[
    'img/gg1.jpg','img/gg2.gif','img/gg3.jpg','img/gg4.jpg'],
  'code':'https://github.com/imagest108/ggit-1'
  },
  {
  'id':'yellowline',
  'title':'Yellow Line',
  'videoUrl':"http://www.youtube.com/embed/QHEWm2KrLrA?list=UUvmqa8yW_RasGPeELZPynyA;autoplay=1",
  'desc':'Yellow line is an entry piece for NYC Payphone Reinvention Design Challenge in Feb 2013. I collaborated with Suhyun Kim, Christina Carter, Max Ma and Harry Chen, and served as a project manager/ UX designer for this project.',
  'galleryUrl':[
    'img/yl1.jpg','img/yl2.jpg','img/yl3.jpg','img/yl4.jpg','img/yl5.jpg']
  },
  {
  'id':'weadvanceu',
  'title':'We Advance U',
  'desc':'We advance you, a non-profit organization, and ITP student group instructed by Despina Popodupoulos collaborated to make an online interactive education and information site that will allow local women from all over Haiti to connect, access services and learn about the things that will empower them to move forward. I served as a project manager and a visual designer for UI for this project.',
  'galleryUrl':[
      'img/wu1.jpg','img/wu2.jpg','img/wu3.jpg','img/wu4.jpg','img/wu5.jpg'],
    'code':'http://173.45.227.73/nap%20vanse/index.php'
  },
  {
  'id':'makeawish',
  'title':'Make A Wish',
  'videoUrl':"http://player.vimeo.com/video/61959644?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1",
  'desc':"Make a wish is a live-web installation with spatial interaction that is designed for a party to celebrate 2014 New Years' eve. It is a curved wall to map a graphic projection which can be used through all events of the party. People can share New Year's resolutions using mobile phone and web app. It will be change as an music-sensitive wall for DJ performance and dance party.",
  'galleryUrl':[
      'img/mw1.jpg','img/mw2.jpg','img/mw3.jpg','img/mw4.jpg']
  },
  {
  'id':'grinch',
  'title':'Grinch Vs. Whos',
  'videoUrl':"http://player.vimeo.com/video/84923982?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1",
  'desc':"This is a 3 minute long, url-formatted web game where maximum of 130 people can log on and play simultaneously using mobile phone. The first execution was held on the world's largest high-resolution video wall, with 120ft wide and 11ft high, for Big Screens show 2013, which is an interactive media show annually hosted by ITP, NYU. //Collaborated with Ju Young Park",
  'galleryUrl':[
    'img/gr1.jpg','img/gr2.jpg','img/gr3.jpg'],
  'code':'https://github.com/imagest108/grinchShow'
  },
];

$(document).ready(function(){

  init();
  initDisplayLocation();

});

function initDisplayLocation(){
  $("html, body").animate({ scrollTop: "0px" });
}

function contentDisplayLocation(){
  if(width <= 1024){
    $("html, body").animate({ scrollTop: "110px" });
  }else{
    $("html, body").animate({ scrollTop: "150px" });
  }
}

function applyMasks($this){
    $('img').not($this).each(function(){
        $(this).css("opacity","0.6");
    });
}

function changeBg(status){
  if(status === "design"){
    $(".design-sec").addClass("design-colorOn");
    $(".tech-sec").removeClass("tech-colorOn");
  }else if(status === "tech"){
    $(".tech-sec").addClass("tech-colorOn");
    $(".design-sec").removeClass("design-colorOn");
  }
}

function init(){
  $(".bar-title").css('display', 'block');

  $(".design-item").css("visibility","visible");
  $(".tech-item").css("visibility","visible");
}

function toggleImg($this){
  var originalsrc = $this.attr("src");
  var targetsrc = $this.attr("targetsrc");
  $this.attr('src', targetsrc);
  $this.attr('targetsrc', originalsrc);
}

function activeContents($this){

  $('.content-detail').css('display','block');
  var id = $this.attr("id");

  for(var i = 0; i < contentData.length; i++){

    var c = contentData[i];
    if (c.id === id) {
      displayGallery(c);
      currentContent = c;
      if(c.code == null) $('#nav-code').css('display','none');
      if(c.videoUrl == null) $('#nav-video').css('display','none');
    }
  }
}

function displayVideo(content){
  $('.arrow-left').css('display','none');
  $('.arrow-right').css('display','none');

  $('.video-view iframe').attr('src', content.videoUrl);
  $('.video-view').css('display','block');
  $('#text-area').css('display','block');

  displayDesc(content);

}

function displayDesc(content){
  $('#project-title').text(content.title);
  $('#project-desc').text(content.desc);
}
function displayGallery(content){

  $('.gallery-view').css('display','block');
  $('.arrow-left').css('display','block');
  $('.arrow-right').css('display','block');

  originalContentHeight = $('.content-detail').css('height');
  // console.log('originalContentHeight : '+originalContentHeight);
  var _height = Math.ceil(height*0.87);
  var _url = 'url("' + content.galleryUrl[displayCount] + '")';
  currentId = 0;

  /*Dot display----------------------------------------------*/
  var gallerySize = content.galleryUrl.length;
  currentGallerySize = gallerySize;
  for(var i = gallerySize-1; i >= 0; i--){
    $('.dotstyle ul').append(
      $('<li>').attr('listid',i).attr('id',"nav-pages").append($('<a>'))
    );
    $('.content-detail').append(
      $('<img>').attr('class','preload').attr('src',content.galleryUrl[i]).attr('width','1').attr('height','1')
    );
  }

  $('.dotstyle ul li').each(function(){
      if($(this).attr('listid') == displayCount) $(this).addClass('current');
  });

  $('.dotstyle ul li').click(function(){

      $('.dotstyle ul li').removeClass('current');

      currentId = $(this).attr('listid');
      $(this).addClass('current');
      selectedImage(content, currentId);
  })

  $('.content-detail').css('height',_height);
  $('.content-detail').css('background-image',_url);
  //console.log(_url);

  displayDesc(content);
  $('#project-desc').html('');
  $('#project-title').html('');
  // $('#project-title').css('color','#fff');
  $('.content-head').addClass('noborder');


}

function selectedImage(content, imageId){

  var _url = 'url("' + content.galleryUrl[imageId] + '")';
  $('.content-detail').css('background-image',_url);

}

function openSampleCode(content){
  var url = content.code;
  window.open(url);
}

function displayTag($this, status){

  var tags;
  var taggedOn;
  var tagName;
  if(status === "design"){
    tags = $this.attr("design-tag");
    taggedOn = $("#design-taglist");
  }else if(status === "tech"){
    tags = $this.attr("tech-tag");
    taggedOn = $("#tech-taglist");
    $('#tech-tag').text('TECH');
  }
  tagName = status+"-tag";

  $.each(tags.split('|'), function(i, tag){
    taggedOn.append(
      $('<li>').append(
        $('<span>').attr('class',tagName).append(tag)
      )
    );
  });
}

function reverseTag(status){

  var taggedOn;
  var counterpart;
  var tagName;
  var counterpartName;
  var counterpartStatus;

  if(status === "design"){
    taggedOn = $("#design-taglist");
    counterpart = $("#tech-taglist");
    tagName = "design-tag";
    counterpartName = "tech-tag";
    counterpartStatus = "technology";
  }else if(status === "tech"){
    status = "technology";
    taggedOn = $("#tech-taglist");
    counterpart = $("#design-taglist");
    tagName = "tech-tag";
    counterpartName = "design-tag";
    counterpartStatus = "design";
  }
  $('li').remove();

  taggedOn.append(
    $('<li>').append(
      $('<span>').attr('id',tagName).attr('class',tagName).append(status.toUpperCase())
    )
  );
  counterpart.append(
    $('<li>').append(
      $('<span>').attr('id',counterpartName).attr('class',counterpartName).append(counterpartStatus.toUpperCase())
    )
  );
}
function clearContent(){
  $('.content-detail').css('height',originalContentHeight);
  $('.content-detail').css('background-image','');
  $('.video-view iframe').attr('src','');
  $('.video-view').css('display','none');
  $('.dotstyle ul').html("");
  $('#project-title').css('color','#171717');
  $('.content-head').removeClass('noborder');
}

function clear(status){
  if(status === "design") $("#design-tag").text("");
  else if(status === "tech") $("#tech-tag").text("");
  reverseTag(status);

  $('#text-area').css('display','block');
  $('#nav-code').css('display','block');
  $('#nav-video').css('display','block');
  $('.content-detail').css('display','none');
  clearContent();

  $('img').each(function(){
      $(this).css("opacity","1");
  });

}
