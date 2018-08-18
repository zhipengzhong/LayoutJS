(function() {

	//	var jsons = '{"version": "1.0","datas": [{"_className": "main_window","json": {"name": "main_window","type": "window","location": {"x": 0,"y": 0},"size": {"width": 1024,"height": 720}}},{"_className": "child_text","json": {"name": "Text2","location": {"x": 100,"y": 100},"size": {"width": 120,"height": 80}}},{"_className": "child_image","json": {"name": "Image1","img": {"src":"http://127.0.0.1:8020/Test3/img/tp.png"},"location": {"x": 110,"y": 105},"size": {"width": 200,"height": 200}}},{"_className": "child_text","json": {"name": "Text3","location": {"x": 100,"y": 100},"size": {"width": 120,"height": 80}}},{"_className": "child_text","json": {"name": "Text4","location": {"x": 110,"y": 105},"size": {"width": 120,"height": 80}}}],"scale": 1,"originx": -30,"originy": -30}';
	//	var jsons = '{"version": "1.0","datas": [{"_className": "main_window","json": {"name": "main_window","type": "constant","location": {"x": 0,"y": 0},"size": {"width": 1024,"height": 720}}},{"_className": "child_image","json": {"name": "Image1","img": {"src":"http://lofter.nos.netease.com/sogou-VkxJRDhXbHlKNTMwUmppaElSQ3dGZUVVbHpVamJNUGEzZi1McV9zbEw3TGJZVTk3TVptdmltU2lzcDJOSjVwSQ.jpg"},"location": {"x": 110,"y": 105},"size": {"width": 250,"height": 375}}},{"_className": "child_text","json": {"name": "Text3","location": {"x": 100,"y": 100},"size": {"width": 120,"height": 80}}}],"scale": 1,"originx": -30,"originy": -30}';
	var jsons = '{"version": "1.0","datas": [{"_className": "main_window","json": {"name": "main_window","type": "constant","location": {"x": 0,"y": 0},"size": {"width": 1024,"height": 720}}},{"_className": "child_image","json": {"name": "Image1","img": {"src":"http://lofter.nos.netease.com/sogou-VkxJRDhXbHlKNTMwUmppaElSQ3dGZUVVbHpVamJNUGEzZi1McV9zbEw3TGJZVTk3TVptdmltU2lzcDJOSjVwSQ.jpg"},"location": {"x": 110,"y": 105},"size": {"width": 250,"height": 375}}}],"scale": 1,"originx": -30,"originy": -30}';
	var jsOBJ = JSON.parse(jsons);
	var childArr = jsOBJ.datas;
	var childSelected = -1;
	//	child["child_text"].test();

	function getCanvas(width, height) {

		function createCanvas(div) {
			var canvas = document.createElement('canvas');
			canvas.width = width - 245;
			canvas.height = height - 40;
			canvas.style.position = "absolute";
			canvas.style.width = (width - 245) + "px";
			canvas.style.height = (height - 40) + "px";
			canvas.style.top = "0px";
			canvas.style.MozUserSelect = "none";
			div.appendChild(canvas);
			return canvas;
		}

		function getCxt(canvas) {
			var ctx = canvas.getContext('2d');
			return ctx;
		}

		var redraw = function() {
			redrawGrid(grid_canvas, grid_cxt, jsOBJ);
			redrawWidget(widget_canvas, widget_ctx, jsOBJ);
			redrawRuler(ruler_canvas, ruler_ctx, jsOBJ);
			redrawSelected(selected_canvas, selected_ctx, jsOBJ);
		}

		function redrawGrid(canvas, ctx, param) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawGrid(canvas, ctx, param);
		}

		function drawGrid(canvas, ctx, param) {
			ctx.beginPath();
			ctx.strokeStyle = "#C0C0C0";
			var temps = Math.round(50 / param.scale / 10) * 10;
			var tempx = param.originx % temps > 0 ? param.originx % temps - temps : param.originx % temps;
			var tempy = param.originy % temps > 0 ? param.originy % temps - temps : param.originy % temps;
			for(var i = 0 - tempx; i < canvas.width / param.scale - tempx; i += temps) {
				ctx.moveTo(Math.round(i * param.scale), 0);
				ctx.lineTo(Math.round(i * param.scale), canvas.height);
			}
			for(var i = 0 - tempy; i < canvas.height / param.scale - tempy; i += temps) {
				ctx.moveTo(0, Math.round(i * param.scale));
				ctx.lineTo(canvas.width, Math.round(i * param.scale));
			}
			ctx.stroke(); // 进行绘制
		}

		function redrawWidget(canvas, ctx, param) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//			drawChild(canvas, ctx, param, child.child_text);
			for(var i = 0; i < childArr.length; i++) {
				ctx.save();
				ctx.translate(-param.originx * param.scale, -param.originy * param.scale);
				ctx.scale(param.scale, param.scale);
				//				if (i == childSelected) {
				//					ctx.shadowBlur= 12 * param.scale;
				//					ctx.shadowOffsetX= 4 * param.scale;
				//					ctx.shadowOffsetY= 4 * param.scale;
				//					ctx.shadowColor= "rgba(0, 0, 255, 0.2)";
				//				}
				drawChild(canvas, ctx, param, childArr[i]);
				ctx.restore();
			}
		}

		function drawChild(canvas, ctx, param, child_data) {
			//			child.x = 'x' in child ? child.x : 0;
			//			child.y = 'y' in child ? child.y : 0;
			//			child.width = 'width' in child ? child.width : 100;
			//			child.height = 'height' in child ? child.height : 80;
			//			if((child.x + child.width > param.originx && child.y + child.height > param.originy) && (child.x < canvas.width / param.scale + param.originx && child.y < canvas.height / param.scale + param.originy)) {
			//				child.draw(canvas, ctx, param);
			//			}
			var measure = widget[child_data._className].measure(param, child_data.json);
			if((measure.x + measure.width > param.originx && measure.y + measure.height > param.originy) && (measure.x < canvas.width / param.scale + param.originx && measure.y < canvas.height / param.scale + param.originy)) {
				//				widget[child_data._className].draw(canvas, ctx, param, x * param.scale - param.originx * param.scale, y * param.scale - param.originy * param.scale, width * param.scale, height * param.scale);
				//				widget[child_data._className].draw(canvas, ctx, param, x, y, width, height);
				widget[child_data._className].draw(canvas, ctx, param, child_data.json, redraw);
			}
		}

		function redrawRuler(canvas, ctx, param) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawScale(canvas, ctx, param);
		}

		function drawScale(canvas, ctx, param) {
			var temps = Math.round(50 / param.scale / 10) * 10;
			var tempx = param.originx % temps > 0 ? param.originx % temps - temps : param.originx % temps;
			var tempy = param.originy % temps > 0 ? param.originy % temps - temps : param.originy % temps;
			ctx.beginPath();
			ctx.strokeStyle = "#000000";
			ctx.fillStyle = '#000000';
			ctx.textBaseline = "top";
			ctx.font = "11px Arial";
			for(var i = 0 - tempx; i < canvas.width / param.scale - tempx; i += temps) {
				ctx.moveTo(Math.round(i * param.scale), 0);
				ctx.lineTo(Math.round(i * param.scale), 8);
				ctx.fillText(Math.round(i + param.originx), i * param.scale - ctx.measureText(Math.round(i + param.originx)).width / 2, 9);
			}
			for(var i = 0 - tempy; i < canvas.height / param.scale - tempy; i += temps) {
				ctx.moveTo(0, Math.round(i * param.scale));
				ctx.lineTo(8, Math.round(i * param.scale));
				ctx.save();
				ctx.translate(10, Math.round(i * param.scale)); //设置画布上的(0,0)位置，也就是旋转的中心点//设置画布上的(0,0)位置，也就是旋转的中心点
				ctx.rotate(Math.PI / 180 * -20);
				ctx.fillText(Math.round(i + param.originy), -10, 0);
				ctx.restore();
			}
			ctx.stroke(); // 进行绘制
		}

		function redrawSelected(canvas, ctx, param) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawSelected(canvas, ctx, param);
		}

		//		var grid_canvas,grid_cxt,widget_canvas,widget_ctx,ruler_canvas,ruler_ctx,selected_canvas,selected_ctx;
		function drawSelected(canvas, ctx, param) {
			if(childArr.length > childSelected && childSelected >= 0) {
				//				var child_data = childArr[Math.abs(childSelected + 1 - childArr.length)];
				var child_data = childArr[childSelected];
				var measure = widget[child_data._className].measure(param, child_data.json);
				if((measure.x + measure.width > param.originx && measure.y + measure.height > param.originy) && (measure.x < canvas.width / param.scale + param.originx && measure.y < canvas.height / param.scale + param.originy)) {
					var sex = Math.floor((measure.x - param.originx) * param.scale) - 0.5;
					var sey = Math.floor((measure.y - param.originy) * param.scale) - 0.5;
					var sew = Math.floor((measure.width) * param.scale) + 1;
					var seh = Math.floor((measure.height) * param.scale) + 1;

					ctx.setLineDash([1, 4])
					ctx.lineWidth = 1;
					ctx.strokeStyle = "black";
					ctx.strokeRect(sex, sey, sew, seh);
					ctx.fillStyle = "#F7F7F7";
					ctx.setLineDash([])
					ctx.strokeStyle = "#C5C5C5";
					var x1, y1, w1, h1;
					w1 = 6;
					h1 = 6;

					x1 = sex - w1 / 2;
					y1 = sey - h1 / 2;
					ctx.fillRect(x1, y1, w1, h1);
					ctx.strokeRect(x1, y1, w1, h1);

					x1 = sex + Math.floor(sew / 2) - w1 / 2;
					y1 = sey - h1 / 2;
					ctx.fillRect(x1, y1, w1, h1);
					ctx.strokeRect(x1, y1, w1, h1);

					x1 = sex + sew - w1 / 2;
					y1 = sey - h1 / 2;
					ctx.fillRect(x1, y1, w1, h1);
					ctx.strokeRect(x1, y1, w1, h1);

					x1 = sex - w1 / 2;
					y1 = sey + Math.floor(seh / 2) - h1 / 2;
					ctx.fillRect(x1, y1, w1, h1);
					ctx.strokeRect(x1, y1, w1, h1);

					x1 = sex + sew - w1 / 2;
					y1 = sey + Math.floor(seh / 2) - h1 / 2;
					ctx.fillRect(x1, y1, w1, h1);
					ctx.strokeRect(x1, y1, w1, h1);

					x1 = sex - w1 / 2;
					y1 = sey + seh - h1 / 2;
					ctx.fillRect(x1, y1, w1, h1);
					ctx.strokeRect(x1, y1, w1, h1);

					x1 = sex + Math.floor(sew / 2) - w1 / 2;
					y1 = sey + seh - h1 / 2;
					ctx.fillRect(x1, y1, w1, h1);
					ctx.strokeRect(x1, y1, w1, h1);

					x1 = sex + sew - w1 / 2;
					y1 = sey + seh - h1 / 2;
					ctx.fillRect(x1, y1, w1, h1);
					ctx.strokeRect(x1, y1, w1, h1);
				}
			}
		}

		var rootDiv = document.createElement('div');
		rootDiv.className = "graph-editor__canvas Q-Graph";
		//		rootDiv.dataOptions = "region:&quot;center&quot;";
		rootDiv.style.position = "absolute";
		rootDiv.style.boxSizing = "border-box";
		rootDiv.style.width = (width - 245) + "px";
		rootDiv.style.height = (height - 40) + "px";
		rootDiv.style.top = "40px";
		rootDiv.style.left = "245px";
		$(rootDiv).droppable({
			drop: function(ev, ui) {
				var evt = ev || event;
				var startx = jsOBJ.originx - 245 / jsOBJ.scale;
				var starty = jsOBJ.originy - 40 / jsOBJ.scale;
				var widgetItemOBJ = ev.target.widgetItemOBJ;
				var childData = ui.helper.get(0).widgetItemOBJ;
				var measure = widget[childData._className].measure(jsOBJ, childData.json);
				var x = Math.round(startx + evt.clientX / jsOBJ.scale - measure.width / 2);
				var y = Math.round(starty + evt.clientY / jsOBJ.scale - measure.height / 2);
				childData.json.location.x = x;
				childData.json.location.y = y;
				//				var count = 0;
				//				for(var i = 0; i < childArr.length; i++) {
				//					if(childArr[i]["_className"] == childData["_className"]) {
				//						count++;
				//					}
				//				}
				//				childData.json.name = childData.json.name + "-" + count;
				childArr.push(childData);
				childSelected = childArr.length - 1;
				redraw();
				showEditorProperty();
			}
		});
		var div = document.createElement('div');
		div.className = "Q-CanvasPanel";
		div.tabIndex = 0;
		rootDiv.appendChild(div);
		var grid_canvas = createCanvas(div);
		var grid_cxt = getCxt(grid_canvas);
		var widget_canvas = createCanvas(div);
		var widget_ctx = getCxt(widget_canvas);
		var ruler_canvas = createCanvas(div);
		var ruler_ctx = getCxt(ruler_canvas);
		var selected_canvas = createCanvas(div);
		var selected_ctx = getCxt(selected_canvas);
		//	document.body.appendChild(div);
		redrawGrid(grid_canvas, grid_cxt, jsOBJ);
		redrawWidget(widget_canvas, widget_ctx, jsOBJ);
		redrawRuler(ruler_canvas, ruler_ctx, jsOBJ);
		redrawSelected(selected_canvas, selected_ctx, jsOBJ);

		setlistener();

		function setlistener() {
			var isDisply;
			var timeout_id, timeout_end;
			var div_mouse_move = function(ev) {
				var evt = ev || event;

				var x1 = evt.clientX;
				var y1 = evt.clientY;
				var x = evt.offsetX;
				var y = evt.offsetY;

				if(isDisply) {
					showTooltip(x, y, x1, y1);
				} else {
					tooltip.style.display = "none";
					clearTimeout(timeout_id);
					timeout_id = setTimeout(function() {
						if(x < rootDiv.offsetWidth && x > 0 && y < rootDiv.offsetHeight && y > 0) {
							isDisply = true;
							showTooltip(x, y, x1, y1);
						}
					}, 1500);
				}

				div.onmouseout = function(ev) {
					clearTimeout(timeout_id);
					tooltip.style.display = "none";
					div.onmouseout = null;
				}
				var child_data = childArr[childSelected];
				if(childArr.length > childSelected && childSelected >= 0 && child_data.json.type != "constant") {
					var measure = widget[child_data._className].measure(jsOBJ, child_data.json);
					var sex = Math.floor((measure.x - jsOBJ.originx) * jsOBJ.scale) - 0.5;
					var sey = Math.floor((measure.y - jsOBJ.originy) * jsOBJ.scale) - 0.5;
					var sew = Math.floor((measure.width) * jsOBJ.scale) + 1;
					var seh = Math.floor((measure.height) * jsOBJ.scale) + 1;

					var x2, y2, w1, h1;
					w1 = 6;
					h1 = 6;

					if(isScope(x, y, sex - w1 / 2, sey - h1 / 2, w1, h1)) {
						div.style.cursor = 'nwse-resize';
					} else if(isScope(x, y, sex + Math.floor(sew / 2) - w1 / 2, sey - h1 / 2, w1, h1)) {
						div.style.cursor = 'ns-resize';
					} else if(isScope(x, y, sex + sew - w1 / 2, sey - h1 / 2, w1, h1)) {
						div.style.cursor = 'nesw-resize';
					} else if(isScope(x, y, sex - w1 / 2, sey + Math.floor(seh / 2) - h1 / 2, w1, h1)) {
						div.style.cursor = 'ew-resize';
					} else if(isScope(x, y, sex + sew - w1 / 2, sey + Math.floor(seh / 2) - h1 / 2, w1, h1)) {
						div.style.cursor = 'ew-resize';
					} else if(isScope(x, y, sex - w1 / 2, sey + seh - h1 / 2, w1, h1)) {
						div.style.cursor = 'nesw-resize';
					} else if(isScope(x, y, sex + Math.floor(sew / 2) - w1 / 2, sey + seh - h1 / 2, w1, h1)) {
						div.style.cursor = 'ns-resize';
					} else if(isScope(x, y, sex + sew - w1 / 2, sey + seh - h1 / 2, w1, h1)) {
						div.style.cursor = 'nwse-resize';
					} else {
						div.style.cursor = 'auto';
					}

				} else {
					div.style.cursor = 'auto';
				}
			};
			div.onmousemove = div_mouse_move;

			function isScope(x, y, x1, y1, w1, h1) {
				if(x >= x1 && y >= y1 && x <= x1 + w1 && y <= y1 + h1) {
					return true;
				}
				return false;
			}

			function getSelectedChild(x, y) {
				var result = {};
				for(var i = childArr.length - 1; i >= 0; i--) {
					var child_data = childArr[i];
					var measure = widget[child_data._className].measure(jsOBJ, child_data.json);
					var draw_childx = measure.x * jsOBJ.scale - jsOBJ.originx * jsOBJ.scale;
					var draw_childy = measure.y * jsOBJ.scale - jsOBJ.originy * jsOBJ.scale;
					if((x >= draw_childx && y >= draw_childy) && (x <= measure.width * jsOBJ.scale + draw_childx && y <= measure.height * jsOBJ.scale + draw_childy)) {
						if(child_data.json.type == "constant") {
							result.name = child_data.json.name;
							result.position = i;
							result.selectable = false;
							return result;
						}
						result.name = child_data.json.name;
						result.position = i;
						result.selectable = true;
						return result;
					}
				}
				result.name = "";
				result.position = -1;
				result.selectable = false;
				return result;
			}

			function showTooltip(x, y, x1, y1) {
				var div_top, div_left = 0;
				var result = getSelectedChild(x, y);
				if(result.position >= 0) {
					tooltip.innerHTML = result.name;
					tooltip.style.display = "inline";
				} else {
					tooltip.style.display = "none";
				}
				if(x >= rootDiv.offsetWidth - tooltip.offsetWidth - 5) {
					div_left = x1 - tooltip.offsetWidth - 5;
				} else {
					div_left = x1 + 5;
				}
				if(y >= rootDiv.offsetHeight - tooltip.offsetHeight - 17) {
					div_top = y1 - tooltip.offsetHeight - 10;
				} else {
					div_top = y1 + 17;
				}
				tooltip.style.left = div_left + "px";
				tooltip.style.top = div_top + "px";

				clearTimeout(timeout_end);
				timeout_end = setTimeout(function() {
					isDisply = false;
					tooltip.style.display = "none";
				}, 3000);
			}

			function deepCopy(obj) {
				if(typeof obj != 'object') {
					return obj;
				}
				var newobj = {};
				for(var attr in obj) {
					newobj[attr] = deepCopy(obj[attr]);
				}
				return newobj;
			}

			var timerID;
			var state = -1;
			div.onmousedown = function(ev) {
				div.onmousemove = null;
				clearTimeout(timeout_id);
				tooltip.style.display = "none";
				isDisply = false;
				var evt = ev || event;
				if(evt.which) {
					clearInterval(timerID);
					var d = new Date();
					var speedX = 0,
						speedY = 0; //要求的速度
					var lastX = evt.clientX,
						lastY = evt.clientY; //最后一次的距离
					var ms1 = d.getTime(),
						ms2 = d.getTime();
					var x = evt.offsetX;
					var y = evt.offsetY;

					var child_data, minJsOBJ, min_child_data;

					var startx, starty;
					var startw, starth;
					state = -1;

					child_data = childArr[childSelected];
					if(childArr.length > childSelected && childSelected >= 0 && child_data.json.type != "constant") {
						var measure = widget[child_data._className].measure(jsOBJ, child_data.json);
						var sex = Math.floor((measure.x - jsOBJ.originx) * jsOBJ.scale) - 0.5;
						var sey = Math.floor((measure.y - jsOBJ.originy) * jsOBJ.scale) - 0.5;
						var sew = Math.floor((measure.width) * jsOBJ.scale) + 1;
						var seh = Math.floor((measure.height) * jsOBJ.scale) + 1;

						var x2, y2, w1, h1;
						w1 = 6;
						h1 = 6;

						startx = measure.x - evt.clientX / jsOBJ.scale;
						starty = measure.y - evt.clientY / jsOBJ.scale;
						startw = measure.width - evt.clientX / jsOBJ.scale;
						starth = measure.height - evt.clientY / jsOBJ.scale;
						if(isScope(x, y, sex + sew - w1 / 2, sey + seh - h1 / 2, w1, h1)) {
							state = 9;
						} else if(isScope(x, y, sex + Math.floor(sew / 2) - w1 / 2, sey + seh - h1 / 2, w1, h1)) {
							state = 8;
						} else if(isScope(x, y, sex - w1 / 2, sey + seh - h1 / 2, w1, h1)) {
							state = 7;
						} else if(isScope(x, y, sex + sew - w1 / 2, sey + Math.floor(seh / 2) - h1 / 2, w1, h1)) {
							state = 6;
						} else if(isScope(x, y, sex - w1 / 2, sey + Math.floor(seh / 2) - h1 / 2, w1, h1)) {
							state = 5;
						} else if(isScope(x, y, sex + sew - w1 / 2, sey - h1 / 2, w1, h1)) {
							state = 4;
						} else if(isScope(x, y, sex + Math.floor(sew / 2) - w1 / 2, sey - h1 / 2, w1, h1)) {
							state = 3;
						} else if(isScope(x, y, sex - w1 / 2, sey - h1 / 2, w1, h1)) {
							state = 2;
						} else {
							state = -1;
						}
					} else {
						state = -1;
					}

					if(state == -1) {
						var result = getSelectedChild(evt.offsetX, evt.offsetY);
						if(result.selectable) {
							childSelected = result.position;
							child_data = childArr[childSelected];
							var measure = widget[child_data._className].measure(jsOBJ, child_data.json);
							startx = measure.x - evt.clientX / jsOBJ.scale;
							starty = measure.y - evt.clientY / jsOBJ.scale;

							showEditorProperty();

							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
							state = 1;
						} else {
							startx = jsOBJ.originx + evt.clientX / jsOBJ.scale;
							starty = jsOBJ.originy + evt.clientY / jsOBJ.scale;
							childSelected = result.position;

							child_data = childArr[childSelected];
							if(childSelected >= 0) {
								showEditorProperty();
							} else {
								dismissEditorProperty();
							}

							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
							state = 0;
						}
					} else if(state >= 2 && state <= 9) {
						minJsOBJ = deepCopy(jsOBJ);
						min_child_data = minJsOBJ.datas[childSelected];
						min_child_data.json.size.width = 1;
						min_child_data.json.size.height = 1;
					}

					document.onmousemove = function(ev) {
						var evt = ev || event;
						if(state == 0) {
							div.style.cursor = '-webkit-grabbing';
							jsOBJ.originx = startx - evt.clientX / jsOBJ.scale;
							jsOBJ.originy = starty - evt.clientY / jsOBJ.scale;
							//						redraw(canvas, ctx, param);
							redrawGrid(grid_canvas, grid_cxt, jsOBJ);
							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawRuler(ruler_canvas, ruler_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);

							var d = new Date();
							ms1 = d.getTime();
							speedX = Math.floor((evt.clientX - lastX) / jsOBJ.scale / (ms1 - ms2 + 1) * 20);
							speedY = Math.floor((evt.clientY - lastY) / jsOBJ.scale / (ms1 - ms2 + 1) * 20);
							ms2 = ms1;
							lastX = evt.clientX;
							lastY = evt.clientY;
						} else if(state == 1) {
							child_data.json.location.x = Math.round(startx + evt.clientX / jsOBJ.scale);
							child_data.json.location.y = Math.round(starty + evt.clientY / jsOBJ.scale);

							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
						} else if(state == 2) {
							var measure_min = widget[min_child_data._className].measure(minJsOBJ, min_child_data.json);
							var r = child_data.json.location.x + child_data.json.size.width;
							var b = child_data.json.location.y + child_data.json.size.height;
							child_data.json.location.x = Math.round(startx + evt.clientX / jsOBJ.scale);
							child_data.json.location.y = Math.round(starty + evt.clientY / jsOBJ.scale);

							if(child_data.json.location.x >= r - measure_min.width) {
								child_data.json.location.x = r - measure_min.width;
							}
							if(child_data.json.location.y >= b - measure_min.height) {
								child_data.json.location.y = b - measure_min.height;
							}
							child_data.json.size.width = r - child_data.json.location.x;
							child_data.json.size.height = b - child_data.json.location.y;
							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
						} else if(state == 3) {
							var measure_min = widget[min_child_data._className].measure(minJsOBJ, min_child_data.json);
							var b = child_data.json.location.y + child_data.json.size.height;
							child_data.json.location.y = Math.round(starty + evt.clientY / jsOBJ.scale);
							if(child_data.json.location.y >= b - measure_min.height) {
								child_data.json.location.y = b - measure_min.height;
							}
							child_data.json.size.height = b - child_data.json.location.y;
							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
						} else if(state == 4) {
							var measure_min = widget[min_child_data._className].measure(minJsOBJ, min_child_data.json);
							var b = child_data.json.location.y + child_data.json.size.height;
							child_data.json.size.width = Math.round(startw + evt.clientX / jsOBJ.scale);
							child_data.json.location.y = Math.round(starty + evt.clientY / jsOBJ.scale);
							if(child_data.json.location.y >= b - measure_min.height) {
								child_data.json.location.y = b - measure_min.height;
							}
							if(child_data.json.size.width <= measure_min.width) {
								child_data.json.size.width = measure_min.width;
							}
							child_data.json.size.height = b - child_data.json.location.y;
							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
						} else if(state == 5) {
							var measure_min = widget[min_child_data._className].measure(minJsOBJ, min_child_data.json);
							var r = child_data.json.location.x + child_data.json.size.width;
							child_data.json.location.x = Math.round(startx + evt.clientX / jsOBJ.scale);
							if(child_data.json.location.x >= r - measure_min.width) {
								child_data.json.location.x = r - measure_min.width;
							}
							child_data.json.size.width = r - child_data.json.location.x;
							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
						} else if(state == 6) {
							var measure_min = widget[min_child_data._className].measure(minJsOBJ, min_child_data.json);
							child_data.json.size.width = Math.round(startw + evt.clientX / jsOBJ.scale);
							if(child_data.json.size.width <= measure_min.width) {
								child_data.json.size.width = measure_min.width;
							}
							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
						} else if(state == 7) {
							var measure_min = widget[min_child_data._className].measure(minJsOBJ, min_child_data.json);
							var r = child_data.json.location.x + child_data.json.size.width;
							child_data.json.location.x = Math.round(startx + evt.clientX / jsOBJ.scale);
							if(child_data.json.location.x >= r - measure_min.width) {
								child_data.json.location.x = r - measure_min.width;
							}
							child_data.json.size.height = Math.round(starth + evt.clientY / jsOBJ.scale);
							if(child_data.json.size.height <= measure_min.height) {
								child_data.json.size.height = measure_min.height;
							}
							child_data.json.size.width = r - child_data.json.location.x;
							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
						} else if(state == 8) {
							var measure_min = widget[min_child_data._className].measure(minJsOBJ, min_child_data.json);
							child_data.json.size.height = Math.round(starth + evt.clientY / jsOBJ.scale);
							if(child_data.json.size.height <= measure_min.height) {
								child_data.json.size.height = measure_min.height;
							}
							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
						} else if(state == 9) {
							var measure_min = widget[min_child_data._className].measure(minJsOBJ, min_child_data.json);
							child_data.json.size.width = Math.round(startw + evt.clientX / jsOBJ.scale);
							child_data.json.size.height = Math.round(starth + evt.clientY / jsOBJ.scale);
							if(child_data.json.size.width <= measure_min.width) {
								child_data.json.size.width = measure_min.width;
							}
							if(child_data.json.size.height <= measure_min.height) {
								child_data.json.size.height = measure_min.height;
							}
							redrawWidget(widget_canvas, widget_ctx, jsOBJ);
							redrawSelected(selected_canvas, selected_ctx, jsOBJ);
						}
						refreshEditorProperty();
					};
					document.onmouseup = function() {
						if(state == 0) {
							div.style.cursor = 'auto';
							move(speedX, speedY);
						}

						div.onmousemove = div_mouse_move;
						document.onmousemove = document.onmouseup = null;
					};
				}
				return false;
			};

			document.onkeydown = function(e) {
				var keyNum = window.event ? e.keyCode : e.which;
				if(keyNum == 46 && state == 1) {
					var r = confirm("Delete Elements - 1");
					if(r == true) {
						childArr.splice(childSelected, 1);
						childSelected = -1;
						state = -1;
						dismissEditorProperty();
						redrawWidget(widget_canvas, widget_ctx, jsOBJ);
						redrawSelected(selected_canvas, selected_ctx, jsOBJ);
					}
				}
			}

			$(div).on("mousewheel DOMMouseScroll", function(e) {
				var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
					(e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
				var x = e.originalEvent.offsetX;
				var y = e.originalEvent.offsetY;
				var startX = x / jsOBJ.scale + jsOBJ.originx;
				var startY = y / jsOBJ.scale + jsOBJ.originy;
				if(delta > 0) {

					jsOBJ.scale = jsOBJ.scale * 1.15;
					if(jsOBJ.scale >= 10) {
						jsOBJ.scale = 10;
					}
					jsOBJ.originx = Math.floor(startX - x / jsOBJ.scale);
					jsOBJ.originy = Math.floor(startY - y / jsOBJ.scale);
					redrawGrid(grid_canvas, grid_cxt, jsOBJ);
					redrawWidget(widget_canvas, widget_ctx, jsOBJ);
					redrawRuler(ruler_canvas, ruler_ctx, jsOBJ);
					redrawSelected(selected_canvas, selected_ctx, jsOBJ);
				} else if(delta < 0) {
					jsOBJ.scale = jsOBJ.scale * 0.95;
					if(jsOBJ.scale <= 0.1) {
						jsOBJ.scale = 0.1;
					}
					jsOBJ.originx = Math.floor(startX - x / jsOBJ.scale);
					jsOBJ.originy = Math.floor(startY - y / jsOBJ.scale);
					redrawGrid(grid_canvas, grid_cxt, jsOBJ);
					redrawWidget(widget_canvas, widget_ctx, jsOBJ);
					redrawRuler(ruler_canvas, ruler_ctx, jsOBJ);
					redrawSelected(selected_canvas, selected_ctx, jsOBJ);
				}
			});

			function move(speedX, speedY) {
				clearInterval(timerID);
				var originx = jsOBJ.originx;
				var originy = jsOBJ.originy;

				function drewMove() {
					speedX = speedX * 0.87; //摩擦
					speedY = speedY * 0.87; //摩擦
					originx = originx - speedX;
					originy = originy - speedY;
					jsOBJ.originx = Math.floor(originx);
					jsOBJ.originy = Math.floor(originy);
					redrawGrid(grid_canvas, grid_cxt, jsOBJ);
					redrawWidget(widget_canvas, widget_ctx, jsOBJ);
					redrawRuler(ruler_canvas, ruler_ctx, jsOBJ);
					redrawSelected(selected_canvas, selected_ctx, jsOBJ);
					if(Math.abs(speedX) < 1 && Math.abs(speedY) < 1) {
						speedX = 0;
						speedY = 0;
					}
					if(speedX == 0 && speedY == 0) {
						clearInterval(timerID);
					}
				}
				timerID = setInterval(drewMove, 20);
			}
		}

		var zoomin = function() {
			var startX = (width - 245) / 2 / jsOBJ.scale + jsOBJ.originx;
			var startY = (height - 40) / 2 / jsOBJ.scale + jsOBJ.originy;
			jsOBJ.scale = jsOBJ.scale * 1.2;
			if(jsOBJ.scale >= 10) {
				jsOBJ.scale = 10;
			}
			jsOBJ.originx = Math.floor(startX - (width - 245) / 2 / jsOBJ.scale);
			jsOBJ.originy = Math.floor(startY - (height - 40) / 2 / jsOBJ.scale);
			redraw();
		}

		var zoomout = function() {
			var startX = (width - 245) / 2 / jsOBJ.scale + jsOBJ.originx;
			var startY = (height - 40) / 2 / jsOBJ.scale + jsOBJ.originy;
			jsOBJ.scale = jsOBJ.scale * 0.8;
			if(jsOBJ.scale <= 0.1) {
				jsOBJ.scale = 0.1;
			}
			jsOBJ.originx = Math.floor(startX - (width - 245) / 2 / jsOBJ.scale);
			jsOBJ.originy = Math.floor(startY - (height - 40) / 2 / jsOBJ.scale);
			redraw();
		}

		var zoomreset = function() {
			var startX = (width - 245) / 2 / jsOBJ.scale + jsOBJ.originx;
			var startY = (height - 40) / 2 / jsOBJ.scale + jsOBJ.originy;
			jsOBJ.scale = 1;
			jsOBJ.originx = Math.floor(startX - (width - 245) / 2 / jsOBJ.scale);
			jsOBJ.originy = Math.floor(startY - (height - 40) / 2 / jsOBJ.scale);
			redraw();
		}

		return {
			rootDiv: rootDiv,
			redraw: redraw,
			zoomin: zoomin,
			zoomout: zoomout,
			zoomreset: zoomreset
		};
	}

	function getToolbar(width, height) {
		var toolbar = document.createElement('div');
		toolbar.className = "graph-editor__toolbar";
		//		toolbar.dataOptions = "region:&quot;north&quot;, height: 40";
		toolbar.style.position = "absolute";
		toolbar.style.boxSizing = "border-box";
		toolbar.style.width = width + "px";
		toolbar.style.height = "40px";
		toolbar.style.top = "0px";
		toolbar.style.left = "0px";
		var group_div = document.createElement('div');
		group_div.className = "btn-group";
		group_div.appendChild(getBut("默认模式", "q-icon toolbar-default"));
		group_div.appendChild(getBut("框选模式", "q-icon toolbar-rectangle_selection"));
		group_div.appendChild(getBut("浏览模式", "q-icon toolbar-pan"));
		toolbar.appendChild(group_div);
		var group_div = document.createElement('div');
		group_div.className = "btn-group";
		var zoomin = getBut("放大", "q-icon toolbar-zoomin");
		zoomin.onclick = function() {
			editor_canvas.zoomin();
		}
		group_div.appendChild(zoomin);
		var zoomout = getBut("缩小", "q-icon toolbar-zoomout");
		zoomout.onclick = function() {
			editor_canvas.zoomout();
		}
		group_div.appendChild(zoomout);
		var zoomreset = getBut("1:1", "q-icon toolbar-zoomreset");
		zoomreset.onclick = function() {
			editor_canvas.zoomreset();
		}
		group_div.appendChild(zoomreset);
		group_div.appendChild(getBut("纵览", "q-icon toolbar-overview"));
		toolbar.appendChild(group_div);
		var search = getSearchBut();
		toolbar.appendChild(search.rootDiv);
		search.but.onclick = function() {
			for(var i = childSelected + 1; i < childArr.length + childSelected; i++) {
				if(childArr[i % childArr.length].json.name == search.input.value) {
					childSelected = i % childArr.length;
					editor_canvas.redraw();
					showEditorProperty();
					break;
				}
			}
		}
		var group_div = document.createElement('div');
		group_div.className = "btn-group";
		var json = getBut("导出JSON", "q-icon toolbar-json");
		json.onclick = function() {
			json_text_editor.value = formatJson(JSON.stringify(jsOBJ));
			if(editorJson.style.display == "block") {
				editorJson.style.display = "none";
				json.className = "btn btn-default btn-sm";
			} else {
				editorJson.style.display = "block";
				json.className = "btn btn-default btn-sm active";
			}
		}
		group_div.appendChild(json);
		var download = getBut("下载文件", "q-icon toolbar-download");
		download.onclick = function() {
			var blob = new Blob([formatJson(JSON.stringify(jsOBJ))]);
			if (!!window.ActiveXObject || "ActiveXObject" in window) {
				navigator.msSaveBlob(blob, "layout.json");
			}else{
				var aLink = document.createElement('a');
				var evt = document.createEvent("MouseEvents");
				evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错
				aLink.download = "layout.json";
				aLink.href = URL.createObjectURL(blob);
				aLink.dispatchEvent(evt);
			}
		}
		group_div.appendChild(json);
		group_div.appendChild(download);
		toolbar.appendChild(group_div);
		var group_div = document.createElement('div');
		group_div.className = "btn-group";
		group_div.appendChild(getBut("保存", "q-icon toolbar-save"));
		toolbar.appendChild(group_div);

		return toolbar;

		function getBut(title, icon) {
			var but = document.createElement('div');
			but.className = "btn btn-default btn-sm";
			but.title = title;
			var ico_div = document.createElement('div');
			ico_div.className = icon;
			but.appendChild(ico_div);
			return but;
		}

		function getSearchBut() {
			var group_div = document.createElement('div');
			group_div.style.display = "inline-block";
			group_div.style.verticalAlign = "middle";
			group_div.style.width = "170px";
			var search_div = document.createElement('div');
			group_div.appendChild(search_div);
			search_div.className = "input-group input-group-sm";
			var search_input = document.createElement('input');
			search_div.appendChild(search_input);
			search_input.className = "form-control";
			search_input.placeholder = "Name";
			search_input.id = "search_input";
			search_input.type = "text";
			var search_span = document.createElement('span');
			search_span.className = "input-group-btn";
			search_div.appendChild(search_span);
			var search_but_div = document.createElement('div');
			search_but_div.className = "btn btn-default";
			//			search_but_div.type = "button";
			search_span.appendChild(search_but_div);
			var search_ico_div = document.createElement('div');
			search_ico_div.className = "q-icon toolbar-search";
			search_but_div.appendChild(search_ico_div);
			return {
				rootDiv: group_div,
				input: search_input,
				but: search_span
			};
		}

	}

	var child_pa_input_arr;

	function refreshEditorProperty() {
		if(child_pa_input_arr) {
			for(var i = 0; i < child_pa_input_arr.length; i++) {
				var input_item = child_pa_input_arr[i];
				var widget = input_item.widget_data;
				var str;
				if(widget.length >= 1) {
					str = formatValueEmpty(widget[0].widget_par[widget[0].widget_par_key]);
				}
				for(var j = 1; j < widget.length; j++) {
					str = str + " | " + formatValueEmpty(widget[j].widget_par[widget[j].widget_par_key]);
				}
				input_item.value = str;
			}
		}

		function formatValueEmpty(str) {
			if(typeof(str) == "undefined") {
				return "";
			}
			return str;
		}
	}

	function showEditorProperty() {
		child_pa_input_arr = new Array();
		var child_data = childArr[childSelected];
		editor_property_form.innerHTML = "";
		var group, label, o;
		var p;
		var params = widget[child_data._className].params;
		for(var name in params) {
			o = params[name];
			group = document.createElement('div');
			group.className = "class-group";
			if(typeof(o) == "object") {
				label = document.createElement('h4');
				if("_name" in o) {
					label.innerHTML = o["_name"];
				} else {
					label.innerHTML = o;
				}
				group.appendChild(label);

				for(var name1 in o) {
					p = child_data.json;
					if(typeof(o[name1]) == "object") {
						if("_name" in o[name1]) {
							var type, isEditor, isVisible;
							if("_type" in o[name1]) {
								type = o[name1]["_type"];
							} else {
								type = "text";
							}
							if("_isEditor" in o[name1]) {
								isEditor = o[name1]["_isEditor"];
							} else {
								isEditor = false;
							}
							if("_isVisible" in o[name1]) {
								isVisible = o[name1]["_isVisible"];
							} else {
								isVisible = false;
							}
							if(isVisible) {
								var keyv;
								if("value" in o[name1]) {
									//									var json_key = p;
									//									var kinput = keyv.input;
									//									kinput.chid_par_key = name1;
									//									kinput.chid_par = p;
									//									child_pa_input_arr.push(kinput);
									//									kinput.oninput = function(event){
									//										console.log(event.target.chid_par_key);
									//										event.target.chid_par[event.target.chid_par_key] = event.target.value;
									//										editor_canvas.redraw();
									//									};
									if(type == "color") {
										keyv = getPropertyItemColor(o[name1]["_name"]);
										keyv.input.value = formatValueEmpty(p[name]);
										keyv.color.widget_data = new Array();
										keyv.color.widget_data.push({
											widget_par: p,
											widget_par_key: name
										});
										$(keyv.color).colorpicker().on('changeColor', function(e) {
											var widget = e.target.widget_data;
											widget[0].widget_par[widget[0].widget_par_key] = formatValueEmpty(e.color.toString('rgba'));
											editor_canvas.redraw();
										});
									} else {
										keyv = getPropertyItemText(o[name1]["_name"]);
										keyv.input.widget_data = new Array();
										keyv.input.widget_data.push({
											widget_par: p,
											widget_par_key: name1
										});
										child_pa_input_arr.push(keyv.input);
										keyv.input.value = formatValueEmpty(p[name1]);
										keyv.input.oninput = function(event) {
											var widget = event.target.widget_data;
											var str = event.target.value;
											var arr = str.split("|");
											for(var i = 0; i < arr.length; i++) {
												if(typeof(arr[i]) != "undefined") {
													if(typeof(widget[i].widget_par[widget[i].widget_par_key]) == "number") {
														widget[i].widget_par[widget[i].widget_par_key] = parseInt(formatValueEmpty(arr[i]));
													} else {
														widget[i].widget_par[widget[i].widget_par_key] = formatValueEmpty(arr[i]);
													}
												}
											}
											editor_canvas.redraw();
										};
									}
									group.appendChild(keyv.rootdiv);
								} else {
									keyv = getPropertyItemText(o[name1]["_name"]);
									group.appendChild(keyv.rootdiv);
									p = getDataProperty(p, name1);
									pa = new Array();
									pb = new Array();
									pc = new Array();
									var getv = getValue(o[name1]);
									if(getv) {
										var str;
										if(getv.length >= 1) {
											str = formatValueEmpty(getv[0].widget_par[getv[0].widget_par_key]);
										}
										for(var i = 1; i < getv.length; i++) {
											str = str + " | " + formatValueEmpty(getv[i].widget_par[getv[i].widget_par_key]);
										}
										keyv.input.widget_data = getv;
										keyv.input.value = str;
										child_pa_input_arr.push(keyv.input);
										keyv.input.oninput = function(event) {
											var widget = event.target.widget_data;
											var str = event.target.value;
											var arr = str.split("|");
											for(var i = 0; i < arr.length; i++) {
												if(i < widget.length) {
													if(typeof(arr[i]) != "undefined") {
														if(typeof(widget[i].widget_par[widget[i].widget_par_key]) == "number") {
															widget[i].widget_par[widget[i].widget_par_key] = parseInt(formatValueEmpty(arr[i]));
														} else {
															widget[i].widget_par[widget[i].widget_par_key] = formatValueEmpty(arr[i]);
														}
													}
												}
											}
											editor_canvas.redraw();
										};
									}
								}

								if(!isEditor) {
									keyv.input.disabled = true;
								}
							}
						} else {
							p = getDataProperty(p, name1);
							getKeyValue(o[name1], group);
						}
					}
				}
			}
			if(group) {
				editor_property_form.appendChild(group);
			}
		}

		function formatValueEmpty(str) {
			if(typeof(str) == "undefined") {
				return "";
			}
			return str;
		}

		function getDataProperty(data, name) {
			if(typeof(data[name]) == "undefined") {
				data[name] = {};
			}
			return data[name];
		}

		var pa = new Array();
		var pb = new Array();
		var pc = new Array();

		function getValue(params) {
			for(var name in params) {
				if(typeof(params[name]) == "object") {
					for(var i = 0; i < pa.length; i++) {
						if(params[name] == pa[i]) {
							pa.splice(i, pa.length - 1);
							pb.splice(i, pb.length - 1);
						}
					}

					pa.push(params[name]);
					pb.push(name);
					getValue(params[name]);
				} else {
					if("_isEditor" != name && "_isVisible" != name && "_name" != name && "_type" != name) {
						var pd = p;
						for(var i = 0; i < pb.length; i++) {
							pd = getDataProperty(pd, pb[i]);
						}
						pc.push({
							widget_par: pd,
							widget_par_key: name
						});
					}
				}
			}
			return pc;
		}

		function getKeyValue(params, group) {
			for(var name in params) {
				if(typeof(params[name]) == "object") {
					if("_name" in params[name]) {
						var type, isEditor, isVisible;
						if("_type" in params[name]) {
							type = params[name]["_type"];
						} else {
							type = "text";
						}
						if("_isEditor" in params[name]) {
							isEditor = params[name]["_isEditor"];
						} else {
							isEditor = false;
						}
						if("_isVisible" in params[name]) {
							isVisible = params[name]["_isVisible"];
						} else {
							isVisible = false;
						}

						if(isVisible) {
							var keyv;
							if("value" in params[name]) {
								if(type == "color") {
									keyv = getPropertyItemColor(params[name]["_name"]);
									keyv.input.value = formatValueEmpty(p[name]);
									keyv.color.widget_data = new Array();
									keyv.color.widget_data.push({
										widget_par: p,
										widget_par_key: name
									});
									$(keyv.color).colorpicker().on('changeColor', function(e) {
										var widget = e.target.widget_data;
										widget[0].widget_par[widget[0].widget_par_key] = formatValueEmpty(e.color.toString('rgba'));
										editor_canvas.redraw();
									});
								} else {
									keyv = getPropertyItemText(params[name]["_name"]);
									keyv.input.widget_data = new Array();
									keyv.input.widget_data.push({
										widget_par: p,
										widget_par_key: name
									});
									child_pa_input_arr.push(keyv.input);
									keyv.input.value = formatValueEmpty(p[name]);
									keyv.input.oninput = function(event) {
										var widget = event.target.widget_data;
										var str = event.target.value;
										var arr = str.split("|");
										for(var i = 0; i < arr.length; i++) {
											if(typeof(arr[i]) != "undefined") {
												if(typeof(widget[i].widget_par[widget[i].widget_par_key]) == "number") {
													widget[i].widget_par[widget[i].widget_par_key] = parseInt(formatValueEmpty(arr[i]));
												} else {
													widget[i].widget_par[widget[i].widget_par_key] = formatValueEmpty(arr[i]);
												}
											}
										}
										editor_canvas.redraw();
									};
								}
								group.appendChild(keyv.rootdiv);
							} else {
								keyv = getPropertyItemText(params[name]["_name"]);
								group.appendChild(keyv.rootdiv);
								p = getDataProperty(p, name);
								pa = new Array();
								pb = new Array();
								pc = new Array();
								var getv = getValue(params[name]);
								if(getv) {
									var str;
									if(getv.length >= 1) {
										str = formatValueEmpty(getv[0].widget_par[getv[0].widget_par_key]);
									}
									for(var i = 1; i < getv.length; i++) {
										str = str + " | " + formatValueEmpty(getv[i].widget_par[getv[i].widget_par_key]);
									}
									keyv.input.widget_data = getv;
									keyv.input.value = str;
									child_pa_input_arr.push(keyv.input);
									keyv.input.oninput = function(event) {
										var widget = event.target.widget_data;
										var str = event.target.value;
										var arr = str.split("|");
										for(var i = 0; i < arr.length; i++) {
											if(i < widget.length) {
												if(typeof(arr[i]) != "undefined") {
													if(typeof(widget[i].widget_par[widget[i].widget_par_key]) == "number") {
														widget[i].widget_par[widget[i].widget_par_key] = parseInt(formatValueEmpty(arr[i]));
													} else {
														widget[i].widget_par[widget[i].widget_par_key] = formatValueEmpty(arr[i]);
													}
												}
											}
										}
										editor_canvas.redraw();
									};
								}
							}

							if(!isEditor) {
								keyv.input.disabled = true;
							}
						}
					} else {
						p = getDataProperty(p, name);
						getKeyValue(params[name], group);
					}
				}
			}
			return null;
		}

		function getPropertyItemText(name) {
			var text_input = document.createElement('input');
			text_input.className = "form-control";
			var div1, div2, label;
			div1 = document.createElement('div');
			div1.className = "input-group input-group-sm col-sm-6";
			div1.appendChild(text_input);
			label = document.createElement('label');
			label.className = "col-sm-6 control-label font-small";
			label.innerHTML = name;
			div2 = document.createElement('div');
			div2.className = "form-group";
			div2.appendChild(label);
			div2.appendChild(div1);
			return {
				rootdiv: div2,
				input: text_input
			};
		}

		function getPropertyItemColor(name) {
			var color_input = document.createElement('input');
			color_input.className = "form-control input-lg";
			var color_span = document.createElement('span');
			color_span.className = "input-group-addon";
			var color_i = document.createElement('i');
			color_span.appendChild(color_i);
			var div1, div2, label;
			div1 = document.createElement('div');
			div1.className = "input-group input-group-sm col-sm-6  colorpicker-component";
			div1.appendChild(color_input);
			div1.appendChild(color_span);
			label = document.createElement('label');
			label.className = "col-sm-6 control-label font-small";
			label.innerHTML = name;
			div2 = document.createElement('div');
			div2.className = "form-group";
			div2.appendChild(label);
			div2.appendChild(div1);
			return {
				rootdiv: div2,
				input: color_input,
				color: div1
			};
		}

		editorProperty.style.display = "block";
	}

	function dismissEditorProperty() {
		child_pa_input_arr = null;
		editorProperty.style.display = "none";
	}

	var formatJson = function(json, options) {
		var reg = null,
			formatted = '',
			pad = 0,
			PADDING = '    ';
		options = options || {};
		options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
		options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
		if(typeof json !== 'string') {
			json = JSON.stringify(json);
		} else {
			json = JSON.parse(json);
			json = JSON.stringify(json);
		}
		reg = /([\{\}])/g;
		json = json.replace(reg, '\r\n$1\r\n');
		reg = /([\[\]])/g;
		json = json.replace(reg, '\r\n$1\r\n');
		reg = /(\,)/g;
		json = json.replace(reg, '$1\r\n');
		reg = /(\r\n\r\n)/g;
		json = json.replace(reg, '\r\n');
		reg = /\r\n\,/g;
		json = json.replace(reg, ',');
		if(!options.newlineAfterColonIfBeforeBraceOrBracket) {
			reg = /\:\r\n\{/g;
			json = json.replace(reg, ':{');
			reg = /\:\r\n\[/g;
			json = json.replace(reg, ':[');
		}
		if(options.spaceAfterColon) {
			reg = /\:/g;
			json = json.replace(reg, ':');
		}
		(json.split('\r\n')).forEach(function(node, index) {
			var i = 0,
				indent = 0,
				padding = '';

			if(node.match(/\{$/) || node.match(/\[$/)) {
				indent = 1;
			} else if(node.match(/\}/) || node.match(/\]/)) {
				if(pad !== 0) {
					pad -= 1;
				}
			} else {
				indent = 0;
			}

			for(i = 0; i < pad; i++) {
				padding += PADDING;
			}

			formatted += padding + node + '\r\n';
			pad += indent;
		});
		return formatted;
	};

	function getTooltip() {
		var tipdiv = document.createElement('div');
		tipdiv.className = "graph-editor_tooltip";
		tipdiv.style.left = "700px";
		tipdiv.style.top = "700px";
		tipdiv.style.display = "none";
		return tipdiv;
	}

	var json_text_editor;

	function getEditorJson() {
		var editor_json = document.createElement('div');
		editor_json.className = "graph-editor__json";
		editor_json.style.display = "none";
		json_text_editor = document.createElement('textarea');
		json_text_editor.spellcheck = false;
		editor_json.appendChild(json_text_editor);
		var buts = document.createElement('div');
		buts.className = "graph-editor__json__buttons";
		editor_json.appendChild(buts);
		var group = document.createElement('div');
		group.className = "btn-group";
		buts.appendChild(group);
		var update = getBut("更新");
		update.onclick = function() {
			json_text_editor.value = formatJson(JSON.stringify(jsOBJ));
		}
		var json_text_editor_submit = getBut("提交");
		json_text_editor_submit.onclick = function() {
			jsOBJ = JSON.parse(json_text_editor.value);
			childArr = jsOBJ.datas;
			childSelected = -1;

			editor_canvas.redraw();
		}
		group.appendChild(update);
		group.appendChild(json_text_editor_submit);
		return editor_json;

		function getBut(title) {
			var but = document.createElement('div');
			but.className = "btn btn-default btn-sm";
			but.title = title;
			but.innerHTML = title;
			return but;
		}
	}

	var editor_property_form;

	function getEditorProperty() {
		var editor_property = document.createElement('div');
		editor_property.className = "graph-editor__property";
		editor_property.style.display = "none";
		editor_property_form = document.createElement('form');
		editor_property_form.className = "form-horizontal";
		editor_property.appendChild(editor_property_form);
		return editor_property;
	}

	function getEditorToolbox(width, height) {
		var widgetGroupOBJ = {};
		for(var name in widget) {
			var widgetItem = widget[name];
			if(typeof(widgetItem) == "object") {
				if("group_name" in widgetItem) {
					if(!(widgetItem.group_name in widgetGroupOBJ)) {
						widgetGroupOBJ[widgetItem.group_name] = new Array();
					}
					var widgetItemOBJ = getWidgetItemOBJ(widgetItem, name);
					widgetGroupOBJ[widgetItem.group_name].push({
						groupname: widgetItem.group_name,
						itemname: widgetItem.item_name,
						data: widgetItemOBJ
					});
				}
			}
		}

		function getWidgetItemOBJ(child_data, name) {
			var p, o, widget_item_OBJ;
			var params = child_data.params;
			widget_item_OBJ = {};
			widget_item_OBJ["_className"] = name;
			widget_item_OBJ["json"] = {};
			for(var name in params) {
				o = params[name];
				if(typeof(o) == "object") {
					for(var name1 in o) {
						p = widget_item_OBJ.json;
						if(typeof(o[name1]) == "object") {
							if("_name" in o[name1]) {
								var type, isEditor, isVisible;
								if("_type" in o[name1]) {
									type = o[name1]["_type"];
								} else {
									type = "text";
								}
								if("_isEditor" in o[name1]) {
									isEditor = o[name1]["_isEditor"];
								} else {
									isEditor = false;
								}
								if("_isVisible" in o[name1]) {
									isVisible = o[name1]["_isVisible"];
								} else {
									isVisible = false;
								}
								if(isVisible) {
									if("value" in o[name1]) {
										p[name1] = o[name1]["value"];
									} else {
										p = getDataProperty(p, name1);
										pa = new Array();
										pb = new Array();
										pc = new Array();
										var getv = getValue(o[name1]);
										if(getv) {
											for(var i = 0; i < getv.length; i++) {
												getv[i].widget_par[getv[i].widget_par_key] = getv[i].default_value;
											}
										}
									}
								}
							} else {
								p = getDataProperty(p, name1);
								getKeyValue(o[name1]);
							}
						}
					}
				}
			}

			function formatValueEmpty(str) {
				if(typeof(str) == "undefined") {
					return "";
				}
				return str;
			}

			function getDataProperty(data, name) {
				if(typeof(data[name]) == "undefined") {
					data[name] = {};
				}
				return data[name];
			}

			var pa = new Array();
			var pb = new Array();
			var pc = new Array();

			function getValue(params) {
				for(var name in params) {
					if(typeof(params[name]) == "object") {
						for(var i = 0; i < pa.length; i++) {
							if(params[name] == pa[i]) {
								pa.splice(i, pa.length - 1);
								pb.splice(i, pb.length - 1);
							}
						}

						pa.push(params[name]);
						pb.push(name);
						getValue(params[name]);
					} else {
						if("_isEditor" != name && "_isVisible" != name && "_name" != name && "_type" != name) {
							var pd = p;
							for(var i = 0; i < pb.length; i++) {
								pd = getDataProperty(pd, pb[i]);
							}
							pc.push({
								widget_par: pd,
								widget_par_key: name,
								default_value: params[name]
							});
						}
					}
				}
				return pc;
			}

			function getKeyValue(params) {
				for(var name in params) {
					if(typeof(params[name]) == "object") {
						if("_name" in params[name]) {
							var type, isEditor, isVisible;
							if("_type" in params[name]) {
								type = params[name]["_type"];
							} else {
								type = "text";
							}
							if("_isEditor" in params[name]) {
								isEditor = params[name]["_isEditor"];
							} else {
								isEditor = false;
							}
							if("_isVisible" in params[name]) {
								isVisible = params[name]["_isVisible"];
							} else {
								isVisible = false;
							}

							if(isVisible) {
								if("value" in params[name]) {
									p[name] = params[name]["value"];
								} else {
									p = getDataProperty(p, name);
									pa = new Array();
									pb = new Array();
									pc = new Array();
									var getv = getValue(params[name]);
									if(getv) {
										for(var i = 0; i < getv.length; i++) {
											getv[i].widget_par[getv[i].widget_par_key] = getv[i].default_value;
										}
									}
								}
							}
						} else {
							p = getDataProperty(p, name);
							getKeyValue(params[name]);
						}
					}
				}
				return null;
			}
			return widget_item_OBJ;
		}

		var editor_toolbox = document.createElement('div');
		editor_toolbox.className = "graph-editor__toolbox";
		editor_toolbox.style.top = "40px";
		editor_toolbox.style.left = "0px";
		editor_toolbox.style.width = "245px";
		editor_toolbox.style.height = height + "px";
		editor_toolbox.style.position = "absolute";
		editor_toolbox.style.boxSizing = "border-box";
		for(var name in widgetGroupOBJ) {
			var default_control = getGroupItem("control", name);
			editor_toolbox.appendChild(default_control.rootdiv);
			for(var i = 0; i < widgetGroupOBJ[name].length; i++) {
				var widgetItemOBJ = widgetGroupOBJ[name][i];
				//				{groupname:widgetItem.group_name,itemname:widgetItem.item_name,data:widgetItemOBJ}
				var item_div = document.createElement('div');
				item_div.className = "group__item";
				var item_canvas = document.createElement('canvas');
				item_canvas.width = 40;
				item_canvas.height = 40;
				item_canvas.title = widgetItemOBJ.itemname;
				item_canvas.style.width = "40px";
				item_canvas.style.height = "40px";
				//				item_canvas.draggable = true;
				item_canvas.widgetItemOBJ = widgetItemOBJ;
				$(item_canvas).draggable({
					OBJindex: i,
					appendTo: "body",
					helper: "clone",
					containment: "body",
					helper: function(event) {
						var widgetItemOBJ = event.target.widgetItemOBJ;
						var drag_canvas = document.createElement('canvas');
						for(var name in widget) {
							var widgetItem = widget[name];
							if(typeof(widgetItem) == "object") {
								if("group_name" in widgetItem) {
									if(widgetItem.group_name == widgetItemOBJ.groupname && widgetItem.item_name == widgetItemOBJ.itemname) {
										drag_canvas.widgetItemOBJ = getWidgetItemOBJ(widgetItem, name);
										break;
									}
								}
							}
						}
						drag_canvas.width = 40;
						drag_canvas.height = 40;
						drag_canvas.style.width = "40px";
						drag_canvas.style.height = "40px";
						var ctx = drag_canvas.getContext('2d');
						var param = {};
						param.version = "1.0";
						param.datas = new Array();
						param.datas.push(widgetItemOBJ.data);
						param.scale = 1;
						param.originx = 0;
						param.originy = 0;
						var redraw = function() {
							widget[widgetItemOBJ.data._className].drawItem(item_canvas, ctx, param, widgetItemOBJ.data.json, redraw);
						}
						redraw();
						return $(drag_canvas);
					}
				});
				item_div.appendChild(item_canvas);
				default_control.itemsdiv.appendChild(item_div);
				var ctx = item_canvas.getContext('2d');
				var param = {};
				param.version = "1.0";
				param.datas = new Array();
				param.datas.push(widgetItemOBJ.data);
				param.scale = 1;
				param.originx = 0;
				param.originy = 0;
				var redraw = function() {
					widget[widgetItemOBJ.data._className].drawItem(item_canvas, ctx, param, widgetItemOBJ.data.json, redraw);
				}
				redraw();
			}
		}
		//		<div class="group__item"><canvas width="40" height="40" title="Q-server" style="width: 40px; height: 40px;" draggable="true" draginfo='{"image":"Q-server"}'></canvas></div>

		function getGroupItem(div_id, title) {
			var root_div = document.createElement('div');
			root_div.className = "group group--closed";
			root_div.id = div_id;
			var titleOnClick = function(event) {
				if(root_div.className == "group group--closed") {
					root_div.className = "group";
				} else {
					root_div.className = "group group--closed";
				}
			};
			var title_div = document.createElement("div");
			title_div.className = "group__title";
			var title_span = document.createElement("span");
			title_span.className = "null";
			title_span.innerHTML = title;
			var title_ioc = document.createElement("span");
			title_ioc.className = "q-icon group-expand toolbar-expand";
			title_div.appendChild(title_span);
			title_div.appendChild(title_ioc);
			title_div.onclick = titleOnClick;
			//			title_div.root_div = root_div;
			//			title_div.onclick = function(event){
			//				if (event.target.root_div.className == "group group--closed") {
			//					event.target.root_div.className = "group";
			//				}else{
			//					event.target.root_div.className = "group group--closed";
			//				}
			//			};

			var items_div = document.createElement("div");
			items_div.className = "group__items";
			var clear_div = document.createElement("div");
			clear_div.style.clear = "both";
			root_div.appendChild(title_div);
			root_div.appendChild(items_div);
			root_div.appendChild(clear_div);
			return {
				rootdiv: root_div,
				itemsdiv: items_div
			};
		}

		return editor_toolbox;
	}

	var tooltip;
	var editorJson;
	var editorProperty;
	var editor_canvas;

	function loadEditor() {
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

		var b = document.body;
		while(b.hasChildNodes()) //当div下还存在子节点时 循环继续  
		{
			b.removeChild(b.firstChild);
		}
		var width = document.documentElement.clientWidth || document.body.clientWidth;
		var height = document.documentElement.clientHeight || document.body.clientHeight;
		var rootDiv = document.createElement('div');
		rootDiv.className = "graph-editor layout";
		//		rootDiv.dataOptions = "region:'center'";
		rootDiv.style.position = "absolute";
		rootDiv.style.boxSizing = "border-box";
		rootDiv.style.width = width + "px";
		rootDiv.style.height = height + "px";
		rootDiv.style.top = "0px";
		rootDiv.style.overflow = "hidden";
		editor_canvas = getCanvas(width, height);
		rootDiv.appendChild(editor_canvas.rootDiv);
		rootDiv.appendChild(getToolbar(width, height));

		rootDiv.appendChild(getEditorToolbox(width, height));

		editorProperty = getEditorProperty();
		rootDiv.appendChild(editorProperty);

		editorJson = getEditorJson();
		rootDiv.appendChild(editorJson);

		document.body.appendChild(rootDiv);

		tooltip = getTooltip();
		document.body.appendChild(tooltip);

	}

	window.onload = function() {
		loadEditor();
	};

	$(window).resize(function() {
		loadEditor();
	});

})();