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
