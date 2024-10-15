var notes = '"$HOME\\Documents\\notes.txt"';
var loops = '"$HOME\\Documents\\loops.txt"';

function repeat(char, n){
    var result = char;
    while (result.length < n) {
        result += char;
    }
    return result;
}

function saveTime() {
    var a = Number(mp.get_property("ab-loop-a"));
    var b = Number(mp.get_property("ab-loop-b"));
    if(isFinite(a) && isFinite(b)) {
        var txt = '"' + mp.get_property("path") + ' -> ' + a + " ~ " + b + "\n" + repeat('-', 100) + '"';
        mp.commandv("run", "powershell", txt, ">>", loops);
        mp.osd_message("Saved in Loops");
    } else {
        var sub = mp.get_property("sub-text", "").split('"').join('""');
        if (sub) {
            var txt = '"' + mp.get_property("path") + ' -> ' + mp.get_property("sub-start") + '\n\n' + sub + '\n' + repeat('-', 100) +'"';
            mp.commandv("run", "powershell", txt, ">>", notes);
            mp.osd_message("Saved in Notes");
        }
    }
}

mp.add_key_binding("x", saveTime);