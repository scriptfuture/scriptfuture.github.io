/**
 * Pulsar Gallery v0.1
 * site: Fx-future.ru
 * license: MIT License http://www.opensource.org/licenses/mit-license.php
 */
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