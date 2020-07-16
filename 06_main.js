// In this file you initialize and configure your experiment using magpieInit

$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }
    };




    // calls magpieInit
    // in debug mode this returns the magpie-object, which you can access in the console of your browser
    // e.g. >> window.magpie_monitor or window.magpie_monitor.findNextView()
    // in all other modes null will be returned
    window.magpie_monitor = magpieInit({
        // You have to specify all views you want to use in this experiment and the order of them
        views_seq: [
            intro,
            instructions,
            
            practice_show_recall,
            key_press_practice,
            practice_check_recall,
            
            begin_main_trials,

            // 3 Variables
            main_show_recall_3_letters_low_switch,
            key_press_main_3_letters_low_switch,
            main_check_recall_3_letters_low_switch,
            
            main_show_recall_3_numbers_low_switch,
            key_press_main_3_numbers_low_switch,
            main_check_recall_3_numbers_low_switch,
            
            main_show_recall_3_letters_high_switch,
            key_press_main_3_letters_high_switch,
            main_check_recall_3_letters_high_switch,
            
            main_show_recall_3_numbers_high_switch,
            key_press_main_3_numbers_high_switch,
            main_check_recall_3_numbers_high_switch,
            
            // 6 Variables
            main_show_recall_6_letters_low_switch,
            key_press_main_6_letters_low_switch,
            main_check_recall_6_letters_low_switch,
            
            main_show_recall_6_numbers_low_switch,
            key_press_main_6_numbers_low_switch,
            main_check_recall_6_numbers_low_switch,
            
            main_show_recall_6_letters_high_switch,
            key_press_main_6_letters_high_switch,
            main_check_recall_6_letters_high_switch,
            
            main_show_recall_6_numbers_high_switch,
            key_press_main_6_numbers_high_switch,
            main_check_recall_6_numbers_high_switch,

            post_test,
            thanks,
        ],
        // Here, you can specify all information for the deployment
        deploy: {
            experimentID: 160,
            serverAppURL: "https://magpie-demo.herokuapp.com/api/submit_experiment/",
            // Possible deployment methods are:
            // "debug" and "directLink"
            // As well as "MTurk", "MTurkSandbox" and "Prolific"
            deployMethod: "debug",
            contact_email: "aderiyeva@uos.de",
        },
        // Here, you can specify how the progress bar should look like
        progress_bar: {
            in: [
                // list the view-names of the views for which you want a progress bar
                key_press_practice.name,
                key_press_main_3_letters_low_switch.name,
                key_press_main_3_numbers_low_switch.name,
                key_press_main_3_letters_high_switch.name,
                key_press_main_3_numbers_high_switch.name,
                key_press_main_6_letters_low_switch.name,
                key_press_main_6_numbers_low_switch.name,
                key_press_main_6_letters_high_switch.name,
                key_press_main_6_numbers_high_switch.name,
            ],
             // Possible styles are "default", "separate" and "chunks"
            style: "separate",
            width: 100
        }
    });
});
