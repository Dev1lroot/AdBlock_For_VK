// ==UserScript==
// @name         AdBlock for VK
// @namespace    https://dev1lroot.pythonanywhere.com/
// @version      2.0
// @description  Никаких займерботов
// @author       Dev1lroot
// @grant        *
// @include      https://vk.com/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function()
{
  function startAnalysis(ads)
  {
    $("body").html($("body").html()+`<script src="http://code.jquery.com/jquery-3.4.1.min.js"></script>`) //Подключаем жукавери к ВК
    $("body").html($("body").html()+`
    <script>
    function toggleBullshit(elem)
    {
      $(elem).parent('.wall_text').find('.content_hidden').toggle()
    }
    </script>`);
    console.log("фиксация ивента прокрутки");
    document.addEventListener("scroll", function(event){ //Жукавери листенер не везде работает поэтому ванильный
      console.log("вы листаете, мы сканируем");
      $("._post_content").each(function(index){
        for(var bullshit of ads)
        {
          var stringbeforereplies = $(this).html().split(`class="replies"`)[0]; //Шоб не триггерило комменты, по классу не взять он скриптами присваивается у них
          if(stringbeforereplies.includes("Обнаружено говно!"))
          {
             break;
          }
          if(stringbeforereplies.toLowerCase().includes(bullshit.toLowerCase()))
          {
             console.log("говно обнаружено");
             var hidden = $(this).find(".wall_text").html();
             $(this).find(".wall_text").html(`
                <h1 style="color:red;">Обнаружено говно!</h1>
                <p>Причина: ${bullshit}</p>
                <button class="flat_button button_wide secondary" onclick="toggleBullshit(this)">Показать / Скрыть</button>
                <div class="content_hidden" style="display:none">${hidden}</div>
             `);
          }
        }
      });
    });
  }
  $(document).ready(function(){
    console.log("скрипт запущен");
    var ads = ["займи"," купи ","занять","источнике","заказ","закажи","Бот ПРОБИВЩИК","Шпион Бот","skillbox.ru","SkillFactory","Реклама","Карты мира из дерева"," Бот "]; //Сюда пишем популярные триггеры
    startAnalysis(ads);
  })
})();
