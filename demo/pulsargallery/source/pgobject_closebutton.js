/**
 * Pulsar Gallery v0.1
 * site: Fx-future.ru
 * license: MIT License http://www.opensource.org/licenses/mit-license.php  
 */
var PGObject_CloseButton = function (callback) {

    // создаём кнопку "закрыть" 
    var closeButtonText = document.createElement('div');
    $(closeButtonText).hide();
    closeButtonText.appendChild(document.createTextNode('закрыть'));
    $(closeButtonText).click(callback); // закрытие галлереи

    var apdstatus = false; // статус добавления на сцену

    this.setPosition = function (imageLeft, imageWidth) {


        $(closeButtonText).css({
            'position': 'fixed',
            'z-index': '35',
            'color': '#efefef',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '18px',
            'font-weight': '100',
            'top': '20px',
            'width': '100px',
            'text-align': 'right',
            'display': 'block'
        });
        $(closeButtonText).css('cursor', 'pointer');

        var closeLeft = (imageLeft + imageWidth) - 110;
        $(closeButtonText).css('left', closeLeft + 'px');
        $(closeButtonText).show();

        // добавлено ли на сцену
        if (!apdstatus) $("body").append(closeButtonText);
        apdstatus = true;

    } // end fun

    this.hide = function () {

        $(closeButtonText).hide();

    } // end fun

} // end fun