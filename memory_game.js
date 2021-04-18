//1.標記牌是翻開還是沒翻(end 1-7)
//2.看兩張牌是否為mactch(end 2-5)
//3.解決breaksystem問題一:matching閒置時間內又點其他的牌(end 3-4)
//4.解決breaksysytem問題二:同一張牌點兩下 (解決方式只需一行)
//5.洗牌 shuffle css.order可以在不受div先後放置順序的情況下 改變排列順序

//1-1.一開始先將'已翻牌'狀態設為false
var hasflipedcard = false;
//2-1.預設第一張、第二張牌的變數
var firstcard, secondcard;
//3-1.由於不是match時有一點閒置時間 這時點下一張牌會break the system 所以在閒置時間結束前要讓flipcard() 暫時 defunction
var lockBoard = false;

var allcards = document.querySelectorAll('.game_card');

function flipcard(a) {
    // console.log(allcards);
    if (lockBoard == true) {
        return;
        //3-2.這邊的return是不讓它繼續往下做的意思
    }
    //4.如果現在點的牌跟第一張的值一模一樣 function就不會繼續下去
    if (a.currentTarget === firstcard) {
        return;
    }
    // if (a.currentTarget)
    // console.log('Clicked');
    //1-2.得到現在function作用在什麼東西上 可以使用event.currentTarget
    // console.log(a.currentTarget); <dic class:---->
    //1-3.取class做某件事 用classList
    //1-4.點下去 被點的target會加上fliped
    //1-5.新學的toggle 如果沒有這個字會增加 如果有會去掉 所以這邊的情況是 click後會在div.game_card後面加上.flip
    a.currentTarget.classList.toggle('fliped');

    //記得if(裡面是==or===) 不要再搞錯了ㄚㄚㄚㄚ (o益o)
    if (hasflipedcard == false) {
        //1-6.這是按第一張牌的狀態
        hasflipedcard = true;
        firstcard = a.currentTarget;

    } else {
        //1-7.按下第二張牌後的狀態
        hasflipedcard = false;
        secondcard = a.currentTarget;

        //2-2.檢查兩張牌是否match
        //2-3. 取得第一張牌和第二張牌的data-cardname
        // console.log(firstcard.dataset.cardname);
        // console.log(secondcard.dataset.cardname);
        if (firstcard.dataset.cardname === secondcard.dataset.cardname) {
            //全部寫在裡面會很難找到東西 所以把一部分抓出來弄成function
            disablecard();
        } else {
            unflipcards();
        }

    }
    let alldone = document.querySelectorAll('.done').length;
    console.log(document.getElementById('showmedance').style);
    if (alldone === 12) {
        document.getElementById('showmedance').style.visibility = 'visible';
    }
}

//2-4.如果兩者data值相等 match 所以牌不能再翻回去 且onclick也不再起作用
function disablecard() {
    firstcard.classList.value = 'done';
    secondcard.classList.value = 'done';
    firstcard.onclick = null;
    secondcard.onclick = null;
}

//2-5.如果不是match 牌要翻回去 也就是把fliped class去掉
function unflipcards() {
    //3-3.這邊要做個暫停 在還沒算完前不可執行flipcard()
    lockBoard = true;

    function notamatch() {
        firstcard.classList.remove('fliped');
        secondcard.classList.remove('fliped');
        //3-4.算完後再把lockBoard切回來
        lockBoard = false;
    }
    setTimeout(notamatch, 1500);

}
(function shuffle() {
    //5.order的數值可以重複 它會自動排序 所以隨機取值就好
    //forEach()是給每一個.前面的元素 一個一個加上style.order 
    allcards.forEach(function(card) {
        let randomorder = Math.floor(Math.random() * 12);
        card.style.order = randomorder;
    })
})();
//刷新頁面
function refresh() {
    window.location.reload();
}