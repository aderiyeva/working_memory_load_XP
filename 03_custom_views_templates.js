// In this file you can create your own custom view templates


// A view template is a function that returns a view,
// this functions gets some config (e.g. trial_data, name, etc.) information as input
// A view is an object, that has a name, CT (the counter of how many times this view occurred in the experiment),
// trials the maximum number of times this view is repeated
// and a render function, the render function gets CT and the magpie-object as input
// and has to call magpie.findNextView() eventually to proceed to the next view (or the next trial in this view),
// if it is an trial view it also makes sense to call magpie.trial_data.push(trial_data) to save the trial information

const custom_views = {};

// In this view the user can click on one of two buttons
custom_views.show_recall = function(config) {
    const show_recall_function = {
        name: config.name,
        CT: 0,
        trials: config.trials,
        // The render functions gets the magpie object as well as the current trial in view counter as input
        render: function (CT, magpie) {
            
            const recall_type = config.recall_type;
            const recall_count = config.recall_count;

            const letters = ["D", "F", "G", "K", "L", "N", "Q", "R", "V", "X", "Z"];

            var recall_list = [];
            var i;
            for (i = 0; i < recall_count; i++) {
                if(recall_type === "letters") {
                    recall_list.push( letters[ _.random(letters.length-1, false) ] );
                }
                else if(recall_type === "numbers") {
                    recall_list.push( _.random(9, false) );
                }
            } 


            // Here, you can do whatever you want, eventually you should call magpie.findNextView()
            // to proceed to the next view and if it is an trial type view,
            // you should save the trial information with magpie.trial_data.push(trial_data)

            // Normally, you want to display some kind of html, to do this you append your html to the main element
            // You could use one of our predefined html-templates, with (magpie.)stimulus_container_generators["<view_name>"](config, CT)
            $("main").html(`<div class='magpie-view'>
                <h1 class='magpie-view-title'>Remember those ${recall_type}:</h1>
                <p style="font-size:50px; text-align:center">${recall_list.join(' ')}</p>
                <button id="first" class='magpie-view-button'>Continue</button>
                </div>`);

            // This function will handle  the response
            const handle_click = function(e) {
                // We will just save the response and continue to the next view
                let trial_data = {
                    trial_name: config.name,
                    trial_number: CT + 1,
                    recall_type: recall_type,
                    recall_list: recall_list.join(' '),
                };
                // Often it makes sense to also save the config information
                // trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

                // Here, we save the trial_data
                magpie.trial_data.push(trial_data);

                // Now, we will continue with the next view
                magpie.findNextView();
            };

            // We will add the handle_click functions to both buttons
            $('#first').on("click", handle_click);

            // That's everything for this view
        }
    };
    // We have to return the view, so that it can be used in 05_views.js
    return show_recall_function;
};


// In this view the user can click on one of two buttons
custom_views.check_recall = function(config) {
    const check_recall_function = {
        name: config.name,
        CT: 0,
        trials: config.trials,
        // The render functions gets the magpie object as well as the current trial in view counter as input
        render: function (CT, magpie) {
            
            const found = magpie.trial_data.find(element => element.trial_name === config.show_partner);

            const recall_type = found.recall_type;
            const recall_list = found.recall_list;

            const trial_type = config.trial_type;

            console.log(recall_type);
            console.log(recall_list);


            const viewTemplate = 
                `<div class='magpie-view'>
                    <h1 class='magpie-view-title'>Please type in the ${recall_type} from before:</h1>
                </div>`;

            const textInputContainer = 
                `<div class='magpie-view-answer-container'>
                    <textarea name='textbox-input' rows=1 cols=6 class='magpie-response-text' />
                </div>`;

            const checkButtonContainer = `<button id="check" class='magpie-view-button'>Check Answer</button>`;

            const nextButtonContainer = `<button id="next" class='magpie-view-button'>Continue</button>`;
                    
            $("#main").html(viewTemplate);
            $(".magpie-view").append(textInputContainer);

            var recall_answer = [];

            // This function will handle  the response
            const handle_check = function(e) {
                
                recall_answer = $("textarea").val().trim().toUpperCase().split('').join(' ');
                console.log(recall_answer);

                const answerContainerElem = 
                    `<p style="font-size:25px; text-align:center">Your answer: ${recall_answer}</p>
                     <p style="font-size:25px; text-align:center">Correct answer: ${recall_list}</p>`;
                
                $("#main").html(viewTemplate);
                $(".magpie-view").append(answerContainerElem);
                $(".magpie-view").append(nextButtonContainer);
                $('#next').on("click", handle_next);
            };

            // This function will handle  the response
            const handle_next = function(e) {
                
                if(trial_type !== "practice") {
                    recall_answer = $("textarea").val().trim();
                    console.log(recall_answer);
                }

                // We will just save the response and continue to the next view
                let trial_data = {
                    trial_name: config.name,
                    trial_number: CT + 1,
                    recall_type: recall_type,
                    recall_list: recall_list,
                    recall_answer: recall_answer,
                };

                // Here, we save the trial_data
                magpie.trial_data.push(trial_data);

                // Now, we will continue with the next view
                magpie.findNextView();
            };

            if(trial_type === "practice") {
                $(".magpie-view").append(checkButtonContainer);
            } else {
                $(".magpie-view").append(nextButtonContainer);
                $('#next').on("click", handle_next);
            }

            // We will add the handle_click functions to both buttons
            $('#check').on("click", handle_check);
            
        }
    };
    // We have to return the view, so that it can be used in 05_views.js
    return check_recall_function;
};


custom_views.key_press = function(config) {

    const odd_even_task = {
        id: 0,
        name: "odd_even_task",
        color: "color:blue;",
    };
    const less_greater_task = {
        id: 1,
        name: "less_greater_task",
        color: "color:red;",
    };

    const task_list = [odd_even_task, less_greater_task];

    const task_questions = ["Is this number odd or even?", "Is this number less/greater than 5?"];
    
    const length = config.trials;

    const switch_steps = config.switch_steps;

    // 0 1 2 3 4 5 6 7

    // Generate switch pattern
    var switch_pattern = [];
    var i;
    for (i = 0; i < switch_steps; i++) {
        var switch_position = _.random(length-2, false);

        while( switch_pattern.includes(switch_position) ) {
            switch_position = _.random(length-2, false);
        }
        
        switch_pattern.push(switch_position);
    }
    console.log(switch_pattern);


    // Generate task sequence
    var task_sequence = [];
    // First init a random task
    var task_id = _.random(1, false);
    var j;
    for (j = 0; j < length; j++) {

        // Add task to sequence
        task_sequence.push(task_list[task_id]);

        // Check if current position is a switch
        // And switch to other task if true
        if( switch_pattern.includes(j) ) {
            task_id = 1 - task_id;
        }
    }
    console.log(task_sequence);

    // Generate random number sequence
    var number_sequence = [];
    var k;
    for (k = 0; k < length; k++) {
        // Check if task at the position is a less_greater task
        var is_less_greater = task_sequence[k].id === less_greater_task.id;
        
        // Generate random number
        var random_number = _.random(9, false);

        // If it's a less_greater task and the number is 5
        // then randomly increment/decrement to 4 or 6 
        if(is_less_greater && random_number === 5) {
            random_number += (_.random(1, false) === 0) ? -1 : 1;
        }

        number_sequence.push(random_number);
    } 

    const key_press_function = {
        name: config.name,
        title: magpieUtils.view.setter.title(config.title, ""),
        render: function(CT, magpie) {

            let startingTime;
            
            const trial_type = config.trial_type;

            const current_task = task_sequence[CT];

            const question = magpieUtils.view.setter.question( task_questions[current_task.id] );

            const key1 = config.key1;
            const key2 = config.key2;
            const value1 = config[key1][current_task.id];
            const value2 = config[key2][current_task.id];

            const switch_mode = config.switch_mode;
            
            const timeout_message = config.timeout_message;
            
            const stimulus_number = number_sequence[CT];
            const stimulus_color = current_task.color;

            var expected_answer;
            if(current_task.id === 0) {
                // odd/even
                expected_answer = stimulus_number % 2 == 0 ? config[key2][0] : config[key1][0];
            } else if(current_task.id === 1) {
                // less/greater
                expected_answer = stimulus_number < 5 ? config[key1][1] : config[key2][1];
            }

            const viewTemplate = 
                `<div class="magpie-view">
                    <h1 class='magpie-view-title'>${this.title}</h1>
                    <p class='magpie-view-question'>${question}</p>
                    <p style="font-size:50px; text-align:center; ${stimulus_color}">${stimulus_number}</p>
                    <p class='magpie-response-keypress-header'><strong>${key1}</strong> = ${value1}<strong>    ${key2}</strong> = ${value2}</p>
                    <p class='magpie-response-keypress-header' id='feedback'></p>
                </div>`;


            const timeOutContainerElem =
                `<br /> 
                    <p><b>${timeout_message}</b></p> 
                <br /> `;

            $("#main").html(viewTemplate);

            const handleKeyPress = function(e) {
                const keyPressed = String.fromCharCode(
                    e.which
                ).toLowerCase();

                if (keyPressed === key1 || keyPressed === key2) {
                    let correctness;
                    const RT = Date.now() - startingTime; // measure RT before anything else

                    if (expected_answer === config[keyPressed][current_task.id]) {
                        correctness = "correct";
                        // show feedback (for practice trial only)
                        if(trial_type === "practice") {
                            $('#feedback').text('Correct!');
                        }
                    } else {
                        correctness = "incorrect";
                        // show feedback (for practice trial only)
                        if(trial_type === "practice") {
                            $('#feedback').text('Incorrect!');
                        }
                    }

                    const trial_data = {
                        trial_name: config.name,
                        trial_type: trial_type,
                        trial_number: CT + 1,
                        key1: key1,
                        key2: key2,
                        value1: value1,
                        value2: value2,
                        switch_mode: switch_mode,
                        number_sequence: number_sequence,
                        task: current_task.name,
                        stimulus_number: stimulus_number, 
                        key_pressed: keyPressed,
                        expected_answer: expected_answer,
                        correctness: correctness,
                        RT: RT,
                    };

                    magpie.trial_data.push(trial_data);
                    $("body").off("keydown", handleKeyPress);
                    if(trial_type === "practice") {
                        setTimeout(magpie.findNextView, 500); // delay to accomodate feedback
                    } else {
                        magpie.findNextView();
                    }
                }
            };

            const enableResponse = function() {
                $(".magpie-view").append(answerContainerElem);
                $("body").on("keydown", handleKeyPress);
            };

            const handleTimeout = function() {
                $(".magpie-view").append(timeOutContainerElem);
                setTimeout(magpie.findNextView, 500);
            }

            startingTime = Date.now();
            
            $("body").on("keydown", handleKeyPress);
            
            //setTimeout(handleTimeout, 7500);

            // creates the DOM of the trial view
            // magpieUtils.view.createTrialDOM(
            //     {
            //         pause: config.pause,
            //         fix_duration: config.fix_duration,
            //         stim_duration: config.stim_duration,
            //         evts: config.hook,
            //         view: "keyPress"
            //     },
            //     enableResponse
            // );
        },
        CT: 0,
        trials: config.trials
    }

    return key_press_function;
};