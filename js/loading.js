 (function () {
				var votespage = 0;
				var result = 0;
		        /*组件初始化js begin*/
		        $('.ui-refresh_votes').refresh({
		            load: function (dir, type) {
		                var me = this;
						votespage++;

						if( parseInt(votespage) < parseInt(21) && parseInt( $("#list_num").val() ) > parseInt(9) ){
							$.getJSON(''+lod1+'?page='+votespage+'&last_time='+$("#last_time").val(), function (data) {

							$("#last_time").val(data.last_time);
								var $list = $('.vote'),
										html = (function (data) {
										//数据渲染
											var liArr = [];
											$.each(data, function () {
												result++;
												liArr.push(this.html);
											});
											//alert(result);
											$("#list_num").val(result);
											if(liArr.join('')=='')
											{
												$('#votesstatus').val(1)
											}else{
												return liArr.join('');
											}

										})(data);

								//alert( $("#list_num").val() );
								$list[dir == 'up' ? 'prepend' : 'append'](html);
								result = 0;
								tihuan('.lfy_6name1');
								me.afterDataLoading();    //数据加载完成后改变状态
								if($('#votesstatus').val()==1)
								{
									$("#a .ui-refresh-label").text("没有更多了！");
								}
							});
						}else{
							$("#a .ui-refresh-label").text("已经是最后一页了");
						}
		            }
		        });
		        /*组件初始化js end*/
		    })();


			(function () {
				var giftpage = 0;
				/*组件初始化js begin*/
				$('.ui-refresh_gift').refresh({
					load: function (dir, type) {
						var me = this;
						giftpage++;
						$.getJSON(''+lod2+'?page='+giftpage, function (data) {
							var $list = $('.gift'),
									html = (function (data) {      //数据渲染
										var liArr = [];
										$.each(data, function () {
											liArr.push(this.html);
										});
										if(liArr.join('')=='')
										{
											$('#giftstatus').val(1)
										}else{
											return liArr.join('');
										}
									})(data);

							$list[dir == 'up' ? 'prepend' : 'append'](html);
							tihuan('.lfy_6name1');
							me.afterDataLoading();    //数据加载完成后改变状态
							if($('#giftstatus').val()==1)
							{
								$('#b .ui-refresh-label').text("没有更多了！");
							}
						});
					}
				});
				/*组件初始化js end*/
			})();