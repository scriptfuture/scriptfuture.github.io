/**
 * Pulsar Gallery v0.1
 * site: Fx-future.ru
 * license: MIT License http://www.opensource.org/licenses/mit-license.php  
 */
var PGObject_InformText = function () {

    // текст-аннотация слева, сверху
    var informText = document.createElement('div');
    $(informText).hide();
    informText.appendChild(document.createTextNode('загрузка...'));
    informText.title = "подсчёт изображений загруженных на страницу";

    var apdstatus = false; // статус добавления на сцену

    this.setPosition = function (imageLeft, imageWidth, imageSrc, realWidth, realHeight, nowCount, allCount) {

        var doc_w = $(window).width();

        // текст - кол-во изображений и ссылка
        $(informText).css({
            'position': 'fixed',
            'z-index': '30',
            'color': '#dddddd',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '14px',
            'font-weight': '100',
            'left': (doc_w / 2 - 50) + 'px',
            'top': '26px',
            'width': '400px',
            'text-align': 'left',
            'display': 'block'

        });

        var iTextLeft = imageLeft + 10;
        $(informText).css('left', iTextLeft + 'px');

        if (imageWidth < 480 && imageWidth > 360) $(informText).css('font-size', '11px');
        else if (imageWidth <= 360 && imageWidth > 330) $(informText).css('font-size', '10px');
        else if (imageWidth <= 330) $(informText).css('font-size', '9px');

        if(nowCount == 0 && allCount == 0) {

            $(informText).html(realWidth + '&times;' + realHeight + ' <a href="' + imageSrc + '" target="_blank" style="color:#dddddd;" title="откроется в новом окне">полный размер</a>');
        
        } else {
        
            $(informText).html('изображение ' + (nowCount + 1) + ' из ' + allCount +
            ' &nbsp;—&nbsp; ' + realWidth + '&times;' + realHeight + ' <a href="' + imageSrc + '" target="_blank" style="color:#dddddd;" title="откроется в новом окне">полный размер</a>');
        
        } // end if
            
            
        $(informText).show();

        // добавлено ли на сцену
        if (!apdstatus) $("body").append(informText);
        apdstatus = true;

    } // end fun

    this.hide = function () {

        $(informText).hide();

    } // end fun

    this.setInform = function (text) {
        $(informText).html(text);
    } // end fun

} // end fun