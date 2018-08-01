/*
 * SpriteAnimator v1.0
 * site: Fx-future.ru
 * license: MIT License http://www.opensource.org/licenses/mit-license.php
 */
var SpriteAnimator = function () {


    var frame = 0; // текущий кадр

    var repet = true; // повтор (в проигрывателе и навигации)

    var imageArr = []; // массив со всеми изображениями и их параметрами

    var GThat = this;

    var inputWidth, inputHeight, imageDiv, infoDiv, inputForward, inputBack;

    this.statusPlay = false;

    this.init = function (arr) {

        var that = this;


        var h1 = document.createElement('h1');
        $(h1).css({
            'color': '#171819',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '18px',
            'margin': '3px'
        });
        h1.appendChild(document.createTextNode('Аниматор спрайтов'));
        $("body").append(h1);

        // загрузка изображений (текст)
        var loadText = document.createTextNode('Загрузка изображений...');
        var loadDiv = document.createElement('div');
        loadDiv.appendChild(loadText);
        $("body").append(loadDiv);

        // загрузка изображений (процесс)
        for (var key in arr) {
            var newim = new Image();
            newim.src = arr[key];
            imageArr.push({
                image: newim,
                delay: 100
            });
        } // end for 
        $(loadDiv).hide();

        // изображение 
        var imageContent = document.createElement('div');
        $(imageContent).css({
            'color': '#171819',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '14px',
            'font-weight': '100',
            'top': '20px',
            'width': '100%'
        });
        //  $(closeButtonText).click(closeFun); // закрытие галлереи

        imageContent.appendChild(document.createElement('br'));

        // ширина
        imageContent.appendChild(document.createTextNode('Ширина: '));
        inputWidth = document.createElement('input');
        inputWidth.type = "text";
        $(inputWidth).css({
            'width': '80px',
            'color': '#171819',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '14px'
        });
        inputWidth.onchange = function (e) {
            if (this.value != "") imageArr[frame].image.width = this.value;
            else $(imageArr[frame].image).removeAttr("width");
        } // end fun
        imageContent.appendChild(inputWidth);

        // высота
        $(imageContent).append('&nbsp;&nbsp; Высота: ');
        inputHeight = document.createElement('input');
        inputHeight.type = "text";
        inputHeight.value = "500";
        $(inputHeight).css({
            'width': '80px',
            'color': '#171819',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '14px'
        });
        inputHeight.onchange = function (e) {
            if (this.value != "") imageArr[frame].image.height = this.value;
            else $(imageArr[frame].image).removeAttr("height");
        } // end fun
        imageContent.appendChild(inputHeight);


        // назад
        $(imageContent).append('&nbsp;&nbsp;&nbsp;&nbsp; Навигация: ');
        inputBack = document.createElement('input');
        inputBack.type = "button";
        inputBack.value = "< назад";
        $(inputBack).css({
            'width': '80px',
            'color': '#171819',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '14px'
        });
        inputBack.onclick = function (e) {

            // включаем кнопку вперёд
            inputForward.disabled = false;

            if (frame == 0) {
                if (repet) {
                    frame = imageArr.length - 1;
                }
            } else {
                frame--;
            } // end fu  

            // меняем ширину и высоту у нового изображения
            if (inputWidth.value != "") imageArr[frame].image.width = inputWidth.value;
            else $(imageArr[frame].image).removeAttr("width");
            if (inputHeight.value != "") imageArr[frame].image.height = inputHeight.value;
            else $(imageArr[frame].image).removeAttr("height");


            $(imageDiv).html(imageArr[frame].image);
            $(infoDiv).html('Кадр ' + (frame + 1) + ': ' + imageArr[frame].image.src + ' <br>');

            if (frame == 0 && !repet) this.disabled = true;

        } // end fun
        imageContent.appendChild(inputBack);

        // вперёд
        inputForward = document.createElement('input');
        inputForward.type = "button";
        inputForward.value = "вперёд >";
        $(inputForward).css({
            'width': '80px',
            'color': '#171819',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '14px'
        });

        inputForward.onclick = function (e) {

            // переключаем вперёд 
            GThat.forward();

        } // end fun

        imageContent.appendChild(inputForward);

        // проигрыватель
        $(imageContent).append('&nbsp;&nbsp;&nbsp;&nbsp; Проигрыватель: ');
        var inputPlayer = document.createElement('input');
        inputPlayer.type = "button";
        inputPlayer.value = "старт";
        $(inputPlayer).css({
            'width': '80px',
            'color': '#171819',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '14px'
        });

        inputPlayer.onclick = function (e) {

            if (GThat.statusPlay) {
                GThat.statusPlay = false;

                // меняем надпись кнопки
                this.value = "играть";
            } else {
                GThat.statusPlay = true;

                // меняем надпись кнопки
                this.value = "пауза";

                // старт проигрывателя
                spriteAnimatorPlay();
            } // end if

        } // end fun
        imageContent.appendChild(inputPlayer);


        // проигрыватель  (стоп)
        var inputPlayerStop = document.createElement('input');
        inputPlayerStop.type = "button";
        inputPlayerStop.value = "стоп";
        $(inputPlayerStop).css({
            'width': '80px',
            'color': '#171819',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '14px'
        });

        inputPlayerStop.onclick = function (e) {

            GThat.statusPlay = false;

            // меняем надпись кнопки
            inputPlayer.value = "играть";

            frame = -1;

            // переключаем вперёд 
            GThat.forward();

        } // end fun
        imageContent.appendChild(inputPlayerStop);

        // повтор
        $(imageContent).append('&nbsp;&nbsp;&nbsp;&nbsp; Повтор: ');
        var inputRepet = document.createElement('input');
        inputRepet.checked = "checked";
        inputRepet.type = "checkbox";
        $(inputRepet).css({
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'color': '#171819'
        });
        inputRepet.onclick = function (e) {
            if (repet) repet = false;
            else repet = true;
            return true;
        } // end fun
        imageContent.appendChild(inputRepet);


        // разделитель
        imageContent.appendChild(document.createElement('hr'));

        // путь до изображения
        infoDiv = document.createElement('div');
        $(infoDiv).html('Кадр ' + (frame + 1) + ': ' + imageArr[frame].image.src + ' <br>');
        imageContent.appendChild(infoDiv);


        // меняем высоту и добавляем текущие изображение на холст
        imageDiv = document.createElement('div');
        imageArr[frame].image.height = 500;
        imageDiv.appendChild(imageArr[frame].image);
        imageContent.appendChild(imageDiv);

        // разделитель
        imageContent.appendChild(document.createElement('hr'));

        var h3 = document.createElement('h3');
        $(h3).css({
            'color': '#171819',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '16px',
            'margin-top': '15px'
        });
        h3.appendChild(document.createTextNode('Настройка кадров'));
        imageContent.appendChild(h3);

        // настройка кадров 
        for (var key in imageArr) {

            var nk = Number(key) + 1;

            var h5 = document.createElement('h5');
            $(h5).css({
                'color': '#171819',
                'font-family': 'Arial, Geneva, Helvetica, sans-serif',
                'font-size': '14px',
                'margin-top': '10px'
            });
            h5.appendChild(document.createTextNode('Кадр ' + nk));
            imageContent.appendChild(h5);

            // путь до изображения
            imageContent.appendChild(document.createTextNode('Путь: '));
            var newin = document.createElement('input');
            newin.value = imageArr[key].image.src;
            newin.style.width = "700px";
            newin.setAttribute("frame", key);
            newin.onchange = function (e) {
                var tframe = this.getAttribute("frame");
                imageArr[tframe].image.src = this.value;
            } // end fun
            imageContent.appendChild(newin);

            imageContent.appendChild(document.createElement('br'));

            // задержка
            imageContent.appendChild(document.createTextNode('Задержка: '));
            var newdelay = document.createElement('input');
            newdelay.value = imageArr[key].delay;
            newdelay.style.width = "100px";
            newdelay.setAttribute("frame", key);
            newdelay.onchange = function (e) {
                var tframe = this.getAttribute("frame");
                imageArr[tframe].delay = this.value;
            } // end fun
            imageContent.appendChild(newdelay);
            imageContent.appendChild(document.createTextNode(' мс'));

            imageContent.appendChild(document.createElement('br'));

            // прозрачность
            imageContent.appendChild(document.createTextNode('Прозрачность: '));
            var newopacity = document.createElement('input');
            newopacity.value = 1;
            newopacity.style.width = "100px";
            newopacity.setAttribute("frame", key);
            newopacity.onchange = function (e) {
                var tframe = this.getAttribute("frame");
                imageArr[tframe].image.style.opacity = this.value;
            } // end fun
            imageContent.appendChild(newopacity);
            imageContent.appendChild(document.createTextNode(' от 0 до 1 (например 0.3)'));

            imageContent.appendChild(document.createElement('br'));
            imageContent.appendChild(document.createElement('br'));



        } // end for 


        $("body").append(imageContent);


        return 0;
    } // end fun (init)

    // функция переключения вперёд
    this.forward = function () {

        // включаем кнопку назад
        inputBack.disabled = false;

        if (frame == imageArr.length - 1) {
            if (repet) {
                frame = 0;
            }
        } else {
            frame++;
        } // end fu  

        // меняем ширину и высоту у нового изображения
        if (inputWidth.value != "") imageArr[frame].image.width = inputWidth.value;
        else $(imageArr[frame].image).removeAttr("width");
        if (inputHeight.value != "") imageArr[frame].image.height = inputHeight.value;
        else $(imageArr[frame].image).removeAttr("height");

        $(imageDiv).html(imageArr[frame].image);
        $(infoDiv).html('Кадр ' + (frame + 1) + ': ' + imageArr[frame].image.src + ' <br>');

        if (frame == imageArr.length - 1 && !repet) {
            inputForward.disabled = true;
            return false;
        }

        return true;
    } // end fun

    this.getDelay = function () {
        return imageArr[frame].delay;
    } // end fun 

};
var spriteanimator = new SpriteAnimator();

// проигрыватель на таймере

function spriteAnimatorPlay() {

    if (spriteanimator.statusPlay && spriteanimator.forward()) {

        var ldaley = spriteanimator.getDelay();

        setTimeout('spriteAnimatorPlay()', ldaley);
    } // end if

} // end fun