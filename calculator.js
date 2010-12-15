// Constants
var detector_cost = 94.06;

// Functions
function init(evt) {
    // Setup event to update the calculator when anything's changed.
    $('form').bind('input',updateCalculator);
    // With proper HTML5 support we only need "input"
    // "keyup click change" have been added for backward compatability
    
    // Update the calculator right away for good measure
    updateCalculator();
    
    // Enable the form
    $('form').removeAttr('disabled');
    
    // Setup the tooltips
    $('img.help').tooltip({showURL: false});
}
function updateCalculator(evt) {
    var inputs = {
        'sensors': Number($('#input_sensors').val()),
        'running': Number($('#input_running').val()),
        'optimal': Number($('#input_optimal').val()),
        'watts': Number($('#input_watts').val()),
        'lights': Number($('#input_lights').val()),
        'cost': Number($('#input_cost').val()),
    }
    
    var results = {
        'consumption': inputs.running * (inputs.watts / 1000) * inputs.lights,
        'suggestion': inputs.optimal * (inputs.watts / 1000) * inputs.lights,
        'cost': inputs.sensors * detector_cost,
        'energy_saving': 0,
        'co2_saving': 0,
        'financial_saving': 0,
        'roi': 0
    }
    results.energy_saving = results.consumption - results.suggestion;
    results.co2_saving = (results.energy_saving * 0.541) / 1000;
    results.financial_saving = results.energy_saving * inputs.cost;
    results.roi = results.financial_saving / results.cost * 100;
    
    for(result in results) {
        // If any decimal places, round to 2.
        if(String(results[result]).match(/\./)) {
            results[result] = results[result].toFixed(2);
        }
        // Update result on page
        if(Number(results[result])) {
            $('span#'+result).text(results[result]);
        } else {
            $('span#'+result).text('0');
        }
    }
}

// Initialise the JavaScript
$(document).bind('ready',init);
