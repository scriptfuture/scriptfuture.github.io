/**
 * Pulsar Gallery v0.1
 * site: Fx-future.ru
 * license: MIT License http://www.opensource.org/licenses/mit-license.php  
 */
var PGObject_TitleText = function () {

    // заголовк изображения
    var titleText = document.createElement('div');
    $(titleText).hide();
    
    var apdstatus=false;  // статус добавления на сцену
    
    this.setPosition = function (imageLeft, imageHeight, title) {
    
        // текст - заголовок изображения
        $(titleText).css({
                'position': 'fixed',
                'z-index': '30',
                'color': '#dddddd',
                'font-family': 'Arial, Geneva, Helvetica, sans-serif',
                'font-size': '16px',
                'font-weight': '100',
                'width': '400px',
                'text-align': 'left'
                
        });
            
        var titleTextLeft = imageHeight + 60;
        var iTextLeft =  imageLeft + 10;
        $(titleText).css('left', iTextLeft + 'px');
        $(titleText).css('top', titleTextLeft + 'px');
        $(titleText).html(title);
        $(titleText).show();
        
        // добавлено ли на сцену
        if(!apdstatus) $("body").append(titleText);
        apdstatus=true;
    
    } // end fun
    
    this.hide = function(){
    
        $(titleText).hide();
        
    } // end fun

} // end fun