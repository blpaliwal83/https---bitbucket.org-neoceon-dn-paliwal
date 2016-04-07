/*
 * File: app/view/EventDetail.js
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

Ext.define('DNB.view.EventDetail', {
    extend: 'Ext.Container',
    alias: 'widget.eventdetail',

    requires: [
        'Ext.Panel',
        'Ext.Img',
        'Ext.Button',
        'Ext.Toolbar',
        'Ext.Spacer',
        'DNB.view.ContactInfo',
        'DNB.view.EventAudios',
        'DNB.view.EventVideos',
        'DNB.view.EventDescriptionView',
        'DNB.view.EventLocation'
    ],

    config: {
        layout: 'vbox',
        // scrollable: 'vertical',
        scrollable: {
            direction: 'vertical',
            momentumEasing: {
                momentum: {
                    acceleration: 30,
                    friction: 1.5
                },
                bounce: false,
                minVelocity: 0.2
            }
        },
        style : 'backgroud:#FFFFFF;',
        items: [
            {
                xtype: 'panel',
                height: 250,
                layout: 'fit',
                items: [
                    {
                        xtype: 'image',
                        id: 'EventImage',
                        itemId:'imagePopUp',
                        style: 'background-position-y: inherit;background-size: cover;'
                    }
                ]
            },
            {
                xtype: 'container',
                cls: 'socialdetalswapper',
                style: '',
                layout: 'vbox',
                items: [
                        {
                            xtype : 'panel',
                            html : '<div id="search-container"><div id="search-bg"></div><div id="search"></div></div>',
                            cls : 'mask'
                        },

                        {
                            xtype: 'container',
                            padding: '10 0 16 10',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: 'EventTitle',
                                            margin: '0 0 0 -8',
                                            style: 'color:white;font-weight:normal;',
                                            ui: 'plain'
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'image',
                                                    height: 20,
                                                    margin: '4 0 0 0',
                                                    width: 23,
                                                    src: 'resources/images/calander_detail.png'
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'EventDate',
                                                    name: 'eventDateButton',
                                                    itemId: 'mybutton19',
                                                    margin: '0 0 0 5',
                                                    style: 'font-size:14px;color:white; font-family: lab_sans_promedium;',
                                                    styleHtmlContent: true,
                                                    ui: 'plain',
                                                    text: 'EventDate'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'image',
                                                    height: 24,
                                                    width: 18,
                                                    src: 'resources/images/mapdetail.png'
                                                },
                                                {
                                                    xtype: 'button',
                                                    cls: 'wrap-button',
                                                    name: 'eventMapButton',
                                                    id: 'EventLocationButtton',
                                                    itemId: 'EventLocationButtton',
                                                    margin: '0 0 0 5',
                                                    style: 'font-size:14px;color:white; font-family: lab_sans_promedium;',
                                                    styleHtmlContent: true,
                                                    ui: 'plain',
                                                    text: 'EventLocation'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'image',
                                                    height: 18,
                                                    margin: '5 0 0 2',
                                                    width: 18,
                                                    src: 'resources/images/clock1.png'
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'EventTime',
                                                    margin: '0 0 0 4',
                                                    style: 'font-size:14px;color:white;font-weight:normal; font-family: lab_sans_promedium;',
                                                    ui: 'plain'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '0 0 0 5',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'button',
                                            height: 100,
                                            html: '<div class="social">0</div><div style="border-right: 1px solid #fff;padding-top: 5px;"><img width="30px" height="30px" src="resources/images/favs.png" /></div>',
                                            id: 'favoriteButton',
                                            itemId: 'favoriteButton',
                                            margin: '5 0 0 0',
                                            padding: 0,
                                            ui: 'plain',
                                            width: '33%'
                                        },
                                        {
                                            xtype: 'button',
                                            height: 100,
                                            html: '<div class="socialround">0</div><div style="border-right: 1px solid #fff;padding-top: 5px;"><img width="30px" height="30px" src="resources/images/comments.png" /></div>',
                                            id: 'EventCommentButton',
                                            itemId: 'EventCommentButton',
                                            margin: '5 0 0 0',
                                            padding: 0,
                                            ui: 'plain',
                                            width: '33%'
                                        },
                                        {
                                            xtype: 'button',
                                            height: 100,
                                            html: '<div class="socialround" >0</div><div style="padding-top: 5px;"><img  width="30px" height="30px" src="resources/images/likes.png"  /></div>',
                                            id: 'LikeButtonOnEventDetail',
                                            itemId: 'LikeButton',
                                            margin: '5 0 0 0',
                                            padding: 0,
                                            ui: 'plain',
                                            width: '33%'
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
            },
           
            {
                xtype: 'container',
                height: 120,
                id: 'ViewGalleryAttendingPanel',

                layout: 'hbox',
                items: [
                    {
                        xtype: 'panel',
                        style: 'background-color:white;font-size:12px;color:#DCB209',
                        layout: 'vbox',
                        cls : 'view-info-event-detail-btn',
                        flex: 1,
                        height: '100%',
                        width: '32%',
                        padding: 0,
                        align: 'center',
                        pack: 'center',
                        items: [
                            {
                                xtype: 'image',
                                itemId:'viewInfoImage',
                                src : 'resources/images/noticedetail/view-info.png',
                                style: 'margin-top: 20px',
                                height: 50
                    

                            },
                            {
                                xtype: 'button',
                                text: 'View Info',
                                itemId: 'viewInfoBtn',
                                style: 'margin-top: 10px;text-align:center; color:rgb(220, 178, 9);font-size:13px',
                                align: 'center',
                                ui:'plain'
                            }
                        ]
                    },
                    
                     {
                        xtype: 'panel',
                        style: 'background-color:white;font-size:12px;color:#DCB209',
                        layout: 'vbox',
                        cls : 'right-left-borders',
                        flex: 1,
                        height: '100%',
                        width: '32%',
                        padding: 0,
                        align: 'center',
                        pack: 'center',
                        items: [
                            {
                                xtype: 'image',
                                itemId:'galleryImage',
                                style: 'margin-top: 20px',
                                src : 'resources/images/noticedetail/viewgallery.png',
                                height: 50
                    

                            },
                            {
                                xtype: 'button',
                                itemId: 'galleryBtn',
                                style: 'margin-top: 10px;text-align: center;color:rgb(220, 178, 9);font-size:13px',
                                text: 'View Gallery',
                                align: 'center',
                                ui:'plain'
                            }
                        ]
                    },
                    
                    {
                        xtype: 'panel',
                        style: 'background-color:white;font-size:12px;color:#DCB209',
                        layout: 'vbox',
                        flex: 1,
                        height: '100%',
                        width: '32%',
                        padding: 0,
                        align: 'center',
                        pack: 'center',
                        items: [
                            {
                                xtype: 'image',
                                itemId:'eventAttendingImage',
                                id:'eventAttendingImage',
                                style: 'margin-top: 20px',
                                html:'0',
                                cls: 'eventAttendingImage popup-blue-default-cls',
                                src : 'resources/images/noticedetail/attending.png',
                                height: 50
                    

                            },
                            {
                                xtype: 'button',
                                itemId: 'eventAttendingBtn',
                                style: 'margin-top: 10px;text-align: center;color:rgb(220, 178, 9);font-size:13px',
                                text: 'Attending',
                                align: 'center',
                                ui:'plain'
                            }
                        ]
                    }
                   
                ]
            },
            {
                xtype: 'container',
                height: 120,
                id: 'ShareTotalViewContactInfoPanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'panel',
                        style: 'background-color:white;font-size:12px;color:#DCB209',
                        layout: 'vbox',
                        cls : 'top-bottom-borders',
                        flex: 1,
                        height: '100%',
                        width: '32%',
                        padding: 0,
                        align: 'center',
                        pack: 'center',
                        items: [
                            {
                                xtype: 'image',
                                itemId:'shareImage',
                                style: 'margin-top: 20px',
                                src : 'resources/images/noticedetail/share.png',
                                height: 50
                    

                            },
                            {
                                xtype: 'button',
                                itemId: 'shareBtn',
                                style: 'margin-top: 10px;text-align: center;color:rgb(220, 178, 9);font-size:13px',
                                text: 'Share',
                                align: 'center',
                                ui:'plain'
                            }
                        ]
                    },
                   
                    {
                        xtype: 'panel',
                        style: 'background-color:white;font-size:12px;color:#DCB209',
                        layout: 'vbox',
                        cls : 'total-views-btn-cls',
                        flex: 1,
                        height: '100%',
                        width: '32%',
                        padding: 0,
                        align: 'center',
                        pack: 'center',
                        items: [
                            {
                                xtype: 'image',
                                itemId:'eventTotalViewImage',
                                id:'eventTotalViewImage',
                                html:'0',
                                cls: 'eventTotalViewImage popup-blue-default-cls',
                                style: 'margin-top: 20px',
                                src : 'resources/images/noticedetail/totalviews.png',
                                height: 50
                    

                            },
                            {
                                xtype: 'button',
                                style: 'margin-top: 10px;text-align: center;color:rgb(220, 178, 9);font-size:13px',
                                text: 'Total Views',
                                align: 'center',
                                ui:'plain'
                            }
                        ]
                    },
                   
                    {
                        xtype: 'panel',
                        style: 'background-color:white;font-size:12px;color:#DCB209',
                        layout: 'vbox',
                        cls : 'top-bottom-borders',
                        flex: 1,
                        height: '100%',
                        width: '32%',
                        padding: 0,
                        align: 'center',
                        pack: 'center',
                        items: [
                            {
                                xtype: 'image',
                                itemId:'contactInfoImage',
                                style: 'margin-top: 20px',
                                src : 'resources/images/noticedetail/contactinfo.png',
                                height: 50
                    

                            },
                            {
                                xtype: 'button',
                                itemId: 'contactInfoBtn',
                                style: 'margin-top: 10px;text-align: center;color:rgb(220, 178, 9);font-size:13px',
                                text: 'Contact Info',
                                align: 'center',
                                ui:'plain'
                            }
                        ]
                    }
                    
                ]
            },
            {
                xtype: 'container',
                height: 120,
                id: 'AudioVideoFlagPanel',
                layout: 'hbox',
                items: [

                    {
                        xtype: 'panel',
                        style: 'background-color:white;font-size:12px;color:#DCB209',
                        layout: 'vbox',
                        flex: 1,
                        height: '100%',
                        width: '32%',
                        padding: 0,
                        align: 'center',
                        pack: 'center',
                        items: [
                            {
                                xtype: 'image',
                                itemId:'listenAudiImage',
                                style: 'margin-top: 20px',
                                src : 'resources/images/noticedetail/ListenAudio.PNG',
                                height: 50
                            },
                            {
                                xtype: 'button',
                                itemId: 'listenAudiBtn',
                                style: 'margin-top: 10px;text-align: center;color:rgb(220, 178, 9);font-size:13px',
                                text: 'Listen Audio',
                                align: 'center',
                                ui:'plain'
                            }
                        ]
                    },
                    
                    {
                        xtype: 'panel',
                        style: 'background-color:white;font-size:12px;color:#DCB209',
                        layout: 'vbox',
                        cls : 'right-left-borders',
                        flex: 1,
                        height: '100%',
                        width: '32%',
                        padding: 0,
                        align: 'center',
                        pack: 'center',
                        items: [
                            {
                                xtype: 'image',
                                itemId: 'viewVideoImage',
                                style: 'margin-top: 20px',
                                src : 'resources/images/noticedetail/ViewVideo.PNG',
                                height: 50
                    

                            },
                            {
                                xtype: 'button',
                                itemId: 'viewVideoBtn',
                                style: 'margin-top: 10px;text-align: center;color:rgb(220, 178, 9);font-size:13px',
                                text: 'View Video',
                                align: 'center',
                                ui:'plain'
                            }
                        ]
                    },
                   
                    {
                        xtype: 'panel',
                        style: 'background-color:white;font-size:12px;color:#DCB209',
                        layout: 'vbox',
                        flex: 1,
                        height: '100%',
                        width: '32%',
                        padding: 0,
                        align: 'center',
                        pack: 'center',
                        items: [
                            {
                                xtype: 'image',
                                itemId: 'flagNoticeImage',
                                style: 'margin-top: 20px',
                                src : 'resources/images/noticedetail/FlagNotice.PNG',
                                height: 50
                    

                            },
                            {
                                xtype: 'button',
                                itemId: 'flagNoticeBtn',
                                style: 'margin-top: 10px;text-align: center;color:rgb(220, 178, 9);font-size:13px',
                                text: 'Flag Notice',
                                align: 'center',
                                ui:'plain'
                            }
                        ]
                    }

                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'EventDetailToolbarTitle',
                title: 'Social',
                items: [
                    {
                        xtype: 'button',
                        html: 'Back',
                        cls : 'toolbar-back-button',
                        name: 'eventDetailBackButton',
                        itemId: 'back',
                        ui: 'plain',
                        iconCls: 'previousArrowIcon'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        itemId: 'search',
                        ui: 'plain',
                        iconCls: 'search'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                cls: 'PromotionToolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'image',
                        cls: 'promotionImageFullWidth',
                        height: 50,
                        src: 'resources/images/promotion.png',
                        id: 'promotionImageOnDetail',
                        itemId: 'myimg13',
                        width: '100%'
                    }
                ]
            }
        ],
        listeners: [
            // {
            //     fn: 'onEventDateTap',
            //     event: 'tap',
            //     delegate: '#EventDate'
            // },
            // {
            //     fn: 'onEventLocationButttonTap',
            //     event: 'tap',
            //     delegate: '#EventLocationButtton'
            // },
            // {
            //     fn: 'onBackTap',
            //     event: 'tap',
            //     delegate: '#back'
            // },
            {
                fn: 'onPromotionImageOnDetailTap',
                event: 'tap',
                delegate: '#promotionImageOnDetail'
            },
            {
                fn: 'onMainImagePopUpTap',
                event: 'tap',
                delegate: '#imagePopUp'
            },
            {
                fn: 'onPromotionImageOnDetailError',
                event: 'error',
                delegate: '#promotionImageOnDetail'
            }
        ]
    },

    // onBackTap: function(button, e, eOpts) {
    //     //<img src="resources/images/backButtonIcon.PNG"/>
    //     ShowHideHomePages('HomeContainer');
    // },

    onPromotionImageOnDetailTap: function(image, e, eOpts) {
        isBannerActive=false;
        audioPlayerOpenFrom='NoticeDetail';
        DNB.app.getController('Events').ShowPromotionPopup('PromotionImageOnDetail');
    },

    onPromotionImageOnDetailError: function(image, e, eOpts) {
        console.log('error to load promotion');
        image.setSrc('resources/images/noImage.jpg');
    },
    onMainImagePopUpTap:function(image,e,eOpts){
        console.log('popup success');
        // var e=Ext.Viewport.add({xtype:'imageView'});
        // var d=e.query('image[name=house]')[0];
        // // d=Ext.getCmp('house');
        // d.show();
        // Ext.getCmp('imagePopup').show();
        var popimage = Ext.Viewport.query('imagepopup')[0];
        if (!popimage) {
            popimage = new DNB.view.imagePopup;
            Ext.Viewport.add(popimage);
        }
        popimage.show();
        popimage.setImageSrc(image.getSrc())
    }

});