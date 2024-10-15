function pasteTime() {
    var time = mp.command_native({name: "subprocess", capture_stdout: true, args: ["powershell", "Get-clipboard"]}).stdout;
    if (time.indexOf("~") == -1) {
        time = Number(time);
        if (isFinite(time))
            mp.set_property("time-pos", time);
        else
            mp.osd_message("Invalid time value");
    } else {
        var time = time.split(" ~ ");
        var a = Number(time[0]);
        var b = Number(time[1]);
        if (isFinite(a) && isFinite(b)) {
            mp.set_property("ab-loop-a", a);
            mp.set_property("ab-loop-b", b);
            mp.set_property("time-pos", a);
            mp.osd_message("A-B loop");
        } else {
            mp.osd_message("A-B loop missing");
        }
    }
}

mp.add_key_binding("Ctrl+v", pasteTime);