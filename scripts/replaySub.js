function replaySub() {
    if (mp.get_property("sub-text", "")) {
        mp.set_property("ab-loop-a", mp.get_property("sub-start"));
        mp.set_property("ab-loop-b", mp.get_property("sub-end"));
        mp.osd_message("A-B loop");
    }
}

mp.add_key_binding("r", replaySub);