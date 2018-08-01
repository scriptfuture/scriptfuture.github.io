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

var PGObject_Image = function (callback) {


    var bg = document.createElement('div'); // фоновое затемнение
    $(bg).click(callback); // закрытие галлереи

    var content = document.createElement('div'); // центральный слой   
    var imageObj = new Image();

    var heightDF = 110; // высота слоёв диафильма
    var topImage = 50 // расстояние сверху от картинки
    var convas_ptxt = 30; // дополнительный отступ от картинки до диафильма

    var realWidth, realHeight;
    var nowCountThis, allCountThis, titleThis, infoTypeThis;

    var apdstatus = false; // статус добавления на сцену 

    this.resize = function (closeButton, informText, titleText, imageSrc) {

        //------------------------------------
        // Расчёты отступов

        var doc_w = $(window).width();
        var doc_h = $(window).height();

        var lBW = Math.round(doc_w / 18); // ширина кнопок назад/вперёд     

        // расчёт полотна
        if (!(nowCountThis == 0 && allCountThis == 0) && !infoTypeThis) {
            /* если блок выключен, и изображений несколько  */

            canvas_w = doc_w - lBW * 2;
            canvas_h = doc_h - topImage - convas_ptxt;

            // настраиваем изображение
            $(imageObj).attr("title", "Запуск слайд-шоу");
            $(imageObj).css("cursor", "pointer");

        } else if ((nowCountThis == 0 && allCountThis == 0) && !infoTypeThis) {
            /* если изображение одно */

            canvas_w = doc_w - Math.round(lBW / 4);
            canvas_h = doc_h - topImage - convas_ptxt;

            // настраиваем изображение
            $(imageObj).attr("title", titleThis);
            $(imageObj).css("cursor", "default");

        } else {
            /* если блок включён, и изображений несколько */

            var convas_padding = Math.round(lBW / 4) + convas_ptxt;

            // настраиваем изображение
            $(imageObj).attr("title", "Запуск слайд-шоу");
            $(imageObj).css("cursor", "pointer");

            // уменьшаем полотно, до области просмотра
            canvas_w = doc_w - lBW * 2 - convas_padding * 2;
            canvas_h = doc_h - heightDF - topImage - convas_padding;
        } // end if

        ratio_convas = canvas_w / canvas_h; // соотношение сторон конвы 
        //------------------------------------

        var res_w, res_h;

        if (realWidth < canvas_w && realHeight < canvas_h) {
            res_w = realWidth;
            res_h = realHeight;
        } else {

            var ratio = realWidth / realHeight;

            if (ratio <= ratio_convas) {

                res_w = canvas_h * ratio;
                res_h = canvas_h;

            } else {

                res_w = canvas_w;
                res_h = canvas_w / ratio;

            }

        } // end if

        // центруем слой
        var imageLeft = doc_w / 2 - res_w / 2;

        var imageWidth = Math.round(res_w);
        var imageHeight = Math.round(res_h);

        $(imageObj).width(imageWidth);
        $(imageObj).height(imageHeight);

        // позиция слоя контейнера
        $(content).width(imageWidth);
        $(content).height(imageHeight);
        $(content).css('left', imageLeft);

        // устанавливаем зависимые от изображения объекты
        closeButton.setPosition(imageLeft, imageWidth);
        informText.setPosition(imageLeft, imageWidth, imageSrc, realWidth, realHeight, nowCountThis, allCountThis);
        titleText.setPosition(imageLeft, imageHeight, titleThis);

    } // end fun 

    this.setPosition = function (imageSrc, nowCount, allCount, closeButton, informText, titleText, title, infoType) {

        // сохраняем параметры внутри объекта
        nowCountThis = nowCount;
        allCountThis = allCount;
        titleThis = title;
        infoTypeThis = infoType;

        // настройка фонового затемнения
        $(bg).css({
            'position': 'fixed',
            'top': '0px',
            'left': '0px',
            'margin': '0px',
            'padding': '0px',
            'width': '100%',
            'height': '100%',
            'background': 'black',
            'opacity': '0.5',
            'z-index': '1'
        });
        $(bg).show();

        // настройка слоя с изображением
        $(content).css({
            'position': 'fixed',
            'left': '0px',
            'top': '50px',
            'margom': '0px',
            'padding': '0px',
            'text-align': 'center',
            'z-index': '10',
            'color': 'white'
        });

        // добавляем изоражение в слой контента    
        $(content).show();

        // загружаем изображение
        $(imageObj).hide();
        imageObj.src = imageSrc;

        // ждем загрузки картинки браузером
        $(imageObj).load(function () {

            // удаляем атрибуты width и height
            $(this).removeAttr("width")
                .removeAttr("height")
                .css({
                    width: "",
                    height: ""
                });

            // получаем заветные цифры
            realWidth = $(this).width();
            realHeight = $(this).height();

            //------------------------------------
            // Расчёты отступов

            var doc_w = $(window).width();
            var doc_h = $(window).height();

            var lBW = Math.round(doc_w / 18); // ширина кнопок назад/вперёд

            // расчёт полотна
            if (!(nowCountThis == 0 && allCountThis == 0) && !infoTypeThis) {
                /* если блок выключен, и изображений несколько  */

                canvas_w = doc_w - lBW * 2;
                canvas_h = doc_h - topImage - convas_ptxt;

                // настраиваем изображение
                $(imageObj).attr("title", "Запуск слайд-шоу");
                $(imageObj).css("cursor", "pointer");

            } else if ((nowCountThis == 0 && allCountThis == 0) && !infoTypeThis) {
                /* если изображение одно */

                canvas_w = doc_w - Math.round(lBW / 4);
                canvas_h = doc_h - topImage - convas_ptxt;

                // настраиваем изображение
                $(imageObj).attr("title", title);
                $(imageObj).css("cursor", "default");

            } else {
                /* если блок включён, и изображений несколько */

                var convas_padding = Math.round(lBW / 4) + convas_ptxt;

                // настраиваем изображение
                $(imageObj).attr("title", "Запуск слайд-шоу");
                $(imageObj).css("cursor", "pointer");

                // уменьшаем полотно, до области просмотра
                canvas_w = doc_w - lBW * 2 - convas_padding * 2;
                canvas_h = doc_h - heightDF - topImage - convas_padding;
            } // end if


            ratio_convas = canvas_w / canvas_h; // соотношение сторон конвы 
            //------------------------------------

            var res_w, res_h;

            if (realWidth < canvas_w && realHeight < canvas_h) {
                res_w = realWidth;
                res_h = realHeight;
            } else {

                var ratio = realWidth / realHeight;

                if (ratio <= ratio_convas) {

                    res_w = canvas_h * ratio;
                    res_h = canvas_h;

                } else {

                    res_w = canvas_w;
                    res_h = canvas_w / ratio;

                }

            } // end if

            // центруем слой
            var imageLeft = doc_w / 2 - res_w / 2;

            var imageWidth = Math.round(res_w);
            var imageHeight = Math.round(res_h);

            $(this).width(imageWidth);
            $(this).height(imageHeight);

            // позиция слоя контейнера
            $(content).width(imageWidth);
            $(content).height(imageHeight);
            $(content).css('left', imageLeft);

            $(this).show();



            // устанавливаем зависимые от изображения объекты
            closeButton.setPosition(imageLeft, imageWidth);
            informText.setPosition(imageLeft, imageWidth, imageSrc, realWidth, realHeight, nowCount, allCount);
            titleText.setPosition(imageLeft, imageHeight, title);
        });



        // добавлено ли на сцену
        if (!apdstatus) {
            $(content).html(imageObj);

            $("body").append(bg);
            $("body").append(content);
        } // end if
        apdstatus = true;

    } // end fun

    this.hide = function () {

        $(bg).hide();
        $(content).hide();

    } // end fun

    this.getImageLink = function () {
        return imageObj;
    } // end fun

    this.setOpacityBG = function (opacity) {
        $(bg).css('opacity', opacity);
    } // end fun

} // end fun

var PGObject_Vectors = function () {

    var GThat = this;
    var imgLink; // ссылка на текущее изображение

    // текущий объект-изображение
    var nowObject = {
        fsInfo: null,
        closeButton: null,
        informText: null,
        titleText: null,
        image: null,
        status: false
    };

    var intervalID;
    var statusPlay = false; // статус слайд-шоу

    var clickImage = true;

    //----- Создание левой кнопки
    var leftButton = document.createElement('div');
    var leftSubstrate = document.createElement('div');
    var leftButtonText = document.createElement('div');

    // затемнение при наведении
    $(leftButtonText).hover(
        function () {
            $(leftSubstrate).css('opacity', '0.2');
            $(this).css('opacity', '0.8');
        },
        function () {
            $(leftSubstrate).css('opacity', '0.1');
            $(this).css('opacity', '1');
        }
    );

    leftButton.appendChild(leftSubstrate);
    leftButtonText.appendChild(document.createTextNode('<'));
    leftButton.appendChild(leftButtonText);

    //----- Создание правой кнопки
    var rightButton = document.createElement('div');
    var rightSubstrate = document.createElement('div');
    var rightButtonText = document.createElement('div');

    // затемнение при наведении
    $(rightButtonText).hover(
        function () {
            $(rightSubstrate).css('opacity', '0.2');
            $(this).css('opacity', '0.8');
        },
        function () {
            $(rightSubstrate).css('opacity', '0.1');
            $(this).css('opacity', '1');
        }
    );

    rightButton.appendChild(rightSubstrate);
    rightButtonText.appendChild(document.createTextNode('>'));
    rightButton.appendChild(rightButtonText);

    var leftHandler = function (fsInfo, closeButton, informText, titleText, image) {

        var forward_id = fsInfo.count;

        var filmstripLink = fsInfo.object;

        var scrollval = filmstripLink.get_s();

        var currentIm = filmstripLink.getCurrentIm();

        if (fsInfo.count == 0) {
            forward_id = fsInfo.allcount - 1;
        } else {
            forward_id--;
        } // end if

        fsInfo.count = forward_id;

        // устанавливаем изображение 
        image.setPosition(fsInfo.arr[forward_id].image, forward_id, fsInfo.allcount, closeButton, informText, titleText, fsInfo.arr[forward_id].title, fsInfo.infoType);

        // устанавливаем текущий объект
        nowObject = {
            fsInfo: fsInfo,
            closeButton: closeButton,
            informText: informText,
            titleText: titleText,
            image: image,
            status: true
        };

        // если блок с миниатюрами включён
        if (fsInfo.infoType) {

            var thumbImageLink = filmstripLink.pres_arr[forward_id].image; // новая миниатюра

            // выделяем миниатюру
            $("#" + currentIm).css('border', '0px solid black');
            $(thumbImageLink).css('border', '1px solid #eeeeee');

            filmstripLink.setCurrentIm("pgimage" + forward_id); // ставим новую текущую миниатюру

            // скролим к миниатюре
            filmstripLink.set_s(parseInt($(thumbImageLink).attr("thwh")));

        } // end if

    } // end fun

    var rightHandler = function (fsInfo, closeButton, informText, titleText, image) {

        var forward_id = fsInfo.count;

        var filmstripLink = fsInfo.object;

        var scrollval = filmstripLink.get_s();

        var currentIm = filmstripLink.getCurrentIm();

        if (fsInfo.count == (fsInfo.allcount - 1)) {
            forward_id = 0;
        } else {
            forward_id++;
        } // end if

        fsInfo.count = forward_id;

        // устанавливаем изображение 
        image.setPosition(fsInfo.arr[forward_id].image, forward_id, fsInfo.allcount, closeButton, informText, titleText, fsInfo.arr[forward_id].title, fsInfo.infoType);

        // устанавливаем текущий объект
        nowObject = {
            fsInfo: fsInfo,
            closeButton: closeButton,
            informText: informText,
            titleText: titleText,
            image: image,
            status: true
        };

        // если блок с миниатюрами включён
        if (fsInfo.infoType) {

            var thumbImageLink = filmstripLink.pres_arr[forward_id].image; // новая миниатюра

            // выделяем миниатюру
            $("#" + currentIm).css('border', '0px solid black');
            $(thumbImageLink).css('border', '1px solid #eeeeee');

            filmstripLink.setCurrentIm("pgimage" + forward_id); // ставим новую текущую миниатюру

            // скролим к миниатюре
            filmstripLink.set_s(parseInt($(thumbImageLink).attr("thwh")));

        } // end if


    } // end fun

    $(document).keypress(function (eventObject) {

        if ((eventObject.keyCode == 39 || eventObject.keyCode == 13) && nowObject.status) {
            rightHandler(nowObject.fsInfo, nowObject.closeButton, nowObject.informText, nowObject.titleText, nowObject.image);
        } else if (eventObject.keyCode == 37 && nowObject.status) {
            leftHandler(nowObject.fsInfo, nowObject.closeButton, nowObject.informText, nowObject.titleText, nowObject.image);
        } // end if

    });


    var apdstatus = false; // статус добавления на сцену

    this.interval = 5; // инетервал в секундах

    this.setClickImage = function (val) {
        clickImage = val;
    } // end fun

    this.resize = function () {

        var doc_w = $(window).width();
        var doc_h = $(window).height();

        var lBW = Math.round(doc_w / 18); // ширина кнопок назад/вперёд
        var paddingBW = doc_h / 2 - 50; // внутренний отступ сверху, у кнопок назад/вперёд     
        var leftPos = doc_w - lBW; // отступ слева для правой кнопки

        $(leftButton).css({
            'width': lBW + 'px'
        });

        $(leftButtonText).css({
            'padding-top': paddingBW + 'px'
        });

        $(rightButton).css({
            'left': leftPos + 'px',
            'width': lBW + 'px'
        });

        $(rightButtonText).css({
            'padding-top': paddingBW + 'px'
        });

    } // end fun

    // устанавливаем текущий объект
    this.setObject = function (fsInfo, closeButton, informText, titleText, image, status) {

        // устанавливаем текущий объект
        nowObject = {
            fsInfo: fsInfo,
            closeButton: closeButton,
            informText: informText,
            titleText: titleText,
            image: image,
            status: status
        };
    } // end fun

    // ставим статус включения галереи
    this.setStatus = function (fsInfo, closeButton, informText, titleText, image, status) {
        nowObject.status = status;
    } // end fun

    this.setCounter = function (val) {
        nowObject.fsInfo.count = val;
    } // end fun

    this.setPosition = function () {

        var doc_w = $(window).width();
        var doc_h = $(window).height();

        var lBW = Math.round(doc_w / 18); // ширина кнопок назад/вперёд
        var paddingBW = doc_h / 2 - 50; // внутренний отступ сверху, у кнопок назад/вперёд     
        var leftPos = doc_w - lBW; // отступ слева для правой кнопки

        /*-------------------- Левая стрелка --------------------*/
        $(leftButton).css({
            'position': 'fixed',
            'top': '0px',
            'left': '0px',
            'margin': '0px',
            'padding': '0px',
            'width': lBW + 'px',
            'height': '100%',
            'display': 'block',
            'z-index': '10'
        });


        $(leftSubstrate).css({
            'position': 'absolute',
            'width': '100%',
            'height': '100%',
            'background': 'black',
            'opacity': '0.1',
            'z-index': '20'
        });

        $(leftButtonText).css({
            'position': 'absolute',
            'width': '100%',
            'height': '100%',
            'z-index': '30',
            'text-align': 'center',
            'color': '#aaaaaa',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '38px',
            'font-weight': '100',
            'padding-top': paddingBW + 'px'
        });
        $(leftButtonText).css('cursor', 'pointer');
        /*-------------------- \Левая стрелка --------------------*/

        /*-------------------- Правая стрелка --------------------*/
        $(rightButton).css({
            'position': 'fixed',
            'top': '0px',
            'left': leftPos + 'px',
            'margin': '0px',
            'padding': '0px',
            'width': lBW + 'px',
            'height': '100%',
            'display': 'block',
            'z-index': '10'
        });

        $(rightSubstrate).css({
            'position': 'absolute',
            'width': '100%',
            'height': '100%',
            'background': 'black',
            'opacity': '0.1',
            'z-index': '20'
        });

        $(rightButtonText).css({
            'position': 'absolute',
            'width': '100%',
            'height': '100%',
            'z-index': '30',
            'text-align': 'center',
            'color': '#aaaaaa',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '38px',
            'font-weight': '100',
            'padding-top': paddingBW + 'px'
        });
        $(rightButtonText).css('cursor', 'pointer');
        /*-------------------- \Правая стрелка --------------------*/

        // добавлено ли на сцену
        if (!apdstatus) {
            $("body").append(leftButton);
            $("body").append(rightButton);
        } // end if
        apdstatus = true;

    } // end fun

    this.left = function (fsInfo, closeButton, informText, titleText, image) {
        leftButtonText.onclick = function (e) {
            leftHandler(fsInfo, closeButton, informText, titleText, image);
        } // end fun
    } // end fun

    this.right = function (fsInfo, closeButton, informText, titleText, image) {

        rightButtonText.onclick = function (e) {
            rightHandler(fsInfo, closeButton, informText, titleText, image);
        } // end fun 


        imgLink = image.getImageLink();


        imgLink.onclick = function (e) {

            if (clickImage) {

                if (!statusPlay) {

                    $(imgLink).attr("title", "Остановить слайд-шоу");
                    informText.setInform("слайд-шоу запущено...");

                    image.setOpacityBG('0.8');

                    intervalID = setInterval(function () {

                        rightHandler(fsInfo, closeButton, informText, titleText, image);
                        image.setOpacityBG('0.8');

                    }, (GThat.interval * 1000));

                    statusPlay = true;

                } else {
                    clearInterval(intervalID);
                    $(imgLink).attr("title", "Запуск слайд-шоу");
                    statusPlay = false;

                    image.setOpacityBG('0.5');
                } // end if

            } // end if

        } // end fun
    } // end fun

    this.hide = function () {

        $(leftButton).hide();
        $(rightButton).hide();

        // Останавливаем слайд-шоу
        clearInterval(intervalID);
        $(imgLink).attr("title", "Запуск слайд-шоу");
        statusPlay = false;

    } // end fun

} // end fun

var PGObject_Filmstrip = function (vectors) {

    var GThat = this;

    var heightDF = 110; // высота слоёв диафильма
    var currentIm = "pgimage0";

    // подложка диафильма
    var filmStrip = document.createElement('div');
    var filmStripContent = document.createElement('div');
    var filmStripSubstrate = document.createElement('div');

    // таблица с изображениями
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");

    filmStrip.appendChild(filmStripContent);
    filmStrip.appendChild(filmStripSubstrate);

    //--- Левая кнопка диафильма
    var leftSubstrateDF = document.createElement('div');
    var leftButtonTextDF = document.createElement('span');

    filmStrip.appendChild(leftSubstrateDF);
    leftButtonTextDF.appendChild(document.createTextNode('<'));

    // затемнение при наведении
    $(leftButtonTextDF).hover(
        function () {
            $(leftSubstrateDF).css('opacity', '0.1');
            $(this).css('opacity', '0.8');
        },
        function () {
            $(leftSubstrateDF).css('opacity', '0');
            $(this).css('opacity', '1');
        }
    );

    // нажата
    leftButtonTextDF.onmousedown = function (e) {
        df_left_play_counter++;
        df_left_play = true;

        GThat.pg_playLeftDF();
    } // end fun

    // отпущена
    leftButtonTextDF.onmouseup = function (e) {

        df_left_play_counter = 0;
        df_left_play = false;
    } // end fun

    // курсор вышел за пределы
    leftButtonTextDF.onmouseout = function (e) {

        df_left_play_counter = 0;
        df_left_play = false;
    } // end fun

    filmStrip.appendChild(leftButtonTextDF);

    //--- Правая кнопка диафильма
    var rightSubstrateDF = document.createElement('div');
    var rightButtonTextDF = document.createElement('span');

    filmStrip.appendChild(rightSubstrateDF);
    rightButtonTextDF.appendChild(document.createTextNode('>'));

    // затемнение при наведении
    $(rightButtonTextDF).hover(
        function () {
            $(rightSubstrateDF).css('opacity', '0.1');
            $(this).css('opacity', '0.8');
        },
        function () {
            $(rightSubstrateDF).css('opacity', '0');
            $(this).css('opacity', '1');
        }
    );

    // нажата
    rightButtonTextDF.onmousedown = function (e) {
        df_right_play_counter++;
        df_right_play = true;

        GThat.pg_playRightDF();
    } // end fun

    // отпущена
    rightButtonTextDF.onmouseup = function (e) {

        df_right_play_counter = 0;
        df_right_play = false;
    } // end fun

    // курсор вышел за пределы
    rightButtonTextDF.onmouseout = function (e) {

        df_right_play_counter = 0;
        df_right_play = false;
    } // end fun
    filmStrip.appendChild(rightButtonTextDF);


    var apdstatus = false; // статус добавления на сцену

    var df_right_play = false;
    var df_right_play_counter = 0;

    var df_left_play = false;
    var df_left_play_counter = 0;

    this.pres_arr = [];

    this.resize = function () {

        var doc_w = $(window).width();
        var doc_h = $(window).height();

        /*-------------------- Диафильм --------------------*/
        var fsBW = Math.round(doc_w / 10);
        fsW = doc_w - fsBW * 2;

        $(filmStrip).css({
            'width': fsW + 'px',
            'left': fsBW + 'px',
            'top': (doc_h - heightDF) + 'px'
        });


        var marginDFx2 = Math.round(fsW / 10);
        var conFsW = fsW - marginDFx2;
        var marginDF = Math.round(marginDFx2 / 2);
        $(filmStripContent).css({
            'width': conFsW + 'px',
            'margin-left': marginDF + 'px'
        });


        $(filmStripSubstrate).css({
            'width': fsW + 'px'
        });

        /*-------------------- Левая стрелка диафильма --------------------*/
        $(leftSubstrateDF).css({
            'width': marginDF + 'px',
            'height': heightDF + 'px'
        });

        $(leftButtonTextDF).css({
            'width': marginDF + 'px',
            'height': heightDF + 'px'
        });
        $(leftButtonTextDF).css('cursor', 'pointer');
        /*-------------------- \Левая стрелка диафильма --------------------*/

        /*-------------------- Правая стрелка диафильма --------------------*/
        $(rightSubstrateDF).css({
            'width': marginDF + 'px',
            'height': heightDF + 'px',
            'margin-left': (marginDF + conFsW) + 'px'
        });

        $(rightButtonTextDF).css({
            'width': marginDF + 'px',
            'height': heightDF + 'px',
            'margin-left': (marginDF + conFsW) + 'px'
        });
        $(rightButtonTextDF).css('cursor', 'pointer');
        /*-------------------- \Правая стрелка диафильма --------------------*/
        /*-------------------- \Диафильм --------------------*/

    } // end fun

    this.pg_playRightDF = function () {

        var scroll = GThat.get_s();

        if (scroll < GThat.get_w() &&
            GThat.getStatusPlay("df_right", "play") &&
            GThat.getStatusPlay("df_right", "play_counter") <= 2) {

            scroll = scroll + 15;
            GThat.set_s(scroll);

            setTimeout(GThat.pg_playRightDF, 30);

        } // end if

    } // end fun

    this.pg_playLeftDF = function () {

        var scroll = GThat.get_s();

        if (scroll > 10 &&
            GThat.getStatusPlay("df_left", "play") &&
            GThat.getStatusPlay("df_left", "play_counter") <= 2) {

            scroll = scroll - 15;
            GThat.set_s(scroll);

            setTimeout(GThat.pg_playLeftDF, 30);

        } // end if

    } // end fun

    this.get_s = function () {
        return $(filmStripContent).scrollLeft();
    } // end fun

    this.set_s = function (sl) {
        $(filmStripContent).scrollLeft(sl);
    } // end fun

    this.get_w = function () {
        var res = ($(tbl).outerWidth() - $(filmStripContent).outerWidth());
        return res;
    } // end fun

    this.getStatusPlay = function (button, status) {

        switch (button) {
        case "df_right":
            switch (status) {
            case "play":
                return df_right_play;
                break;
            case "play_counter":
                return df_right_play_counter;
                break;
            } // end switch
            break;
        case "df_left":
            switch (status) {
            case "play":
                return df_left_play;
                break;
            case "play_counter":
                return df_left_play_counter;
                break;
            } // end switch
            break;
        } // end switch

    } // end fin

    this.setStatusPlay = function (button, status, val) {

        switch (button) {
        case "df_right":
            switch (status) {
            case "play":
                df_right_play = val;
                break;
            case "play_counter":
                df_right_play_counter = val;
                break;
            } // end switch
            break;
        case "df_left":
            switch (status) {
            case "play":
                df_left_play = val;
                break;
            case "play_counter":
                df_left_play_counter = val;
                break;
            } // end switch
            break;
        } // end switch

    } // end fin

    this.setPosition = function (fsInfo, pgImage, closeButton, informText, titleText) {

        var doc_w = $(window).width();
        var doc_h = $(window).height();

        /*-------------------- Диафильм --------------------*/
        var fsBW = Math.round(doc_w / 10);
        fsW = doc_w - fsBW * 2;

        $(filmStrip).css({
            'position': 'fixed',
            'width': fsW + 'px',
            'height': heightDF + 'px',
            'z-index': '50',
            'left': fsBW + 'px',
            /*  'border': '1px solid blue',  */
            'top': (doc_h - heightDF) + 'px'
        });


        var marginDFx2 = Math.round(fsW / 10);
        var conFsW = fsW - marginDFx2;
        var marginDF = Math.round(marginDFx2 / 2);
        $(filmStripContent).css({
            'position': 'absolute',
            'width': conFsW + 'px',
            'height': heightDF + 'px',
            'z-index': '53',
            'margin-left': marginDF + 'px',
            'text-align': 'left',
            'color': '#ffffff',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-weight': '100',
            /*'border': '1px solid green', */
            'border-left': '1px solid #757575',
            'border-right': '1px solid #757575',
            'overflow': 'hidden'
        });


        $(filmStripSubstrate).css({
            'position': 'absolute',
            'width': fsW + 'px',
            'height': heightDF + 'px',
            'background': 'black',
            'opacity': '0.2',
            /* 'border': '1px solid red',  */
            'z-index': '51'
        });

        /*-------------------- Левая стрелка диафильма --------------------*/
        $(leftSubstrateDF).css({
            'position': 'absolute',
            'width': marginDF + 'px',
            'height': heightDF + 'px',
            'background': 'black',
            'opacity': '0',
            'z-index': '60',
            'margin-left': '0px'
        });

        $(leftButtonTextDF).css({
            'position': 'absolute',
            'width': marginDF + 'px',
            'height': heightDF + 'px',
            'z-index': '61',
            'text-align': 'center',
            'color': '#aaaaaa',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '38px',
            'font-weight': '100',
            'margin-left': '0px',
            'padding-top': '43px'
        });
        $(leftButtonTextDF).css('cursor', 'pointer');
        /*-------------------- \Левая стрелка диафильма --------------------*/

        /*-------------------- Правая стрелка диафильма --------------------*/
        $(rightSubstrateDF).css({
            'position': 'absolute',
            'width': marginDF + 'px',
            'height': heightDF + 'px',
            'background': 'black',
            'opacity': '0',
            'z-index': '60',
            'margin-left': (marginDF + conFsW) + 'px'
        });

        $(rightButtonTextDF).css({
            'position': 'absolute',
            'width': marginDF + 'px',
            'height': heightDF + 'px',
            'z-index': '61',
            'text-align': 'center',
            'color': '#aaaaaa',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '38px',
            'font-weight': '100',
            'margin-left': (marginDF + conFsW) + 'px',
            'padding-top': '43px'
        });
        $(rightButtonTextDF).css('cursor', 'pointer');
        /*-------------------- \Правая стрелка диафильма --------------------*/


        this.setList(fsInfo, pgImage, closeButton, informText, titleText);

        // добавлено ли на сцену
        if (!apdstatus) $("body").append(filmStrip);
        apdstatus = true;
        /*-------------------- \Диафильм --------------------*/



        $(filmStrip).show();
    } // end fun

    this.hide = function () {

        $(filmStrip).hide();

    } // end fun 

    this.getInfo = function (imgSrc, alias, name, infoType) {

        // список всех больших фото
        var arr = [];
        var a_counter = 0;
        var count = 0;
        $("a[rel='" + alias + "[" + name + "]']").each(function (index, val) {
            if (val.href == imgSrc) count = a_counter;

            var thumb;
            $(this).find("img").each(function (index, Element) {
                thumb = Element.src;
            });

            arr.push({
                image: val.href,
                thumb: thumb,
                title: this.title
            });

            a_counter++;
        });

        return {
            arr: arr,
            count: count,
            allcount: a_counter,
            object: GThat,
            infoType: infoType
        };

    } // end fun

    this.setList = function (fsarr, pgImage, closeButton, informText, titleText) {

        //  console.log(arr);


        var convasDFwidth = 0;

        var thwh = 0;

        var arr = fsarr.arr;

        for (var key in arr) {

            var cObj = {
                image: null,
                container: null
            };

            cObj.image = new Image();
            cObj.image.src = arr[key].thumb;


            cObj.image.setAttribute("maximage", arr[key].image);
            cObj.image.setAttribute("title", arr[key].title);
            cObj.image.setAttribute("id", "pgimage" + key);
            cObj.image.setAttribute("name", "pgimage" + key);
            cObj.image.setAttribute("key", key);

            thwh += 5;
            cObj.image.setAttribute("thwh", thwh);

            var factorImg = cObj.image.width / cObj.image.height;
            thwh += Math.round(factorImg * 100);


            $(cObj.image).css({
                'height': '100px',
                'margin': '0px 5px 0px 0px',
                'cursor': 'pointer'
            });

            cObj.image.onclick = function () {

                var maximage = this.getAttribute("maximage");
                var titleImg = this.getAttribute("title");
                var idImg = this.getAttribute("id");
                var thwhImg = this.getAttribute("thwh");
                var currentKey = this.getAttribute("key");

                // выделяем изображение
                $("#" + currentIm).css('border', '0px solid black');
                $(this).css('border', '1px solid #eeeeee');
                currentIm = idImg;

                pgImage.setPosition(maximage, fsarr.count, fsarr.allcount, closeButton, informText, titleText, titleImg, true);
                vectors.setCounter(currentKey);

            } // end fun

            cObj.container = document.createElement("td");
            cObj.container.appendChild(cObj.image);

            row.appendChild(cObj.container);

            GThat.pres_arr.push(cObj);


        } // end for



        tblBody.appendChild(row);
        tbl.appendChild(tblBody);

        $(filmStripContent).append(tbl);



        // анимированый скрол к изображению 
        element = $(GThat.pres_arr[fsarr.count].image);

        element.stop(false, false) // останавливает анимацию если уже идет
        $(filmStripContent).animate({
            scrollLeft: element.attr('thwh')
        }, 'slow');

        // выделяем изображение
        $("#" + currentIm).css('border', '0px solid black');
        element.css('border', '1px solid #eeeeee');
        currentIm = "pgimage" + fsarr.count;

    } // end fun

    this.getCurrentIm = function () {
        return currentIm;
    } // end fun

    this.setCurrentIm = function (val) {
        currentIm = val;
    } // end fun

    this.clean = function () {

        // чистим массив и удаляем со сцены кадры
        for (var key in GThat.pres_arr) {
            $(GThat.pres_arr[key].image).remove();
            $(GThat.pres_arr[key].container).remove();
        } // end for 
        GThat.pres_arr.length = 0;

    } // end fun

} // end fun

var PulsarGallery = function () {

    var GThat = this;

    this.close = function () {
        closeButton.hide();
        informText.hide();
        titleText.hide();
        pgImage.hide();
        vectors.hide();
        filmstrip.hide();

        // ставим статус выключения галереи
        vectors.setStatus(false);
    } // end fun

    var closeButton = new PGObject_CloseButton(this.close); // кнопка закрыть
    var informText = new PGObject_InformText(); // текст-аннотация слева, сверху
    var titleText = new PGObject_TitleText(); // заголовок изображения
    var pgImage = new PGObject_Image(this.close); // фоновое затемнение
    var vectors = new PGObject_Vectors(); // кнопки назад/вперёд
    var filmstrip = new PGObject_Filmstrip(vectors); // диафильм

    this.alias = 'pulsargallery';
    this.aliaslite = 'pulsarlite';
    this.name = "list1";
    this.action = true; // общие включение галереи до вызова Init
    this.interval = 5; // инетервал в секундах

    this.resize = function () {

        if (this.action) {

            vectors.resize();
            pgImage.resize(closeButton, informText, titleText, this.href);
            filmstrip.resize();

        } // end if

    } // end fun 

    this.actionGal = function (title, imageSrc, groupName) {

        // разрешаем слайд-шоу при клике на изображение
        vectors.setClickImage(true);

        // состояние блока миниатюр вкл./выкл.
        var infoType = true;

        var fsInfo = filmstrip.getInfo(imageSrc, this.alias, groupName, infoType); // информация по списку изображений

        filmstrip.clean();

        // устанавливаем изображение 
        pgImage.setPosition(imageSrc, fsInfo.count, fsInfo.allcount, closeButton, informText, titleText, title, infoType);

        // устанавливаем кнопки назад/вперёд
        vectors.setPosition();

        // ставим статус включения галереи
        vectors.setObject(fsInfo, closeButton, informText, titleText, pgImage, infoType);

        // обработчики событий кнопок  назад/вперёд
        vectors.left(fsInfo, closeButton, informText, titleText, pgImage);
        vectors.right(fsInfo, closeButton, informText, titleText, pgImage);

        // диафильм
        filmstrip.setPosition(fsInfo, pgImage, closeButton, informText, titleText);

    } // end fun

    this.actionGalLite = function (title, imageSrc, groupName) {

        // разрешаем слайд-шоу при клике на изображение
        vectors.setClickImage(true);

        // состояние блока миниатюр вкл./выкл.
        var infoType = false;

        var fsInfo = filmstrip.getInfo(imageSrc, this.aliaslite, groupName, infoType); // информация по списку изображений

        // устанавливаем изображение 
        pgImage.setPosition(imageSrc, fsInfo.count, fsInfo.allcount, closeButton, informText, titleText, title, infoType);

        // устанавливаем кнопки назад/вперёд
        vectors.setPosition();

        // обработчики событий кнопок  назад/вперёд
        vectors.left(fsInfo, closeButton, informText, titleText, pgImage);
        vectors.right(fsInfo, closeButton, informText, titleText, pgImage);

    } // end fun


    this.init = function () {

        var that = this;

        if (this.action) {
      
            // устанавливаем интервал
            vectors.interval = this.interval;

            var regx = new RegExp('^' + this.alias + '\\[([a-zA-Z0-9]+)\\]|' + this.name + '$'),
                rx;
            var regxLite = new RegExp('^' + this.aliaslite + '\\[([a-zA-Z0-9]+)\\]|' + this.name + '$'),
                rxl;

            $("a").each(function () {

                if (this.rel && (rx = this.rel.match(regx))) {

                    $(this).attr('data-group', rx[1]);

                    this.onclick = function (e) {

                        var group = $(this).attr('data-group');

                        GThat.actionGal(this.title, this.href, group);

                        return false;
                    }


                } else if (this.rel && (rxl = this.rel.match(regxLite))) {

                    $(this).attr('data-group', rxl[1]);

                    this.onclick = function (e) {

                        var group = $(this).attr('data-group');

                        GThat.actionGalLite(this.title, this.href, group);

                        return false;
                    }

                } // end if

            });

            $("a[rel='" + this.alias + "']").on('click', function () {

                var title = this.title;
                var imageSrc = this.href;

                // запрещаем слайд-шоу при клике на изображение
                vectors.setClickImage(false);


                // устанавливаем изображение 
                pgImage.setPosition(imageSrc, 0, 0, closeButton, informText, titleText, title);

                return false;
            });

            $(window).resize(function () {
                GThat.resize();
            });

        } // end if

    } // end fun


};
var pulsargallery = new PulsarGallery();