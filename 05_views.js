// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  title: "Welcome to the experiment on digit comparison!",
  text: `Dear participant,
            <br />
            <br />
            thank you for the decision to devote your time to passing this short test. 
            <br />
            In the following experiment you will be presented with the list of digits or letters, which you will be asked to recall in the exact order. 
            Before the recall, you will be asked to make several judgment on the digits:
            <br />
            <br />
            If the digit is blue: to judge whether it is even (0, 2, 4, 6, 8) or odd (1, 3, 5, 7, 9).
            <br />
            If the digit is red: to judge whether it is higher (6, 7, 8, 9) or lower (1, 2, 3, 4) than 5.
            <br />
            <br />
            Please, start experiment when you are in the state to which you could refer as "normal" (not too tired, not too sleepy, not extremely hungry, etc)
            <br />
            Approximate duration of the whole experiment is 15 minutes.
            <br />
            <br />
            Good luck!`,
  buttonText: 'begin the experiment'
});

// For most tasks, you need instructions views
const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions',
  title: 'General Instructions',
  text: `In the following trials you will be presented with combination of letters or numbers, and then with series of single numbers to be judged.
          You are asked to remember the letter in the beginning, go through the series of the judgments and then recall the first letter.
         <br />
         If the digit is red: to judge whether it is higher (6, 7, 8, 9) or lower (1, 2, 3, 4) than 5
         If the digit is blue: to judge whether it is even (0, 2, 4, 6, 8) or odd (1, 3, 5, 7, 9).
         <br />
         To confirm your judgment, you will have to press one of the following keys:
         <br />
         J - "lower than 5 / odd"
         F - "higher than 5 / even"
         <br />
         <br />
         Please, try to answer as accurate as possible during the series of judgments.
            <br />
            <br />
            Let´s get started!`,
  buttonText: 'Start Practice'
});


// For most tasks, you need instructions views
const begin_main_trials = magpieViews.view_generator("begin", {
  trials: 1,
  name: 'begin_main_trials',
  title: 'General Instructions',
  text: `In the following trials you will be presented with combination of letters or numbers, and then with series of single numbers to be judged.
         <br />       
         You are asked to remember the letter in the beginning, go through the series of the judgments and then recall the first letter.
         <br />
         J - "lower than 5 / odd"
         <br />
         F - "higher than 5 / even"
         <br />
         <br />
         Please, try to fixate your gaze at the white dot in the middle of the picture all the time.
            <br />
            <br />
            Let´s get started!`,
  buttonText: 'Start Experiment'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Additional information',
  text: 'Answering the following questions is optional, but your answers will help us analyze the results.'

  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Thank you for taking part in this experiment! Take care and have a great time!',
  prolificConfirmText: 'Press the button'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
*/

const practice_show_recall = custom_views.show_recall({

  trials: 1,

  trial_type: "practice",

  name: 'practice_show_recall',

  recall_type: "letters",
  recall_count: 1,

});

const practice_check_recall = custom_views.check_recall({

  trials: 1,

  trial_type: "practice",

  name: 'practice_check_recall',
  show_partner: "practice_show_recall",

});

const key_press_practice = custom_views.key_press({

  trials: 8,

  trial_type: "practice",
  
  name: 'key_press_practice',

  question: "",

  key1: "f",
  key2: "j",
  f: ["odd", "less",],
  j: ["even", "greater"],

  switch_mode: "high-switch",
  switch_steps: 5,

  timeout_message: "Please hurry up!",
  pause: 250,
});


// #region 3 Variables Show/Check

// #region [3] [LETTERS] [LOW] Switch
const main_show_recall_3_letters_low_switch = custom_views.show_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_show_recall_3_letters_low_switch',

  recall_type: "letters",
  recall_count: 3,

});

const main_check_recall_3_letters_low_switch = custom_views.check_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_check_recall_3_letters_low_switch',
  show_partner: "main_show_recall_3_letters_low_switch",

});
// #endregion


// #region [3] [NUMBERS] [LOW] Switch
const main_show_recall_3_numbers_low_switch = custom_views.show_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_show_recall_3_numbers_low_switch',

  recall_type: "numbers",
  recall_count: 3,

});

const main_check_recall_3_numbers_low_switch = custom_views.check_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_check_recall_3_numbers_low_switch',
  show_partner: "main_show_recall_3_numbers_low_switch",

});
// #endregion


// #region [3] [LETTERS] [HIGH] Switch
const main_show_recall_3_letters_high_switch = custom_views.show_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_show_recall_3_letters_high_switch',

  recall_type: "letters",
  recall_count: 3,

});

const main_check_recall_3_letters_high_switch = custom_views.check_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_check_recall_3_letters_high_switch',
  show_partner: "main_show_recall_3_letters_high_switch",

});
// #endregion


// #region [3] [NUMBERS] [HIGH] Switch
const main_show_recall_3_numbers_high_switch = custom_views.show_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_show_recall_3_numbers_high_switch',

  recall_type: "numbers",
  recall_count: 3,

});

const main_check_recall_3_numbers_high_switch = custom_views.check_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_check_recall_3_numbers_high_switch',
  show_partner: "main_show_recall_3_numbers_high_switch",

});
// #endregion

// #endregion 3 Variables Show/Check


// #region 6 Variables Show/Check

// #region [6] [LETTERS] [LOW] Switch
const main_show_recall_6_letters_low_switch = custom_views.show_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_show_recall_6_letters_low_switch',

  recall_type: "letters",
  recall_count: 6,

});

const main_check_recall_6_letters_low_switch = custom_views.check_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_check_recall_6_letters_low_switch',
  show_partner: "main_show_recall_6_letters_low_switch",

});
// #endregion


// #region [6] [NUMBERS] [LOW] Switch
const main_show_recall_6_numbers_low_switch = custom_views.show_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_show_recall_6_numbers_low_switch',

  recall_type: "numbers",
  recall_count: 6,

});

const main_check_recall_6_numbers_low_switch = custom_views.check_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_check_recall_6_numbers_low_switch',
  show_partner: "main_show_recall_6_numbers_low_switch",

});
// #endregion


// #region [6] [LETTERS] [HIGH] Switch
const main_show_recall_6_letters_high_switch = custom_views.show_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_show_recall_6_letters_high_switch',

  recall_type: "letters",
  recall_count: 6,

});

const main_check_recall_6_letters_high_switch = custom_views.check_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_check_recall_6_letters_high_switch',
  show_partner: "main_show_recall_6_letters_high_switch",

});
// #endregion


// #region [6] [NUMBERS] [HIGH] Switch
const main_show_recall_6_numbers_high_switch = custom_views.show_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_show_recall_6_numbers_high_switch',

  recall_type: "numbers",
  recall_count: 6,

});

const main_check_recall_6_numbers_high_switch = custom_views.check_recall({

  trials: 1,

  trial_type: "main",

  name: 'main_check_recall_6_numbers_high_switch',
  show_partner: "main_show_recall_6_numbers_high_switch",

});
// #endregion

// #endregion 6 Variables Show/Check


// #region 3 Variables Tasks

const key_press_main_3_letters_low_switch = custom_views.key_press({

  trials: 8,

  trial_type: "main",
  
  name: 'key_press_main_3_letters_low_switch',

  question: "",

  key1: "f",
  key2: "j",
  f: ["odd", "less",],
  j: ["even", "greater"],
  
  switch_mode: "low-switch",
  switch_steps: 3,

  timeout_message: "Please hurry up!",
  pause: 250,
});

const key_press_main_3_numbers_low_switch = custom_views.key_press({

  trials: 8,

  trial_type: "main",
  
  name: 'key_press_main_3_numbers_low_switch',

  question: "",

  key1: "f",
  key2: "j",
  f: ["odd", "less",],
  j: ["even", "greater"],
  
  switch_mode: "low-switch",
  switch_steps: 3,

  timeout_message: "Please hurry up!",
  pause: 250,
});

const key_press_main_3_letters_high_switch = custom_views.key_press({

  trials: 8,

  trial_type: "main",
  
  name: 'key_press_main_3_letters_high_switch',

  question: "",

  key1: "f",
  key2: "j",
  f: ["odd", "less",],
  j: ["even", "greater"],
  
  switch_mode: "high-switch",
  switch_steps: 5,

  timeout_message: "Please hurry up!",
  pause: 250,
});

const key_press_main_3_numbers_high_switch = custom_views.key_press({

  trials: 8,

  trial_type: "main",
  
  name: 'key_press_main_3_numbers_high_switch',

  question: "",

  key1: "f",
  key2: "j",
  f: ["odd", "less",],
  j: ["even", "greater"],
  
  switch_mode: "high-switch",
  switch_steps: 5,

  timeout_message: "Please hurry up!",
  pause: 250,
});

// #endregion 3 Variables Tasks



// #region 6 Variables Tasks

const key_press_main_6_letters_low_switch = custom_views.key_press({

  trials: 8,

  trial_type: "main",
  
  name: 'key_press_main_6_letters_low_switch',

  question: "",

  key1: "f",
  key2: "j",
  f: ["odd", "less",],
  j: ["even", "greater"],
  
  switch_mode: "low-switch",
  switch_steps: 3,

  timeout_message: "Please hurry up!",
  pause: 250,
});

const key_press_main_6_numbers_low_switch = custom_views.key_press({

  trials: 8,

  trial_type: "main",
  
  name: 'key_press_main_6_numbers_low_switch',

  question: "",

  key1: "f",
  key2: "j",
  f: ["odd", "less",],
  j: ["even", "greater"],
  
  switch_mode: "low-switch",
  switch_steps: 3,

  timeout_message: "Please hurry up!",
  pause: 250,
});

const key_press_main_6_letters_high_switch = custom_views.key_press({

  trials: 8,

  trial_type: "main",
  
  name: 'key_press_main_6_letters_high_switch',

  question: "",

  key1: "f",
  key2: "j",
  f: ["odd", "less",],
  j: ["even", "greater"],
  
  switch_mode: "high-switch",
  switch_steps: 5,

  timeout_message: "Please hurry up!",
  pause: 250,
});

const key_press_main_6_numbers_high_switch = custom_views.key_press({

  trials: 8,

  trial_type: "main",
  
  name: 'key_press_main_6_numbers_high_switch',

  question: "",

  key1: "f",
  key2: "j",
  f: ["odd", "less",],
  j: ["even", "greater"],
  
  switch_mode: "high-switch",
  switch_steps: 5,

  timeout_message: "Please hurry up!",
  pause: 250,
});

// #endregion 6 Variables Tasks

