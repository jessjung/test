
function initDisplay(){

  if(displayType == "iPhone"){

  }else{
    $(".tagline").css("display","block");
    $(".name-title").html('JESS JUNG');
    $(".item-row").css("background","#fff");
  }
}

function initDisplayLocation(){
  $("html, body").animate({ scrollTop: "0px" });
}

function contentDisplayLocation(){
  if(displayType == "iPhone"){
    $("html, body").animate({ scrollTop: "0px" });
  }else if(width <= 1024){
    $("html, body").animate({ scrollTop: "110px" });
  }else if(width > 1024 && width <=1224){
    $("html, body").animate({ scrollTop: "110px" });
  }else if(width > 1224){
    $("html, body").animate({ scrollTop: "150px" });
  }
}

function applyMasks($this){
  $('img').not($this).each(function(){
      $(this).css("opacity","0.6");
  });
}

function toggleImg($this){
  var originalsrc = $this.attr("src");
  var targetsrc = $this.attr("targetsrc");
  $this.attr('src', targetsrc);
  $this.attr('targetsrc', originalsrc);
}

function displayTag($this, status){

  var tags,taggedOn,tagName;

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

  var taggedOn,counterpart,counterpartStatus;
  var tagName,counterpartName;

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

function initMobileFunction(){

  $( "img" ).bind( "tap", function(){

    if(!itemSelected){
      selectedItem = $(this);
      toggleImg($(this));
      activeContents(selectedItem);
      applyMasks(selectedItem);
      contentDisplayLocation();
    }
    itemSelected = true;
  });


  // function selectImages( event ){
  //   var status = $(this).attr('cat');
  //   if(!itemSelected){
  //     toggleImg($(this));
  //     displayTag($(this),status);
  //   }
  //     activeContents(selectedItem);
  //     applyMasks(selectedItem);
  //     contentDisplayLocation();
  // }

  // $('#text-area').css('display','none');
  // $('.name-title').css('display','none');
  // $('.main-content').css('top','20px');

}


function initBrowserFunction(){

  $("img").mouseover(function(){
    var status = $(this).attr('cat');
    if(!itemSelected){
      toggleImg($(this));
      displayTag($(this),status);
    }
  })
  .mouseleave(function() {
    var status = $(this).attr('cat');
    if(!itemSelected){
      toggleImg($(this));
      reverseTag(status);
    }
  })
  .click(function(){
    if(!itemSelected){
      selectedItem = $(this);
      activeContents(selectedItem);
      applyMasks(selectedItem);
      contentDisplayLocation();
    }
    itemSelected = true;
  });

  /*content: button icon function------------------------------*/

  $("#nav-video").click(function(){
    //display video contents

    clearContent();
    var id = selectedItem.attr("id");

    for(var i = 0; i < contentData.length; i++){
      var c = contentData[i];
      if (c.id === id) {
        displayVideo(c);
      }
    }
  })

  $("#nav-gallery").click(function(){
    //display gallery contents

    clearContent();
    var id = selectedItem.attr("id");

    for(var i = 0; i < contentData.length; i++){
      var c = contentData[i];
      if (c.id === id) {
        displayGallery(c);
      }
    }
  })

  $("#nav-exit").click(function(){
  //exit contents display
    var status = selectedItem.attr('cat');
    clear(status);

    initDisplayLocation();
    toggleImg(selectedItem);
    itemSelected = false;
  })

  $("#nav-code").click(function(){
  //exit contents display
    var id = selectedItem.attr("id");

    for(var i = 0; i < contentData.length; i++){
      var c = contentData[i];
      if (c.id === id) {
        openSampleCode(c);
      }
    }
  })

  $(".arrow-right").mouseover(function(){
    //console.log("go next");
    $(this).addClass('fade-in-right');
  }).mouseleave(function(){
    $(this).removeClass('fade-in-right');
  }).click(function(){
    if(currentId < currentGallerySize-1){
      currentId = currentId+1;
      selectedImage(currentContent, currentId);
      $('.dotstyle ul li').removeClass('current');
      // .addClass('current');
      $('.dotstyle ul li').each(function(){
        if($(this).attr('listid') == currentId) $(this).addClass('current');
        //console.log($(this).attr('listid'));
      });
      selectedImage(currentContent, currentId);
    }
  });

  $(".arrow-left").mouseover(function(){
    //console.log("go previous");
    $(this).addClass('fade-in-left');
  }).mouseleave(function(){
    $(this).removeClass('fade-in-left');
  }).click(function(){
    if(currentId > 0){
      currentId = currentId-1;
      selectedImage(currentContent, currentId);
      $('.dotstyle ul li').removeClass('current');
      // .addClass('current');
      $('.dotstyle ul li').each(function(){
        if($(this).attr('listid') == currentId) $(this).addClass('current');
        //console.log($(this).attr('listid'));
      });

      selectedImage(currentContent, currentId);
    }
  });
}

function activeContents($this){

  $('.content-detail').css('display','block');
  var id = $this.attr("id");

  for(var i = 0; i < contentData.length; i++){
    if(displayType == "browser"){
      var c = contentData[i];
      if (c.id === id) {
        displayGallery(c);
        currentContent = c;
        if(c.code == null) $('#nav-code').css('display','none');
        if(c.videoUrl == null) $('#nav-video').css('display','none');
      }
    }else{
      var c = contentData[i];
      if (c.id === id) {
        displayGallery(c);
        currentContent = c;

        $('#text-area').css('display','none');
        $('.name-title').css('display','none');
        $('.main-content').css('top','0px');

        $( "#nav-exit" ).bind( "tap", function(){
          var status = selectedItem.attr('cat');
          // console.log(status);
          clear(status);

          initDisplayLocation();
          toggleImg(selectedItem);
          itemSelected = false;
          // console.log("An nav-exit tapped.");
        });

        if(displayType == "iPhone") {
          $('.nav-icon').css('width','35px').css('height','35px');
          $('.arrow-left').css('display','none');
          $('.arrow-right').css('display','none');
        }

        $( ".content-detail" ).on({"swiperight": swipeRightHandler, "swipeleft": swipeLeftHandler});

        // Callback function references the event target and adds the 'swipe' class to it
        function swipeLeftHandler( event ){

          console.log("swipeLeftHandler");
          if(currentId < currentGallerySize-1){
            currentId = currentId+1;
            selectedImage(currentContent, currentId);
            $('.dotstyle ul li').removeClass('current');
            // .addClass('current');
            $('.dotstyle ul li').each(function(){
              if($(this).attr('listid') == currentId) $(this).addClass('current');
              //console.log($(this).attr('listid'));
            });
            selectedImage(currentContent, currentId);
          }
        }
        function swipeRightHandler( event ){

          console.log("swipeRightHandler");

          if(currentId > 0){
            currentId = currentId-1;
            selectedImage(currentContent, currentId);
            $('.dotstyle ul li').removeClass('current');
            // .addClass('current');
            $('.dotstyle ul li').each(function(){
              if($(this).attr('listid') == currentId) $(this).addClass('current');
              //console.log($(this).attr('listid'));
            });

            selectedImage(currentContent, currentId);
          }
        }
      }
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
  var _height = Math.ceil($('.content-detail').width()*0.65);
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

  displayDesc(content);
  $('#project-desc').html('');
  $('#project-title').html('');
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

  if(displayType == "browser"){
    if(status === "design") $("#design-tag").text("");
    else if(status === "tech") $("#tech-tag").text("");
    reverseTag(status);
  }else{
    // $('#text-area').css('display','none');
    $('.name-title').css('display','block');
    $('.main-content').css('top','20%');
  }

  $('#text-area').css('display','block');
  $('#nav-code').css('display','block');
  $('#nav-video').css('display','block');
  $('.content-detail').css('display','none');
  clearContent();

  $('img').each(function(){
      $(this).css("opacity","1");
  });

}
