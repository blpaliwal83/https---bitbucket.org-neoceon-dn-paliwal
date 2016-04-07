/*
 * File: app/view/Albums.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.4.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.4.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('DNB.view.Albums', {
    extend: 'Ext.Container',
    alias: 'widget.albums',

    requires: [
        'Ext.Toolbar',
        'Ext.Panel',
        'Ext.dataview.DataView',
        'Ext.XTemplate',
        'Ext.Img'
    ],

    config: {
        height: '100%',
        id: 'Albums',
        hideOnMaskTap: false,
        layout: 'fit',
        modal: false,
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Gallery',
                 items: [
                    {
                        xtype: 'button',
                        itemId: 'categorylistmenu',
                        name: 'categorylistmenuButton',
                        ui: 'plain',
                        iconCls: 'list',
                        padding: 0,
                        margin: 0
                    },
                    {
                        xtype: 'spacer'
                    }
                    
                ]
            },
            {
                xtype: 'panel',
                height: '100%',
                id: 'AlbumsListPanel',
                // layout: 'fit',
                items: [
                    {
                        xtype: 'dataview',
                        id: 'AlbumsList',
                        style: 'background-color:white;height:100%;width:\"{[this.GetWidth()]}\";',
                        itemTpl: Ext.create('Ext.XTemplate', 
                            '<table style=" border-bottom: 1px solid white;color:#32AFE7;font-size:14px;width:100%;height:220px;"><tr>',
                            '    <td style="width: 100%;height:220px; position: relative;" valign="top" class="">',
                            '        <img style="position: absolute;clip: rect(0,{[this.GetWidth()]},220px,0);" width=\"{[this.GetWidth()]}\"   src=\"{[this.GetImageUrl(values.flyer)]}\" onerror=DNB.app.getController(\"Events\").GetNoImageUrl(this)>',
                            '        <div style="width: 100%;height:220px;" class="tint album_image"><div class="galleryText">{title}</div><div>',
                            '    </td>',
                            '</tr><!--<tr><td colspan="2"><hr size=1></td></tr>--></table>',
                            {
                                GetImageUrl: function(imageUrl) {
                                    return imageBaseUrl+imageUrl;
                                },

                                GetWidth: function() {
                                    return window.innerWidth+'px';
                                },
                                isNoticeLike: function(isLike) {
                                    if(isLike=='yes'){
                                        return 'resources/images/liked.PNG';
                                    }else{
                                        return 'resources/images/like.png';
                                    }
                                }
                            }

                        ),
                        
                        store: 'EventGalleryStore'
                    }
                ],
                listeners : {
                                painted : function (ths){
                                    // t = ths;
                                    ths.setWidth(window.innerWidth);
                                }
                            }
            },
            {
                xtype: 'toolbar',
                cls: 'PromotionToolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'image',
                        cls: 'promotionImageFullWidth',
                        src: 'resources/images/promotion.png',
                        height: 50,
                        id: 'promotionImageOnAlbums',
                        width: '100%'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onMydataview7ItemTap1',
                event: 'itemtap',
                delegate: '#AlbumsList'
            },
            {
                fn: 'onPromotionImageOnAlbumsTap',
                event: 'tap',
                delegate: '#promotionImageOnAlbums'
            }
        ]
    },

    onMydataview7ItemTap1: function(dataview, index, target, record, e, eOpts) {
        Ext.Viewport.setMasked({xtype:'loadmask',message:'Loading Gallery'});
        Ext.Ajax.request({
            url:DNB.util.Common.api.getNoticeById(record.data.id),
            success: function(res){
                var res=Ext.decode(res.responseText).response_data;
                if(res.Media.length>0){
                    var GalleryList=[];
                    for(j=0;j<res.Media.length;j++){
                        if(res.Media[j].type=='I'){
                            GalleryList.push(res.Media[j]);
                        }
                    }//media for
                    if(GalleryList.length>0){
                        selectedEventDetail=res;
                        Ext.getCmp('AlbumContainer').hide();
                        Ext.getCmp('GalleryContainer').show();
                        Ext.getCmp('GalleryImageContainer').hide();
                        galleryPageOpenFrom='';
                        DNB.app.getController('Events').fnShowGallery(record.data.id,GalleryList);
                    }
                    else{
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert('No gallery found.');
                    }
                }else{
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('No gallery found.');
                }

            },failure:function(res){
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('','Internet is not available.');
            }
        });

    },

    onPromotionImageOnAlbumsTap: function(image, e, eOpts) {
        isBannerActive=false;
        audioPlayerOpenFrom='Albums';
        DNB.app.getController('Events').ShowPromotionPopup('promotionImageOnAlbums');
    }

});