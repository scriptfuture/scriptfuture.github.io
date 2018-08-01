/**
 * Pulsar Gallery v0.1
 * site: Fx-future.ru
 * license: MIT License http://www.opensource.org/licenses/mit-license.php
 */
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