/*
 * File: app/view/Promotion.js
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
Ext.define('DNB.view.Promotion', {
    extend: 'Ext.Container',
    alias: 'widget.promotion',
    requires: ['Ext.Panel', 'Ext.Img', 'Ext.Label', 'Ext.Button', 'Ext.Spacer', 'Ext.Toolbar', 'DNB.view.PromotionAudioPlayer'],
    config: {
        centered: true,
        cls : 'promotion-popup-wrapper-cls',
        id: 'Promotion',
        style: 'background-color:white;',
        // width: ,
        hideOnMaskTap: false,
        modal: true,
        items: [{
                xtype: 'button',
                cls: 'closepro close-promotion-popup-btn',
                height: 46,
                width:46,
                html: '<div><img width="36" src="resources/images/closepro.png"></div>',
                itemId: 'ClosePromotion',
                margin: '0 -5 0 0',
                ui: 'plain',
                iconAlign: 'right'
            },{
            xtype: 'panel',
            layout: 'vbox',
            items: [{
                xtype: 'image',
                height: 60,
                id: 'PromotionImageOnPromotionPopup',
                style: 'background-size: cover;',
                cls : 'promotion-popup-image-cls',
                src : 'resources/images/images.jpeg'
            }, {
                xtype: 'label',
                height: 70,
                html: 'Promotion Name',
                id: 'PromotionName',
                padding: '20px 0',
                style: 'background-color:white;color:#AA1A4E;font-size:22px;text-align:center;font-family: lab_sans_promedium;'
            }, {
                xtype: 'panel',
                layout: 'hbox',
                items: [{
                    xtype: 'button',
                    flex: 1,
                    height: 60,
                    html: 'Listen Audio',
                    cls : 'listen-audio-btn-cls listenAudioButtonCls',
                    itemId: 'ListenAudio',
                    style: 'background-color:#AA1A4E;color:white;font-family: lab_sans_proultralight;',
                    ui: 'plain',
                    width: '50^',
                    text: 'Listen Audio'
                }, {
                    xtype: 'spacer',
                    style: 'background:#790d34;',
                    width: 1
                }, {
                    xtype: 'button',
                    flex: 1,
                    height: 60,
                    cls : 'website-btn-cls webSiteButtonCls',
                    itemId: 'Website',
                    style: 'background-color:#AA1A4E;color:white;',
                    ui: 'plain',
                    text: 'Website'
                }]
            }]
        }
        // , {
        //     xtype: 'toolbar',
        //     cls: 'popheader',
        //     docked: 'top',
        //     hidden: false,
        //     items: [{
        //         xtype: 'spacer'
        //     }, {
        //         xtype: 'button',
        //         cls: 'closepro',
        //         height: 46,
        //         width:46,
        //         html: '<div><img width="36" src="resources/images/closepro.png"></div>',
        //         itemId: 'ClosePromotion',
        //         margin: '0 -5 0 0',
        //         ui: 'plain',
        //         iconAlign: 'right'
        //     }]
        // }
        ],
        listeners: [{
            // fn: 'onListenAudioTap',
            event: 'tap',
            delegate: '#ListenAudio'
        }, {
            fn: 'onWebsiteTap',
            event: 'tap',
            delegate: '#Website'
        }, {
            fn: 'onClosePromotionTap',
            event: 'tap',
            delegate: '#ClosePromotion'
        }]
    },
    onListenAudioTap: function(button, e, eOpts) {
        var index = currentPromotionIndex - 1;
        if (index == -1) index = 0;
        if (promotionsData.length == index) {
            index = index - 1;
        }
        isBannerActive = true;
        if (promotionsData[index].audio_url == '') {
            Ext.Msg.alert('No Audio found.');
            return;
        }
        Ext.getCmp('Promotion').hide();
        Ext.getCmp('MainTabView').setActiveItem(0);
        if (audioPlayerOpenFrom == 'Notice') {
            ShowHideHomePages('EventAudiosContainer');
        } else if (audioPlayerOpenFrom == 'NoticeDetail') {
            ShowHideHomePages('EventDetailContainer');
        } else if (audioPlayerOpenFrom == 'Albums') {
            Ext.getCmp('MainTabView').setActiveItem(0);
        } else if (audioPlayerOpenFrom == 'Gallery') {
            Ext.getCmp('MainTabView').setActiveItem(0);
        } else if (audioPlayerOpenFrom == 'GoLive') {
            Ext.getCmp('MainTabView').setActiveItem(0);
        }
        console.log('audio:' + currentPromotionIndex);
        DNB.app.getController('Events').ShowPromotions(currentPromotionIndex, currentBannerPageName);
        DNB.app.getController('Events').ShowAudioPlayer(promotionsData[index].audio_url, promotionsData[index].image);
        return;
        if (Ext.getCmp('PromotionAudioPlayer')) Ext.getCmp('PromotionAudioPlayer').show();
        else Ext.Viewport.add({
            xtype: 'promotionaudioplayer'
        }).show();
        var PromotionMediaPlayButton = Ext.select('#PromotionMediaPlayButton').elements[0];
        console.log(PromotionMediaPlayButton);
        PromotionMediaPlayButton.className = 'x-button x-iconalign-center x-button-action x-sized playbutton x-layout-box-item loading';
        var audioUrl = audioBaseUrl + promotionsData[index].audio_url;
        //open audio
        isAudioPlaying = true;
        var duration = 0;
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading Audio'
        });
        media = null;
        media = new Media(audioUrl, function() {}, function() {
            alert('', 'error');
            Ext.Viewport.setMasked(false);
        });
        Ext.getCmp('MediaAudioSlider').setValue(0);
        media.play();
        setTimeout(function() {
            Ext.Viewport.setMasked(false);
            duration = media.getDuration(); //return duration of an audio file in seconds.
            Ext.getCmp('PromotionMediaAudioSlider').setMinValue(1);
            if (duration > 0) {
                Ext.getCmp('PromotionMediaAudioSlider').setMaxValue(duration);
            }
        }, 1000);
        mediaTimer = null;
        mediaTimer = setInterval(function() {
            // get media position
            media.getCurrentPosition(
                // success callback
                function(position) {
                    if (position > -1) {
                        console.log((position) + " sec");
                        Ext.getCmp('PromotionMediaAudioSlider').setValue(position);
                    }
                },
                // error callback
                function(e) {
                    console.log("Error getting pos=" + e);
                });
        }, 1000);
    },
    onWebsiteTap: function(button, e, eOpts) {
        // var index = currentPromotion;
        // if (index == -1) index = 0;
        // if (promotionsData.length == index) {
        //     index = index - 1;
        // }
        var website = currentPromotion.website;
        if (website != '') window.open(website, '_blank', 'location=yes');
        isBannerActive = true;
        Ext.getCmp('Promotion').hide();
        DNB.app.getController('Events').ShowPromotions(currentPromotionIndex, currentBannerPageName);
    },
    onClosePromotionTap: function(button, e, eOpts) {
        isBannerActive = true;
        promotionStartFlag = true;
        Ext.getCmp('Promotion').hide();
        if(!promotionFlag){
            DNB.app.getController('Events').ShowPromotions(currentPromotionIndex, currentBannerPageName);
        }
    }
});