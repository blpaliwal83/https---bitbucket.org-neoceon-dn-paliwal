var scriptUrl			= '';
var uxPath				= 'ux/AudioPlayer/';
var extExtension 		= 'Sencha2-AudioPlayer';
var cardAnimation		= {type:'fade', duration:200};
var appVersion			= 1.0;
var appDemo 			= false;
Ext.application({
	name:'TidduApp',
	icon: {
        57: uxPath+'img/icon.jpg',
        72: uxPath+'img/icon-72.jpg',
        114: uxPath+'img/icon@2x.jpg',
        144: uxPath+'img/icon-72@2x.jpg'
    },
	phoneStartupScreen: uxPath+'img/Default.jpg',
    tabletStartupScreen: uxPath+'img/Default-Portrait~ipad.jpg',
	glossOnIcon:false,
	launch:function(){
		appDemo = TidduApp.app;		
		var toolBarItems= [{
			xtype:'toolbar',
			cls:'topToolbar',
			title:'Audio Player',
			docked:'top',
			items:[{
				text:'Play',
				handler:function(){
					this.up().up().down('audioplayer').play();	
				}
			}]
		},{
			xtype:'panel',
			cls:'poweredbyToolbar',
			docked:'bottom',
			html:'Audio Player <a href="http://developerextensions.com/index.php/sencha-2-audio-player" target="_blank">v0.1</a> Powered by <a href="http://developerextensions.com" target="_blank">http://developerextensions.com</a>'
		}];	

		var pageItems = [{
			scrollable:'vertical',
			padding:10,
			defaults:{xtype:'fieldset'},
			items:[{
				title:'Normal Audio Player',
				items:[{			   
					xtype:'audioplayer',
					url:scriptUrl+'ux/audioplayer/example/media/sample.mp3',
					title:'Sample MP3'
				}]
			},{
				title:'Audio Player with image',
				items:[{
					xtype:'audioplayer',
					url:scriptUrl+'ux/audioplayer/example/media/sample.mp3',
					title:'Sample MP3',
					thumb:scriptUrl+'ux/audioplayer/example/media/sample.jpg'
				}]
			}]
		}];
		
		this.tabs = Ext.Viewport.add({
			xtype:'panel',
			layout:'card',
			items:[{
				cls:'pageBody',
				name:'home',
				layout:'fit',
				items:toolBarItems.concat(pageItems),
			}]
		});
	}	
});
