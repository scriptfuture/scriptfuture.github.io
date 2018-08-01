 /**
  * JSPresentation
  */
 var JSPresentation = function () {
 
     var GThat = this;
     
     var dpath;
     
     var closeFun = function(){
     
         $(bg).hide();
         $(nav).hide();
         $(shadow).hide();
         $(cframe).hide();
         $(player).hide();
         $(closeButton).hide();
         $(closeInfo).hide();
         initStatus = false;
     
     } // end fun

     var bg = document.createElement('div'); // фоновое затемнение
     $(bg).click(closeFun); // закрытие презентации

     var nav = document.createElement('div'); // навигация по презентации

     var cframe = document.createElement('div'); // основной фрейм
     var cframe_content = document.createElement('div'); // основной фрейм
     var shadow = document.createElement('div'); // тень основного фрейма  
     
     var player = document.createElement('div'); // блок управления проигрывателем  
     
     var closeButton = document.createElement('div'); // кнопка закрытия презентации 
     $(closeButton).click(closeFun); // закрытие презентации
     $(closeButton).hover(
         function(){
             $(this).css({'color': 'red'});
         },
         function(){
             $(this).css({'color': '#fff5ee'});
         }
     );
     
     
     
     var closeInfo = document.createElement('div'); // блок  с информаций над кадром
     $(closeInfo).click(closeFun); // закрытие презентации
     
     var keyFrame = 0; // текущий номер кадра
     
     var intervalID;
     
     //кнопки в блоке управления       
     var frame_backward = document.createElement('div'); // кадр назад
     $(frame_backward).hover(
         function(){
             $(this).cozyStyle({'gradient': 'red black', 'rounding' : '5px'});
         },
         function(){
             $(this).cozyStyle({'gradient': '#003399 black', 'rounding' : '5px'});
         }
     );
     $(frame_backward).css('cursor','pointer');
     $(frame_backward).click(function(){
         if(keyFrame>0) keyFrame--; else keyFrame=GThat.pres_arr.length-1;
         
         GThat.newSlide(GThat.pres_arr, keyFrame);
         
     });
     
     var statusPlay = false;
     var play = document.createElement('div'); // проиграть
     $(play).hover(
         function(){
             $(this).cozyStyle({'gradient': 'red black', 'rounding' : '5px'});
         },
         function(){
             $(this).cozyStyle({'gradient': '#003399 black', 'rounding' : '5px'});
         }
     );
     $(play).css('cursor','pointer'); 
     $(play).click(function(){
     
         if(!statusPlay){
     
         intervalID = setInterval(function() {
         
             if(keyFrame<=(GThat.pres_arr.length-2)) { 
                 keyFrame++; 
                 GThat.newSlide(GThat.pres_arr, keyFrame);
             } else { 
                 clearInterval(intervalID);
                 statusPlay = false;
                 GThat.newSlide(GThat.pres_arr, 0);
                 $(play).html("проиграть");
             } // end if
             
     
         },(GThat.interval*1000));
         
             statusPlay = true;
             $(this).html("пауза");
             
         } else {
         
             $(this).html("игр. дальше");
             clearInterval(intervalID);
             statusPlay = false;
         
         } // end if
         
     });
      
     var stop = document.createElement('div'); // стоп
     $(stop).hover(
         function(){
             $(this).cozyStyle({'gradient': 'red black', 'rounding' : '5px'});
         },
         function(){
             $(this).cozyStyle({'gradient': '#003399 black', 'rounding' : '5px'});
         }
     );
     $(stop).css('cursor','pointer');
     $(stop).click(function(){
         clearInterval(intervalID);
         statusPlay = false;
         GThat.newSlide(GThat.pres_arr, 0);
         $(play).html("проиграть");
     });
     
     var frame_forward = document.createElement('div'); // кадр вперёд
     $(frame_forward).hover(
         function(){
             $(this).cozyStyle({'gradient': 'red black', 'rounding' : '5px'});
         },
         function(){
             $(this).cozyStyle({'gradient': '#003399 black', 'rounding' : '5px'});
         }
     );
     $(frame_forward).css('cursor','pointer'); 
     $(frame_forward).click(function(){
         
         if(keyFrame<=(GThat.pres_arr.length-2)) keyFrame++; else keyFrame=0;
         
         GThat.newSlide(GThat.pres_arr, keyFrame); 
         
     });

     var ajaxLoader = new Image();
     ajaxLoader.src = "loader.gif";
     $(cframe).append(ajaxLoader);

     var navWidth = 200; // ширина левой колоки

     var apdstatus = false; // статус добавления на сцену
     
     var initStatus = false; // статус инициализации

     this.name = "jspresentation";

     this.pres_arr = [];
     
     this.interval = 5; // интервал в секундах
     
     var $this; // контекст вызова для ссылки
     
     this.init = function () {
         
         $("a[rel='" + this.name + "']").on('click', function () { 
         
             // Обнуляем текущий фрейм
             keyFrame = 0;
         
             $this = $(this);
             GThat.initInterface($this);
             initStatus = true; 
     
         });
         
         $(window).resize(function(){
              if(initStatus) GThat.resize($this);
         }); 

     } // end fun
     
     this.resize = function() {
     
         var doc_w = $(window).width();
         var doc_h = $(window).height();
         
             $(shadow).css({
                 'top': ((doc_h / 2 - 480 / 2) + 10) + 'px',
                 'left': ((((doc_w - navWidth) / 2 + navWidth) - 640 / 2) + 10) + 'px'
             });

             $(cframe).css({
                 'top': (doc_h / 2 - 480 / 2) + 'px',
                 'left': (((doc_w - navWidth) / 2 + navWidth) - 640 / 2) + 'px'
             });


             $(player).css({
                 'top': ((doc_h / 2 - 480 / 2) + 520) + 'px',
                 'left': (((doc_w - navWidth) / 2 + navWidth) - 640 / 2) + 'px'
             });
             
            $(closeButton).css({
                 'top': ((doc_h / 2 - 480 / 2)-25) + 'px',
                 'left': ((((doc_w - navWidth) / 2 + navWidth) - 640 / 2)+560) + 'px',
             });

             $(closeInfo).css({
                 'top': ((doc_h / 2 - 480 / 2)-25) + 'px',
                 'left': ((((doc_w - navWidth) / 2 + navWidth) - 640 / 2)+5) + 'px',
             });
     
     } // end fun

     this.initInterface = function ($this) {

         var that = this;
         
         dpath = $this.data('path');
         
         // чистим массив и удаляем со сцены кадры
         for (var key in GThat.pres_arr){ 
             $(GThat.pres_arr[key].container).remove(); 
             $(GThat.pres_arr[key].shadow).remove(); 
             $(GThat.pres_arr[key].obj).remove();
         } // end for 
         GThat.pres_arr.length = 0;

             var doc_w = $(window).width();
             var doc_h = $(window).height();

             // настройка фонового затемнения
             $(bg).css({
                 'position': 'fixed',
                 'top': '0px',
                 'left': '0px',
                 'margin': '0px',
                 'padding': '0px',
                 'width': '100%',
                 'height': '100%',
                 'background-color': '#442d25',
                 'opacity': '0.8',
                 'z-index': '1'
             });

             $(bg).show();

             // навигация по презентации
             $(nav).css({
                 'position': 'fixed',
                 'top': '0px',
                 'left': '0px',
                 'margin': '0px',
                 'padding': '0px',
                 'width': navWidth + 'px',
                 'height': '100%',
                 'height': '100%',
                 'overflow': 'auto',
                 'color': '#f5f5dc',
                 'z-index': '2'
             });
             $(nav).show();

             $(shadow).css({
                 'position': 'fixed',
                 'top': ((doc_h / 2 - 480 / 2) + 10) + 'px',
                 'left': ((((doc_w - navWidth) / 2 + navWidth) - 640 / 2) + 10) + 'px',
                 'margin': '0px',
                 'padding': '0px',
                 'width': '640px',
                 'height': '480px',
                 'opacity': '0.5',
                 'background-color': '#212121',
                 'z-index': '3'
             });
             $(shadow).show();

             $(cframe).css({
                 'position': 'fixed',
                 'top': (doc_h / 2 - 480 / 2) + 'px', 
                 'left': (((doc_w - navWidth) / 2 + navWidth) - 640 / 2) + 'px',
                 'margin': '0px',
                 'padding': '0px',
                 'width': '640px',
                 'height': '480px',
                 'border': '2px solid #3d2b1f',
                 'color': '#000000',
                 'font-size': '22px',
                 'background-color': '#ffffff',
                 'z-index': '3'
             });
             $(cframe).attr("class", "jspfrime");
             
             // контейнер для контента
             $(cframe_content).attr("class", "jspfrime-content");
             $(cframe).show();
             

             $(ajaxLoader).css({
                 'position': 'absolute',
                 'margin-left': (640 / 2 - 70 / 2) + 'px',
                 'margin-top': (480 / 2 - 72 / 2) + 'px',
                 'padding': '0px',
                 'z-index': '100',
                 'display': 'none'
             });
           
             
             $(player).css({
                 'position': 'fixed',
                 'top': ((doc_h / 2 - 480 / 2) + 520) + 'px',
                 'left': (((doc_w - navWidth) / 2 + navWidth) - 640 / 2) + 'px',
                 'margin': '0px',
                 'padding': '0px',
                 'width': '650px',
                 'height': '35px',
                 'font-size': '14px',
                 'color': '#cfcfcf',
                 'opacity': '0.7',
                 'z-index': '3',
                 'clear': 'both'
             });
             
             // градиент и закругление, для подложки блока управлния
             $(player).cozyStyle({'location': 'top',
                                  'gradient': '#442d25 black',
                                  'nogradient': '#efefef',
                                  'rounding' : '10px'});
             $(player).show();
            
            /* ----- Блок управления -----*/
            $(frame_backward).css({
                 'margin-left': '110px',
                 'margin-top': '5px',
                 'width': '100px',
                 'height': '20px',
                 'float': 'left',
                 'text-align': 'center',
                 'border': '1px solid #660099'
            });
            $(frame_backward).cozyStyle({'gradient': '#003399 black', 'rounding' : '5px'});
            $(frame_backward).html("назад");
            
            $(play).css({
                 'margin-left': '10px',
                 'margin-top': '5px',
                 'width': '100px',
                 'height': '20px',
                 'float': 'left',
                 'text-align': 'center',
                 'border': '1px solid #660099'
            });
            $(play).cozyStyle({'gradient': '#003399 black', 'rounding' : '5px'});
            $(play).html("проиграть");
            
            $(stop).css({
                 'margin-left': '10px',
                 'margin-top': '5px',
                 'width': '100px',
                 'height': '20px',
                 'float': 'left',
                 'text-align': 'center',
                 'border': '1px solid #660099' 
            });
            $(stop).cozyStyle({'gradient': '#003399 black', 'rounding' : '5px'});
            $(stop).html("стоп");
                             
            $(frame_forward).css({
                 'margin-left': '10px',
                 'margin-top': '5px',
                 'width': '100px',
                 'height': '20px', 
                 'float': 'left',
                 'text-align': 'center',
                 'border': '1px solid #660099'
            });
            $(frame_forward).cozyStyle({'gradient': '#003399 black', 'rounding' : '5px'});
            $(frame_forward).html("вперёд");       
            /* \----- Блок управления -----*/  
            
            $(closeButton).css({
                 'position': 'fixed',
                 'top': ((doc_h / 2 - 480 / 2)-25) + 'px',
                 'left': ((((doc_w - navWidth) / 2 + navWidth) - 640 / 2)+560) + 'px',
                 'margin': '0px',
                 'padding': '0px',
                 'width': '80px',
                 'height': '25px',
                 'color': '#fff5ee',
                 'text-align': 'right',
                 'font-size': '16px',
                 'cursor': 'pointer',
                 'z-index': '10'
             });
             $(closeButton).html("закрыть");
             $(closeButton).show();
         
             
             $(closeInfo).css({
                 'position': 'fixed',
                 'top': ((doc_h / 2 - 480 / 2)-25) + 'px',
                 'left': ((((doc_w - navWidth) / 2 + navWidth) - 640 / 2)+5) + 'px',
                 'margin': '0px',
                 'padding': '0px',
                 'width': '150px',
                 'height': '25px',
                 'color': '#ccc5bb',
                 'text-align': 'left',
                 'font-size': '12px',
                 'z-index': '10'
             });
             $(closeInfo).show();
                             

             // добавлено ли на сцену
             if (!apdstatus) {
                 $("body").append(bg);
                 $("body").append(nav);
                 $("body").append(shadow);
      
                 $(cframe).append(cframe_content);
                 
                 $("body").append(cframe);
                 $("body").append(player);
                 
                 $("body").append(closeButton);
                 $("body").append(closeInfo);
                 
                 $(player).append(frame_backward).append(play).append(stop).append(frame_forward);  
             } // end if
             apdstatus = true;

             var url = dpath + "manifest.xml";

             $.ajax({
                 type: "GET",
                 dataType: "xml",
                 url: url,
                 beforeSend: function () {
                     $(ajaxLoader).show();
                 },
                 success: function (xml) {
                     $(ajaxLoader).hide();

                     $(xml).find("item").each(function (index) {

                         that.pres_arr.push({
                             slide: $(this).text(),
                             status: false,
                             htmlcode: "",
                             htmlcode_slide: "",
                             obj: null,
                             shadow: null,
                             container: null,
                             c_ajax_loader: null,
                             content: null
                             
                         });

                     });
                         
                         
                     that.setList(that.pres_arr, dpath);

                     $.ajax({
                         type: "GET",
                         dataType: "html",
                         url: dpath + "slides/" + that.pres_arr[0].slide,
                         beforeSend: function () {
                             $(ajaxLoader).show();
                         },
                         success: function (msg) {
                             $(ajaxLoader).hide();
                             
                             // подставляем путь
                             msg = msg.split("{path}").join(dpath)
                             
                             $(cframe_content).html(msg);
                             
                             $(closeInfo).html((keyFrame+1)+" слайд из "+GThat.pres_arr.length);

                         }
                     });



                 }
             });

             return false;
        

     } // end fun
     
     this.setList = function(arr, dpath){
     
         var that = this;

         for (var key in arr){
         
             // контейнер
             arr[key].container = document.createElement('div'); 
             $(arr[key].container).css({
                 'width': '150px',
                 'height': '112px',
                 'margin-bottom': '15px',
                 'margin-left': '15px',
                 'margin-top': '15px',
                 'cursor': 'pointer',
                 'z-index': '1'
             });
            
            // тень 
            arr[key].shadow = document.createElement('div'); 
            $(arr[key].shadow).css({
                 'position': 'absolute',
                 'width': '150px',
                 'height': '112px',
                 'margin-left': '5px',
                 'margin-top': '5px',
                 'opacity': '0.5',
                 'background-color': '#212121',
                 'z-index': '2'
             });
             $(arr[key].container).append(arr[key].shadow);
             
            // полотно 
            arr[key].obj = document.createElement('div');
            $(arr[key].obj).attr('id','jspnframe'+key);
            $(arr[key].obj).attr('class', 'preview-jspn'); 
            $(arr[key].obj).css({
                 'position': 'absolute',
                 'width': '150px',
                 'height': '112px',
                 'z-index': '3'
             });  
             $(arr[key].container).append(arr[key].obj);
             arr[key].obj.setAttribute("data-id", key);
             $(arr[key].obj).click(function(e){
             
             
                 var dkey = this.getAttribute("data-id");
                 
                // alert(dkey);
                
                 that.newSlide(arr, dkey);
             }) // end click
            
            // ajax-загрузчик
            arr[key].c_ajax_loader = new Image();  
            $(arr[key].c_ajax_loader).css({
                 'position': 'absolute',
                 'width': '25px',
                 'height': '26px',
                 'margin-left': '62px',
                 'margin-top': '43px',
                 /*'border': '1px solid red',*/
                 'z-index': '10'
             });
             arr[key].c_ajax_loader.src = "loader-min.gif";
             $(arr[key].obj).append(arr[key].c_ajax_loader);
             
            // контейнер для контента
            arr[key].content = document.createElement('div');
            $(arr[key].content).attr('class', 'preview-content-jspn');
            $(arr[key].obj).append(arr[key].content); 

             // добавляем на сцену
             $(nav).append(arr[key].container);
             
              // загрузка превью слайдов
              that.loadPreview(dpath, arr[key]);
              
              // выделяем первый слайд
              $(arr[0].obj).attr('class', 'preview-jspn-active');

         
         }
     
     } // end fun
     
     this.loadPreview = function(dpath, objt){
     
             // загрузка превью слайдов
             $.ajax({
                 type: "GET",
                 dataType: "html",
                 url: dpath + "previews/" + objt.slide,
                 beforeSend: function () {
                     $(objt.c_ajax_loader).show();
                 },
                 success: function (msg) {
                 
                    // подставляем путь
                    msg = msg.split("{path}").join(dpath);
                 
                    // помещаем html-код в слой контента 
                    $(objt.content).html(msg);
         
                     // загружаем сам слайд
                     $.ajax({
                         type: "GET",
                         dataType: "html",
                         url: dpath + "slides/" + objt.slide,
                         success: function (msg) {
                             $(objt.c_ajax_loader).hide();
 
                             objt.htmlcode_slide = msg;
                         }
                     });
                 }
             });
    } // end fun
    
    this.newSlide = function(arr, key){
    
      for (var k in arr){
      
          // снимаем выделение
          $(arr[k].obj).attr('class', 'preview-jspn'); 
          
      } // end for
      
      // выделяем новый слайд
      $(arr[key].obj).attr('class', 'preview-jspn-active');
    
      // подставляем путь
      arr[key].htmlcode_slide = arr[key].htmlcode_slide.split("{path}").join(dpath);
    
      $(cframe_content).html(arr[key].htmlcode_slide);
     
      // плавная перемотка 
      $(nav).scrollTo('#jspnframe'+key, 1000, {offset:{top:-30}});
      
      keyFrame = key;
      
      $(closeInfo).html((parseInt(keyFrame)+1)+" слайд из "+GThat.pres_arr.length);
    
    } // end fun

    

 };
 var jspresentation = new JSPresentation();