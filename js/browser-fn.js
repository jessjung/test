
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var itemSelected = false;
var isGalleryOn = false;
var currentChapter = 1;
var focusedItem, selectedItem;
var originalContentHeight;
var activeHoverInterval;
var gallerySize;
var currentHeight;

var contentData=[
  {
  'id':'mindfulunits',
  'title':"Mindful Units",
  'videoUrl':"http://www.youtube.com/embed/TW0kAk22WPc?rel=0&controls=0&amp;showinfo=0",
  'desc':"Mindful Units is a visionary model of a connected home designed for a single occupant of a small living space, such as a Micro-Unit apartment. It aims to transform the many constraints of this lifestyle into a more positive and productive experience.",
  'galleryUrl':[
    'img/mu1.jpg','img/mu2.jpg','img/mu3.jpg','img/mu4.jpg']
  },
  {
  'id':'serendiffiti',
  'title':"Serendiffiti",
  'videoUrl':"http://www.youtube.com/embed/1kzUnsJk5hU?rel=0&controls=0&amp;showinfo=0",
  'desc':"This project is done as a final project for a course called Spatial Media at ITP, NYU in Spring 2013. The main purpose of this project is to create a virtual archive of memories for New Museum visitors. It is to juxtapose a virtual gallery on the rooftop of the New Museum, so that the project turns everyone into artists. //Collaborated with Ju Young Park",
  'galleryUrl':[
    'img/se1.jpg','img/se2.jpg','img/se3.jpg','img/se4.jpg','img/se5.jpg','img/se6.jpg','img/se7.jpg']
  },
  {
  'id':'chopsticking',
  'title':"Chopsticking",
  'videoUrl':"http://www.youtube.com/embed/08FRG01UREU?rel=0&controls=0&amp;showinfo=0",
  'desc':"Chopsticking is a two player board game designed to test and improve one's chopsticks skills. The purpose of the chopsticking score is to help players improve their chopsticking skills. This game was presented in the 2013 Word Maker Faire New York, won the Editor's Choice and featured in Gizmodo and Makezine.com //Collaborated with Christina Carter",
  'galleryUrl':[
    'img/ch1.jpg','img/ch2.jpg','img/ch3.jpg','img/ch4.jpg'],
  'code':'https://github.com/imagest108/chopstickingMF'
  },
  {
  'id':'gogetit',
  'title':'GoGetIt',
  'videoUrl':"http://www.youtube.com/embed/DSB2lzJUnWQ?rel=0&controls=0&amp;showinfo=0",
  'desc':"GoGetIt(GGIT) is a bluetooth-enabled motivation box to encourage a user to work out more. A GGIT iOS app tracks everyday activity by pulling down core motion data from the iPhone M7 processor. I was responsible for front-end app development (JAVASCRIPT, HTTML, CSS) and UX design for an Internet of Things system flow between an app and a physical box.",
  'galleryUrl':[
    'img/gg1.jpg','img/gg2.gif','img/gg3.jpg','img/gg4.jpg'],
  'code':'https://github.com/imagest108/ggit-1'
  },
  {
  'id':'yellowline',
  'title':'Yellow Line',
  'videoUrl':"http://www.youtube.com/embed/QHEWm2KrLrA?rel=0&controls=0&amp;showinfo=0",
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
  'videoUrl':"http://www.youtube.com/embed/ykeoTRhGd0s?rel=0&controls=0&amp;showinfo=0",
  'desc':"Make a wish is a live-web installation with spatial interaction that is designed for a party to celebrate 2014 New Years' eve. It is a curved wall to map a graphic projection which can be used through all events of the party. People can share New Year's resolutions using mobile phone and web app. It will be change as an music-sensitive wall for DJ performance and dance party.",
  'galleryUrl':[
      'img/mw1.jpg','img/mw2.jpg','img/mw3.jpg','img/mw4.jpg']
  },
  {
  'id':'grinch',
  'title':'Grinch Vs. Whos',
  'videoUrl':"http://www.youtube.com/embed/fDG6SN3uPBk?rel=0&controls=0&amp;showinfo=0",
  'desc':"This is a 3 minute long, url-formatted web game where maximum of 130 people can log on and play simultaneously using mobile phone. The first execution was held on the world's largest high-resolution video wall, with 120ft wide and 11ft high, for Big Screens show 2013, which is an interactive media show annually hosted by ITP, NYU. //Collaborated with Ju Young Park",
  'galleryUrl':[
    'img/gr1.jpg','img/gr2.jpg','img/gr3.jpg'],
  'code':'https://github.com/imagest108/grinchShow'
  },
  {
  'id':'phonebill',
  'title':'Phone Bill Board',
  'desc':"",
  'galleryUrl':[
    'img/pb1.jpg','img/pb2.jpg','img/pb3.jpg','img/pb4.jpg','img/pb5.jpg' ],
  'code':'http://jessjung.github.io/phonebill/'
  },
  {
  'id':'happycircuits',
  'title':'Happy Circuits',
  'videoUrl':"http://www.youtube.com/embed/sQY_sIqvoV0?rel=0&controls=0&amp;showinfo=0",
  'desc':"Happy Circuits is a bluetooth enabled iOS app and a wired prob for developing a relationship between the electronic and the user. It is a animated representation of how the electronic shares part of our life with us. It displays the devices hidden feelings: its status, needs, and hopes to be helpful and enlightening for its users.",
  'galleryUrl':[
    'img/hc1.jpg','img/hc2.jpg','img/hc3.jpg','img/hc4.jpg'],
  'code':'https://github.com/imagest108/ble_lcdbot'
  },
];

$(document).ready(function(){

  $(window).resize(function () {
    if (this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function () {
        $(this).trigger('resizeEnd');
    }, 500);
  });

  $(window).bind('resizeEnd', function () {
    // applyContentSize();
    // contentDisplayLocation();
    initTileHeight()
  });

  $(window).load(function() {
    determineBrowserType(width, height);
    // initDisplayLocation();
    initTileHeight();
  });

  $(".name-tag").bind({
    click: function(e) {
      location.reload();
    }
  });
  $( ".item-links a").bind({
    mouseenter: function(e) {
      var t = $(this).attr('id');
      $(".item-links a").each(function() {
        $(this).css("color","#cccccc");
      });
      $(this).css("color","#f36368");
      $(".item-profile").each(function() {
        if($(this).attr('id') == t) {
          $(this).addClass("hover");
          // console.log($(this).children());
          // $(this).children().animate({ opacity: "1" },1000);
        }else{
          $(this).removeClass("hover");
        }
      });
    },
    mouseleave: function(e) {
      $(this).css("color","#cccccc");
      var t = $(this).attr('id');
      $(".item-profile").each(function() {
        if($(this).attr('id') == t) {
          $(this).removeClass("hover");
          // $(this).children().animate({ opacity: "0" },300);
        }
      });
      e.preventDefault();
    },
    click: function(e) {
        selectedItem = $(this);
        displayProjectContents(selectedItem);
        e.preventDefault();
    }
  });
  $( ".item-profile").bind({
    mouseenter: function(e) {
      // console.log($(this).attr('id'));
      var t = $(this).attr('id');
      // $(this).children().animate({ opacity: "1" },1000);
      $(".item-links a").each(function() {
        // console.log($(this).attr('id'));
        if($(this).attr('id') == t) $(this).css("color","#f36368");
        else $(this).css("color","#cccccc");
      });
      e.preventDefault();
    },
    mouseleave: function(e) {
      // $(this).css("color","#cccccc");
      // $(this).children().animate({ opacity: "0" },300);
      e.preventDefault();
    },
    click: function(e) {
        // Do something on click
          selectedItem = $(this);
          displayProjectContents(selectedItem);
          e.preventDefault();
      }
  });
});
function displayProjectContents(obj){

  // clearContent();
  var t = obj.attr('id');
  // console.log(t);

  for(var i = 0; i < contentData.length; i++){
    var c = contentData[i];
    if (c.id === t) {
      for(var j = 0; j < c.galleryUrl.length; j++){
        $(".chapter-list").append(
          // $("<li id='"+j+"' class='chapter-wrapper'></li>").css("background",'url(./'+c.galleryUrl[j]+')')
        )
      }
      // console.log(c.galleryUrl[0]);
    }
  }


  $(".item-links a").each(function() {
    if ($(this).attr('id') == t){
      $(this).children().addClass('emphasized');
      $(".project-title").text($(this).text());
      checkChapterLocation("1");
    }else{
      $(this).children().removeClass('emphasized');
    }
  });

  $( ".chapter-links a" ).bind({
    click: function(e) {
      var t= parseInt($(this).attr('id'));
      var c = currentChapter;
      checkChapterLocation(t);
    }
  });

  $(".tile-wrapper").css("display", "none");
  $(".chapter-wrapper").css("display", "inline-block");
  $(".chapter-list").css("display", "block");
  $(".control-wrapper").css({
    "z-index": "100",
    "display": "block",
    "opacity": "1"
  });

  $(".control-wrapper").animate({ opacity: "0.3" },3000);

  $(".control-wrapper").bind({
    mouseenter: function(e) {
      $(this).css("opacity","1");
    },
    mouseleave: function(e) {
      $(this).animate({ opacity: "0.3" },1000);
    }

  })
}


function initTileHeight(){

  var w = $('.item-profile').css('width');
  $('.item-profile').css('height',w);

}

function checkChapterLocation(t){

  console.log(t);
  var offsetHeight= 0;
  for(var i = 1 ; i < t ; i++){
    $(".chapter-list li").each(function() {
      if(parseInt($(this).attr('id')) === i) {
        var s = $(this).css("height");
        var n = s.indexOf("px");
        s = s.substring(0,n);
        s = parseInt(s);
        offsetHeight = offsetHeight+s;
      }
    });
  }
  offsetHeight = offsetHeight.toString()+"px";
  $("html, body").animate({ scrollTop: offsetHeight });
  offsetHeight = 0;
  currentChapter = t;

}

function determineBrowserType(w,h){

  ///////////////////mobile check///////////////////////////
  if (w >= 1200) $('.item-control').css('display','block');
  else {
    $('.personal-info').css('padding','10px');
    $('.personal-info').css('position','relative');
    $('#description').removeClass('row-space-6');
  }
}


function clearContent(){
  $(".chapter-list").html('');

}
















/*


function determineBrowserType(w,h){

  ///////////////////mobile check///////////////////////////

}

function onChangeFocusedItem(item){
  var originalsrc = item.attr("src");
  var targetsrc = item.attr("targetsrc");
  item.attr('src', targetsrc).attr('targetsrc', originalsrc);
}

function displayTags(item){
  var tags, taggedOn, tagName;
  if(item.attr('cat')=="design"){
    tags = item.attr("design-tag");
    taggedOn = $("#design-taglist");
  }else{
    tags = item.attr("tech-tag");
    taggedOn = $("#tech-taglist");
    $('#tech-tag').text('TECH');
  }
  tagName = item.attr('cat')+"-tag";
  $.each(tags.split('|'), function(i, tag){
    taggedOn.append(
      $('<li>').append(
        $('<span>').attr('class',tagName).append(tag)
      )
    );
  });
}

function activeContents(item){

  $('.content-detail').css('display','block');
  var id = item.attr("id");

  for(var i = 0; i < contentData.length; i++){

    var c = contentData[i];
    if (c.id === id) {
      displayGallery(c);
      currentContent = c;
      if(c.code == null) {
        $('#nav-code').css('display','none');
        $('.icon-nav-bar').css('margin-bottom','47px');
      }
      if(c.videoUrl == null) {
        $('#nav-video').css('display','none');
        $('.icon-nav-bar').css('margin-bottom','47px');
      }
    }
  }
}

function selectedImage(content, imageId){

  var _url = 'url("' + content.galleryUrl[imageId] + '")';
  $('.content-detail').css('background-image',_url);

}

function openSampleCode(content){
  var url = content.code;
  window.open(url);
}

function initDisplayLocation(){
  $("html, body").animate({ scrollTop: "0px" });
}

function contentDisplayLocation(){
  var adjustmet = $(".bar-title").height()-20;
  // console.log(adjustmet);
  adjustmet += "px";
  $("html, body").animate({ scrollTop: adjustmet});
}

function applyMasks(item){
    $('.item-profile-image').not(item).each(function(){
        $(this).css("opacity","0.6");
    });
    $('.item-link-icon').not(item).each(function(){
        $(this).css("opacity","0.6");
    });
}

function calculateGalleryContentSize(){

  originalContentHeight = $('.content-detail').css('height');
  var originalContentWidth = $('.content-detail').css('width');
  var w = originalContentWidth.substring(0, originalContentWidth.indexOf("px"));
  var c_h = Math.ceil(parseInt(w) / 1.65);

  return c_h;
}

function calculateVideoContentSize(){

  var v_h = $('.content-wrapper').css('height');
  var h = v_h.substring(0, v_h.indexOf("px"));
  console.log("v_h: "+v_h);
  h = parseInt(h)+10;

  return h;
}

function applyContentSize(){
  if(isGalleryOn){
    var _height = calculateGalleryContentSize();
    var _offset = $('.content-wrapper').css('height');
    var _iconHeight = $('.arrow-right').css('height');
    console.log(_height+","+_offset+","+_iconHeight);

    _offset = _offset.substring(0, _offset.indexOf("px"));
    _iconHeight = _iconHeight.substring(0, _iconHeight.indexOf("px"));

    var iconMarginTop = _height-parseInt(_offset)-parseInt(_iconHeight);
    $(".arrow-right").css('margin-top',iconMarginTop+"px");
    $(".arrow-left").css('margin-top',iconMarginTop+"px");
  } else {
    var _height = calculateVideoContentSize();
    console.log("applyContentSize for Video contents");
    console.log(_height);
  }
  _height = _height+"px";
  $('.content-detail').css('height',_height);
}

function displayGallery(content){

  clearContent();

  $('.gallery-view').css('display','block');
  $(".arrow-right").css('display','block');
  $(".arrow-left").css('display','block');
  $('#project-desc').html('');
  $('#project-title').html('');
  $('.content-head').addClass('noborder');

  isGalleryOn = true;
  // applyContentSize();

  var _url = 'url("' + content.galleryUrl[displayCount] + '")';
  $('.content-detail').css('background-image',_url);

  var currentId = displayCount;

  ////////////// Display Dot Nav ////////////////
  gallerySize = content.galleryUrl.length;
  // console.log(gallerySize);
  for(var i = gallerySize-1; i >= 0; i--){
    $('.dotstyle ul').append(
      $('<li>').attr('listid',i).attr('id',"nav-pages").append($('<a>'))
    );
    $('.content-detail').append(
      $('<img>').attr('class','preload content-image').attr('src',content.galleryUrl[i]).attr('width','1').attr('height','1')
    );
  }
  $('.dotstyle ul li').each(function(){
      if($(this).attr('listid') == currentId) $(this).addClass('current');
  });
  $('.dotstyle ul li').click(function(){

      $('.dotstyle ul li').removeClass('current');

      currentId = $(this).attr('listid');
      $(this).addClass('current');
      selectedImage(content, currentId);
      // console.log("in li click<< current id is: "+currentId);
  });

  $(".arrow-right").bind({
    click: function(e){
      e.preventDefault();
      // console.log("in arrow-right click before<< current id is: "+currentId);
      if(currentId < gallerySize-1){
        currentId = parseInt(currentId)+1;
        // console.log("in arrow-right click after<< current id is: "+currentId);
        $('.dotstyle ul li').removeClass('current');
        $('.dotstyle ul li').each(function(){
          if($(this).attr('listid') == currentId) $(this).addClass('current');
          //console.log($(this).attr('listid'));
        });
        selectedImage(content, currentId);
      }
    },
    mouseenter: function(){
      $(this).addClass('fade-in-right');
    },
    mouseleave: function(){
      $(this).removeClass('fade-in-right');
    }
  });
  $(".arrow-left").bind({
    click: function(e){
      e.preventDefault();
      // console.log("in arrow-right click before<< current id is: "+currentId);
      if(currentId > 0){
        currentId = parseInt(currentId)-1;
        // console.log("in arrow-right click after<< current id is: "+currentId);
        $('.dotstyle ul li').removeClass('current');
        $('.dotstyle ul li').each(function(){
          if($(this).attr('listid') == currentId) $(this).addClass('current');
          //console.log($(this).attr('listid'));
        });
        selectedImage(content, currentId);
      }
    },
    mouseenter: function(){
      $(this).addClass('fade-in-left');
    },
    mouseleave: function(){
      $(this).removeClass('fade-in-left');
    }
  });

}

function displayVideo(content){

  clearContent();

  $('.video-view iframe').attr('src', content.videoUrl);
  $('.video-view').css('display','block');
  $('#text-area').css('display','block');

  displayDesc(content);
  applyContentSize();

}

function displayDesc(content){
  $('#project-title').text(content.title);
  $('#project-desc').text(content.desc);
}

function clearTags(){
  $("#design-taglist").html('<li><span id="design-tag" class="design-tag">DESIGN</span></li>');
  $("#tech-taglist").html('<li><span id="tech-tag" class="tech-tag">TECHNOLOGY</span></li>');
}

function clearContent(){

  isGalleryOn = false;
  $('.content-detail').css('height',originalContentHeight);
  $('.content-detail').css('background-image','');
  $('.video-view iframe').attr('src','');
  $('.content-image').remove();
  $('.video-view').css('display','none');
  $('.dotstyle ul').html("");
  $('#project-title').css('color','#171717');
  $('.content-head').removeClass('noborder');
  $('.arrow-left').css('display','none');
  $('.arrow-right').css('display','none');
  $('.gallery-view').css('display','none');
  $('#text-area').css('display','block');
}

function clear(){

  clearTags();
  currentId = 0;
  selectedItem = "";
  focusedItem = "";

  $('#nav-code').css('display','block');
  $('#nav-video').css('display','block');
  $('.icon-nav-bar').css('margin-bottom','0');
  $('.content-detail').css('display','none');

  $('.item-profile-image').each(function(){
      $(this).css("opacity","1");
  });

  $('.item-link-icon').each(function(){
      $(this).css("opacity","1");
  });
}
*/
