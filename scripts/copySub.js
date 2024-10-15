function copySub() {
        var sub = mp.get_property("sub-text", "");
        if (sub) {
            sub = "'" + sub.split("'").join("''") + "'";
            mp.commandv("run", "powershell", "Set-Clipboard", sub);
            mp.osd_message("Copied to Clipboard");
        }
}

mp.add_key_binding("Ctrl+c", copySub);