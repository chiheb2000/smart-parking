$(document).ready(function() {

    /*// $('.accordion').on('load', function(){

    	var accordion = $('.accordion .btn').addClass('inActive');
    	// var accordion = $('.btn').data('toggle');
    	// accordion.
    	if($('.accordion .btn').hasClass('collapsed')){
    		$('.btn').removeClass('inActive');
    	} else {
    		$('.btn').addClass('active');
    	}

    // });*/

    /*$('.collapse').collapse()

    // var accordion = $('.accordion .btn').addClass('inActive');

    $('.accordion .btn').on('click', function(){

    	// var accordion = $('.btn').data('toggle');
    	// accordion.
    	if($(this).hasClass('collapsed')){
    		$(this).removeClass('active');
    	} else {
    		$(this).addClass('active');
    	}

    });*/

    /*$('.collapse.show').collapse('show')

	$('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active-acc');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active-acc');
    });*/

});

$(document).ready(function() {

    $('.collapse').on('shown.bs.collapse', function() {
        $(this).parent().find('.btn').addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function() {
        $(this).parent().find('.btn').removeClass('active');
    });

    /*if($('.accordion-data').hasClass('active')) {
    	$('.accordion-btn').addClass('new_class');
    }*/

});

//plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/
$('.btn-number').click(function(e) {
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {
            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }
        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }
        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function() {
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
});
$(".input-number").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
// // ZOOM 1
// $('.zoom-1').elevateZoom({
//     zoomType: "inner",
//     cursor: "crosshair",
//     zoomWindowFadeIn: 500,
//     zoomWindowFadeOut: 750
// });
// // ZOOM 2
// $('.zoom-2').elevateZoom({
//     zoomType: "inner",
//     cursor: "crosshair",
//     zoomWindowFadeIn: 500,
//     zoomWindowFadeOut: 750
// });
// PRODUCT IMAGE
// function proelevateZoom(){
//     jQuery(".product-image img").elevateZoom({
//         zoomType: "inner",
//         cursor: "crosshair",
//         zoomWindowFadeIn: 500,
//         zoomWindowFadeOut: 750
//     });
// }
// proelevateZoom();
// $('.image-additional img').on(
//     'click',
//     (event) => {      
//         $('.product-image img').attr('src',$(event.target).data('image'));      
//         $('.selected').removeClass('selected');
//         $(event.target).addClass('selected');
//         $('.product-image img').data('zoom-image', $(event.currentTarget).data('zoom-image'));
//         $('.product-image img').prop('src', $(event.currentTarget).data('image'));
//         proelevateZoom();
//     }
// );
// MAP
/*
    Map Settings

    Find the Latitude and Longitude of your address:
        - http://universimmedia.pagesperso-orange.fr/geo/loc.htm
        - http://www.findlatitudeandlongitude.com/find-address-from-latitude-and-longitude/
*/
// Map Markers