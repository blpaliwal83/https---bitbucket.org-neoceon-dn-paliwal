Ext.application({
    launch:function(){
		Ext.Viewport.add({
			xtype:'panel',
			fullscreen:true,
			layout:'fit',
			items:[{
				xtype:'toolbar',
				docked:'top',
				items:[{
					text:'Play',
					handler:function(){
						this.up().up().down('audioplayer').play();
					}
				}]
			},{
				scrollable:'vertical',
				padding:10,
				items:[{
					xtype:'fieldset',
					title:'Normal Audio Player',
					items:[{
						xtype:'audioplayer',
						url:'media/sample.mp3',
						title:'Sample MP3'
					}]
				},{
					xtype:'fieldset',
					title:'Audio Player with image',
					items:[{
						xtype:'audioplayer',
						url:'media/sample.mp3',
						title:'Sample MP3',
						thumb:'media/sample.jpg'
					}]
				}]
			}]
		});
	}
});