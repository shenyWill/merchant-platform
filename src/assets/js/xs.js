(function () {
	function b(t, u, s) {
		this.t = t;
		this.u = u;
		this.c = s.color;
		this.m1();
	};
	b.prototype = {
		m1: function () {
			var t = this;
			t.d = false;
			if (t.t.css('position') != 'fixed' && t.t.css('position') != 'absolute') {
				t.t.css('position', 'relative');
			}
			t.w = t.t.width();
			t.h = t.t.height();
			t.t.children().each(function () {
				if ($(this).css('position') != 'fixed' && $(this).css('position') != 'absolute') {
					$(this).css({
						'position': 'relative',
						'z-index': '3'
					});
				} else if (parseInt($(this).css('z-index')) < 2) {
					$(this).css({
						'z-index': '2',
						'border-radius': '10px'
					});
				}
			});
			t.t.append('<canvas width="' + t.w + '" height="' + t.h + '" style="position:absolute; top:0; left:0; z-index:1;"></canvas>');
			t.ctx = t.t.children('canvas')[0].getContext('2d');
			if (t.c === false) {
				t.t.mouseenter(function () {
					t.c = 'hsl(' + (Math.random() * 360) + ',60%,80%)';
					t.ctx.fillStyle = t.c;
				});
			} else {
				t.ctx.fillStyle = t.c;
			};
			t.t.mousemove(function (e) {
				t.x = e.pageX - t.t.offset().left - parseInt(t.t.css('border-left-width'));
				t.y = e.pageY - t.t.offset().top - parseInt(t.t.css('border-top-width'));
			});
			t.a = [];
			t.t.mouseenter(function (e) {
				t.f = true;
				t.x = e.pageX - t.t.offset().left - parseInt(t.t.css('border-left-width'));
				t.y = e.pageY - t.t.offset().top - parseInt(t.t.css('border-top-width'));
				t.n1();
			});
			t.t.mouseleave(function () {
				t.f = false;
			});
			t.ctx.clearRect(0, 0, t.w, t.h);
		},
		n1: function () {
			var t = this;
			if (t.a.length == 0) {
				t.z = Math.sqrt(Math.pow(t.w / 2, 2) + Math.pow(t.h / 2, 2));
				t.a = [t.w / 2, t.h / 2, t.z, -90];
			}
			if (!t.d) {
				t.d = true;
				t.x30(t);
			}
		},
		x30: function (t) {
			t.ctx.globalAlpha = 1;
			t.ctx.fillStyle = t.c;
			t.ctx.clearRect(0, 0, t.w, t.h);
			if (t.f) {
				t.a[3] += 10;
			} else {
				t.a[3] -= 10;
			};
			if (t.a[3] >= 270) {
				t.a[3] = 270;
			} else if (t.a[3] <= -90) {
				t.a[3] = -90;
			}
			t.ctx.beginPath();
			t.ctx.moveTo(t.a[0], t.a[1]);
			t.ctx.arc(t.a[0], t.a[1], t.a[2], -90 * Math.PI / 180, t.a[3] * Math.PI / 180);
			t.ctx.closePath();
			t.ctx.fill();
			if (t.f || t.a[3] > -90) {
				requestAnimationFrame(function () {
					t.x30(t);
				});
			} else {
				t.a = [];
				t.ctx.clearRect(0, 0, t.w, t.h);
				t.d = false;
			}
		}
	};
	var y = {
		color: false,
	};
	$.fn.xs999 = function (u, g) {
		y = {
			color: '#3b3b3b',
		}
		$.extend(y, g);
		$(this).each(function () {
			new b($(this), u, y);
		});
	}
})(jQuery);
