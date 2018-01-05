/*
 * jQuery DOM Mutation Listeners
 *
 * Copyright (c) 2018 Alyson Stewart
 * licensed under MIT license.
 *
 * https://github.com/KhaosKreations/js-utilities
 *
 * Version: 0.0.1
 */
jQuery.fn.extend({
	/* Detect additions to DOM within target element, perform callback on all nodes added that match a particular selector */
	domNodeInserted: function(elementSelector, callback) {
		return this.each(function(){
			var onMutationsObserved = function(mutations) {
				mutations.forEach(function(mutation) {
					if (mutation.addedNodes.length) {
						var elements = $(mutation.addedNodes);
						for (var i = 0; i < elements.length; i++) {
							if ($(elements[i]).is(elementSelector)) callback(elements[i]);
						}
						
						elements = elements.find(elementSelector);
						for (var i = 0; i < elements.length; i++) {
							callback(elements[i]);
						}
					}
				});
			};

			var target = $(this)[0];
			var config = { childList: true, subtree: true };
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
			var observer = new MutationObserver(onMutationsObserved);
			observer.observe(target, config);
		});
	}
});
