/**
 * Pulsar Gallery v0.1
 * site: Fx-future.ru
 * license: MIT License http://www.opensource.org/licenses/mit-license.php
 */
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