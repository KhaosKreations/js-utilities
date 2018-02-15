/*
 * jQuery ChronoMasonry
 *
 * Copyright (c) 2018 Alyson Stewart
 * licensed under MIT license.
 *
 * https://github.com/KhaosKreations/js-utilities
 *
 * Version: 1.0.0
 */
 
(function ( $ ) {
	$.widget( "khaoskreations.chronomasonry", {
		options: {
			minColumnWidth: 300,
			panelClass: 'kk-masonry-panel',
			columnClass: 'kk-masonry-column',
			throttleFn: null,
			throttleAmount: 100
		},
		_create: function() {
			this.element.addClass('kk-masonry');
			
			this.panels = this.element.children('.'+this.options.panelClass).get();
			
			this.cols = 1;
			this._getColumns();
			
			var that = this;
			
			if (typeof this.options.throttleFn != 'function') {
				this.options.throttleFn = $.throttle;
			}
			
			$(window).on('resize', this.options.throttleFn(function() {
				that._getColumns();
			}, this.options.throttleAmount));
		},
		_setOption: function( key, value ) {
			this._super( key, value );
		},
		_setOptions: function( options ) {
			this._super( options );
		},
		_getShortestColumn: function() {
			var shortestIndex = -1;
			var shortestHeight = -1;
			for (var i=0; i<this.columns.length; i++) {
				var colHeight = $(this.columns[i]).height();
				if (shortestHeight == -1 || colHeight < shortestHeight) {
					shortestHeight = colHeight;
					shortestIndex = i;
				}
			}
			
			return shortestIndex;
		},
		_getColumns: function() {
			var cols = Math.min(12, Math.max(1,Math.floor(this.element.width()/this.options.minColumnWidth)));
			if (this.cols != cols) {
				this.element.children('.'+this.options.columnClass).addClass('kk-masonry-expired').removeClass(this.options.columnClass);
				this.cols = cols;
				this.element.attr('data-cols', this.cols);
				
				for (var i=0; i< this.cols; i++) {
					this.element.append("<div class='"+this.options.columnClass+"' data-col="+i+"></div>");
				}
				this.columns = this.element.children('.'+this.options.columnClass);
				this.redraw();
				this.element.children('.kk-masonry-expired').remove();
			}
		},
		redraw: function() {
			for (var i=0; i< this.panels.length; i++) {
				var col = this._getShortestColumn();
				$(this.panels[i]).detach().appendTo($(this.columns[col]));
			}
		},
		add: function(obj, position, minimumWidth) {
			var col = this._getShortestColumn();
			var column = $(this.columns[col]);
			if (position == undefined) position = 'bottom';
			if (minimumWidth != undefined && column.width() < minimumWidth) {
				return;
			}
			switch(position) {
				case 'top':
					this.panels.unshift(obj);
					$(this.columns[col]).prepend(obj);
				break;
				case 'bottom':
					this.panels.push(obj);
					$(this.columns[col]).append(obj);
				break;
			}
		}
	});
}( jQuery ));
