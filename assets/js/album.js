var config_json = json_store + "config.json";
var album_json = json_store + "albums/" + album_json_file;

var base_url_thumb, base_url_large;

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
  base_url_thumb = data["base_urls"]["thumb"];
  base_url_large = data["base_urls"]["full"];
  
  form_album();
});

var form_album = function() {
  $.getJSON(album_json, function(data) {
    var album_dir = data.album_dir;
    var grid = $('.photo-grid');
    var galleryIndex = 0;

    $.each(data.photos, function() {
      var str = this["full"];
      var dimensions = str.substring(str.lastIndexOf("_")+1, str.lastIndexOf(".")).split("x");
      gallery_items.push({
        src: base_url_large + album_dir + this["full"],
        w: parseInt(dimensions[0]),
        h: parseInt(dimensions[1])
      });

      grid.append("<img class=\"photogrid-element\" data-gallery-index=\"" + galleryIndex + "\" src=\"" + base_url_thumb + album_dir + this["thumb"] + "\">");
      galleryIndex++;
    });

    grid.photosetGrid({
      gutter: '5px',
      layout: gallery_layout,
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
}