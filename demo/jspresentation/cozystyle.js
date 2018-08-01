 /**
  * Cozy style
  * MIT lecension  
  */
(function ($) {
    $.fn.cozyStyle = function (options) {

        // главная функция (класс)
        function CozyStyle($this, settings) {

            var GSet = settings.gradient;
            var Loc = $.trim(settings.location);

            var Rounding = settings.rounding;

            // определение браузера и версии
            var dataBrowser = browserDetectNav();

            // убираем из строки лишние пробелы
            GSet = $.trim(GSet);
            GSet = GSet.replace(new RegExp("       ", 'g'), " ");
            GSet = GSet.replace(new RegExp("      ", 'g'), " ");
            GSet = GSet.replace(new RegExp("     ", 'g'), " ");
            GSet = GSet.replace(new RegExp("    ", 'g'), " ");
            GSet = GSet.replace(new RegExp("   ", 'g'), " ");
            GSet = GSet.replace(new RegExp("  ", 'g'), " ");

            // начальный и конечный цвет
            var colorArr = [];
            $.each(GSet.split(" "), function () {
                colorArr.push(this.toString());
            });

            var color0 = colorArr[0];
            var color1 = colorArr[1];

            if (dataBrowser[0] != "Opera" || (dataBrowser[0] != "MSIE" && dataBrowser[1] < 8)) {

                var loc_cf = "";
                var loc_ie_cf = "";
                switch (Loc) {
                case "top":
                    loc_cf = "left top, left bottom";
                    loc_ie_cf = "GradientType=0,startColorstr=" + color0 + ", endColorstr=" + color1;
                    break;
                case "bottom":
                    loc_cf = "left bottom, left top";
                    loc_ie_cf = "GradientType=0,startColorstr=" + color1 + ", endColorstr=" + color0;
                    break;
                case "left":
                    loc_cf = "left top, right top";
                    loc_ie_cf = "GradientType=1,startColorstr=" + color0 + ", endColorstr=" + color1;
                    break;
                case "right":
                    loc_cf = "right top, left top";
                    loc_ie_cf = "GradientType=1,startColorstr=" + color1 + ", endColorstr=" + color0;
                    break;
                default:
                    loc_cf = "left top, left bottom";
                    loc_ie_cf = "GradientType=0,startColorstr=" + color0 + ", endColorstr=" + color1;
                } // end switch


                $this.css({
                    background: color0,
                    /* Для старых браузров */

                    /* Chrome 10+, Safari 5.1+ */
                    background: '-webkit-linear-gradient(' + Loc + ', ' + color0 + ', ' + color1 + ')',
                    background: '-o-linear-gradient(' + Loc + ', ' + color0 + ', ' + color1 + ')',
                    /* Opera 11.10+ */
                    background: '-ms-linear-gradient(' + Loc + ', ' + color0 + ', ' + color1 + ')',
                    /* IE10 */
                    background: 'linear-gradient(' + Loc + ', ' + color0 + ', ' + color1 + ')' /* CSS3 */

                    /* Firefox 3.6+ */
                }).css({
                    background: '-moz-linear-gradient(' + Loc + ', ' + color0 + ', ' + color1 + ')'
                })

                /* Chrome 1-9, Safari 4-5 */
                .css({
                    background: '-webkit-gradient(linear,  ' + loc_cf + ', color-stop(0%,' + color0 + '), color-stop(100%,' + color1 + '))'
                })
                /* IE 8, 9 */
                .css('filter', "progid:DXImageTransform.Microsoft.gradient(" + loc_ie_cf + ")");

            } else {
                $this.css({
                    'background-color': settings.nogradient
                });
            } //  end if

            // отключаем для IE
            if (dataBrowser[0] != "MSIE") {

                $this.css({
                    '-moz-border-radius': Rounding
                })
                    .css({
                        '-khtml-border-radius': Rounding
                    })
                    .css({
                        '-webkit-border-radius': Rounding
                    })
                    .css({
                        'border-radius': Rounding
                    });

            } // end if



        } // end fun

        // определение браузера
        function browserDetectNav(chrAfterPoint) {
            var UA = window.navigator.userAgent, // содержит переданный браузером юзерагент
                //--------------------------------------------------------------------------------
                OperaB = /Opera[ \/]+\w+\.\w+/i, //
                OperaV = /Version[ \/]+\w+\.\w+/i, //	
                FirefoxB = /Firefox\/\w+\.\w+/i, // шаблоны для распарсивания юзерагента
                ChromeB = /Chrome\/\w+\.\w+/i, //
                SafariB = /Version\/\w+\.\w+/i, //
                IEB = /MSIE *\d+\.\w+/i, //
                SafariV = /Safari\/\w+\.\w+/i, //
                //--------------------------------------------------------------------------------
                browser = new Array(), //массив с данными о браузере
                browserSplit = /[ \/\.]/i, //шаблон для разбивки данных о браузере из строки
                OperaV = UA.match(OperaV),
                Firefox = UA.match(FirefoxB),
                Chrome = UA.match(ChromeB),
                Safari = UA.match(SafariB),
                SafariV = UA.match(SafariV),
                IE = UA.match(IEB),
                Opera = UA.match(OperaB);

            //----- Opera ----
            if ((!Opera == "") & (!OperaV == "")) browser[0] = OperaV[0].replace(/Version/, "Opera")
            else
            if (!Opera == "") browser[0] = Opera[0]
            else
            //----- IE -----
            if (!IE == "") browser[0] = IE[0]
            else
            //----- Firefox ----
            if (!Firefox == "") browser[0] = Firefox[0]
            else
            //----- Chrom ----
            if (!Chrome == "") browser[0] = Chrome[0]
            else
            //----- Safari ----
            if ((!Safari == "") && (!SafariV == "")) browser[0] = Safari[0].replace("Version", "Safari");
            //------------ Разбивка версии -----------

            var
            outputData; // возвращаемый функцией массив значений
            // [0] - имя браузера, [1] - целая часть версии
            // [2] - дробная часть версии
            if (browser[0] != null) outputData = browser[0].split(browserSplit);
            if ((chrAfterPoint == null) && (outputData != null)) {
                chrAfterPoint = outputData[2].length;
                outputData[2] = outputData[2].substring(0, chrAfterPoint); // берем нужное ко-во знаков
                return (outputData);
            } else return (false);
        }


        // Настройки по умалчанию
        var settings = $.extend({
            'location': 'top',
            'gradient': 'black white',
            'nogradient': '#808080',
            'rounding': '10px'
        }, options);


        return this.each(function () {

            // получаем  $(this)
            var $this = $(this);

            // вызываем главную функцию (класс)
            new CozyStyle($this, settings);

        });

    };
})(jQuery);