var img_arr = {};
var widget = {
	main_window: {
		params:{
			Element:{
				_name:"Element",
				name:{
					_isEditor:true,
					_isVisible:true,
					_type:"text",
					_name:"名称",
					value:"main_window"
				},
				type:{
					_isEditor:false,
					_isVisible:true,
					_type:"text",
					_name:"类型",
					value:"unchange-size-position"
				},
				location:{
					_isEditor:false,
					_isVisible:true,
					_name:"位置",
					_type:"text",
					x:0,
					y:0
				},
				size:{
					_isEditor:false,
					_isVisible:true,
					_name:"尺寸",
					_type:"text",
					width:100,
					height:100
				}
			}
		},
		measure: function(param, child_data){
			var measure = {};
			measure.x = Math.floor(child_data.location.x);
			measure.y = Math.floor(child_data.location.y);
			measure.width = Math.floor(child_data.size.width);
			measure.height = Math.floor(child_data.size.height);
			return measure;
		},
		draw: function(canvas, ctx, param, child_data, redraw) {
//			console.log("111111");
			var measure = this.measure(param, child_data);
			ctx.lineJoin = "round";
			ctx.strokeStyle = "rgba(0, 0, 0, 1)";
			
			var gradient=ctx.createLinearGradient(measure.x,0,measure.width,0);
			gradient.addColorStop("0.1","rgba(144, 217, 252, 0.6)");
			gradient.addColorStop("0.4","rgba(178, 229, 255, 0.6)");
			gradient.addColorStop("0.9","rgba(106, 166, 229, 0.6)");
			
			ctx.fillStyle = gradient;
			
			ctx.fillRect(measure.x,measure.y,measure.width,measure.height);
			ctx.strokeRect(measure.x,measure.y,measure.width,measure.height);
		}
	},
	child_text: {
		group_name:"基本控件",
		item_name:"文本",
		params:{
			Element:{
				_name:"Element",
				name:{
					_isEditor:true,
					_isVisible:true,
					_type:"text",
					_name:"名称",
					value:"text"
				},
				type:{
					_isEditor:true,
					_isVisible:true,
					_type:"text",
					_name:"类型",
					value:""
				},
				location:{
					_isEditor:true,
					_isVisible:true,
					_name:"位置",
					_type:"text",
					x:4,
					y:10
				},
				size:{
					_isEditor:true,
					_isVisible:true,
					_name:"尺寸",
					_type:"text",
					width:32,
					height:20
				}
			},
			Text:{
				_name:"Text",
				text:{
					content:{
						_isEditor:true,
						_isVisible:true,
						_type:"text",
						_name:"内容",
						value:"Text"
					},
					color:{
						_isEditor:true,
						_isVisible:true,
						_type:"color",
						_name:"颜色",
						value:"#ffffff"
					},
					background_color:{
						_isEditor:true,
						_isVisible:true,
						_type:"color",
						_name:"背景色",
						value:"#2898e0"
					},
					size:{
						_isEditor:true,
						_isVisible:true,
						_type:"text",
						_name:"文字大小",
						value:12
					},
					corner:{
						_isEditor:true,
						_isVisible:true,
						_type:"text",
						_name:"圆角",
						value:6
					},
					position:{
						_isEditor:true,
						_isVisible:true,
						_type:"text",
						_name:"Text Position",
						value:"Text"
					}
				}
			}
		},
		measure: function(param, child_data){
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			ctx.fillStyle = child_data.text.color;
			ctx.font= child_data.text.size + "px Verdana";
			ctx.textBaseline="middle";
			var measure = {};
			measure.x = Math.floor(child_data.location.x);
			measure.y = Math.floor(child_data.location.y);
			var corner = child_data.text.corner;
			var text_width = ctx.measureText(child_data.text.content);
			var min = Math.min(text_width.width, child_data.text.size);
			if (corner < Math.ceil(Math.sqrt(Math.pow(text_width.width / 2,2) + Math.pow(child_data.text.size / 2,2)))) {
				var min = Math.min(text_width.width, child_data.text.size);
				if (corner <= Math.ceil(min / 2)) {
					var ta = Math.ceil(corner - corner * Math.cos(45 * Math.PI / 180));
					if (child_data.size.width <= text_width.width + ta * 2) {
						child_data.size.width = text_width.width + ta * 2;
					}
					if (child_data.size.height <= child_data.text.size + ta * 2) {
						child_data.size.height = child_data.text.size + ta * 2;
					}
				}else{
					var angle = Math.asin(min / 2 / corner) / (Math.PI / 180);
					console.log(angle);
					var ta = Math.ceil(corner - corner * Math.cos(angle * Math.PI / 180));
					console.log("ta" + corner * Math.cos(angle * Math.PI / 180));
					if (child_data.size.width <= text_width.width + ta * 2) {
						child_data.size.width = text_width.width + ta * 2;
					}
					if (child_data.size.height <= child_data.text.size + ta * 2) {
						child_data.size.height = child_data.text.size + ta * 2;
					}
				}
			}else{
				if (child_data.size.width <= corner * 2) {
					child_data.size.width = corner * 2;
				}
				if (child_data.size.height <= corner * 2) {
					child_data.size.height = corner * 2;
				}
			}
			measure.width = Math.floor(child_data.size.width);
			measure.height = Math.floor(child_data.size.height);
			return measure;
		},
		draw: function(canvas, ctx, param, child_data, redraw) {
			var measure = this.measure(param, child_data);
			ctx.strokeStyle = "rgba(0, 0, 0, 0)";
			ctx.fillStyle = child_data.text.background_color;
			var corner = child_data.text.corner;
			ctx.beginPath();
			ctx.moveTo(measure.x + corner,measure.y);
			ctx.lineTo(measure.x + measure.width - corner,measure.y);
			ctx.arc(measure.x + measure.width - corner,measure.y + corner,corner,1.5*Math.PI,2*Math.PI);
			ctx.lineTo(measure.x + measure.width,measure.y + measure.height - corner);
			ctx.arc(measure.x + measure.width - corner,measure.y + measure.height - corner,corner,0*Math.PI,0.5*Math.PI);
			ctx.lineTo(measure.x + corner,measure.y + measure.height);
			ctx.arc(measure.x + corner,measure.y + measure.height - corner,corner,0.5*Math.PI,1*Math.PI);
			ctx.lineTo(measure.x,measure.y + corner);
			ctx.arc(measure.x + corner,measure.y + corner,corner,1*Math.PI,1.5*Math.PI);
			ctx.stroke();
			ctx.fill();
			
			
			ctx.fillStyle = child_data.text.color;
			ctx.font= child_data.text.size + "px Verdana";
			ctx.textBaseline="middle";
			ctx.fillText(child_data.text.content,measure.x + (measure.width - ctx.measureText(child_data.text.content).width) / 2,measure.y + measure.height / 2);
//			ctx.fillRect(measure.x,measure.y,measure.width,measure.height);
		},
		drawItem: function(canvas, ctx, param, child_data, redraw) {
			var measure = this.measure(param, child_data);
			ctx.strokeStyle = "rgba(0, 0, 0, 0)";
			ctx.fillStyle = child_data.text.background_color;
			var corner = child_data.text.corner;
			ctx.beginPath();
			ctx.moveTo(measure.x + corner,measure.y);
			ctx.lineTo(measure.x + measure.width - corner,measure.y);
			ctx.arc(measure.x + measure.width - corner,measure.y + corner,corner,1.5*Math.PI,2*Math.PI);
			ctx.lineTo(measure.x + measure.width,measure.y + measure.height - corner);
			ctx.arc(measure.x + measure.width - corner,measure.y + measure.height - corner,corner,0*Math.PI,0.5*Math.PI);
			ctx.lineTo(measure.x + corner,measure.y + measure.height);
			ctx.arc(measure.x + corner,measure.y + measure.height - corner,corner,0.5*Math.PI,1*Math.PI);
			ctx.lineTo(measure.x,measure.y + corner);
			ctx.arc(measure.x + corner,measure.y + corner,corner,1*Math.PI,1.5*Math.PI);
			ctx.stroke();
			ctx.fill();
			
			
			ctx.fillStyle = child_data.text.color;
			ctx.font= child_data.text.size + "px Verdana";
			ctx.textBaseline="middle";
			ctx.fillText(child_data.text.content,measure.x + (measure.width - ctx.measureText(child_data.text.content).width) / 2,measure.y + measure.height / 2);
		}
	},
	child_image: {
		group_name:"基本控件",
		item_name:"图片",
		params:{
			Element:{
				_name:"Element",
				name:{
					_isEditor:true,
					_isVisible:true,
					_type:"text",
					_name:"名称",
					value:"image"
				},
				type:{
					_isEditor:true,
					_isVisible:true,
					_type:"text",
					_name:"类型",
					value:""
				},
				location:{
					_isEditor:true,
					_isVisible:true,
					_name:"位置",
					_type:"text",
					x:0,
					y:0
				},
				size:{
					_isEditor:true,
					_isVisible:true,
					_name:"尺寸",
					_type:"text",
					width:40,
					height:40
				}
			},
			Img:{
				_name:"Img",
				img:{
					src:{
						_isEditor:true,
						_isVisible:true,
						_type:"text",
						_name:"图片地址",
						value:"img/tp.png"
					}
				}
			}
		},
		measure: function(param, child_data){
			var measure = {};
			measure.x = Math.floor(child_data.location.x);
			measure.y = Math.floor(child_data.location.y);
			measure.width = Math.floor(child_data.size.width);
			measure.height = Math.floor(child_data.size.height);
			return measure;
		},
		draw: function(canvas, ctx, param, child_data, redraw) {
			var x = child_data.location.x;
			var y = child_data.location.y;
			var width = child_data.size.width;
			var height = child_data.size.height;
//			var txt = child_data.json.name;
//			console.log("111111");
//			ctx.font="30px Verdana";
//			// 创建渐变
//			var texw = ctx.measureText(txt).width;
////			var texh = ctx.measureText(txt).height;
//			var gradient=ctx.createLinearGradient(x,0,x + texw,0);
//			gradient.addColorStop("0","magenta");
//			gradient.addColorStop("0.5","blue");
//			gradient.addColorStop("1.0","red");
//			// 用渐变进行填充
//			ctx.strokeStyle=gradient;
//			ctx.strokeText(txt,x + (width - texw) / 2,y + height / 2);

			var img;
			if (child_data.img.src in img_arr) {
				img = img_arr[child_data.img.src];
			}else{
				img = new Image();
				img.src = child_data.img.src;
				img_arr[child_data.img.src] = img;
				img.onload = function(){
					redraw();
				}
			}
			ctx.drawImage(img,x,y,width,height);
		},
		drawItem: function(canvas, ctx, param, child_data, redraw) {
			var x = child_data.location.x;
			var y = child_data.location.y;
			var width = child_data.size.width;
			var height = child_data.size.height;
			var img;
			if (child_data.img.src in img_arr) {
				img = img_arr[child_data.img.src];
			}else{
				img = new Image();
				img.src = child_data.img.src;
				img_arr[child_data.img.src] = img;
				img.onload = function(){
					redraw();
				}
			}
			ctx.drawImage(img,x,y,width,height);
		}
	}
};