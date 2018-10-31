import { Elm } from '../src/Main.elm';
import $ from 'jquery';

var app = Elm.Main.init({ node: document.getElementById('app') });

app.ports.output.subscribe(function(options) {
  var $selectContainer = $('#select2-container');

  // Generate DOM tree with <select> and <option> inside and embed it in to the root node.
  var select = $('<select>', {
    html: options.map(function(option) {
      return $('<option>', {
        value: option[0],
        text: option[1],
      });
    }),
  }).appendTo($selectContainer);

  console.log(select);

  // Initialize Select2, when everything is ready.
  var select2 = $(select).select2();

  // Setup change port subscription.
  select2.on('change', function(event) {
    app.ports.input.send(event.target.value);
  });

  // Trigger the change for initial value.
  select2.trigger('change');
});
