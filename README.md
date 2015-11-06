#jquery-ajaxload.js
Dynamically load content from a route into an element on the page.

## Usage
This function must only be called on a `form` element. It works by intercepting
the form's submit action, performing any URL substitutions (see below), calling
the form's action through AJAX, and inserting the resulting content into the
target.

Here's your HTML...

```html
<div class="well">
  <div id="ajax-content"></div>

  <form id="ajax-trigger" action="/search/[#field1]/[#field2]">
    Field1: <input id="field1" type="text">
    Field2: <input id="field2" type="text">

    <button type="submit">Submit</button>
  </form>
</div>
```

And the corresponding JS

```js
$('#ajax-trigger').ajaxLoad({ // will throw an exception if called on anything other than a form element
  target: $('#ajax-content'),
  beforeSubmit: function(url) {
    console.log("Submitting to url " + url);
  },
  afterLoad: function(data) {
    console.log("Loaded response into target");
  }
});
```

### URL substitutions
Your form actions can contain placeholders designated by the tags `[` and `]`.
You can provide a values map in your call to ajaxLoad a la:

```js
$('#ajax-trigger').ajaxLoad({
  target: $('#ajax-content'),
  parseMap: {
    '#field1': "cat",
    '#field2': "dog"
  }
});
```

If you do not provide a parseMap, placeholders in the URL will be treated as
jQuery selectors.

## Options
  * **target** [default: *this*]: The target in which to insert the resulting data from the AJAX call. If no target is given, `this` is treated as the target (the form itself)
  * **url** [default: *the form's URL*]: Set the URL to submit the AJAX request to
  * **data** [default: *{}*]: Data to be POSTed to the URL
  * **beforeSubmit** [default: *[]*]: An array of functions to be run before the AJAX call is made. If any of these functions return false, the action is halted
  * **afterLoad** [default: *[]*]: An array of functions to be run once the content from the AJAX call is loaded into the target
  * **parseURL** [default: *true*]: Whether or not to run the parsing function before submitting the URL
  * **parseMap** [default: *{}*]: If parsing is enabled, this defines a map of names to values to be inserted into the URL once it's parsed (see example above). If no parse map is given and parsing is enabled, substitution keys are treated as selectors
