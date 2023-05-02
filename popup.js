var autoClick;
var timerId;
var arg;
var err;
var titleVar;

function changeLangToRus() {
    var buttonStart = document.getElementById("grabBtn");
    var buttonStop = document.getElementById("StopBtn");
    var changeYourLangLabel1 = document.getElementById("changeYourLangLabel1");
    changeYourLangLabel1.textContent = "Выберите ваш язык"
    buttonStart.textContent = "Запустить скрипт";
    buttonStop.textContent = "Остановить скрипт";
  }
  
  // вызываем функцию при нажатии на кнопку
  document.getElementById("rusLangButt").addEventListener("click", changeLangToRus);
  
  function changeLangToEng() {
    var buttonStart = document.getElementById("grabBtn");
    var buttonStop = document.getElementById("StopBtn");
    var changeYourLangLabel1 = document.getElementById("changeYourLangLabel1");
    changeYourLangLabel1.textContent = "Choose your language"
    buttonStart.textContent = "Start script";
    buttonStop.textContent = "Stop script";
  }
  
  // вызываем функцию при нажатии на кнопку
  document.getElementById("engLangButt").addEventListener("click", changeLangToEng);
  
const grabBtn = document.getElementById("grabBtn");
grabBtn.addEventListener("click",() => {    
    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func:interval,
                    args:['0'],
                },
                onResult
            )
        } else {
            alert("There are no active tabs")
        }
    })
})

const stopBtn = document.getElementById("StopBtn");
stopBtn.addEventListener("click",() => {    
    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func:interval,
                    args:['1'],
                },
                onResult
            )
        } else {
            alert("There are no active tabs")
        }
    })
})

function interval(args) {
  err = 0;
  if(args === '1') {
    timerId = clearInterval(timerId);
    console.log('Function has been stopped');
  }
  if(args === '0') {
    timerId = setInterval(() => {
      set();
  }, 1000)
    console.log('Function has been started');
  }

  function set() {
      try {
          autoClick = document.querySelector(`button[title="${titleVar}"]`);
          autoClick.click();
          scrollingToSaveData = autoClick;
          scrollingToSaveData.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
          console.log("Like");
          err = 0;
          }
        catch(e) {
          console.log("Button \"Like\" is not found.")
          window.scrollTo({
            top: 999999999,
            behavior: "smooth"
        });
          if(err >= 20) {
            timerId = clearInterval(timerId);
            console.log('Function has been stopped');
          }
            err += 1;
        }
    }
}

function onResult(frames) {

}