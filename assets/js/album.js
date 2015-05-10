var base_url_500, base_url_1500;

var pswpElement = document.querySelectorAll('.pswp')[0];
var gallery_items = [];

var openGalleryAtIndex = function(galleryIndex) {
  var galleryOptions = {
    index: galleryIndex
  };
  var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, gallery_items, galleryOptions);
  gallery.init();
}

$.getJSON(config_json, function(data) {
  base_url_500 = data["base_urls"]["500"];
  base_url_1500 = data["base_urls"]["1500"];
});

$.getJSON(album_json, function(data) {
  var grid = $('.photo-grid');
  var galleryIndex = 0;

  $.each(data.photos, function() {
    var str = this["1500"];
    var dimensions = str.substring(str.lastIndexOf("_")+1, str.lastIndexOf(".")).split("x");
    gallery_items.push({
      src: base_url_1500 + this["1500"],
      w: parseInt(dimensions[0]),
      h: parseInt(dimensions[1])
    });

    grid.append("<img class=\"photogrid-element\" data-gallery-index=\"" + galleryIndex + "\" src=\"" + base_url_500 + this["500"] + "\">");
    galleryIndex++;
  });

  grid.photosetGrid({
    gutter: '5px',
    layout: '444444',
    rel: 'print-gallery',

    onInit: function(){},
    onComplete: function(){
        $('.photo-grid').attr('style', '');
    }
  });

  $('.photogrid-element').each(function() {
    $(this).click(function() {
      openGalleryAtIndex($(this).data("galleryIndex"));
    });
  });
});