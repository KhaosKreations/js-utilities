<!DOCTYPE HTML>
<html>
<head>
	<title>ChronoMasonry Demo</title>
	<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js" integrity="sha256-DI6NdAhhFRnO2k51mumYeDShet3I8AKCQf/tf7ARNhI=" crossorigin="anonymous"></script>
	<script src='../jquery.kk-throttle.js'></script>
	<script src='../jquery.ui.kk-chronomasonry.js'></script>
	<link rel="stylesheet" type='text/css' href='../css/kk-chronomasonry.css' />
	<script>
	function createPanel(id) {
		var height = Math.max(100, Math.floor(Math.random()*500));
		var obj = $('<div class="kk-masonry-panel" style="min-height: '+height+'px;"><h1>'+id+'</h1></div>');
		return obj;
	}

	$(document).ready(function(){
		var masonry = $('.kk-masonry').chronomasonry();
		
		var firstID = 0;
		var lastID = 17;
		
		//change size of panels
		setInterval(function() {
			var panels = $('.kk-masonry .kk-masonry-panel');
			var random = Math.floor(Math.random()*panels.length);
			panels.eq(random).append("<h2>New Content</h2>");
		}, 5000);
		
		//add to bottom
		setInterval(function() {
			$('.kk-masonry').chronomasonry('add', createPanel(++lastID));
		}, 5000);
		
		//add to top
		/*setInterval(function() {
			$('.kk-masonry').chronomasonry('add', createPanel(--firstID), 'top');
		}, 10000);*/
	});
	</script>
	<style>
	h1 {
		font-size: 42px;
		margin: 0;
		text-align: center;
	}
	h2 { text-align: center; }

	.kk-masonry-panel {
		color: #fff;
		margin-bottom: 10px;
		padding: 10px;
		background-color: #666666;
	}
	</style>
</head>
<body>
	<div class="kk-masonry">
		<div class="kk-masonry-panel" style="min-height: 260px;">
			<h1>0</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 123px;">
			<h1>1</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 187px;">
			<h1>2</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 133px;">
			<h1>3</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 14px;">
			<h1>4</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 59px;">
			<h1>5</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 214px;">
			<h1>6</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 298px;">
			<h1>7</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 48px;">
			<h1>8</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 131px;">
			<h1>9</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 288px;">
			<h1>10</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 238px;">
			<h1>11</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 85px;">
			<h1>12</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 129px;">
			<h1>13</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 40px;">
			<h1>14</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 48px;">
			<h1>15</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 30px;">
			<h1>16</h1>
		</div>
		<div class="kk-masonry-panel" style="min-height: 239px;">
			<h1>17</h1>
		</div>
	</div>
</body>
</html>
