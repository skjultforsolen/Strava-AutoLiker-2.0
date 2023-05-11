var autoClick;
var timerId;
var arg;
var err;

console.log("injected");

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
          autoClick = document.querySelector('button[title="Поставить зачет"]');
          autoClick.click();
          scrollingToSaveData = autoClick;
          scrollingToSaveData.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
          console.log("Like");
          err = 0;
          }
        catch(e) {
          console.log("Кнопка \"Лайк\" не найдена.")
          window.scrollTo({
            top: 999999999,
            behavior: "smooth"
        });
          if(err >= 10) {
            timerId = clearInterval(timerId);
            console.log('Function has been stopped');
          }
            err += 1;
        }
    }
}

function onResult(frames) {

}