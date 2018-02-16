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
			minColumns: 1,
			maxColumns: 12,
			minColumnWidth: 300,
			setColumns: null,
			panelClass: 'kk-masonry-panel',
			columnClass: 'kk-masonry-column',
			throttleFn: null,
			throttleAmount: 100,
			fadeIn: false
		},
		_create: function() {
			this.element.addClass('kk-masonry');
			
			this.panels = this.element.children('.'+this.options.panelClass).get();
			
			this.cols = 0;
			this._getColumns();
			
			if (this.options.fadeIn) {
				this.element.animate({opacity: 1});
			}
			
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
				console.log('height-'+i, colHeight);
				if (shortestHeight == -1 || colHeight < shortestHeight) {
					shortestHeight = colHeight;
					shortestIndex = i;
				}
			}
			console.log('shortestIndex', shortestIndex);
			
			return shortestIndex;
		},
		_getColumns: function() {
			var cols = 1;
			if (Number.isInteger(this.options.setColumns)) {
				cols = this.options.setColumns;
			} else {
				cols = Math.min(this.options.maxColumns, Math.max(this.options.minColumns,Math.floor(this.element.width()/this.options.minColumnWidth)));
			}
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
		empty: function() {
			this.element.find('.'+this.options.panelClass).remove();
			this.panels = [];
		}, 
		redraw: function() {
			for (var i=0; i< this.panels.length; i++) {
				var col = this._getShortestColumn();
				$(this.panels[i]).detach().appendTo($(this.columns[col]));
			}
		},
		/* Use minimumWidth for items that require a minimum width to be displayed. e.g. an ad unit that must be in a column at least 300px wide
		*/
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
