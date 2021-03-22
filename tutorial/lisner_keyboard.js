function do_post(animeMessage) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    // xhttp.onload = () => {
    //     console.log(xhttp.status);
    //     console.log("success!");
    // };
    // xhttp.onerror = () => {
    //     console.log(xhttp.status);
    //     console.log("error!");
    // };
    xhttp.open("POST", "http://127.0.0.1:2525/");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(animeMessage);
}
BACK_TIME = 1
// 何段階スピードを落とす変えるか
// 例2ならば2回遅くした後、元のスピードに戻る
DELAY_SPEED_MODE_NUM = 2
DELAY_SPEED_NUM = 0.25
current_delay_speed_mode = 0

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if event already handled
    }
    video = $("#video").get(0)

    switch (event.code) {
        case "KeyS":

            $(".controller").hide();
            $(".waitArea").hide();
            var animeTitle = $(".pauseInfoTxt1").text();
            var animeEpisodeNumber = $(".pauseInfoTxt2").text();
            console.log(animeTitle, animeEpisodeNumber);

            display_time = String(video.currentTime)
            var message = JSON.stringify({
                "title": animeTitle,
                "epsodeNumber": animeEpisodeNumber,
                "time": display_time
            });

            do_post(message);
            break;
        case 'KeyF':
            $(".fullscreenButton").click()
            break;
        case "KeyB":
            video.currentTime -= BACK_TIME
        case "KeyN":
            current_rate = 1 - (current_delay_speed_mode % (DELAY_SPEED_MODE_NUM + 1)) * DELAY_SPEED_NUM
            // console.log(current_rate)
            video.playbackRate = current_rate
            
            current_delay_speed_mode += 1
            current_delay_speed_mode %= (DELAY_SPEED_MODE_NUM+1)
        case "KeyQ":
            $(".controller").toggle();
            $(".waitArea").toggle();

    }
});
