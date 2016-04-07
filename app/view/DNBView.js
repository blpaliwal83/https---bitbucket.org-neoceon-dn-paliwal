/*
 * File: app/view/DNBView.js
 *
 * Do NOT hand edit this file.
 */

Ext.define('DNB.view.DNBView', {
    extend: 'Ext.Container',
    alias: 'widget.dnbview',

    requires: [
        'DNB.view.EventDetail',
        'DNB.view.Home',
        'DNB.view.EventLocation',
        'DNB.view.EventVideos',
        'DNB.view.EventVideoPlayer',
        'DNB.view.EventAudios',
        'DNB.view.EventAudioPlayer',
        'DNB.view.Gallery',
        'DNB.view.Albums',
        'DNB.view.EventList',
        'DNB.view.Settings',
        'DNB.view.About',
        'DNB.view.Account',
        'DNB.view.TermsConditions',
        'DNB.view.ChangePassword',
        'DNB.view.ChangEmail',
        'Ext.tab.Panel',
        'Ext.XTemplate',
        'Ext.Spacer',
        'Ext.Button',
        'Ext.dataview.DataView',
        'Ext.tab.Bar',
        'Ext.Img',
        'Ext.ActionSheet',
        'DNB.view.UserProfile',
        'Ext.carousel.Carousel'
    ],

    config: {
        height: '100%',
        id: 'DNBView',
        layout: 'fit',
        items: [
            {
                xtype: 'tabpanel',
                height: '100%',
                id: 'MainTabView',
                items: [
                    {
                        xtype: 'container',
                        title: 'Notices',
                        iconCls: 'eventTabIcon',
                        id: 'HomeTab',
                        itemId: 'HomeTab',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'container',
                                height: '100%',
                                hidden: true,
                                id: 'EventDetailContainer',
                                itemId: 'EventDetailContainer',
                                style : 'background:#FFFFFF;',
                                layout: 'fit',
                                items: [
                                    {
                                        xtype: 'eventdetail'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: false,
                                id: 'HomeContainer',
                                itemId: '',
                                layout: 'fit',
                                items: [
                                    {
                                        xtype: 'home'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                id: 'EventLocationMapContainer',
                                items: [
                                    {
                                        xtype: 'eventlocation'
                                    }
                                ]
                            },
                            // {
                            //     xtype: 'container',
                            //     hidden: true,
                            //     id: 'EventVideosContainer',
                            //     items: [
                            //         {
                            //             xtype: 'eventvideos'
                            //         }
                            //     ]
                            // },
                            {
                                xtype: 'container',
                                hidden: true,
                                style : 'background:#000;',
                                id: 'EventVideoPlayerContainer',
                                items: [
                                    {
                                        xtype: 'eventvideoplayer'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                id: 'EventAudiosContainer',
                                items: [
                                    {
                                        xtype: 'eventaudios'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                id: 'EventAudiosPlayerContainer',
                                items: [
                                    {
                                        xtype: 'eventaudioplayer'
                                    },
                                    {
                                        xtype: 'panel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: 'My Zone',
                        iconCls: 'mySpaceTabIcon',
                        itemId: 'MySpaceTab',
                        items: [
                            {
                                xtype: 'panel',
                                height: '100%',
                                hidden: false,
                                items: [
                                    {
                                        xtype: 'tabpanel',
                                        height: '100%',
                                        id: 'MySpaceTabsPanel',
                                        cls:'myzone-tab-panel-cls',
                                        items: [
                                            {
                                                xtype: 'container',
                                                title: 'RSVP',
                                                itemId: 'RSVP',
                                                layout: 'fit',
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        style: 'background-color:white;',
                                                        layout: 'vbox',
                                                        items: [
                                                            // {
                                                            //     xtype: 'userprofile',
                                                            //     flex: 1,
                                                            //     docked: 'top',
                                                            //     height: 100,
                                                            //     hidden: true,
                                                            //     id: 'MyProfileContainer1'
                                                            // },
                                                            {
                                                                xtype: 'panel',
                                                                height: 110,
                                                                padding: '5 5 10 10',
                                                                style: 'background-color:white;',
                                                                layout: 'hbox',
                                                                items: [
                                                                    {
                                                                        xtype: 'panel',
                                                                        cls: 'tpl-t59q098e',
                                                                        height: 100,
                                                                        id: 'MyProfileContainer',
                                                                        tpl: Ext.create('Ext.XTemplate', 
                                                                            '<table  width="100%" class="wapperheading">',
                                                                            '    <tr>',
                                                                            '        <td width="27%" style="text-align: right !important;">',
                                                                            '        <div class="circleImage">',
                                                                            '            <img src="{[this.GetImageUrl(values.userimage)]}" onerror=DNB.app.getController("Events").GetNoImageUrl(this)/>',
                                                                            '        </div>',
                                                                            '        </td>',
                                                                            '        <td width="6%"><hr></td>',
                                                                            '        <td width="67%">',
                                                                            '            <h4 style="font-size:14px;">   {username}  <span class="totalvalues">&nbsp;{totalvalues}&nbsp;</span> </h4>',
                                                                            '            <div class="leftseticonimg">',
                                                                            '                <img style="height: 25px; width: 23px;"src="resources/images/status.png">',
                                                                            '            </div>',
                                                                            '            <div class="leftseticon">',
                                                                            '                <p>  {message}  </p>',
                                                                            '            </div>',
                                                                            '        </td>',
                                                                            '    </tr>',
                                                                            '</table>',
                                                                            {
                                                                                GetImageUrl: function(imageUrl) {
                                                                                    if(imageUrl=='' || imageUrl== null){
                                                                                        return 'resources/images/default-user.png';
                                                                                    }
                                                                                    return imageBaseUrl+imageUrl;
                                                                                }
                                                                            }
                                                                        ),
                                                                        width: '100%'
                                                                    }
                                                                    // ,
                                                                    // {
                                                                    //     xtype: 'spacer',
                                                                    //     hidden: true,
                                                                    //     width: 20
                                                                    // }
                                                                ]
                                                            },
                                                            // {
                                                            //     xtype: 'panel',
                                                            //     height: 40,
                                                            //     hidden: true,
                                                            //     margin: 5,
                                                            //     style: 'background-color:#DCB209;color:White;font-size:16px;',
                                                            //     layout: 'hbox',
                                                            //     items: [
                                                            //         {
                                                            //             xtype: 'spacer',
                                                            //             flex: 1
                                                            //         },
                                                            //         {
                                                            //             xtype: 'button',
                                                            //             flex: 1,
                                                            //             cls: 'OtherEventSearchByDateButton',
                                                            //             height: '100%',
                                                            //             id: 'RSVPSearchByDateButton',
                                                            //             style: 'width: auto !important;background-color:#DCB209;color:White;font-size:16px;',
                                                            //             ui: 'plain',
                                                            //             text: 'date'
                                                            //         },
                                                            //         {
                                                            //             xtype: 'spacer',
                                                            //             flex: 1
                                                            //         }
                                                            //     ]
                                                            // },
                                                            {
                                                                xtype : 'carousel',
                                                                indicator: false ,
                                                                name : 'RSVPCarousel',
                                                                cls : 'items-carousel-cls',
                                                                listeners :{
                                                                    initialize : function(c){
                                                                        c.setItemLength(window.innerWidth * 0.8);
                                                                        rsvp_cr = c;
                                                                        rsvp_cr.element.on('tap', function(e, el){
                                                                                 // Here you will get the target element
                                                                                 if(rsvp_cr.items.length<1){
                                                                                    return;
                                                                                 }
                                                                                var data = rsvp_cr.getActiveItem().getData();
                                                                                // console.log(rsvp_cr.getActiveItem().getData());
                                                                                var className = e.target.className;
                                                                                console.log(className);
                                                                                if(className.indexOf('carosel-item-close-cls')>-1){
                                                                                     console.log('close Clicked');
                                                                                     DNB.app.getController('Events').removeRSVPNotice(data);
                                                                                    
                                                                               }else if(className.indexOf('carousel-item-image-cls')>-1){
                                                                                    console.log('Image Clicked');
                                                                                    eventDetailPageOpenFrom = "MyZone";
                                                                                    DNB.app.getController('EventDetail').FillEventDetail({id:data.id});
                                                                               }else if ((className.indexOf('notice-details-calander-icon-cls')>-1)||(className.indexOf('notice-details-date-label-cls')>-1)){
                                                                                        selectedEventDetail.Notice=data;
                                                                                        DNB.app.getController('Events').AddToCalendar();
                                                                                       
                                                                               }else if((className.indexOf('notice-details-map-icon-cls')>-1)||(className.indexOf('notice-details-location-label-cls')>-1)){
                                                                                        console.log('Map Clicked')
                                                                                        mapPageOpenFrom='Home';
                                                                                        selectedEventDetail.Notice=data;
                                                                                        DNB.app.getController('Events').ShowMap(data.venu_detail);
                                                                                        // console.log(e.target.data);

                                                                               }
                                                                             }, this);
                                                                    },
                                                                    painted: function(element, eOpts ){
                                                                        if(rsvp_cr.getActiveItem()){
                                                                            rsvp_cr.getActiveItem().setHeight('100%'); 
                                                                            rsvp_cr.getActiveItem().query('[name=carouselCloseIcon]')[0].setHidden(false);  
                                                                        }
                                                                    },
                                                                    activeitemchange: function( ths, value, oldValue, eOpts ){
                                                                       
                                                                        if(value){
                                                                            value.setHeight('100%');
                                                                            value.query('[name=carouselCloseIcon]')[0].setHidden(false);   
                                                                        }
                                                                        if((oldValue) && (oldValue.innerItems.length>0)){
                                                                            oldValue.setHeight('86%');
                                                                            oldValue.query('[name=carouselCloseIcon]')[0].setHidden(true);     
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                           
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                title: 'Favorites',
                                                itemId: 'Favorites',
                                                layout: 'fit',
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        style: 'background-color:white;',
                                                        layout: 'vbox',
                                                        items: [
                                                            {
                                                                xtype: 'panel',
                                                                height: 110,
                                                                padding: '5 5 10 10',
                                                                style: 'background-color:white;',
                                                                layout: 'hbox',
                                                                items: [
                                                                    {
                                                                        xtype: 'panel',
                                                                        height: 100,
                                                                        id: 'MyProfileFavoriteContainer',
                                                                        tpl: Ext.create('Ext.XTemplate', 
                                                                            '<table  width="100%" class="wapperheading">',
                                                                            '    <tr>',
                                                                            '        <td width="27%" style="text-align: right !important;">',
                                                                            '        <div class="circleImage">',
                                                                            '            <img src="{[this.GetImageUrl(values.userimage)]}" onerror=DNB.app.getController("Events").GetNoImageUrl(this)/>',
                                                                            '        </div>',
                                                                            '        </td>',
                                                                            '        <td width="6%"> <hr> </td>',
                                                                            '        <td width="67%">',
                                                                            '            <h4 style="font-size:14px;">   {username}  <span class="totalvalues">&nbsp;{totalvalues}&nbsp;</span> </h4>',
                                                                            '            <div class="leftseticonimg">',
                                                                            '                <img style="height: 25px; width: 23px;"src="resources/images/status.png">',
                                                                            '            </div>',
                                                                            '            <div class="leftseticon">',
                                                                            '                <p>  {message}  </p>',
                                                                            '            </div>',
                                                                            '        </td>',
                                                                            '    </tr>',
                                                                            '</table>',
                                                                            {
                                                                                GetImageUrl: function(imageUrl) {
                                                                                    if(imageUrl=='' || imageUrl== null){
                                                                                        return 'resources/images/default-user.png';
                                                                                    }
                                                                                    return imageBaseUrl+imageUrl;
                                                                                },
                                                                                GetDeviceName: function() {
                                                                                    return Ext.os.deviceType.toLowerCase();
                                                                                }
                                                                            }
                                                                        ),
                                                                        width: '100%'
                                                                    }
                                                                ]
                                                            },
                                                             {
                                                                xtype : 'carousel',
                                                                indicator: false ,
                                                                name : 'FavoritesCarousel',
                                                                cls : 'items-carousel-cls',
                                        
                                                                listeners :{
                                                                    initialize : function(c){
                                                                        c.setItemLength(window.innerWidth * 0.8);
                                                                        fav_cr = c;
                                                                        fav_cr.element.on('tap', function(e, el){
                                                                                 // Here you will get the target element
                                                                                if(fav_cr.items.length<1){
                                                                                    return;
                                                                                 }
                                                                                var data = fav_cr.getActiveItem().getData();
                                                                                // console.log(fav_cr.getActiveItem().getData());
                                                                                var className = e.target.className;
                                                                                console.log(className);
                                                                               if(e.target.className.indexOf('carosel-item-close-cls')>-1){
                                                                                     console.log('close Clicked');
                                                                                     DNB.app.getController('Events').removeFavoriteNotice(data);
                                                                                    
                                                                               }else if(e.target.className.indexOf('carousel-item-image-cls')>-1){
                                                                                     console.log('Image Clicked');
                                                                                     eventDetailPageOpenFrom = "MyZone";
                                                                                     DNB.app.getController('EventDetail').FillEventDetail({id:data.id});
                                                                               }else if ((className.indexOf('notice-details-calander-icon-cls')>-1)||(className.indexOf('notice-details-date-label-cls')>-1)){
                                                                                        selectedEventDetail.Notice=data;
                                                                                        DNB.app.getController('Events').AddToCalendar();
                                                                                       
                                                                               }else if((className.indexOf('notice-details-map-icon-cls')>-1)||(className.indexOf('notice-details-location-label-cls')>-1)){
                                                                                        console.log('Map Clicked')
                                                                                        mapPageOpenFrom='Home';
                                                                                        selectedEventDetail.Notice=data;
                                                                                        DNB.app.getController('Events').ShowMap(data.venu_detail);
                                                                                        // console.log(e.target.data);

                                                                               }
                                                                             }, this);
                                                                    },
                                                                    painted: function(element, eOpts ){
                                                                        if(fav_cr.getActiveItem()){
                                                                            fav_cr.getActiveItem().setHeight('100%'); 
                                                                            fav_cr.getActiveItem().query('[name=carouselCloseIcon]')[0].setHidden(false);  
                                                                        }
                                                                    },
                                                                    activeitemchange: function( ths, value, oldValue, eOpts ){
                                                                        value.setHeight('100%');
                                                                        value.query('[name=carouselCloseIcon]')[0].setHidden(false);
                                                                        if((oldValue) && (oldValue.innerItems.length>0)){
                                                                            oldValue.setHeight('86%');
                                                                            oldValue.query('[name=carouselCloseIcon]')[0].setHidden(true);     
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                           
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                title: 'My Notices',
                                                itemId: 'MyNotices',
                                                layout: 'fit',
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        style: 'background-color:white;',
                                                        layout: 'vbox',
                                                        items: [
                                                            {
                                                                xtype: 'panel',
                                                                height: 110,
                                                                padding: '5 5 10 10',
                                                                style: 'background-color:white;',
                                                                layout: 'hbox',
                                                                items: [
                                                                    {
                                                                        xtype: 'panel',
                                                                        height: 100,
                                                                        id: 'MyProfileMyNoticesContainer',
                                                                        tpl: Ext.create('Ext.XTemplate', 
                                                                            '<table  width="100%" class="wapperheading">',
                                                                            '    <tr>',
                                                                            '        <td width="27%" style="text-align: right !important;">',
                                                                            '        <div class="circleImage">',
                                                                            '            <img src="{[this.GetImageUrl(values.userimage)]}" onerror=DNB.app.getController("Events").GetNoImageUrl(this)/>',
                                                                            '        </div>',
                                                                            '        </td>',
                                                                            '        <td width="6%"> <hr> </td>',
                                                                            '        <td width="67%">',
                                                                            '            <h4 style="font-size:14px;">   {username}  <span class="totalvalues">&nbsp;{totalvalues}&nbsp;</span> </h4>',
                                                                            '            <div class="leftseticonimg">',
                                                                            '                <img style="height: 25px; width: 23px;"src="resources/images/status.png">',
                                                                            '            </div>',
                                                                            '            <div class="leftseticon">',
                                                                            '                <p>  {message}  </p>',
                                                                            '            </div>',
                                                                            '        </td>',
                                                                            '    </tr>',
                                                                            '</table>',
                                                                            {
                                                                                GetImageUrl: function(imageUrl) {
                                                                                    // console.log(imageBaseUrl+imageUrl);
                                                                                    if(imageUrl=='' || imageUrl== null){
                                                                                        return 'resources/images/default-user.png';
                                                                                    }
                                                                                    return imageBaseUrl+imageUrl;
                                                                                }
                                                                            }
                                                                        ),
                                                                        width: '100%'
                                                                    }
                                                                    // ,
                                                                    // {
                                                                    //     xtype: 'spacer',
                                                                    //     width: 20
                                                                    // }
                                                                ]
                                                            },
                                                             {
                                                                xtype : 'carousel',
                                                                indicator: false ,
                                                                name : 'MyNoticeCarousel',
                                                                cls : 'items-carousel-cls',
                                                                // items: [
                                                                   
                                                                // ],
                                                                listeners :{
                                                                    
                                                                    initialize : function(c){
                                                                        
                                                                        c.setItemLength(window.innerWidth * 0.8);
                                                                        my_cr = c;
                                                                        my_cr.element.on('tap', function(e, el){
                                                                                 // Here you will get the target element
                                                                                if(my_cr.items.length<1){
                                                                                    return;
                                                                                 }
                                                                                var data = my_cr.getActiveItem().getData();
                                                                                var className = e.target.className;
                                                                                console.log(className);
                                                                                // console.log(my_cr.getActiveItem().getData());
                                                                               if(e.target.className.indexOf('carosel-item-edit-cls')>-1){
                                                                                     console.log('edit Clicked');
                                                                                    DNB.app.getController('Events').EditNoticeButtonTap(data);
                                                                               }else if(e.target.className.indexOf('carousel-item-image-cls')>-1){
                                                                                     console.log('Image Clicked');
                                                                                     eventDetailPageOpenFrom = "MyZone";
                                                                                     DNB.app.getController('EventDetail').FillEventDetail({id:data.id});
                                                                               }else if ((className.indexOf('notice-details-calander-icon-cls')>-1)||(className.indexOf('notice-details-date-label-cls')>-1)){
                                                                                        selectedEventDetail.Notice=data;
                                                                                        DNB.app.getController('Events').AddToCalendar();
                                                                                       
                                                                               }else if((className.indexOf('notice-details-map-icon-cls')>-1)||(className.indexOf('notice-details-location-label-cls')>-1)){
                                                                                        console.log('Map Clicked')
                                                                                        mapPageOpenFrom='Home';
                                                                                        selectedEventDetail.Notice=data;
                                                                                        DNB.app.getController('Events').ShowMap(data.venu_detail);
                                                                                        // console.log(e.target.data);

                                                                               }
                                                                             }, this);
                                                                                                                                    },
                                                                    painted: function(element, eOpts ){
                                                                        if(my_cr.getActiveItem()){
                                                                            my_cr.getActiveItem().setHeight('100%'); 
                                                                            my_cr.getActiveItem().query('[name=carouselCloseIcon]')[0].setHidden(false);  
                                                                        }
                                                                    },
                                                                    activeitemchange: function( ths, value, oldValue, eOpts ){
                                                                        if(value){
                                                                            value.setHeight('100%');
                                                                            value.query('[name=carouselCloseIcon]')[0].setHidden(false);
                                                                        }
                                                                        if((oldValue) && (oldValue.innerItems.length>0)){
                                                                            oldValue.setHeight('86%');
                                                                            oldValue.query('[name=carouselCloseIcon]')[0].setHidden(true);     
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                title: 'My Promotions',
                                                itemId: 'MyPromotions',
                                                width: '',
                                                layout: 'fit',
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        style: 'background-color:white;',
                                                        layout: 'vbox',
                                                        items: [
                                                            {
                                                                xtype: 'panel',
                                                                height: 110,
                                                                padding: '5 5 10 10',
                                                                style: 'background-color:white;',
                                                                layout: 'hbox',
                                                                items: [
                                                                    {
                                                                        xtype: 'panel',
                                                                        height: 100,
                                                                        id: 'MyProfileMyPromotionsContainer',
                                                                        style: 'width:250px !important;',
                                                                        tpl: Ext.create('Ext.XTemplate', 
                                                                            '<table  width="100%" class="wapperheading">',
                                                                            '    <tr>',
                                                                            '        <td width="27%" style="text-align: right !important;">',
                                                                            '        <div class="circleImage">',
                                                                            '            <img src="{[this.GetImageUrl(values.userimage)]}" onerror=DNB.app.getController("Events").GetNoImageUrl(this)/>',
                                                                            '        </div>',
                                                                            '        </td>',
                                                                            '        <td width="6%"> <hr> </td>',
                                                                            '        <td width="67%">',
                                                                            '            <h4 style="font-size:14px;">   {username}  <span class="totalvalues">&nbsp;{totalvalues}&nbsp;</span> </h4>',
                                                                            '            <div class="leftseticonimg">',
                                                                            '               <img style="height: 25px; width: 23px;"src="resources/images/status.png">',
                                                                            '            <div class="leftseticon">',
                                                                            '                <p>  {message}  </p>',
                                                                            '            </div>',
                                                                            '        </td>',
                                                                            '    </tr>',
                                                                            '</table>',
                                                                            {
                                                                                GetImageUrl: function(imageUrl) {
                                                                                    if(imageUrl=='' || imageUrl== null){
                                                                                        return 'resources/images/default-user.png';
                                                                                    }
                                                                                    return imageBaseUrl+imageUrl;
                                                                                }
                                                                            }
                                                                        ),
                                                                        width: '100%'
                                                                    }
                                                                    // ,
                                                                    // {
                                                                    //     xtype: 'spacer',
                                                                    //     width: 20
                                                                    // }
                                                                ]
                                                            },
                                                            {
                                                                xtype : 'carousel',
                                                                indicator: false ,
                                                                name : 'PromotionCarousel',
                                                                cls : 'items-carousel-cls',
                                                                // items: [
                                                                   
                                                                // ],
                                                                listeners :{
                                                                    initialize : function(c){
                                                                        c.setItemLength(window.innerWidth * 0.8);
                                                                        promotion_cr = c;
                                                                        promotion_cr.element.on('tap', function(e, el){
                                                                                 // Here you will get the target element
                                                                                if(promotion_cr.items.length<1){
                                                                                    return;
                                                                                 }
                                                                                var data = promotion_cr.getActiveItem().getData();
                                                                                if(e.target.className.indexOf('carosel-item-edit-cls') > -1){
                                                                                    console.log('edit promo')
                                                                                    DNB.app.getController('Events').onEditPromotionButtonTap(data);

                                                                                } else {
                                                                                    console.log('else edit promo')
                                                                                    
                                                                                    console.log(promotion_cr.getActiveItem().getData());
                                                                                    DNB.app.getController('Events').showMyZonePromotionPopup(data,'PromotionImageOnMySpace');
                                                                                }
                                                                               // if(e.target.className.indexOf('carousel-item-image-cls')>-1){
                                                                               //       console.log('Image Clicked');

                                                                               //       // DNB.app.getController('EventDetail').FillEventDetail({id:data.id});
                                                                               // }else if (e.target.className.indexOf('notice-details-calander-icon-cls')>-1){
                                                                               //          console.log('Calendar Clicked')
                                                                               //          // console.log(e.target.data);
                                                                               // }else if(e.target.className.indexOf('notice-details-map-icon-cls')>-1){
                                                                               //          console.log('Map Clicked')
                                                                               //          // console.log(e.target.data);

                                                                               // }
                                                                             }, this);
                                                                    },
                                                                    painted: function(element, eOpts ){
                                                                        if(promotion_cr.getActiveItem()){
                                                                            promotion_cr.getActiveItem().setHeight('100%'); 
                                                                            promotion_cr.getActiveItem().query('[name=carouselCloseIcon]')[0].setHidden(false);  
                                                                        }
                                                                    },
                                                                    activeitemchange: function( ths, value, oldValue, eOpts ){
                                                                        if(value){
                                                                            value.setHeight('100%');
                                                                            value.query('[name=carouselCloseIcon]')[0].setHidden(false);
                                                                        }
                                                                       
                                                                        if((oldValue) && (oldValue.innerItems.length>0)){
                                                                            oldValue.setHeight('86%');
                                                                            oldValue.query('[name=carouselCloseIcon]')[0].setHidden(true);     
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                           
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        tabBar: {
                                            docked: 'top',
                                            width: ''
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'toolbar',
                                docked: 'top',
                                title: 'My Zone'
                            },
                            {
                                xtype: 'toolbar',
                                cls: 'PromotionToolbar',
                                docked: 'bottom',
                                id: 'MyZonePromotionToolbar',
                                style: 'background-color:#DCB209;',
                                layout : {
                                    type : 'hbox',
                                    pack : 'center',
                                    align : 'center'
                                },
                                items: [
                                    {
                                        xtype: 'image',
                                        cls: 'promotionImageFullWidth',
                                        src: 'resources/images/promotion.png',
                                        height: 50,
                                        id: 'promotionImageOnMySpace',
                                        itemId: 'myimg12',
                                        width : '100%'
                                        
                                    }
                                    // ,
                                    // {
                                    //     xtype : 'label',
                                    //     html : 'promotion'
                                    // }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: 'Gallery',
                        iconCls: 'galleryTabIcon',
                        itemId: 'Gallery',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'container',
                                hidden: true,
                                id: 'GalleryContainer',
                                layout: 'fit',
                                items: [
                                    {
                                        xtype: 'gallery'
                                    }
                                ]
                            },
                            
                            {
                                xtype: 'container',
                                id: 'AlbumContainer',
                                layout: 'fit',
                                items: [
                                    {
                                        xtype: 'albums'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                id: 'GalleryImageContainer',
                                layout: 'fit',
                                items: [
                                    {
                                        xtype: 'image',
                                        cls: 'downloadableImage',
                                        id: 'GalleryImage'
                                    },
                                    {
                                        xtype: 'actionsheet',
                                        id: 'ActionImageSheet',
                                        items: [
                                            {
                                                xtype: 'button',
                                                itemId: 'Save',
                                                text: 'Save'
                                            },
                                            {
                                                xtype: 'button',
                                                html: 'Cancel',
                                                itemId: 'Cancel',
                                                text: 'Cancel'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: 'Go Live',
                        iconCls: 'goLiveTabIcon',
                        itemId: 'GoLive',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'eventlist'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: 'Settings',
                        iconCls: 'settingsTabIcon',
                        itemId: 'Settings',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'settings',
                                hidden: false
                            },
                            {
                                xtype: 'about',
                                height: '100%',
                                hidden: true
                            },
                            {
                                xtype: 'account',
                                hidden: true
                            },
                            {
                                xtype: 'termsconditions',
                                hidden: true
                            },
                            {
                                xtype: 'changepassword',
                                hidden: true
                            },
                            {
                                xtype: 'changemail',
                                hidden: true
                            }
                        ]
                    }
                ],
                tabBar: {
                    docked: 'bottom'
                }
            }
        ],
        listeners: [
            {
                fn: 'onHomeTabShow',
                event: 'show',
                delegate: '#HomeTab'
            },
            {
                fn: 'onRSVPEventSearchByDateButtonTap',
                event: 'tap',
                delegate: '#RSVPSearchByDateButton'
            },
            {
                fn: 'onRSVPListItemTap',
                event: 'itemtap',
                delegate: '#RSVPList'
            },
            {
                fn: 'onRSVPActivate',
                event: 'activate',
                delegate: '#RSVP'
            },
            {
                fn: 'onMyFavoritesListItemTap',
                event: 'itemtap',
                delegate: '#MyFavoritesList'
            },
            {
                fn: 'onFavoritesActivate',
                event: 'activate',
                delegate: '#Favorites'
            },
            {
                fn: 'onMyNoticeItemTap',
                event: 'itemtap',
                delegate: '#MyNoticeDataView1'
            },
            {
                fn: 'onMyNoticeDataViewItemTap',
                event: 'itemtap',
                delegate: '#MyNoticeDataView'
            },
            {
                fn: 'onMyNoticesActivate',
                event: 'activate',
                delegate: '#MyNotices'
            },
            {
                fn: 'onMyPromotionItemTap',
                event: 'itemtap',
                delegate: '#MyPromotionList'
            },
            {
                fn: 'onMyPromotionsActivate',
                event: 'activate',
                delegate: '#MyPromotions'
            },
            {
                fn: 'onMySpaceTabActivate',
                event: 'activate',
                delegate: '#MySpaceTab'
            },
            {
                fn: 'onPromotionImageOnMySpaceTap',
                event: 'tap',
                delegate: '#promotionImageOnMySpace'
            },
            {
                fn: 'onGalleryShow',
                event: 'show',
                delegate: '#Gallery'
            },
            {
                fn: 'onEventImageInGalleryDetailPageTap',
                event: 'tap',
                delegate: '#GalleryImage'
            },
            {
                fn: 'onSaveTap',
                event: 'tap',
                delegate: '#Save'
            },
            {
                fn: 'onCancelTap',
                event: 'tap',
                delegate: '#Cancel'
            },
            {
                fn: 'onGoLiveActivate',
                event: 'activate',
                delegate: '#GoLive'
            },
            {
                fn: 'onSettingsActivate',
                event: 'activate',
                delegate: '#Settings'
            }
        ]
    },

    onHomeTabShow: function(component, eOpts) {
        // ShowHideHomePages('HomeContainer');
        console.log('working')
        promotionStartFlag=false;
    },

    onRSVPEventSearchByDateButtonTap: function(button, e, eOpts) {
        if(isCalendaralreadyOpen){return;}
        if(!isCalendaralreadyOpen){
            isCalendaralreadyOpen=true;
        }
        isDateSelectedFromCalendar=false;
        calendarOpenFromPage='RSVP';
        setTimeout(function(){
             if(Ext.getCmp('Calendar'))
                 Ext.getCmp('Calendar').show();
             else
                 Ext.Viewport.add({xtype:'calendar'}).show();
             Ext.getCmp('Calendar').setDateValue(currentRSVPSearchDate);
         },400);

    },

    onRSVPListItemTap: function(dataview, index, target, record, e, eOpts) {
        if(e.target.className.indexOf('deletenotice')>=0){
            Ext.Msg.confirm('DNB','Are you sure?',function(btn){
                if(btn=='yes'){
                    Ext.Viewport.setMasked({xtype:'loadmask',message:'Loading notices'});
                    Ext.Ajax.request({
                        url:DNB.util.Common.api.deleteAttend,
                        method:'POST',
                        params:{
                            notice_id:record.data.id,
                            user_id:localStorage.getItem('userid')
                        },
                        success: function(res){
                            Ext.Viewport.setMasked(false);
                            DNB.app.getController('Events').GetMyNotices('NoticeAttends/total/','RSVPNoticesPanel');
                        },failure:function(res){
                            Ext.Viewport.setMasked(false);
                            Ext.Msg.alert('','Internet is not available.');
                        }
                    });
                }
            });
        }
    },

    onRSVPActivate: function(newActiveItem, container, oldActiveItem, eOpts) {


        DNB.app.getController('Events').GetMyNotices('NoticeAttends/total/','RSVPNoticesPanel');

        //Ext.getCmp('UserProfileImageRSVP').setSrc(imageBaseUrl+localStorage.getItem('image'));
        //Ext.getCmp('UserNameRSVP').setHtml(localStorage.getItem('username'));
    },

    onMyFavoritesListItemTap: function(dataview) {
        if(e.target.className.indexOf('deletenotice')>=0){
            Ext.Msg.confirm('DNB','Are you sure?',function(btn){
                if(btn=='yes'){
                    Ext.Viewport.setMasked({xtype:'loadmask',message:'Loading notices'});

                    Ext.Ajax.request({
                        url:DNB.util.Common.api.deleteFavorite,
                        method:'POST',
                        params:{
                            notice_id:record.data.id,
                            user_id:localStorage.getItem('userid')
                        },
                        success: function(res){
                            Ext.Viewport.setMasked(false);
                            DNB.app.getController('Events').GetMyNotices('Favorites/UserAllFavorite/','FavoriteNoticesPanel');
                        },failure:function(res){
                            Ext.Viewport.setMasked(false);
                            Ext.Msg.alert('','Internet is not available.');
                        }
                    });
                }
            });
        }
    },

    onFavoritesActivate: function(newActiveItem, container, oldActiveItem, eOpts) {
        //FavoriteNoticesPanel
        DNB.app.getController('Events').GetMyNotices('Favorites/UserAllFavorite/','FavoriteNoticesPanel');

                console.log(imageBaseUrl+localStorage.getItem('image'));
                //Ext.getCmp('UserProfileImageFavorite').setSrc(imageBaseUrl+localStorage.getItem('image'));
                //Ext.getCmp('UserNameFavorite').setHtml(localStorage.getItem('username'));//localStorage.getItem('First_name')+' '+localStorage.getItem('Last_name'));
                //Ext.getCmp('UserMessageFavorite').setHtml(localStorage.getItem('usermessage'));
        //Ext.getCmp('MyProfileFavoriteContainer').setWidth(250);
    },

 // onEditNoticeButtonTap: function(data) {
 //    console.log(data);
 //    return;

 //    if(Ext.getCmp('AddEvent'))
 //        Ext.getCmp('AddEvent').show();
 //    else
 //        Ext.Viewport.add({xtype:'addevent'}).show();
 //        Ext.getCmp('DNBView').hide();

 //        categoryDataToAdd=[];
 //        categoryDataToAdd=noticesCategoryListData;

 //        selectedCategoryIDsToAdd='';

 //        categoryMultiSelectOpenFromPage='AddEvent';
 //        Ext.getCmp('EventImagesListPanel').show();
 //        isEditNotice=true;
 //        editNoticeId=record.data.id;
 //        //console.log(record.data.id);
 //        DNB.app.getController('Events').ResetNoticeForm();
 //        DNB.app.getController('Events').FillNoticeForm(record.data.id);
 //        Ext.getCmp('NoticeTitleToolbar').setTitle('Edit Notice');
 //    },


    onMyNoticeItemTap: function(dataview, index, target, record, e, eOpts) {

        if(Ext.getCmp('AddEvent'))
            Ext.getCmp('AddEvent').show();
        else
            Ext.Viewport.add({xtype:'addevent'}).show();
        Ext.getCmp('DNBView').hide();

            categoryDataToAdd=[];
            categoryDataToAdd=noticesCategoryListData;

            selectedCategoryIDsToAdd='';

            categoryMultiSelectOpenFromPage='AddEvent';
        Ext.getCmp('EventImagesListPanel').show();
        isEditNotice=true;
        editNoticeId=record.data.id;
        //console.log(record.data.id);
        DNB.app.getController('Events').ResetNoticeForm();
        DNB.app.getController('Events').FillNoticeForm(record.data.id);
        Ext.getCmp('NoticeTitleToolbar').setTitle('Edit Notice');
    },

    onMyNoticeDataViewItemTap: function(dataview, index, target, record, e, eOpts) {
        if(Ext.getCmp('AddEvent'))
            Ext.getCmp('AddEvent').show();
        else
            Ext.Viewport.add({xtype:'addevent'}).show();
        Ext.getCmp('DNBView').hide();

            categoryDataToAdd=[];
            categoryDataToAdd=noticesCategoryListData;

            selectedCategoryIDsToAdd='';

            categoryMultiSelectOpenFromPage='AddEvent';
        Ext.getCmp('EventImagesListPanel').show();
        isEditNotice=true;
        editNoticeId=record.data.id;
        //console.log(record.data.id);
        DNB.app.getController('Events').ResetNoticeForm();
        DNB.app.getController('Events').FillNoticeForm(record.data.id);
        Ext.getCmp('NoticeTitleToolbar').setTitle('Edit Notice');
    },

    onMyNoticesActivate: function(newActiveItem, container, oldActiveItem, eOpts) {
                console.log('onMyNoticesActivate')
                DNB.app.getController('Events').GetMyNotices('users/get_my_notice/','MyNoticesPanel');

    },

    onMyPromotionItemTap: function(dataview, index, target, record, e, eOpts) {
        //console.log('here-1');
        isEditPromotion=true;
        selectedCategoryIDsToAdd='';
        categoryDataToAdd=[];
        categoryDataToAdd=promotionsCategoryListData;
        categoryMultiSelectOpenFromPage='AddPromotion';
        Ext.getCmp('DNBView').hide();
        if(Ext.getCmp('AddPromotion'))
            Ext.getCmp('AddPromotion').show();
        else
            Ext.Viewport.add({xtype:'addpromotion'}).show();
        editPromotionId=record.data.id;
        //console.log(record.data);
        //console.log('2');
        DNB.app.getController('Events').ResetPromotionForm();
        DNB.app.getController('Events').FillPromotionForm(record.data.id);
        Ext.getCmp('PromotionTitleToolbar').setTitle('Edit Promotion');
    },

    onMyPromotionsActivate: function(newActiveItem, container, oldActiveItem, eOpts) {
        DNB.app.getController('Events').GetPromotionsByUser();

        //console.log(imageBaseUrl+localStorage.getItem('image'));
        //Ext.getCmp('UserProfileImageMyPromotions').setSrc(imageBaseUrl+localStorage.getItem('image'));
        //Ext.getCmp('UserNameMyPromotions').setHtml(localStorage.getItem('username'));//localStorage.getItem('First_name')+' '+localStorage.getItem('Last_name'));
        //Ext.getCmp('UserMessageMyPromotions').setHtml(localStorage.getItem('usermessage'));
        //Ext.getCmp('MyProfileMyPromotionsContainer').setWidth(250);
    },

    onMySpaceTabActivate: function(newActiveItem, container, oldActiveItem, eOpts) {
        console.log('on My Zone activate')
        DNB.app.getController('Events').StopAudioPlayer();
        if(isLogin==false){
            loginPageOpenFrom='MySpaceTab';
            if(Ext.getCmp('Login'))
                Ext.getCmp('Login').show();
            else
                Ext.Viewport.add({xtype:'login'}).show();
            Ext.getCmp('DNBView').hide();
        }
        else{
            //promotionImageOnMySpace
            //to promotions
            // Ext.getCmp('MySpaceTabsPanel').setActiveItem(0);
            currentBannerPageName='promotionImageOnMySpace';
            currentPromotionIndex = 0;
            promotionStartFlag = true;
            DNB.app.getController('Events').FilterPromotions();
            if(!promotionFlag){
                 DNB.app.getController('Events').ShowPromotions(currentPromotionIndex,currentBannerPageName);
            }
           
            DNB.app.getController('Events').GetMyNotices('NoticeAttends/total/','RSVPNoticesPanel');

            DNB.app.getController('Events').SetDateOnRSVPEventSearchByDateButton(currentRSVPSearchDate);
        }

        var tabs=Ext.select('#MySpaceTabsPanel').elements[0].childNodes[0].childNodes[0].childNodes[0];
        tabs.childNodes[0].childNodes[1].className =' x-button-icon x-shown RSVPTab';
        tabs.childNodes[1].childNodes[1].className =' x-button-icon x-shown FavoritesTab';
        tabs.childNodes[2].childNodes[1].className =' x-button-icon x-shown MyNoticesTab';
        tabs.childNodes[3].childNodes[1].className =' x-button-icon x-shown MyPromotionsTab';
        //Ext.getCmp('MyProfileContainer').setWidth(250);
    },

    onPromotionImageOnMySpaceTap: function(image, e, eOpts) {
        isBannerActive=false;
        promotionStartFlag = false;
        DNB.app.getController('Events').ShowPromotionPopup('PromotionImageOnMySpace');
    },

    onGalleryShow: function(component, eOpts) {
        DNB.app.getController('Events').StopAudioPlayer();
        Ext.getCmp('AlbumContainer').show();
        Ext.getCmp('GalleryContainer').hide();
        Ext.getCmp('GalleryImageContainer').hide();
        currentBannerPageName='promotionImageOnAlbums';
        currentPromotionIndex = 0;
        promotionStartFlag = true;
        DNB.app.getController('Events').FilterPromotions();
        console.log(promotionsData);
        
        if(!promotionFlag){
                 DNB.app.getController('Events').ShowPromotions(currentPromotionIndex,currentBannerPageName);
            }

    },

    onEventImageInGalleryDetailPageTap: function(image, e, eOpts) {

            Ext.getCmp('GalleryImageContainer').hide();
            Ext.getCmp('GalleryContainer').show();
    },

    onSaveTap: function(button, e, eOpts) {
        Ext.Viewport.setMasked({xtype:'loadmask',message:'Saving image...'});
        cordova.plugins.imgDownloader.downloadWithUrl(currentGalleryImageURL,
            function(){
                alert('',"Image saved successfully.");
                Ext.Viewport.setMasked(false);
            },function(){
                alert('',"error");
                Ext.Viewport.setMasked(false);
            });
        Ext.getCmp('ActionImageSheet').hide();
    },

    onCancelTap: function(button, e, eOpts) {
        Ext.getCmp('ActionImageSheet').hide();
    },

    onGoLiveActivate: function(newActiveItem, container, oldActiveItem, eOpts) {
        DNB.app.getController('Events').StopAudioPlayer();
        if(isLogin==false){
            loginPageOpenFrom='GoLiveTab';
            if(Ext.getCmp('Login'))
                Ext.getCmp('Login').show();
            else
                Ext.Viewport.add({xtype:'login'}).show();
            Ext.getCmp('DNBView').hide();
        }
        else{
            Ext.getCmp('EventList').show();
            if(Ext.getCmp('EventComment'))
                Ext.getCmp('EventComment').hide();

            //to promotions
            currentBannerPageName='promotionImageOnGoLive';
            currentPromotionIndex = 0;
             promotionStartFlag = true;
            // DNB.app.getController('Events').GetNotices();
            DNB.app.getController('Events').FilterPromotions();
            console.log(promotionsData);
            if(!promotionFlag){
                 DNB.app.getController('Events').ShowPromotions(currentPromotionIndex,currentBannerPageName);
            }
        }
    },

    onSettingsActivate: function(newActiveItem, container, oldActiveItem, eOpts) {

        DNB.app.getController('Events').StopAudioPlayer();
        if(isLogin==false){
            loginPageOpenFrom='SettingsTab';
            if(Ext.getCmp('Login'))
                Ext.getCmp('Login').show();
            else
                Ext.Viewport.add({xtype:'login'}).show();
            Ext.getCmp('DNBView').hide();
            return;
        }
        else{
            DNB.app.getController('Settings').FillSettingsInfo();
        }
    }

});