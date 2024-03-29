// global variables
var isIE8 = false;
var isIE9 = false;
var $windowWidth;
var $windowHeight;
var $pageArea;
var isMobile = false;
// Debounce Function
(function ($, sr) {
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced() {
			var obj = this, args = arguments;

			function delayed() {
				if (!execAsap)
					func.apply(obj, args);
				timeout = null;
			};

			if (timeout)
				clearTimeout(timeout);
			else if (execAsap)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	};
	// smartresize
	jQuery.fn[sr] = function (fn) {
		return fn ? this.on('resize', debounce(fn)) : this.trigger(sr);
	};

})(jQuery, 'clipresize');

//Main Function
var Main = function () {
	//function to detect explorer browser and its version
	var runInit = function () {
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
			var ieversion = new Number(RegExp.$1);
			if (ieversion == 8) {
				isIE8 = true;
			} else if (ieversion == 9) {
				isIE9 = true;
			}
		}
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			isMobile = true;
		};
	};
	//function to adjust the template elements based on the window size
	var runElementsPosition = function () {
		$windowWidth = $(window).width();
		$windowHeight = $(window).height();
		$pageArea = $windowHeight - $('body > .navbar').outerHeight() - $('body > .footer').outerHeight();
		if (!isMobile) {
			$('.sidebar-search input').removeAttr('style').removeClass('open');
		}
		runContainerHeight();

	};
	//function to adapt the Main Content height to the Main Navigation height
	var runContainerHeight = function () {
		mainContainer = $('.main-content > .container');
		mainNavigation = $('.main-navigation');
		if ($pageArea < 760) {
			$pageArea = 760;
		}
		if (mainContainer.outerHeight() < mainNavigation.outerHeight() && mainNavigation.outerHeight() > $pageArea) {
			mainContainer.css('min-height', mainNavigation.outerHeight());
		} else {
			mainContainer.css('min-height', $pageArea);
		};
		if ($windowWidth < 768) {
			mainNavigation.css('min-height', $windowHeight - $('body > .navbar').outerHeight());
		}
		$("#page-sidebar .sidebar-wrapper").css('height', $windowHeight - $('body > .navbar').outerHeight()).scrollTop(0).perfectScrollbar('update');
	};
	//function to activate the ToDo list, if present
	var runToDoAction = function () {
		if ($(".todo-actions").length) {
			$(".todo-actions").click(function () {
				if ($(this).find("i").hasClass("fa-square-o") || $(this).find("i").hasClass("icon-check-empty")) {
					if ($(this).find("i").hasClass("fa")) {
						$(this).find("i").removeClass("fa-square-o").addClass("fa-check-square-o");
					} else {
						$(this).find("i").removeClass("icon-check-empty").addClass("fa fa-check-square-o");
					};
					$(this).parent().find("span").css({
						opacity: .25
					});
					$(this).parent().find(".desc").css("text-decoration", "line-through");
				} else {
					$(this).find("i").removeClass("fa-check-square-o").addClass("fa-square-o");
					$(this).parent().find("span").css({
						opacity: 1
					});
					$(this).parent().find(".desc").css("text-decoration", "none");
				}
				return !1;
			});
		}
	};
	//function to activate the Tooltips, if present

	//function to open quick sidebar
	var runQuickSideBar = function () {
		$(".sb-toggle").on("click", function (e) {
			if ($(this).hasClass("open")) {
				$(this).not(".sidebar-toggler ").find(".fa-indent").removeClass("fa-indent").addClass("fa-outdent");
				$(".sb-toggle").removeClass("open")
				$("#page-sidebar").css({
					right: -$("#page-sidebar").outerWidth()
				});
			} else {
				$(this).not(".sidebar-toggler ").find(".fa-outdent").removeClass("fa-outdent").addClass("fa-indent");
				$(".sb-toggle").addClass("open")
				$("#page-sidebar").css({
					right: 0
				});
			}

			e.preventDefault();
		});
		$("#page-sidebar .media a").on("click", function (e) {
			$(this).closest(".tab-pane").css({
				right: $("#page-sidebar").outerWidth()
			});
			e.preventDefault();
		});
		$("#page-sidebar .sidebar-back").on("click", function (e) {
			$(this).closest(".tab-pane").css({
				right: 0
			});
			e.preventDefault();
		});
		$('#page-sidebar .sidebar-wrapper').perfectScrollbar({
			wheelSpeed: 50,
			minScrollbarLength: 20,
			suppressScrollX: true
		});
		$('#sidebar-tab a').on('shown.bs.tab', function (e) {

			$("#page-sidebar .sidebar-wrapper").perfectScrollbar('update');
		});
	};
	//function to activate the Popovers, if present
	var runPopovers = function () {
		if ($(".popovers").length) {
			$('.popovers').popover();
		}
	};
	//function to allow a button or a link to open a tab
	var runShowTab = function () {
		if ($(".show-tab").length) {
			$('.show-tab').on('click', function (e) {
				e.preventDefault();
				var tabToShow = $(this).attr("href");
				if ($(tabToShow).length) {
					$('a[href="' + tabToShow + '"]').tab('show');
				}
			});
		};
		if (getParameterByName('tabId').length) {
			$('a[href="#' + getParameterByName('tabId') + '"]').tab('show');
		}
	};
	var runPanelScroll = function () {
		if ($(".panel-scroll").length) {
			$('.panel-scroll').perfectScrollbar({
				wheelSpeed: 50,
				minScrollbarLength: 20,
				suppressScrollX: true
			});
		}
	};

	//function to reduce the size of the Main Menu
	var runNavigationToggler = function () {
		$('.navigation-toggler').on('click', function () {
			if (!$('body').hasClass('navigation-small')) {
				$('body').addClass('navigation-small');
			} else {
				$('body').removeClass('navigation-small');
			};
		});
	};
	//function to activate the panel tools
	var runModuleTools = function () {
		$('.panel-tools .panel-expand').on('click', function (e) {
			$('.panel-tools a').not(this).hide();
			$('body').append('<div class="full-white-backdrop"></div>');
			$('.main-container').removeAttr('style');
			backdrop = $('.full-white-backdrop');
			wbox = $(this).parents('.panel');
			wbox.removeAttr('style');
			if (wbox.hasClass('panel-full-screen')) {
				backdrop.fadeIn(200, function () {
					$('.panel-tools a').show();
					wbox.removeClass('panel-full-screen');
					backdrop.fadeOut(200, function () {
						backdrop.remove();
					});
				});
			} else {
				$('body').append('<div class="full-white-backdrop"></div>');
				backdrop.fadeIn(200, function () {
					$('.main-container').css({
						'max-height': $(window).outerHeight() - $('header').outerHeight() - $('.footer').outerHeight() - 100,
						'overflow': 'hidden'
					});
					backdrop.fadeOut(200);
					backdrop.remove();
					wbox.addClass('panel-full-screen').css({
						'max-height': $(window).height(),
						'overflow': 'auto'
					});
				});
			}
		});
		$('.panel-tools .panel-close').on('click', function (e) {
			$(this).parents(".panel").remove();
			e.preventDefault();
		});
		$('.panel-tools .panel-refresh').on('click', function (e) {
			var el = $(this).parents(".panel");
			el.block({
				overlayCSS: {
					backgroundColor: '#fff'
				},
				message: 'Carregando...',
				css: {
					border: 'none',
					color: '#333',
					background: 'none'
				}
			});
			window.setTimeout(function () {
				el.unblock();
			}, 1000);
			e.preventDefault();
		});
		$('.panel-tools .panel-collapse').on('click', function (e) {
			e.preventDefault();
			var el = jQuery(this).parent().closest(".panel").children(".panel-body");
			if ($(this).hasClass("collapses")) {
				$(this).addClass("expand").removeClass("collapses");
				el.slideUp(200);
			} else {
				$(this).addClass("collapses").removeClass("expand");
				el.slideDown(200);
			}
		});
	};
	//function to activate the 3rd and 4th level menus
	var runNavigationMenu = function () {
		$('.main-navigation-menu li.active').addClass('open');
		$('.main-navigation-menu > li a').on('click', function () {
			if ($(this).parent().children('ul').hasClass('sub-menu') && ((!$('body').hasClass('navigation-small') || $windowWidth < 767) || !$(this).parent().parent().hasClass('main-navigation-menu'))) {
				if (!$(this).parent().hasClass('open')) {
					$(this).parent().addClass('open');
					$(this).parent().parent().children('li.open').not($(this).parent()).not($('.main-navigation-menu > li.active')).removeClass('open').children('ul').slideUp(200);
					$(this).parent().children('ul').slideDown(200, function () {
						runContainerHeight();
					});
				} else {
					if (!$(this).parent().hasClass('active')) {
						$(this).parent().parent().children('li.open').not($('.main-navigation-menu > li.active')).removeClass('open').children('ul').slideUp(200, function () {
							runContainerHeight();
						});
					} else {
						$(this).parent().parent().children('li.open').removeClass('open').children('ul').slideUp(200, function () {
							runContainerHeight();
						});
					}
				}
			}
		});
	};
	//function to activate the Go-Top button
	var runGoTop = function () {
		$('.go-top').on('click', function (e) {
			$("html, body").animate({
				scrollTop: 0
			}, "slow");
			e.preventDefault();
		});
	};
	//function to avoid closing the dropdown on click
	var runDropdownEnduring = function () {
		if ($('.dropdown-menu.dropdown-enduring').length) {
			$('.dropdown-menu.dropdown-enduring').click(function (event) {
				event.stopPropagation();
			});
		}
	};
	//function to return the querystring parameter with a given name.
	var getParameterByName = function (name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};
	//function to activate the iCheck Plugin
	//Search Input function
	var runSearchInput = function () {
		var search_input = $('.sidebar-search input');
		var search_button = $('.sidebar-search button');
		var search_form = $('.sidebar-search');
		search_input.attr('data-default', $(search_input).outerWidth()).focus(function () {
			$(this).animate({
				width: 200
			}, 200);
		}).blur(function () {
			if ($(this).val() == "") {
				if ($(this).hasClass('open')) {
					$(this).animate({
						width: 0,
						opacity: 0
					}, 200, function () {
						$(this).hide();
					});
				} else {
					$(this).animate({
						width: $(this).attr('data-default')
					}, 200);
				}
			}
		});
		search_button.on('click', function () {
			if ($(search_input).is(':hidden')) {
				$(search_input).addClass('open').css({
					width: 0,
					opacity: 0
				}).show().animate({
					width: 200,
					opacity: 1
				}, 200).focus();
			} else if ($(search_input).hasClass('open') && $(search_input).val() == '') {
				$(search_input).removeClass('open').animate({
					width: 0,
					opacity: 0
				}, 200, function () {
					$(this).hide();
				});
			} else if ($(search_input).val() != '') {
				return;
			} else
				$(search_input).focus();
			return false;
		});
	};
	//Set of functions for Style Selector
	var runStyleSelector = function () {
		$('.style-toggle').on('click', function () {
			if ($(this).hasClass('open')) {
				$(this).removeClass('open').addClass('close');
				$('#style_selector_container').hide();
			} else {
				$(this).removeClass('close').addClass('open');
				$('#style_selector_container').show();
			}
		});
		setColorScheme();
		setLayoutStyle();
		setHeaderStyle();
		setFooterStyle();
		setBoxedBackgrounds();
	};
	$('.drop-down-wrapper').perfectScrollbar({
		wheelSpeed: 50,
		minScrollbarLength: 20,
		suppressScrollX: true
	});
	$('.navbar-tools .dropdown').on('shown.bs.dropdown', function () {
		$(this).find('.drop-down-wrapper').scrollTop(0).perfectScrollbar('update');
	});
	var setColorScheme = function () {
		$('.icons-color a').on('click', function () {
			$('.icons-color img').each(function () {
				$(this).removeClass('active');
			});
			$(this).find('img').addClass('active');
			if ($('#skin_color').attr("rel") == "stylesheet/less") {
				$('#skin_color').next('style').remove();
				$('#skin_color').attr("rel", "stylesheet");

			}
			$('#skin_color').attr("href", "assets/css/theme_" + $(this).attr('id') + ".css");

		});
	};
	var setBoxedBackgrounds = function () {
		$('.boxed-patterns a').on('click', function () {
			if ($('body').hasClass('layout-boxed')) {
				var classes = $('body').attr("class").split(" ").filter(function (item) {
					return item.indexOf("bg_style_") === -1 ? item : "";
				});
				$('body').attr("class", classes.join(" "));
				$('.boxed-patterns img').each(function () {
					$(this).removeClass('active');
				});
				$(this).find('img').addClass('active');
				$('body').addClass($(this).attr('id'));
			} else {
				alert('Select boxed layout');
			}
		});
	};
	var setLayoutStyle = function () {
		$('select[name="layout"]').change(function () {
			if ($('select[name="layout"] option:selected').val() == 'boxed')
				$('body').addClass('layout-boxed');
			else
				$('body').removeClass('layout-boxed');
		});
	};
	var setHeaderStyle = function () {
		$('select[name="header"]').change(function () {
			if ($('select[name="header"] option:selected').val() == 'default')
				$('body').addClass('header-default');
			else
				$('body').removeClass('header-default');
		});
	};
	var setFooterStyle = function () {
		$('select[name="footer"]').change(function () {
			if ($('select[name="footer"] option:selected').val() == 'fixed')
				$('body').addClass('footer-fixed');
			else
				$('body').removeClass('footer-fixed');
		});
	};
	var runColorPalette = function () {
		if ($('.colorpalette').length) {
			$('.colorpalette').colorPalette().on('selectColor', function (e) {
				$(this).closest('ul').prev('a').children('i').css('background-color', e.color).end().closest('div').prev('input').val(e.color);
				runActivateLess();
			});
		};
	};

	//function to activate Less style
	var runActivateLess = function () {
		$('		.icons-color img').removeClass('active');
		if ($('#skin_color').attr("rel") == "stylesheet") {
			$('#skin_color').attr("rel", "stylesheet/less").attr("href", "assets/less/styles.less");
			less.sheets.push($('link#skin_color')[0]);
			less.refresh();
		};
		less.modifyVars({
			'@base': $('.color-base').val(),
			'@text': $('.color-text').val(),
			'@badge': $('.color-badge').val()
		});
	};

	//Window Resize Function
	var runWIndowResize = function (func, threshold, execAsap) {
		//wait until the user is done resizing the window, then execute
		$(window).clipresize(function () {
			runElementsPosition();
		});
	};
	//function to save user settings
	var runSaveSetting = function () {
		$('.save_style').on('click', function () {
			var clipSetting = new Object;
			if ($('body').hasClass('rtl')) {
				clipSetting.rtl = true;
			} else {
				clipSetting.rtl = false;
			};
			if ($('body').hasClass('layout-boxed')) {
				clipSetting.layoutBoxed = true;
				$("body[class]").filter(function () {
					var classNames = this.className.split(/\s+/);
					for (var i = 0; i < classNames.length; ++i) {
						if (classNames[i].substr(0, 9) === "bg_style_") {
							clipSetting.bgStyle = classNames[i];
						}
					}

				});
			} else {
				clipSetting.layoutBoxed = false;
			};
			if ($('body').hasClass('header-default')) {
				clipSetting.headerDefault = true;
			} else {
				clipSetting.headerDefault = false;
			};
			if ($('body').hasClass('footer-fixed')) {
				clipSetting.footerDefault = false;
			} else {
				clipSetting.footerDefault = true;
			};
			if ($('#skin_color').attr('rel') == 'stylesheet') {
				clipSetting.useLess = false;
			} else if ($('#skin_color').attr('rel') == 'stylesheet/less') {
				clipSetting.useLess = true;
				clipSetting.baseColor = $('.color-base').val();
				clipSetting.textColor = $('.color-text').val();
				clipSetting.badgeColor = $('.color-badge').val();
			}
			;
			clipSetting.skinClass = $('#skin_color').attr('href');

			$.cookie("clip-setting", JSON.stringify(clipSetting));

			var el = $('#style_selector_container');
			el.block({
				overlayCSS: {
					backgroundColor: '#fff'
				},
				message: '<img src="assets/images/loading.gif" /> Just a moment...',
				css: {
					border: 'none',
					color: '#333',
					background: 'none'
				}
			});
			window.setTimeout(function () {
				el.unblock();
			}, 1000);
		});
	};
	//function to load user settings
	var runCustomSetting = function () {
		runDefaultSetting();
	};
	//function to clear user settings
	var runClearSetting = function () {
		$('.clear_style').on('click', function () {
			$.removeCookie("clip-setting");
			$('body').removeClass("layout-boxed header-default footer-fixed");
			$('body')[0].className = $('body')[0].className.replace(/\bbg_style_.*?\b/g, '');
			if ($('#skin_color').attr("rel") == "stylesheet/less") {
				$('#skin_color').next('style').remove();
				$('#skin_color').attr("rel", "stylesheet");

			}

			$('.icons-color img').first().trigger('click');
			runDefaultSetting();
		});
	};
	//function to restore user settings
	var runDefaultSetting = function () {
		$('#style_selector select[name="layout"]').val('default');
		$('#style_selector select[name="header"]').val('fixed');
		$('#style_selector select[name="footer"]').val('default');
		$('		.boxed-patterns img').removeClass('active');
		$('.color-base').val('#FFFFFF').next('.dropdown').find('i').css('background-color', '#FFFFFF');
		$('.color-text').val('#555555').next('.dropdown').find('i').css('background-color', '#555555');
		$('.color-badge').val('#007AFF').next('.dropdown').find('i').css('background-color', '#007AFF');
	};

	var Index = function () {
		// function to initiate Chart 1

		// function to initiate Sparkline
		var runSparkline = function () {
			$(".sparkline_line_good span").sparkline("html", {
				type: "line",
				fillColor: "#B1FFA9",
				lineColor: "#459D1C",
				width: "50",
				height: "24"
			});
			$(".sparkline_line_bad span").sparkline("html", {
				type: "line",
				fillColor: "#FFC4C7",
				lineColor: "#BA1E20",
				width: "50",
				height: "24"
			});
			$(".sparkline_line_neutral span").sparkline("html", {
				type: "line",
				fillColor: "#CCCCCC",
				lineColor: "#757575",
				width: "50",
				height: "24"
			});
			$(".sparkline_bar_good span").sparkline('html', {
				type: "bar",
				barColor: "#459D1C",
				barWidth: "5",
				height: "24"
			});
			$(".sparkline_bar_bad span").sparkline('html', {
				type: "bar",
				barColor: "#BA1E20",
				barWidth: "5",
				height: "24"
			});
			$(".sparkline_bar_neutral span").sparkline('html', {
				type: "bar",
				barColor: "#757575",
				barWidth: "5",
				height: "24"
			});
		};
		// function to initiate EasyPieChart

	}();
	return {
		//main function to initiate template pages
		init: function () {
			runWIndowResize();
			runInit();
			runStyleSelector();
			runSearchInput();
			runElementsPosition();
			runToDoAction();
			runNavigationToggler();
			runNavigationMenu();
			runGoTop();
			runModuleTools();
			runDropdownEnduring();
			//runTooltips();
			runPopovers();
			runPanelScroll();
			runShowTab();
			//runAccordionFeatures();
			//runCustomCheck();
			runColorPalette();
			runSaveSetting();
			runCustomSetting();
			runClearSetting();
			runQuickSideBar();
		}
	};
}(); 