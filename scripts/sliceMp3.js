var ffmpeg = "ffmpeg";
var path = "$HOME\\Music\\";

function pad(num, size) {
    return ("000" + num).slice(-size);
}

function format_time(sec) {
    var ms = Math.round(sec * 1000);
    var time = [Math.floor(ms / 3600000), Math.floor(ms % 3600000 / 60000), Math.floor(ms % 3600000 % 60000 / 1000), ms % 1000];
    return pad(time[0], 2) + ":" + pad(time[1], 2) + ":" + pad(time[2], 2) + "." + pad(time[3], 3);
}

function sliceMp3(){
    var a = Number(mp.get_property("ab-loop-a"));
    var b = Number(mp.get_property("ab-loop-b"));
    if (isFinite(a) && isFinite(b)) {
        var start = format_time(a);
        var end = format_time(b);
        if (a > b) {
            start = format_time(b);
            end = format_time(a);
    }
        var filename = mp.get_property("filename/no-ext") + " - " + mp.get_property("time-pos").replace(".", ",") + ".mp3";
        var output = '"' + path + filename + '"';
        var input = '"' + mp.get_property("path") + '"';
        var id = mp.get_property("current-tracks/audio/id");
        id = isNaN(id)? 0 : id - 1;
        mp.commandv("run", "powershell", ffmpeg, "-i", input, "-map 0:a:" + id, "-ss", start, "-to", end, output);
        mp.osd_message(filename);
    } else {
        mp.osd_message("A-B loop missing");
    }
}

mp.add_key_binding("Ctrl+s", sliceMp3);