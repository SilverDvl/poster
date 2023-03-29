$(function () {
    $('body').on('click', '.shells__help', function () {
        $('.first-page').hide();
        $('.second-page').css('display', 'flex');
    });
    $('body').on('click', '.button-accept', function () {
        $('.second-page').hide();
        $('.third-page').css('display', 'flex');
    });
    $('body').on('click', '.button-yes', function () {
        let bg_book = rgb2hex($('.book').css('background-color'));
        let color_book = rgb2hex($('.book-label').css('color'));
        if (!checkVisibility($('.book__name').css('background-color'),$('.book-label').css('color'))) {
            $('body').css('background', '#C29789');
            $('.third-page').hide();
            $('.error').css('display', 'flex');
        } else {
            $('body').addClass('fireworks');
            $('.third-page').hide();
            $('.success').css('display', 'flex');
        }
    });
    $('body').on('click', '.button-no', function () {
        $('.third-page').hide();
        $('.second-page').css('display', 'flex');
    });
    $('body').on('click', '.play-again', function () {
        $('.error').hide();
        $('body').removeAttr("style");
        $('.second-page').css('display', 'flex');
    });
    $('body').on('click', '.finish', function () {
        $('.success').hide();
        $('body').removeClass("fireworks");
        $('.first-page').show();
    });
    $('body').on('input', '#book-color', function () {
        $('.book').css('background', $(this).val());
        $('.book').css('border-color', shadeColor($(this).val(), -30));
    });
    $('body').on('input', '#label-color', function () {
        $('.book-label').css('background', $(this).val())
    });
    $('body').on('input', '#text-color', function () {
        $('.book-label').css('color', $(this).val())
    });
    $('body').on('click', '#reset', function () {
        $('.book').removeAttr("style");
        $('.book-label').removeAttr("style");
    });
});

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

function getRGB(color) {
    color = parseInt(color.substring(1), 16);
    r = color >> 16;
    g = (color - (r<<16)) >> 8;
    b = color - (r<<16) - (g<<8);
    return [r, g, b];
}
function isSimilar([r1, g1, b1], [r2, g2, b2]) {
    return Math.abs(r1-r2)+Math.abs(g1-g2)+Math.abs(b1-b2) < 200;
}
function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
}
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.*\d+)?\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}



function getLuminance(color) {
    var rgb = color.slice(4, -1).split(',').map(Number);

    for (var i = 0; i < 3; i++) {
        var rgbI = rgb[i];

        rgbI /= 255;

        rgbI = rgbI < .03928 ? rgbI / 12.92 : Math.pow((rgbI + .055) / 1.055, 2.4);

        rgb[i] = rgbI;
    }

    return .2126 * rgb[0] + .7152 * rgb[1] + 0.0722 * rgb[2];
}

function getContrastRatio(l1, l2) {
    l1 += .05,
        l2 += .05;

    var ratio = l1 / l2;

    if (l2 > l1) {
        ratio = 1 / ratio;
    }

    return ratio = Math.round(ratio, 1);
}
// Функция для проверки видимости текста на фоне
function checkVisibility(background, color) {
    textLuminance = getLuminance(color);
    parentLuminance = getLuminance(background);

    cr = getContrastRatio(textLuminance, parentLuminance);

    return cr > 4;
}