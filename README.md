# js-utilities

Collection of js utilities.

## jQuery DOM Listeners

### domNodeInserted

Detect additions to DOM within target element, perform callback on all nodes added that match a particular selector.

```javascript
$('#test').domNodeInserted('.new', function(el) { 
	console.log('Node Inserted: ',$(el)); 
});
```

## HTML Validator

Detect mismatched tags in user entered code.

```javascript
$(element).htmlvalidator();

// use domListener to apply to a dynamicaly loaded element
$('body').domNodeInserted(selector, function(element) {
	if (!$(element).hasClass('html-validator')) {
		$(element).htmlvalidator();
	}
});
```


# License

Licensed under <a href="http://opensource.org/licenses/MIT">MIT license</a>.
