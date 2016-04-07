Ext.define('DNB.view.imagePopup', {
    extend: 'Ext.Container',
    alias: 'widget.imagepopup',
    requires: ['Ext.Panel', 'DNB.view.EventDetail', 'Ext.Button', 'Ext.Toolbar', 'Ext.Spacer'],
    config: {
        id: 'imagePopup',
        centered: true,
        hideOnMaskTap: true,
        modal: true,
        items: [
          
            {
               xtype: 'panel',
           
            items: [
                {
                    xtype: 'image',
                    name: 'imageNotice',
                    style: 'border-radius: 10px;background-size: 100% 100%;',
                    width: 300,
                    height: 300 
                }
            ]
        },
        {
                xtype: 'toolbar',
                cls: 'transparentBG',
                docked: 'top',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    html: '<div><img width="35" src="resources/images/notice-cancel-icon.png"></div>',
                    itemId: 'crossButtonPopupImage',
                    margin: '0 -5 0 0',
                    ui: 'plain',
                    iconAlign: 'right'
                }]
        }
        ],
        listeners: [
            {
                fn: 'onCrossBlueButtonTap',
                event: 'tap',
                delegate: '#crossButtonPopupImage'
            }
            ]
    },
    setImageSrc: function(src) {
        // body...
        this.query('[name=imageNotice]')[0].setSrc(src)
    },
    onCrossBlueButtonTap: function(button, e, eOpts) {
        console.log('successfully taped');
        Ext.getCmp('imagePopup').hide();

    }
});