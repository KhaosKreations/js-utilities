$.widget( "khaoskreations.htmlvalidator", {
	options: {
		customMessageClass: '',
		messageObj: null,
	},
	_create: function() {
		this.element.addClass( "kk-html-validator" );
		
		if (this.options.messageObj != null) {
			//pass in an object
		} else {
			//create element
			this.element.after("<div class='kk-html-validator-message "+this.options.customMessageClass+"'></div>");
			this.options.messageObj = this.element.siblings('.kk-html-validator-message');
		}
		
		this.openTags = [];
		this.closeTags = [];
		this.htmlIsValid = true;
		
		this.refresh();
		
		var that = this;
		this.element.on('keyup change click', this._throttle(function(e) {
			that.refresh();
		}, 100));
	},
	_setOption: function( key, value ) {
		this._super( key, value );
	},
	_setOptions: function( options ) {
		this._super( options );
	},
	_destroy: function() {
		this.element.removeClass( "kk-html-validator" );
		this.options.messageObj.remove();
	},
	_throttle: function(func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function() {
			previous = options.leading === false ? 0 : Date.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function() {
			var now = Date.now();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	},
	_diff: function(arr1, arr2) {
		var arr = arr1.slice(); //duplicate array
		for (var i=0; i<arr2.length; i++) {
			var index = arr.indexOf(arr2[i]);
			if (index > -1) {
				arr.splice(index, 1);
			}
		}
		
		return arr;
	},
	_validate: function() {
		var html = this.element.val();
		var openingTags, closingTags, openComments;

		// Remove all self closing tags
		html = html.replace(/<[^>]*\/\s?>/g, ''); 
		// Remove all comments
		html = html.replace(/<!--(.*)-->/g, ''); 
		// Remove all void elements
		html = html.replace(/<(br|hr|img|area|base|col|command|embed|input|keygen|link|menuitem|meta|param|source|track|wbr).*?>/g, '');
		// Get remaining opening tags
		openingTags = html.match(/<[^\/].*?>/g) || []; 
		// Get remaining closing tags
		closingTags = html.match(/<\/.+?>/g) || []; 
		//check for open comments
		openComments = html.match(/<!--/g) || []; 
		
		for (var i=0; i < openingTags.length; i++) {
			var tagPieces = openingTags[i].split(' ');
			var tag = tagPieces[0].replace(/^<|>$/gm,'');
			
			openingTags[i] = tag;
		}
		
		for (var i=0; i < openComments.length; i++) {
			var tag = openComments[i].replace(/^<|>$/gm,'');
			openingTags.push(tag);
		}
		
		for (var i=0; i < closingTags.length; i++) {
			closingTags[i] = closingTags[i].replace('/', '').replace(/^<|>$/gm,'');
		}
		
		this.openTags = this._diff(openingTags, closingTags);
		this.closeTags = this._diff(closingTags, openingTags);
		
		return (this.openTags.length == 0 && this.closeTags.length == 0);
	},
	isValid: function() {
		return this.htmlIsValid;
	},
	refresh: function() {
		this.htmlIsValid = this._validate();
		if (this.openTags.length > 0 || this.closeTags.length > 0) {
			var msg = 'HTML missing opening or closing tag(s) for the following:';
			
			for (var i=0;i<this.openTags.length;i++) {
				msg += '<span class="kk-html-validator-tag">'+this.openTags[i]+"</span>";
			}
			for (var i=0;i<this.closeTags.length;i++) {
				msg += '<span class="kk-html-validator-tag">/'+this.closeTags[i]+"</span>";
			}
			this.options.messageObj.html(msg);
		} else {
			this.options.messageObj.html('');
		}
	}
});
