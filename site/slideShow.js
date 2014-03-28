$(function() {
						//写真を配列に入れる。
						var files = [
							'/site_lesson/picture/sample_0.jpg',
							'/site_lesson/picture/sample_1.jpg',
							'/site_lesson/picture/sample_2.jpg'
						];
						//変数準備
						var img;
						var currentNum = 0;
						var timer;
						var timer2;
						var timer3;
						
						//配列の中身をサムネイルとして表示
						for (var i = 0; i < files.length; i++) {
							img = $('<img>').attr('src', files[i]).addClass('thumb');
							$('#thumbArea').append(img);
						}
						
						//デフォルトは配列0番目の画像を表示させる
						$('#mainPicture').append(
							$('<img>').attr('src', files[0])
						);

						//マウスがサムネイルに乗ったらメイン画像として表示
						$('.thumb').mouseover(function() {
							$('#mainPicture img').attr('src', $(this).attr('src')).stop().css('opacity', '1');
							$('.thumb').removeClass('current');
							$('.thumb').eq($('#mainPicture img').attr('src', $(this).attr('src'))).addClass('current');
							timer = clearTimeout(timer);
							timer2 = clearTimeout(timer2);
							currentNum = $('.thumb').index(this);
						});

						//マウスが離れたら画像の切り替え処理を再スタート
						$('.thumb').mouseleave(function() {
							autoPlay();
						});
						
						//画像の切り替え処理
						function autoPlay() {
							if (currentNum > files.length - 1) {
								currentNum = 0;
							}
							$('#mainPicture img').attr('src', files[currentNum]).stop().animate({'opacity' : '1'}, 1000);
							timer2 = setTimeout(function() {
								$('#mainPicture img').stop().animate({'opacity' : '0.1'}, 1000);
							}, 3000);
							$('.thumb').removeClass('current');
							$('.thumb').eq(currentNum).addClass('current');
							timer = setTimeout(function() {
								currentNum++;
								autoPlay()
							}, 4000);
							//クリックイベントのタイマー停止
							timer3 = clearTimeout(timer3);
						}
						
						//＞をクリックした時のイベント
						$('#right').click(function(){
							currentNum++;
							if (currentNum > files.length - 1) {
								currentNum = 0;
							}
							$('#mainPicture img').attr('src', files[currentNum]).stop().css('opacity', '1');
							$('.thumb').removeClass('current');
							$('.thumb').eq(currentNum).addClass('current');
							timer = clearTimeout(timer);
							timer2 = clearTimeout(timer2);
							//クリック後にautoPlayを発動
							timer3 = setTimeout(function() {
								autoPlay()
							}, 0);
						});

						//＜をクリックした時のイベント
						$('#left').click(function(){
							currentNum--;
							if (currentNum < 0) {
								currentNum = files.length - 1;
							}
							$('#mainPicture img').attr('src', files[currentNum]).stop().css('opacity', '1');
							$('.thumb').removeClass('current');
							$('.thumb').eq(currentNum).addClass('current');
							timer = clearTimeout(timer);
							timer2 = clearTimeout(timer2);
							//クリック後にautoPlayを発動
							timer3 = setTimeout(function() {
								autoPlay()
							}, 0);
						});
						//body要素を読み込んだらスライド
						$('#load').ready(function() {
								autoPlay();
						});
					});