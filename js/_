var width, height, orientation, originalContentHeight;
var displayType;

var resizeTimer;
var resized = false;
$(window).resize(function() {
   clearTimeout(resizeTimer);
   resizeTimer = setTimeout(function() {
       if(!resized) {
           resized = true;
           $(document).mouseover(function() {
               resized = false;
               // do something here
               $(this).unbind("mouseover");
           })
       }
    }, 500);
});


$(document).ready(function(){

  /*cover: content thumbnail function------------------------------*/

 $("img").mouseover(function(){
    var status = $(this).attr('cat');
    if(!itemSelected){
      //changeBg(status);
      toggleImg($(this));
      displayTag($(this),status);
    }
  }, false)
  .mouseleave(function() {
    var status = $(this).attr('cat');
    if(!itemSelected){
      toggleImg($(this));
      reverseTag(status);
    }
  }, false)
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
});
