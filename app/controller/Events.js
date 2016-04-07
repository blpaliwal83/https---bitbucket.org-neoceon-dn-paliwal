/*
 * File: app/controller/Events.js
 *
 * Do NOT hand edit this file.
 */
Ext.define('DNB.controller.Events', {
    extend: 'Ext.app.Controller',
    config: {},
    init: function(application) {
        application.on([{
            event: 'loadAllNotices',
            fn: this.onLoadAllNotices,
            scope: this
        }
        , {
            event: 'loadHotFive',
            fn: this.onLoadHotFive,
            scope: this
        }
        ,{
            event: 'loadMyNotices',
            fn: this.onLoadMyNotices,
            scope: this
        }
        ,{
            event: 'loadAllPromotions',
            fn: this.onLoadAllPromotions,
            scope: this
        }
        ,{
            event: 'loadNoticeCategories',
            fn: this.onLoadNoticeCategories,
            scope: this
        }
        ]);
    },
    onLoadAllNotices: function(response) {
        // debugger 
        Ext.Viewport.setMasked(false);
        var data = response;
        var notices = [];
        EventsData = data;
        // hogiveNoticesAllData = [];
        if (data.length > 0) {
            //===================================================
            var otherEvents = [];
            // var hotFive =  [];

            var d = new Date(); //m/d/y
            // var m = d.getMonth()+1;
            var m = d.getMonth();
            var y = d.getFullYear();
            var day = d.getDate();
            var obj = day + '_' + (m + 1) + '_' + y;
            //alert(d);
            //var NoticesSearchStoreData=[];
            for (var i = 0; i < data.length; i++) {

                
                notices.push(data[i].Notice);
                notices[i].total_likes = data[i].Like.length;
                EventsData[i].Notice.total_likes = data[i].Like.length;
                notices[i].total_comments = data[i].Comment.length;
                EventsData[i].Notice.total_comments = data[i].Comment.length;
                notices[i].total_favorites = data[i].Favorite.length;
                EventsData[i].Notice.total_favorites = data[i].Favorite.length;
                notices[i].total_views = data[i].NoticeView.length;
                EventsData[i].Notice.total_views = data[i].NoticeView.length;
                if (isLogin && data[i].Like.length > 0) {
                    for (var j = 0; j < data[i].Like.length; j++) {
                        if (data[i].Like[j].user_id == localStorage.getItem('userid')) {
                            notices[i].isLike = 'yes';
                            break;
                        }
                    }
                } else {
                    notices[i].isLike = 'no';
                }
                //
                var categoryIds = '';
                if (data[i].NoticeCategory.length > 0) {
                    for (var j = 0; j < data[i].NoticeCategory.length; j++) {
                        categoryIds = data[i].NoticeCategory[j].categorie_id ;
                    }
                    EventsData[i].Notice.categoryIds = categoryIds;
                } else {
                    EventsData[i].Notice.categoryIds = '';
                }

                
                

                if (catSelectedList.length > 0) {
                           
                                for (j = 0; j < catSelectedList.length; j++) {
                                    if (EventsData[i].Notice.categoryIds == catSelectedList[j] ) {
                                        var start = new Date(EventsData[i].Notice.start_date);
                                        var end = new Date(EventsData[i].Notice.end_date);
                                        var startD = start.getDate() + '_' + (start.getMonth() + 1) + '_' + start.getFullYear();
                                        var endD = end.getDate() + '_' + (end.getMonth() + 1) + '_' + end.getFullYear();
                                        if ((d >= start || (obj == startD)) && (d <= end || obj == endD)) {
                                           
                                                otherEvents.push(EventsData[i].Notice);
                                                
                                        }
                                    }
                                } //eo for catSelectedList
                } //eo if
                else {
                        var start = new Date(EventsData[i].Notice.start_date);
                        var end = new Date(EventsData[i].Notice.end_date);
                        var startD = start.getDate() + '_' + (start.getMonth() + 1) + '_' + start.getFullYear();
                        var endD = end.getDate() + '_' + (end.getMonth() + 1) + '_' + end.getFullYear();

                        if ((d >= start || (obj == startD)) && (d <= end || obj == endD)) {
                            otherEvents.push(EventsData[i].Notice);
                            
                        }

                }
                
               
               storage.WebSql.updateNoticeDetailTableById(data[i].Notice.id,JSON.stringify(data[i]));
                NoticesSearchStoreData.push({
                    id: data[i].Notice.id,
                    title: data[i].Notice.title,
                    flyer: data[i].Notice.flyer,
                    categoryIds: categoryIds,
                    description: data[i].Notice.id.description,
                    venu_detail: data[i].Notice.venu_detail,
                    city: data[i].Notice.city,
                    state: data[i].Notice.state,
                    zip: data[i].Notice.zip,
                    time_from: data[i].Notice.time_from,
                    time_to: data[i].Notice.time_to,
                    hot_five: data[i].Notice.hot_five,
                    start_date: data[i].Notice.start_date,
                    end_date: data[i].Notice.end_date,
                    website: data[i].Notice.website,
                    user_id: data[i].Notice.user_id
                });
            }


            Ext.getStore('OtherNoticesStore').setData(otherEvents);
            Ext.getStore('NoticesStore').setData(otherEvents);
            Ext.getStore('EventGalleryStore').setData(otherEvents);
            this.addItemInCarouselOnHomePage(home_cr, otherEvents);
        } else {

        }
    },
    onLoadHotFive: function(response) {
        Ext.Viewport.setMasked(false);
        var data = response ;
         hogiveNoticesAllData = [];
        if (data.length > 0) {
            var hotFive = [];
            
            for (var i = 0; i < data.length; i++) {
                
                  if (catSelectedList.length > 0) {
                                for (j = 0; j < catSelectedList.length; j++) {
                                    
                                    if (data[i].NoticeCategory[0].categorie_id == catSelectedList[j]) {
                                        hotFive.push(data[i].Notice); 
                                    }
                                } //eo for catSelectedList
                } //eo if
                else{
                     hotFive.push(data[i].Notice);
                }
               
                hogiveNoticesAllData.push(data[i]);
            } //eo for
            Ext.getStore('HotFiveNoticesStore').setData(hotFive);
            this.addItemInCarouselOnHomePage(home_hotfive_cr, hotFive);
        } else {
            //alert('No notice available.');
        }
    },
    onLoadMyNotices : function(response) {
        console.log('onMyNoticesSuccess');
        listcontainer = lc;
        var data = response;
        var tempNotice = [];
        if (listcontainer.indexOf('RSVPNoticesPanel') >= 0) {
            var d = currentRSVPSearchDate; //new Date();//m/d/y
            var m = d.getMonth();
            var y = d.getFullYear();
            var day = d.getDate();
            var obj = day + '_' + (m + 1) + '_' + y;
            for (var i = 0; i < data.length; i++) {
                if (data[i].NoticeAttend.length > 0) {
                    for (var j = 0; j < data[i].NoticeAttend.length; j++) {
                        if (data[i].NoticeAttend[j].user_id == localStorage.getItem('userid')) {
                            // console.log(data[i].Notice.title);
                            //RSVP event
                            var start = new Date(data[i].Notice.start_date);
                            var end = new Date(data[i].Notice.end_date);
                            var startD = start.getDate() + '_' + (start.getMonth() + 1) + '_' + start.getFullYear();
                            var endD = end.getDate() + '_' + (end.getMonth() + 1) + '_' + end.getFullYear();
                            if ((d >= start || (obj == startD)) && (d <= end || obj == endD)) {
                                tempNotice.push(data[i].Notice);
                            }
                            break;
                        }
                    }
                }
            }
            Ext.getCmp('MyProfileContainer').setData({
                userimage: localStorage.getItem('image'),
                username: localStorage.getItem('username'),
                message: localStorage.getItem('usermessage'),
                totalvalues: tempNotice.length
            });
            this.addItemInCarouselOnMyZonePage(rsvp_cr, tempNotice);
        } else if (listcontainer.indexOf('FavoriteNoticesPanel') >= 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].Favorite.length > 0) {
                    for (var j = 0; j < data[i].Favorite.length; j++) {
                        if (data[i].Favorite[j].user_id == localStorage.getItem('userid')) {
                            tempNotice.push(data[i].Notice);
                            break;
                        }
                    }
                }
            }
            Ext.getCmp('MyProfileFavoriteContainer').setData({
                userimage: localStorage.getItem('image'),
                username: localStorage.getItem('username'),
                message: localStorage.getItem('usermessage'),
                totalvalues: tempNotice.length
            });
            this.addItemInCarouselOnMyZonePage(fav_cr, tempNotice);
        } else if (listcontainer.indexOf('MyNoticesPanel') >= 0) {
            for (var i = 0; i < data.length; i++) {
                tempNotice.push(data[i].Notice);
            }
            Ext.getCmp('MyProfileMyNoticesContainer').setData({
                userimage: localStorage.getItem('image'),
                username: localStorage.getItem('username'),
                message: localStorage.getItem('usermessage'),
                totalvalues: tempNotice.length
            });
            this.addItemInCarouselOnMyZonePage(my_cr, tempNotice);
        }
        Ext.getStore('MyNoticesStore').setData(tempNotice);
        Ext.Viewport.setMasked(false);
    },
    onLoadAllPromotions: function(response) {
        var data = response;
                if (data.length > 0) {
                    promotionsData = [];
                    promotionsAllData = [];
                    promotionsHotFiveData = [];
                    for (var i = 0; i < data.length; i++) {
                        var promotionCategory = '';
                        //to show promotion only for selected category
                        if (data[i].PromotionCategory.length > 0) {
                            for (j = 0; j < data[i].PromotionCategory.length; j++) {
                                promotionCategory += ',:' + data[i].PromotionCategory[j].categorie_id + ':';
                            }
                        }
                        data[i].Promotion.promotionCategory = promotionCategory;
                        promotionsData.push(data[i].Promotion);
                        promotionsAllData.push(data[i]);
                        if (data[i].Promotion.hot_five == '1' || data[i].Promotion.hot_five == 1) {
                            promotionsHotFiveData.push(data[i].Promotion);
                        }
                    }
                    Ext.getStore('PromotionsStore').setData(promotionsData);
                }
       
    },
    onLoadNoticeCategories : function(response) {
        // console.log('Category')
        // console.log(response);
        // debugger
        // catSelectedList=[];
        noticesCategoryListData = response[0];
        if(noticesCategoryListData.length>0 && userSelectedCategories.length>0){
            for(var i=0;i<noticesCategoryListData.length;i++){
                for(var j=0; j<userSelectedCategories.length; j++){
                    if(noticesCategoryListData[i].id==userSelectedCategories[j]){
                        noticesCategoryListData[i].isSelected='yes';
                        // catSelectedList.push(noticesCategoryListData[i].id);
                    }
                }
            }
        }

    categoryListData = noticesCategoryListData;
    Ext.getStore('EventCategoryStore').setData(noticesCategoryListData);
        

    },
    GetNoImageUrl: function(img) {
        img.src = 'resources/images/noImage.jpg';
    },

    GetUserImageUrl: function(img){
        img.src = 'resources/images/default-user.png';
    },
    ShowEventDetail: function(eventInfo) {
        console.log(eventInfo);
    },
    fnShowGallery: function(eventId, GalleryList) {
        Ext.getCmp('GalleryPanel').removeAll();
        if (GalleryList.length > 0) {
            var tempArray = [];
            var iCount = 0;
            var loaderCount = 0;
            for (var i = 0; i < GalleryList.length; i++) {
                iCount++;
                loaderCount++;
                tempArray.push({
                    xtype: 'panel',
                    layout: 'vbox',
                    width: '33.3%',
                    labelCls: 'x-button-label x-button-label-left',
                    items: [{
                        xtype: 'image',
                        cls: 'categoryBTN',
                        src: imageBaseUrl + GalleryList[i].url,
                        value: GalleryList[i].title,
                        width: '100%',
                        height: 100,
                        id: GalleryList[i].id,
                        listeners: {
                            tap: {
                                fn: function() {
                                    fnShowEventImageInGalleryDetailPage(this);
                                }
                            },
                            load: {
                                fn: function() {
                                    if (loaderCount == GalleryList.length) {
                                        setTimeout(function() {
                                            Ext.Viewport.setMasked(false);
                                        });
                                    }
                                }
                            },
                            error: {
                                fn: function(image, e, eOpts) {
                                    if (loaderCount == GalleryList.length) Ext.Viewport.setMasked(false);
                                    DNB.app.getController("Events").GetNoImageUrl(this);
                                }
                            }
                        }
                    }],
                    listeners: {
                        tap: {
                            fn: function() {
                                fnShowEventImageInGalleryDetailPage(this);
                            }
                        }
                    }
                });
                if (iCount == 3) {
                    iCount = 0;
                    Ext.getCmp('GalleryPanel').add({
                        xtype: 'panel',
                        layout: 'hbox',
                        width: '100%',
                        items: tempArray
                    });
                    tempArray = null;
                    tempArray = [];
                }
            } //eo for
            if (tempArray.length > 0) {
                iCount = 0;
                Ext.getCmp('GalleryPanel').add({
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    items: tempArray
                });
                tempArray = null;
                tempArray = [];
            }
        } else {
            Ext.Viewport.setMasked(false);
        }
        promotionsData = [];
        if (promotionsAllData.length > 0) {
            for (var i = 0; i < promotionsAllData.length; i++) {
                promotionsData.push(promotionsAllData[i].Promotion);
            }
        }
    },
    fnShowAlbums: function() {
        //show all images of selected event only
        var GalleryList = [];
        for (var i = 0; i < EventsData.length; i++) {
            GalleryList.push(EventsData[i].Notice);
        } //eo for
        console.log(GalleryList[0]);
        Ext.getStore('EventGalleryStore').setData(GalleryList);
    },
    GetNotices: function() {

        
        // window.navigator.geolocation.getCurrentPosition(function(position){
        //                             console.log(position.coords.latitude);
        //                             // alert(position.coords.longitude);
        //                     }, function(error){
        //                         console.log(error);
        //                         // alert(error)
        //                     },{enableHighAccuracy: true, timeout: 15000});

        var servicesController = DNB.app.getController('ServicesController');
        var successFunction = 'getAllNoticesSuccess';
        var failedFunction = 'getAllNoticesFailed';
        var params = {};
        servicesController.getAllNotices(params, successFunction, failedFunction);
    },
    GetHotFiveNotices: function() {
        var servicesController = DNB.app.getController('ServicesController');
        var successFunction = 'getHotiFiveNoticesSuccess';
        var failedFunction = 'getHotFiveNoticesFailed';
        var params = {};
        servicesController.getHotfive(params, successFunction, failedFunction);
    },
    GetCategories: function() {
        Ext.Ajax.request({
            url: DNB.util.Common.api.getNoticeCategories,
            success: function(res) {
                var data = Ext.decode(res.responseText).all_data[1];
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var Category = data[i]; //.Category;
                        categoryAllListData.push({
                            amount: Category.amount,
                            category_type: "N",
                            created: "2015-04-17 13:20:19",
                            description: "Item business category ",
                            id: Category.id,
                            isSelected: "no",
                            status: "1",
                            title: Category.title,
                            updated: "2015-05-11 14:34:23"
                        });
                        NotificationCategory.push({
                            amount: Category.amount,
                            id: Category.id,
                            isSelected: "no",
                            title: Category.title
                        });
                        // categoryListData.push({
                        //     amount: Category.amount,
                        //     id: Category.id,
                        //     isSelected: "no",
                        //     title: Category.title
                        // });
                        categorySearchListData.push({
                            amount: Category.amount,
                            id: Category.id,
                            isSelected: "no",
                            title: Category.title
                        });
                    }
                    // Ext.getStore('EventCategoryStore').setData(categoryListData);
                    Ext.getStore('EventCategorySearchStore').setData(categorySearchListData);
                    Ext.getStore('NotificationCategoryMultiSelectStore').setData(NotificationCategory);
                }
            },
            failure: function(res) {
                Ext.Msg.alert('', 'Internet is not available.');
            }
        });
    },
    GetFreeLocations: function() {

        Ext.Ajax.request({
            url: DNB.util.Common.api.getFreeLocations,
            success: function(res) {
                // debugger
                var data = Ext.decode(res.responseText).Result;
                if (data.length > 0) {
                    DNB.util.Common.freeLocations = [];
                    for (var i = 0; i < data.length; i++) {
                        DNB.util.Common.freeLocations.push(data[i].Location);
                    }
                    Ext.getStore('FreeLocationsStore').setData(DNB.util.Common.freeLocations);
                }
            },
            failure: function(res) {
                Ext.Msg.alert('', 'Internet is not available.');
            }
        });
    },
    GetNoticesCategories: function() {
        var servicesController = DNB.app.getController('ServicesController');
        
        var params = {};
        servicesController.getNoticesCategories(params);
        
    },
    GetPromotionsCategories: function() {
        Ext.Ajax.request({
            url: DNB.util.Common.api.getPromotionCategories,
            success: function(res) {
                var res = Ext.decode(res.responseText).all_data;
                var data = res[1];
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var Category = data[i];
                        promotionsCategoryListData.push({
                            amount: Category.amount,
                            category_type: "N",
                            created: "2015-04-17 13:20:19",
                            description: "Item business category ",
                            id: Category.id,
                            isSelected: "no",
                            status: "1",
                            title: Category.title,
                            updated: "2015-05-11 14:34:23"
                        });
                    }
                }
                if (res[2].UploadSetting) {
                    if (res[2].UploadSetting.type == 'aud') {
                        promotionUploadSetting.audio = res[2].UploadSetting;
                    } else {
                        promotionUploadSetting.image = res[2].UploadSetting;
                    }
                }
                if (res[3].UploadSetting) {
                    if (res[3].UploadSetting.type == 'aud') {
                        promotionUploadSetting.audio = res[3].UploadSetting;
                    } else {
                        promotionUploadSetting.image = res[3].UploadSetting;
                    }
                }
                promotionUploadSetting.audio.formatemsg = promotionUploadSetting.audio.formate;
                if (promotionUploadSetting.audio.formate.indexOf(',') >= 0) {
                    var tempAudio = promotionUploadSetting.audio.formate.split(',');
                    var tempStr = '';
                    for (var i = 0; i < tempAudio.length; i++) {
                        tempStr += ',:' + tempAudio[i] + ':';
                    }
                    promotionUploadSetting.audio.formate = tempStr;
                } else {
                    promotionUploadSetting.audio.formate = ':' + promotionUploadSetting.audio.formate + ':';
                }
                promotionUploadSetting.image.formatemsg = promotionUploadSetting.image.formate;
                if (promotionUploadSetting.image.formate.indexOf(',') >= 0) {
                    var tempImage = promotionUploadSetting.image.formate.split(',');
                    var tempStr = '';
                    for (var i = 0; i < tempImage.length; i++) {
                        tempStr += ',:' + tempImage[i] + ':';
                    }
                    promotionUploadSetting.image.formate = tempStr;
                } else {
                    promotionUploadSetting.image.formate = ':' + promotionUploadSetting.image.formate + ':';
                }
                Ext.getStore('PromotionsCategoryStore').setData(promotionsCategoryListData);
            },
            failure: function(res) {
                Ext.Msg.alert('', 'Internet is not available.');
            }
        });
    },
    GetEventCommentList: function(id) {
        Ext.Ajax.request({
            url: DNB.util.Common.api.getCommentsByNoticeId(id),
            success: function(res) {
                var data = Ext.decode(res.responseText);
                console.log(data);
                var eventCommentData = [];
                if (data.Comment != null && data.Comment.length > 0) {
                    Ext.getStore('NoticeCommentStore').setData(data.Comment);
                } else {
                    Ext.getStore('NoticeCommentStore').setData([]);
                }
            },
            failure: function(res) {
                Ext.Msg.alert('', 'Internet is not available.');
            }
        });
    },
    GetPromotions: function() {
        var servicesController = DNB.app.getController('ServicesController');
        
        var params = {};
        servicesController.getPromotions(params);
        // Ext.Ajax.request({
        //     url: DNB.util.Common.api.getAllPromotions,
        //     success: function(res) {
        //         var data = Ext.decode(res.responseText).response_data;
        //         if (data.length > 0) {
        //             promotionsData = [];
        //             promotionsAllData = [];
        //             promotionsHotFiveData = [];
        //             for (var i = 0; i < data.length; i++) {
        //                 var promotionCategory = '';
        //                 //to show promotion only for selected category
        //                 if (data[i].PromotionCategory.length > 0) {
        //                     for (j = 0; j < data[i].PromotionCategory.length; j++) {
        //                         promotionCategory += ',:' + data[i].PromotionCategory[j].categorie_id + ':';
        //                     }
        //                 }
        //                 data[i].Promotion.promotionCategory = promotionCategory;
        //                 promotionsData.push(data[i].Promotion);
        //                 promotionsAllData.push(data[i]);
        //                 if (data[i].Promotion.hot_five == '1') {
        //                     promotionsHotFiveData.push(data[i].Promotion);
        //                 }
        //             }
        //             Ext.getStore('PromotionsStore').setData(promotionsData);
        //         }
        //     },
        //     failure: function(res) {
        //         Ext.Msg.alert('', 'Internet is not available.');
        //     }
        // });
    },
    GetPromotionsByUser: function() {
        Ext.Ajax.request({
            url: DNB.util.Common.api.getPromotionsByUserId(localStorage.getItem('userid')),
            success: function(res) {
                var data = Ext.decode(res.responseText).Promotions;
                console.log(data);
                var temp = [];
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        temp.push(data[i].Promotion);
                    }
                    Ext.getStore('PromotionsStore').setData(temp);
                }
                Ext.getCmp('MyProfileMyPromotionsContainer').setData({
                    userimage: localStorage.getItem('image'),
                    username: localStorage.getItem('username'),
                    message: localStorage.getItem('usermessage'),
                    totalvalues: data.length
                });
                var items = [];
                if(temp.length<0){
                    return;
                }
                promotion_cr.removeAll();
                for (var i = 0; i < temp.length; i++) {
                    imgAdr = imageBaseUrl + temp[i].image;
                    items.push({
                xtype: 'panel',
                cls: 'carousel-item-cls',
                data: temp[i],
                // name : 'carousel-name',
                items: [{
                    xtype: 'image',
                    cls: 'carosel-item-edit-cls',
                    name: 'carouselCloseIcon',
                    hidden: true
                }, {
                    xtype: 'image',
                    src: imgAdr,
                    cls: 'carousel-item-image-cls carousel_tint tint'
                }, {
                    xtype: 'panel',
                    cls: 'notice-details-panel-cls',
                    layout: {
                        type: 'vbox',
                        align: 'start',
                        pack: 'center'
                    },
                    items: [{
                        xtype: 'label',
                        cls: 'notice-details-label-cls',
                        html: temp[i].title
                    }, 
                    {
                        xtype: 'button',
                        text : temp[i].to,
                        ui: 'plain',
                        cls: 'notice-details-date-cls',
                        labelCls: 'notice-details-date-label-cls',
                        iconCls: 'notice-details-calander-icon-cls'

                    },
                    {
                        xtype: 'button',
                        text : temp[i].city,
                        ui: 'plain',
                        cls: 'notice-details-location-cls',
                        labelCls: 'notice-details-location-label-cls',
                        iconCls: 'notice-details-map-icon-cls'

                    }
                    // ,{
                    //     xtype: 'panel',
                    //     layout: 'hbox',
                    //     style: 'margin: 6px 0 4px 0;',
                    //     items: [{
                    //         xtype: 'image',
                    //         cls: 'notice-details-calander-icon-cls'
                    //     }, {
                    //         xtype: 'label',
                    //         cls: 'notice-details-date-cls',
                    //         html: events[i].end_date
                    //     }
                    //     ]
                    // }, {
                    //     xtype: 'panel',
                    //     layout: 'hbox',
                    //     items: [{
                    //         xtype: 'image',
                    //         cls: 'notice-details-map-icon-cls'
                    //     }, {
                    //         xtype: 'label',
                    //         cls: 'notice-details-location-cls',
                    //         html: events[i].city
                    //     }]
                    // }
                     ]
                }]
            })
        }

                //     items.push({
                //         xtype: 'panel',
                //         cls: 'carousel-item-cls',
                //         data: temp[i],
                //         // name : 'carousel-name',
                //         items: [{
                //             xtype: 'image',
                //             cls: 'carosel-item-edit-cls',
                //             name: 'carouselCloseIcon',
                //             hidden: true
                //         }, 

                //         {
                //             xtype: 'image',
                //             src: imgAdr,
                //             cls: 'carousel-item-image-cls carousel_tint tint'
                //         }, {
                //             xtype: 'panel',
                //             cls: 'notice-details-panel-cls',
                //             layout: {
                //                 type: 'vbox',
                //                 align: 'center',
                //                 pack: 'center'
                //             },
                //             items: [{
                //                 xtype: 'label',
                //                 cls: 'notice-details-label-cls',
                //                 html: temp[i].title
                //             }, 
                //             {
                //                 xtype: 'button',
                //                 text : temp[i].to,
                //                 ui: 'plain',
                //                 cls: 'notice-details-date-cls',
                //                 labelCls: 'notice-details-date-label-cls',
                //                 iconCls: 'notice-details-calander-icon-cls'

                //             },
                //             {
                //                 xtype: 'button',
                //                 text : temp[i].venu_detail,
                //                 ui: 'plain',
                //                 cls: 'notice-details-location-cls',
                //                 labelCls: 'notice-details-location-label-cls',
                //                 iconCls: 'notice-details-map-icon-cls'

                //             }
                //             // {
                //             //     xtype: 'panel',
                //             //     layout: 'hbox',
                //             //     style: 'margin: 6px 0 4px 0;',
                //             //     items: [{
                //             //         xtype: 'image',
                //             //         cls: 'notice-details-calander-icon-cls'
                //             //     }, {
                //             //         xtype: 'label',
                //             //         cls: 'notice-details-date-cls',
                //             //         html: 'address'
                //             //     }]
                //             // }, {
                //             //     xtype: 'panel',
                //             //     layout: 'hbox',
                //             //     items: [{
                //             //         xtype: 'image',
                //             //         cls: 'notice-details-map-icon-cls'
                //             //     }, {
                //             //         xtype: 'label',
                //             //         cls: 'notice-details-location-cls',
                //             //         html: 'address'
                //             //     }]
                //             // }
                //              ]
                //         }
                //         ]
                //     });
                // }
                promotion_cr.setItems(items);
                promotion_cr.setActiveItem(0);
            },
            failure: function(res) {
                Ext.Msg.alert('', 'Internet is not available.');
            }
        });
    },
    GetMyNotices: function(url, listcontainer) {
        Ext.Viewport.setMasked({xtype:'loadmask',message:'Loading'});
        lc = listcontainer;
        var servicesController = DNB.app.getController('ServicesController');
        var successFunction = 'getMyNoticesSuccess';
        var failedFunction = 'getMyNoticesFailed';
        servicesController.getMyNotices(url, successFunction, failedFunction);
    },
    ShowPromotions: function(start, bannerName) {
        console.log(bannerName);

        
        if (!isBannerActive) {
            promotionFlag = false;
            return;
        }

        if (!promotionStartFlag ) {
            promotionFlag = false;
            return;
        }

        promotionFlag = true;
        if (start == 0) currentPromotionIndex = 0;
        if (Ext.getCmp(bannerName)) {
            if (promotionsData.length == currentPromotionIndex) {
                currentPromotionIndex = 0;
            }
            if (promotionsData.length > 0) {
                Ext.getCmp(bannerName).setSrc(imageBaseUrl + promotionsData[currentPromotionIndex].image);
            }
            currentPromotionIndex++;           
            setTimeout(function() {
                DNB.app.getController('Events').ShowPromotions(currentPromotionIndex, currentBannerPageName);

            }, 5000);
           
        }
    },
    ShowLoader: function() {
        if (Ext.getCmp('ExtJsLoader')) Ext.getCmp('ExtJsLoader').show();
        else Ext.Viewport.add({
            xtype: 'extjsloader'
        }).show();
        var timeCount = 1;
        var fixedColor = 'Gray';
        var loaderColor = 'White';
        loaderTimer = setInterval(function() {
            switch (timeCount) {
                case 1:
                    Ext.getCmp('ExtJsLoader').setData({
                        One: loaderColor,
                        Two: fixedColor,
                        Three: fixedColor,
                        Four: fixedColor,
                        Five: fixedColor,
                        Six: fixedColor,
                        Seven: fixedColor,
                        Eight: fixedColor,
                        Nine: fixedColor,
                        Ten: fixedColor
                    });
                    timeCount++;
                    break;
                case 2:
                    Ext.getCmp('ExtJsLoader').setData({
                        One: fixedColor,
                        Two: loaderColor,
                        Three: fixedColor,
                        Four: fixedColor,
                        Five: fixedColor,
                        Six: fixedColor,
                        Seven: fixedColor,
                        Eight: fixedColor,
                        Nine: fixedColor,
                        Ten: fixedColor
                    });
                    timeCount++;
                    break;
                case 3:
                    Ext.getCmp('ExtJsLoader').setData({
                        One: fixedColor,
                        Two: fixedColor,
                        Three: loaderColor,
                        Four: fixedColor,
                        Five: fixedColor,
                        Six: fixedColor,
                        Seven: fixedColor,
                        Eight: fixedColor,
                        Nine: fixedColor,
                        Ten: fixedColor
                    });
                    timeCount++;
                    break;
                case 4:
                    Ext.getCmp('ExtJsLoader').setData({
                        One: fixedColor,
                        Two: fixedColor,
                        Three: fixedColor,
                        Four: loaderColor,
                        Five: fixedColor,
                        Six: fixedColor,
                        Seven: fixedColor,
                        Eight: fixedColor,
                        Nine: fixedColor,
                        Ten: fixedColor
                    });
                    timeCount++;
                    break;
                case 5:
                    Ext.getCmp('ExtJsLoader').setData({
                        One: fixedColor,
                        Two: fixedColor,
                        Three: fixedColor,
                        Four: fixedColor,
                        Five: loaderColor,
                        Six: fixedColor,
                        Seven: fixedColor,
                        Eight: fixedColor,
                        Nine: fixedColor,
                        Ten: fixedColor
                    });
                    timeCount++;
                    break;
                case 6:
                    Ext.getCmp('ExtJsLoader').setData({
                        One: fixedColor,
                        Two: fixedColor,
                        Three: fixedColor,
                        Four: fixedColor,
                        Five: fixedColor,
                        Six: loaderColor,
                        Seven: fixedColor,
                        Eight: fixedColor,
                        Nine: fixedColor,
                        Ten: fixedColor
                    });
                    timeCount++;
                    break;
                case 7:
                    Ext.getCmp('ExtJsLoader').setData({
                        One: fixedColor,
                        Two: fixedColor,
                        Three: fixedColor,
                        Four: fixedColor,
                        Five: fixedColor,
                        Six: fixedColor,
                        Seven: loaderColor,
                        Eight: fixedColor,
                        Nine: fixedColor,
                        Ten: fixedColor
                    });
                    timeCount++;
                    break;
                case 8:
                    Ext.getCmp('ExtJsLoader').setData({
                        One: fixedColor,
                        Two: fixedColor,
                        Three: fixedColor,
                        Four: fixedColor,
                        Five: fixedColor,
                        Six: fixedColor,
                        Seven: fixedColor,
                        Eight: loaderColor,
                        Nine: fixedColor,
                        Ten: fixedColor
                    });
                    timeCount++;
                    break;
                case 9:
                    Ext.getCmp('ExtJsLoader').setData({
                        One: fixedColor,
                        Two: fixedColor,
                        Three: fixedColor,
                        Four: fixedColor,
                        Five: fixedColor,
                        Six: fixedColor,
                        Seven: fixedColor,
                        Eight: fixedColor,
                        Nine: loaderColor,
                        Ten: fixedColor
                    });
                    timeCount++;
                    break;
                case 10:
                    Ext.getCmp('ExtJsLoader').setData({
                        One: fixedColor,
                        Two: fixedColor,
                        Three: fixedColor,
                        Four: fixedColor,
                        Five: fixedColor,
                        Six: fixedColor,
                        Seven: fixedColor,
                        Eight: fixedColor,
                        Nine: fixedColor,
                        Ten: loaderColor
                    });
                    timeCount = 1;
                    break;
            }
        }, 1000);
    },
    HideLoader: function() {
        Ext.getCmp('ExtJsLoader').hide();
        clearInterval(loaderTimer);
    },
    ShowAudioPlayer: function(audiourl, image) {
        //Ext.getCmp('MainTabView').setActiveItem(0);
        //ShowHideHomePages('EventAudiosPlayerContainer');
        if (Ext.getCmp('EventAudiosContainer')) Ext.getCmp('EventAudiosContainer').hide();
        if (Ext.getCmp('EventAudiosPlayerContainer')) Ext.getCmp('EventAudiosPlayerContainer').show();
        Ext.getCmp('MediaPlayerPanel').setHeight(window.innerHeight - 100);
        Ext.getCmp('MediaPlayerPanel').setStyle({
            backgroundImage: 'url(' + imageBaseUrl + image + ')'
        });
        audiourl = audioBaseUrl + audiourl;
        //console.log(audiourl);
        /*Ext.getCmp('AudioPlayerPanel').removeAll();
        Ext.getCmp('AudioPlayerPanel').add({
            xtype: 'audio',
                                        //id: 'audiotest',
                                        url:audiourl,//'http://www.mfiles.co.uk/mp3-downloads/the-blue-danube-accomp.mp3',
                                        listeners: {
                                            painted: function() {alert('painted');
                                                this.play();
                                            }
                                        }

                                           });
        return;*/
        /////////////////////////////////////////////////////////////
        var MediaPlayButton = Ext.select('#MediaPlayButton').elements[0];
        MediaPlayButton.className = 'x-button x-iconalign-center x-button-action x-sized playbutton x-layout-box-item loading';
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading Audio'
        });
        //DNB.app.getController('Events').ShowLoader();
        isAudioPlaying = true;
        duration = 0;
        media = null;
        isStarted = false;
        isPaused = false;
        media = new Media(audiourl, function() {}, function() {
            Ext.Msg.alert('error');
            Ext.Viewport.setMasked(false);
            //DNB.app.getController('Events').HideLoader();
        });
        Ext.getCmp('MediaAudioSlider').setValue(0);
        media.play();
        setTimeout(function() {
            Ext.Viewport.setMasked(false);
            //DNB.app.getController('Events').HideLoader();
            duration = parseInt(media.getDuration()); //return duration of an audio file in seconds.
            Ext.getCmp('MediaAudioSlider').setMinValue(1);
            if (duration > 0) {
                Ext.getCmp('MediaAudioSlider').setMaxValue(duration);
            }
        }, 1000);
        clearInterval(mediaTimer);
        mediaTimer = setInterval(function() {
            // get media position
            media.getCurrentPosition(
                // success callback
                function(position) {
                    position = parseInt(position);
                    if (position > -1) {
                        isStarted = true;
                        console.log((position) + " sec");
                        Ext.getCmp('MediaAudioSlider').setValue(position);
                        if (duration == position) {
                            Ext.getCmp('MediaAudioSlider').setValue(1);
                            media.stop();
                            clearInterval(mediaTimer);
                            isAudioPlaying = false;
                            isStarted = false;
                            MediaPlayButton.className = 'x-button x-iconalign-center x-button-action x-sized playbutton x-layout-box-item play';
                        }
                    } else if (isStarted && !isPaused) {
                        isStarted = false;
                        Ext.getCmp('MediaAudioSlider').setValue(1);
                        media.stop();
                        clearInterval(mediaTimer);
                        isAudioPlaying = false;
                        isStarted = false;
                        MediaPlayButton.className = 'x-button x-iconalign-center x-button-action x-sized playbutton x-layout-box-item play';
                    }
                },
                // error callback
                function(e) {
                    //Ext.Viewport.setMasked(false);
                    console.log("Error getting pos=" + e);
                });
        }, 1000);
    },
    StopAudioPlayer: function() {
        var MediaPlayButton = Ext.select('#MediaPlayButton').elements[0];
        isStarted = false;
        isPaused = true;
        if (media) {
            media.pause();
        }
        isAudioPlaying = false;
        MediaPlayButton.className = 'x-button x-iconalign-center x-button-action x-sized playbutton x-layout-box-item play';
        clearInterval(mediaTimer);
    },
    FilterPromotions: function() {
        var promotionTempData = [];
        if (promotionCategorySelectedList.length > 0) {
            for (var k = 0; k < promotionsAllData.length; k++) {
                for (var j = 0; j < promotionCategorySelectedList.length; j++) {
                    if (promotionsAllData[k].Promotion.promotionCategory.indexOf(':' + promotionCategorySelectedList[j] + ':') >= 0) {
                        promotionTempData.push(promotionsAllData[k].Promotion);
                        break;
                    }
                }
            }
        } else {
            if (promotionsAllData.length > 0) {
                for (var i = 0; i < promotionsAllData.length; i++) {
                    promotionTempData.push(promotionsAllData[i].Promotion);
                }
            }
        }
        promotionsData = [];
        promotionsData = promotionTempData;
    },
    ShowPromotionOnEventDetail: function() {
        DNB.app.getController('Events').ShowPromotions(0, 'promotionImageOnDetail');
    },
    ShowPromotionPopup: function(bannerName) {        
        if(promotionsData.length>0){
            //PromotionImageOnPromotionPopup
            var index = currentPromotionIndex - 1;
            if (index == -1) index = 0;
            if (promotionsData.length == index) {
                index = index - 1;
            }
            currentPromotion = promotionsData[index];
            if (Ext.getCmp('Promotion')) Ext.getCmp('Promotion').show();
            else Ext.Viewport.add({
                xtype: 'promotion'
            }).show();
            var imageFullpath = imageBaseUrl + promotionsData[index].image;
            Ext.getCmp('PromotionImageOnPromotionPopup').setSrc(imageFullpath);
            console.log(promotionsData[index]);
            Ext.getCmp('PromotionName').setHtml(promotionsData[index].title);
            // currentPromotion = index;
        }else{
            Ext.Msg.alert('','No promotion is available.');
        }
    },
    showMyZonePromotionPopup : function(data,bannerName){
        console.log(data);
      

            if (Ext.getCmp('Promotion')) Ext.getCmp('Promotion').show();
            else Ext.Viewport.add({
                xtype: 'promotion'
            }).show();
            currentPromotion = data;
            var imageFullpath = imageBaseUrl + data.image;
            Ext.getCmp('PromotionImageOnPromotionPopup').setSrc(imageFullpath);
           
            Ext.getCmp('PromotionName').setHtml(data.title);
        

    },

    SetDateOnOtherEventButton: function(date) {
        // console.log('called this functions');
        currentSearchDate = date;
        var d = date;
        var m = monthNames[d.getMonth()];
        var y = d.getFullYear();
        var day = d.getDate();
        var imgTag = '<img src="resources/images/calendar-white-icon.png">';
        var img = '<div class="dateimg">' + imgTag + '</div>';
        var padding = (deviceName == 'tablet' ? '40%' : '5%');
        var dateText = '<div class="homedate">' + m + ' ' + day + ', ' + y + '</div>';
        //Ext.getCmp('OtherEventSearchByDateButton').setText(imgTag+m+' '+day+', '+y);;
        Ext.getCmp('OtherEventSearchByDateButton').setText(img + dateText);

    },
    CloseCalendar: function() {
        isCalendaralreadyOpen = false;
        if (Ext.getCmp('Calendar')) Ext.getCmp('Calendar').hide();
    },
    SetDateOnRSVPEventSearchByDateButton: function(date) {
        var d = date;
        var m = monthNames[d.getMonth()];
        var y = d.getFullYear();
        var day = d.getDate();
        var imgTag = '<img src="resources/images/calendar-white-icon.png">';
        var img = '<div style="width: 14px;float: left;">' + imgTag + '</div>';
        var padding = (deviceName == 'tablet' ? '40%' : '5%');
        var dateText = '<div style="margin-left:15px;float: left;">' + m + ' ' + day + ', ' + y + '</div>';
        //Ext.getCmp('RSVPSearchByDateButton').setText(imgTag+m+' '+day+', '+y);
        // Ext.getCmp('RSVPSearchByDateButton').setText(img + dateText);

    },
    ShowMap: function(add) {
        // debugger;
        ShowHideHomePages('EventLocationMapContainer');
        Ext.getCmp('EventLocation').removeAll();
        Ext.getCmp('EventLocation').add({
            xtype: 'map',
            height: 450,
            itemId: 'EventLocationMap'
        });
        var map = Ext.getCmp('EventLocation').getComponent('EventLocationMap');
        var geocoder = new google.maps.Geocoder();
        map.setHeight(window.innerHeight - 100);
        var marker = new google.maps.Marker();
        // console.log(selectedEventDetail.Notice);
        address1 = selectedEventDetail.Notice.venu_detail + ', ' + selectedEventDetail.Notice.city + ', ' + selectedEventDetail.Notice.state + ', ' + selectedEventDetail.Notice.zip;
        address2 = selectedEventDetail.Notice.venu_detail;
        console.log(selectedEventDetail.Notice);
        var latlng = new google.maps.LatLng(selectedEventDetail.Notice.latitude, selectedEventDetail.Notice.longitude);
        geocoder.geocode({
            address: address2
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                addr = results[0].geometry.location;

                map.setMapCenter(addr);
                var icon = {
                                url: "resources/images/icon-map-blue.png", // url
                                scaledSize: new google.maps.Size(110, 150), // scaled size
                                origin: new google.maps.Point(0,0), // origin
                                anchor: new google.maps.Point(0, 0) // anchor
                            };

                var marker = new google.maps.Marker({icon : icon});
                marker.setMap(map.getMap());
                marker.setPosition(results[0].geometry.location);
                var infoWindow = new google.maps.InfoWindow();
                infoWindow.setContent(address2);
                infoWindow.open(map.getMap(), marker);
            }
        });
    },
    ShowHideHomePages: function( showPageName , pageFlag ) {
        console.log('======================================================')
        console.log(showPageName)
        console.log(eventDetailPageOpenFrom)
        console.log('pageFlag : '+pageFlag)
        if(pageFlag == 'MyZone'){
            console.log('in MyZone')
            if (Ext.getCmp('MainTabView')) Ext.getCmp('MainTabView').setActiveItem(1);
        }else if (pageFlag == 'GoLive') {
            if (Ext.getCmp('MainTabView')) Ext.getCmp('MainTabView').setActiveItem(3);
        }else {
            console.log('in else home')
            if (Ext.getCmp('MainTabView')) Ext.getCmp('MainTabView').setActiveItem(0);         
        }
        if (Ext.getCmp('HomeContainer')) Ext.getCmp('HomeContainer').hide();
        if (Ext.getCmp('EventDetailContainer')) Ext.getCmp('EventDetailContainer').hide();
        if (Ext.getCmp('EventLocationMapContainer')) Ext.getCmp('EventLocationMapContainer').hide();
        if (Ext.getCmp('EventVideosContainer')) Ext.getCmp('EventVideosContainer').hide();
        if (Ext.getCmp('EventVideoPlayerContainer')) Ext.getCmp('EventVideoPlayerContainer').hide();
        if (Ext.getCmp('EventAudiosContainer')) Ext.getCmp('EventAudiosContainer').hide();
        if (Ext.getCmp('EventAudiosPlayerContainer')) Ext.getCmp('EventAudiosPlayerContainer').hide();
        if (Ext.getCmp(showPageName)) Ext.getCmp(showPageName).show();
        
    },
    AddToCalendar: function() {


        // var start = new Date(selectedEventDetail.Notice.start_date);
        var end = new Date(selectedEventDetail.Notice.end_date);
       // var startDate = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0, 0, 0);
        var startDate = new Date(selectedEventDetail.Notice.start_date);
        var endDate   = new Date(end.getFullYear(),end.getMonth(),end.getDate(),0,0,0,0,0);

        eventCalendarName = 'Calendar';
        var title = selectedEventDetail.Notice.title;
        var loc = selectedEventDetail.Notice.venu_detail;
        var notes = ''; // 'My interesting Event notes.';

        //Comment By Nadeem
        // console.log('Start Date:' + selectedEventDetail.Notice.start_date);
        // // var startDate = new Date(selectedEventDetail.Notice.start_date);
        // var startDate = new Date(selectedEventDetail.Notice.start_date);

        // console.log(startDate);
        // var endDate = new Date(selectedEventDetail.Notice.end_date);
        // var calendarName = "Calendar";
        // // clean up the dates a bit
        // startDate.setMinutes(0);
        // endDate.setMinutes(0);
        // startDate.setSeconds(0);
        // endDate.setSeconds(0);
        // // add a few hours to the dates, JS will automatically update the date (+1 day) if necessary
        // startDate.setHours(startDate.getHours() + 2);
        // endDate.setHours(endDate.getHours() + 3);
        
        var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults
        calOptions.firstReminderMinutes = 120; // default is 60, pass in null for no reminder (alarm)
        calOptions.secondReminderMinutes = 5;
        // Added these options in version 4.2.4:
        calOptions.recurrence = "monthly"; // supported are: daily, weekly, monthly, yearly

        // calOptions.recurrenceEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 0, 0, 0, 0, 0); // leave null to add events into infinity and beyond
        calOptions.recurrenceEndDate = new Date(2017,10,1,0,0,0,0,0); // leave null to add events into infinity and beyond
        calOptions.calendarName = "Calendar"; //eventCalendarName"";// "MyCreatedCalendar"; // iOS only
        calOptions.calendarId = 1; // Android only, use id obtained from listCalendars() call which is described below. This will be ignored on iOS in favor of calendarName and vice versa. Default: 1.
        // And the URL can be passed since 4.3.2 (will be appended to the notes on Android as there doesn't seem to be a sep field)
        calOptions.url = "https://www.google.com";
        window.plugins.calendar.createEventWithOptions(title, loc, notes, startDate, endDate, calOptions, function(msg) {
            Ext.Msg.alert('', 'Notice added to calendar.');
        }, function(msg) {
            Ext.Msg.alert('', 'Calendar failure: ' + JSON.stringify(msg));
        });
    },
    ResetNoticeForm: function() {
        //alert('ResetNoticeForm');
        Ext.getCmp('EventNameOnEventPage').setValue('');
        // Ext.getCmp('EventLocationOnEventPage').setValue('');
        document.getElementById('locationField').value = '';
        Ext.getCmp('EventLocationCityOnEventPage').setValue('');
        Ext.getCmp('EventLocationStateOnEventPage').setValue('');
        Ext.getCmp('EventLocationZipOnEventPage').setValue('');
        //Ext.getCmp('EventLocationCountryOnEventPage').setValue('');
        Ext.getCmp('EventStartDate').setValue('');
        Ext.getCmp('EventEndDate').setValue('');
        Ext.getCmp('PayStatus').setValue(0);
        Ext.getCmp('EventStartTimeHour').setValue('H');
        Ext.getCmp('EventStartTimeMinute').setValue('M');
        Ext.getCmp('EventStartTimeAMPM').setValue('AM');
        Ext.getCmp('EventEndTimeHour').setValue('H');
        Ext.getCmp('EventEndTimeMinute').setValue('M');
        Ext.getCmp('EventEndTimeAMPM').setValue('AM');
        Ext.getCmp('VideoLinkUrls').setValue('');
        Ext.getCmp('EventHotFive').setValue(0);
        Ext.getCmp('NoticeSlot').setValue('');
        Ext.getCmp('EventPhone').setValue('');
        Ext.getCmp('EventEmail').setValue('');
        Ext.getCmp('EventWebsite').setValue('');
        Ext.getCmp('EventComments').setValue(0);
        Ext.getCmp('EventDescription').setValue('');
        Ext.getCmp('EventImageOnEventPage').setSrc('resources/images/addimage.PNG');
        Ext.getCmp('EventCategoryButton').setText(addImageIcon);
        selectedCategoryIDsToAdd = '';
        for (var i = 0; i < categoryDataToAdd.length; i++) {
            categoryDataToAdd[i].isSelected = 'no';
        }
        noticeImageBannerFILEURI = '';
        noticeImageFILEURI = '';
        noticeAudioFILEURI = '';
    },
    FillNoticeForm: function(id) {
        Ext.Ajax.request({
            url: DNB.util.Common.api.getNoticeById(id),
            success: function(res) {
                var res = Ext.decode(res.responseText);
                //console.log(res);
                selectedEventDetail = res.response_data;
                noticeLocationLat =selectedEventDetail.Notice.latitude ;
                noticeLocationLong = selectedEventDetail.Notice.longitude ;
                var categoryIds = '',
                    catTitle = '',
                    tempCat = [];
                selectedCategoryIDsToAdd = '';
                for (var i = 0; i < categoryDataToAdd.length; i++) {
                    categoryDataToAdd[i].isSelected = 'no';
                }
                if (selectedEventDetail.NoticeCategory.length > 0) {
                    for (var j = 0; j < selectedEventDetail.NoticeCategory.length; j++) {
                        categoryIds += ',:' + selectedEventDetail.NoticeCategory[j].categorie_id + ':';
                    }
                    selectedEventDetail.Notice.categoryIds = categoryIds;
                    for (var i = 0; i < categoryDataToAdd.length; i++) {
                        if (categoryIds.indexOf(':' + categoryDataToAdd[i].id + ':') >= 0) {
                            categoryDataToAdd[i].isSelected = 'yes';
                            catTitle = categoryDataToAdd[i].title;
                            tempCat.push(categoryDataToAdd[i].id);
                        }
                    }
                    selectedCategoryIDsToAdd = tempCat.join(',');
                    Ext.getStore('EventCategoryMultiSelectStore').setData(categoryDataToAdd);
                } else {
                    selectedEventDetail.Notice.categoryIds = '';
                    Ext.getStore('EventCategoryMultiSelectStore').setData(categoryDataToAdd);
                }
                //console.log(selectedEventDetail);
                isAlreadyAttendNotice = false;
                Ext.getCmp('EventImageOnEventPage').setSrc((selectedEventDetail.Notice.flyer == null || selectedEventDetail.Notice.flyer.length == 0) ? 'resources/images/noImage.jpg' : (imageBaseUrl + selectedEventDetail.Notice.flyer));
                Ext.getCmp('EventNameOnEventPage').setValue(selectedEventDetail.Notice.title);
                // Ext.getCmp('EventLocationOnEventPage').setValue(selectedEventDetail.Notice.venu_detail);
                document.getElementById('locationField').value = selectedEventDetail.Notice.venu_detail;
                Ext.getCmp('EventLocationCityOnEventPage').setValue(selectedEventDetail.Notice.city);
                Ext.getCmp('EventLocationStateOnEventPage').setValue(selectedEventDetail.Notice.state);
                Ext.getCmp('EventLocationZipOnEventPage').setValue(selectedEventDetail.Notice.zip);
                //Ext.getCmp('EventLocationCountryOnEventPage').setValue(selectedEventDetail.Notice.country);
                var dtStartDate = selectedEventDetail.Notice.start_date.split('-');
                Ext.getCmp('EventStartDate').setValue({
                    month: dtStartDate[1],
                    day: dtStartDate[2],
                    year: dtStartDate[0]
                });
                var dtEndDate = selectedEventDetail.Notice.end_date.split('-');
                Ext.getCmp('EventEndDate').setValue({
                    month: dtEndDate[1],
                    day: dtEndDate[2],
                    year: dtEndDate[0]
                });
                Ext.getCmp('PayStatus').setValue(selectedEventDetail.Notice.payment_status);
                var sTime = selectedEventDetail.Notice.time_from.split(':');
                Ext.getCmp('EventStartTimeHour').setValue(sTime[0]);
                Ext.getCmp('EventStartTimeMinute').setValue(sTime[1]);
                Ext.getCmp('EventStartTimeAMPM').setValue(sTime[2].indexOf(' ') >= 0 ? sTime[2].split(' ')[1] : 'AM');
                var eTime = selectedEventDetail.Notice.time_to.split(':');
                Ext.getCmp('EventEndTimeHour').setValue(eTime[0]);
                Ext.getCmp('EventEndTimeMinute').setValue(eTime[1]);
                Ext.getCmp('EventEndTimeAMPM').setValue(eTime[2].indexOf(' ') >= 0 ? eTime[2].split(' ')[1] : 'AM');
                Ext.getCmp('EventHotFive').setValue(selectedEventDetail.Notice.hot_five == 'Yes' ? 1 : 0);
                Ext.getCmp('NoticeSlot').setValue(selectedEventDetail.Notice.slot_no);
                Ext.getCmp('EventPhone').setValue(selectedEventDetail.Notice.phone_number);
                Ext.getCmp('EventEmail').setValue(selectedEventDetail.Notice.email);
                Ext.getCmp('EventWebsite').setValue(selectedEventDetail.Notice.website);
                Ext.getCmp('EventComments').setValue(selectedEventDetail.Notice.comment == 'yes' ? 1 : 0);
                Ext.getCmp('EventDescription').setValue(selectedEventDetail.Notice.description);
                Ext.getCmp('EventCategoryButton').setText(catTitle + addImageIcon);
                var GalleryList = [];
                var videos = [];
                noticeImages = [];
                for (j = 0; j < selectedEventDetail.Media.length; j++) {
                    if (selectedEventDetail.Media[j].type == 'I') {
                        GalleryList.push(selectedEventDetail.Media[j]);
                        noticeImages.push(selectedEventDetail.Media[j].url);
                    } else if (selectedEventDetail.Media[j].type == 'V') {
                        videos.push(selectedEventDetail.Media[j].url);
                    }
                } //media for
                //console.log(GalleryList);
                Ext.getCmp('VideoLinkUrls').setValue(videos.join(','));
                if (GalleryList.length > 0) {
                    Ext.getCmp('NoticeImagPanel').setHeight(150);
                    Ext.getStore('NoticeMediaStore').setData(GalleryList);
                } else {
                    Ext.getCmp('NoticeImagPanel').setHeight(50);
                    Ext.getCmp('EventImagesListPanel').hide();
                }
            },
            failure: function(res) {
                Ext.Msg.alert('', 'Internet is not available.');
            }
        });
    },
    ResetPromotionForm: function() {
        Ext.getCmp('PromotionTitle').setValue('');
        // Ext.getCmp('PromotionLocation').setValue('');
        document.getElementById('plocationField').value = '';
        Ext.getCmp('PromotionLocationCity').setValue('');
        Ext.getCmp('PromotionLocationState').setValue('');
        Ext.getCmp('PromotionLocationZip').setValue('');
        Ext.getCmp('PromotionFromDate').setValue('');
        Ext.getCmp('PromotionToDate').setValue('');
        Ext.getCmp('PromotionHotFive').setValue(0);
        Ext.getCmp('PromotionWebsite').setValue('');
        Ext.getCmp('PromotionImageAdd').setSrc('resources/images/addimage.PNG');
        Ext.getCmp('SelectCategoryButton').setText(addImageIcon);
        selectedCategoryIDsToAdd = '';
        for (var i = 0; i < categoryDataToAdd.length; i++) {
            categoryDataToAdd[i].isSelected = 'no';
        }
        promotionImageFILEURI = '';
        promotionAudioFILEURI = '';
    },
    FillPromotionForm: function(id) {
        Ext.Viewport.setMasked({xtype:'loadmask',message:'Loading Promotion Data'});
        Ext.Ajax.request({
            url: DNB.util.Common.api.getPromotionById(id),
            success: function(res) {
                Ext.Viewport.setMasked(false);
                console.log(res.responseText);
                var data = Ext.decode(res.responseText).response_data;
                selectedEditPromotion = data;
                Ext.getCmp('PromotionTitle').setValue(data.Promotion.title);

                // Ext.getCmp('PromotionLocation').setValue(data.Promotion.venu_detail);

                document.getElementById('plocationField').value = data.Promotion.venu_detail;
                
                Ext.getCmp('PromotionLocationCity').setValue(data.Promotion.city);
                Ext.getCmp('PromotionLocationState').setValue(data.Promotion.state);
                Ext.getCmp('PromotionLocationZip').setValue(data.Promotion.zip);
                var dtFrom = data.Promotion.from.split('-');
                Ext.getCmp('PromotionFromDate').setValue({
                    month: dtFrom[1],
                    day: dtFrom[2],
                    year: dtFrom[0]
                });
                var dtTo = data.Promotion.to.split('-');
                Ext.getCmp('PromotionToDate').setValue({
                    month: dtTo[1],
                    day: dtTo[2],
                    year: dtTo[0]
                });
                Ext.getCmp('PromotionHotFive').setValue(data.Promotion.hot_five); //=='Yes'?1:0)
                Ext.getCmp('PromotionWebsite').setValue(data.Promotion.website);
                Ext.getCmp('PromotionImageAdd').setSrc(imageBaseUrl + data.Promotion.image);
                // promotionImageFILEURI = imageBaseUrl + data.Promotion.image;
                Ext.getCmp('SelectCategoryButton').setText(addImageIcon);
                var categoryIds = '',
                    catTitle = '',
                    tempCat = [];
                selectedCategoryIDsToAdd = '';
                for (var i = 0; i < categoryDataToAdd.length; i++) {
                    categoryDataToAdd[i].isSelected = 'no';
                }
                if (data.PromotionCategory.length > 0) {
                    for (var j = 0; j < data.PromotionCategory.length; j++) {
                        categoryIds += ',:' + data.PromotionCategory[j].categorie_id + ':';
                    }
                    data.PromotionCategory.categoryIds = categoryIds;
                    for (var i = 0; i < categoryDataToAdd.length; i++) {
                        if (categoryIds.indexOf(':' + categoryDataToAdd[i].id + ':') >= 0) {
                            categoryDataToAdd[i].isSelected = 'yes';
                            catTitle = categoryDataToAdd[i].title;
                            tempCat.push(categoryDataToAdd[i].id);
                        }
                    }
                    selectedCategoryIDsToAdd = tempCat.join(',');
                    Ext.getStore('EventCategoryMultiSelectStore').setData(categoryDataToAdd);
                } else {
                    selectedEventDetail.Notice.categoryIds = '';
                    Ext.getStore('EventCategoryMultiSelectStore').setData(categoryDataToAdd);
                }
            },
            failure: function(res) {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('', 'Internet is not available.');
                Ext.getCmp('DNBView').show();
                Ext.getCmp('AddPromotion').hide();
            }
        });
    },
    SearchNoticesByCategoryandDate: function(type) {
        var me = this;
       
        var noticesData = [],
            nStr = [],
            hotFive = [];
        var d = currentSearchDate;
        var obj = currentSearchDate.getDate() + '_' + (currentSearchDate.getMonth()+1) + '_' + currentSearchDate.getFullYear();
        if(type=='date'){

            for (var i = 0; i < EventsData.length; i++) {
                var start = new Date(EventsData[i].Notice.start_date);
                var end = new Date(EventsData[i].Notice.end_date);
                var startD = start.getDate() + '_' + (start.getMonth() + 1) + '_' + start.getFullYear();
                var endD = end.getDate() + '_' + (end.getMonth() + 1) + '_' + end.getFullYear();
                console.log(endD);
                console.log(obj);

                // console.log(start);
                // console.log(end);
                if ((d >= start || (obj == startD)) && (d <= end || obj == endD)) {
                    if (nStr.length == 0 || nStr.indexOf(EventsData[i].Notice.id) < 0) {
                        noticesData.push(EventsData[i].Notice);
                        nStr.push(EventsData[i].Notice.id);
                    }
                }
            } //eo for EventsData

        }else{
            if (catSelectedList.length > 0) {
                for (var i = 0; i < EventsData.length; i++) {
                    for (j = 0; j < catSelectedList.length; j++) {
                        if (EventsData[i].Notice.categoryIds == catSelectedList[j] ) {
                            var start = new Date(EventsData[i].Notice.start_date);
                            var end = new Date(EventsData[i].Notice.end_date);
                            var startD = start.getDate() + '_' + (start.getMonth() + 1) + '_' + start.getFullYear();
                            var endD = end.getDate() + '_' + (end.getMonth() + 1) + '_' + end.getFullYear();

                            if ((d >= start || (obj == startD)) && (d <= end || obj == endD)) {
                                if (nStr.length == 0 || nStr.indexOf(EventsData[i].Notice.id) < 0) {
                                    noticesData.push(EventsData[i].Notice);
                                    nStr.push(EventsData[i].Notice.id);
                                }
                            }
                        }
                    } //eo for catSelectedList
                } //eo for EventsData
                //HOTfive notives
                // debugger
                for (var i = 0; i < hogiveNoticesAllData.length; i++) {
                    for (j = 0; j < catSelectedList.length; j++) {
                        if (hogiveNoticesAllData[i].NoticeCategory.length > 0) {
                            for (var k = 0; k < hogiveNoticesAllData[i].NoticeCategory.length; k++) {
                                if (hogiveNoticesAllData[i].NoticeCategory[k].categorie_id == catSelectedList[j]) {
                                    hotFive.push(hogiveNoticesAllData[i].Notice);
                                    break;
                                }
                            }
                        }
                    } //eo for catSelectedList
                } //eo for hogiveNoticesAllData

              
            }else{
                for (var i = 0; i < EventsData.length; i++) {
                    var start = new Date(EventsData[i].Notice.start_date);
                    var end = new Date(EventsData[i].Notice.end_date);
                    var startD = start.getDate() + '_' + (start.getMonth() + 1) + '_' + start.getFullYear();
                    var endD = end.getDate() + '_' + (end.getMonth() + 1) + '_' + end.getFullYear();
                    if ((d >= start || (obj == startD)) && (d <= end || obj == endD)) {
                        if (nStr.length == 0 || nStr.indexOf(EventsData[i].Notice.id) < 0) {
                            noticesData.push(EventsData[i].Notice);
                            nStr.push(EventsData[i].Notice.id);
                        }
                    }
                } //eo for EventsData

                for (var i = 0; i < hogiveNoticesAllData.length; i++) {
                       
                                    hotFive.push(hogiveNoticesAllData[i].Notice);
                                  
                       
                } //eo for hogiveNoticesAllData


            }

              Ext.getStore('HotFiveNoticesStore').setData(hotFive);
                me.addItemInCarouselOnHomePage(home_hotfive_cr, hotFive);
        }

        console.log(hotFive);
        console.log(noticesData);
    
        Ext.getStore('OtherNoticesStore').setData(noticesData);
        Ext.getStore('NoticesStore').setData(noticesData);
        Ext.getStore('EventGalleryStore').setData(noticesData);
        me.addItemInCarouselOnHomePage(home_cr, noticesData);
        // if (catSelectedList.length > 0) {
        //     for (var i = 0; i < EventsData.length; i++) {
        //         for (j = 0; j < catSelectedList.length; j++) {
        //             if (EventsData[i].Notice.categoryIds == catSelectedList[j] ) {
        //                 var start = new Date(EventsData[i].Notice.start_date);
        //                 var end = new Date(EventsData[i].Notice.end_date);
        //                 var startD = start.getDate() + '_' + (start.getMonth() + 1) + '_' + start.getFullYear();
        //                 var endD = end.getDate() + '_' + (end.getMonth() + 1) + '_' + end.getFullYear();

        //                 if ((d >= start || (obj == startD)) && (d <= end || obj == endD)) {
        //                     if (nStr.length == 0 || nStr.indexOf(EventsData[i].Notice.id) < 0) {
        //                         noticesData.push(EventsData[i].Notice);
        //                         nStr.push(EventsData[i].Notice.id);
        //                     }
        //                 }
        //             }
        //         } //eo for catSelectedList
        //     } //eo for EventsData
        //     //HOTfive notives
        //      debugger
        //     for (var i = 0; i < hogiveNoticesAllData.length; i++) {
        //         for (j = 0; j < catSelectedList.length; j++) {
        //             if (hogiveNoticesAllData[i].NoticeCategory.length > 0) {
        //                 for (var k = 0; k < hogiveNoticesAllData[i].NoticeCategory.length; k++) {
        //                     if (hogiveNoticesAllData[i].NoticeCategory[k].categorie_id == catSelectedList[j]) {
        //                         hotFive.push(hogiveNoticesAllData[i].Notice);
        //                         break;
        //                     }
        //                 }
        //             }
        //         } //eo for catSelectedList
        //     } //eo for hogiveNoticesAllData

        //     Ext.getStore('HotFiveNoticesStore').setData(hotFive);
        //     me.addItemInCarouselOnHomePage(home_hotfive_cr, hotFive);

        // } //eo if
        // else {
        //     for (var i = 0; i < EventsData.length; i++) {
        //         var start = new Date(EventsData[i].Notice.start_date);
        //         var end = new Date(EventsData[i].Notice.end_date);
        //         var startD = start.getDate() + '_' + (start.getMonth() + 1) + '_' + start.getFullYear();
        //         var endD = end.getDate() + '_' + (end.getMonth() + 1) + '_' + end.getFullYear();
        //         console.log(endD);
        //         console.log(obj);

        //         // console.log(start);
        //         // console.log(end);
        //         if ((d >= start || (obj == startD)) && (d <= end || obj == endD)) {
        //             if (nStr.length == 0 || nStr.indexOf(EventsData[i].Notice.id) < 0) {
        //                 noticesData.push(EventsData[i].Notice);
        //                 nStr.push(EventsData[i].Notice.id);
        //             }
        //         }
        //     } //eo for EventsData
            //HOTfive notives
            // for (var i = 0; i < hogiveNoticesAllData.length; i++) {
            //     hotFive.push(hogiveNoticesAllData[i].Notice);
            // } //eo for hogiveNoticesAllData
        // }
        // console.log(hotFive);
        // console.log(noticesData);
    
        // Ext.getStore('OtherNoticesStore').setData(noticesData);
        // Ext.getStore('NoticesStore').setData(noticesData);
        // Ext.getStore('EventGalleryStore').setData(noticesData);
        // me.addItemInCarouselOnHomePage(home_cr, noticesData);

        

        
    },
    GetUserById: function(id) {
        Ext.Ajax.request({
            url: DNB.util.Common.api.getUserById(id),
            method: 'POST',
            success: function(res, options) {
                var res = Ext.decode(res.responseText).response_data;
                var user = res.User;
                localStorage.setItem('userid', user.id);
                localStorage.setItem('First_name', user.First_name);
                localStorage.setItem('Last_name', user.Last_name);
                localStorage.setItem('username', user.username);
                localStorage.setItem('email', user.email);
                if (user.img == null) {
                    localStorage.setItem('image', '');
                } else {
                    localStorage.setItem('image', user.img);
                }
                localStorage.setItem('isLogin', 'YES');
                localStorage.setItem('radius', user.radius);
                localStorage.setItem('usermessage', (user.user_message == null || user.user_message == 'null') ? '' : user.user_message);
                localStorage.setItem('locationlocked', user.location);
                localStorage.setItem('latitude', user.latitude);
                localStorage.setItem('longitude', user.longitude);
                localStorage.setItem('currentAddress', (user.address == null || user.address == 'null') ? '' : user.address);
                localStorage.setItem('notification', user.notification);
                localStorage.setItem('notificationCategory', Ext.encode(res.NC));
            },
            failure: function(res, options) {
                Ext.Msg.alert('failure' + res.responseText);
            }
        });
    },
    //Function to Add Items in Carousel
    addItemInCarouselOnHomePage: function(carouselname, data) {
        var carousel_name = carouselname;

        var events = data;
        var items = [];
        // var hotFiveItems = [];
        // home_hotfive_cr.removeAll();
        carousel_name.removeAll();

        if(events.length<1){
            return;
        }
        for (var i = 0; i < events.length; i++) {
            imgAdr = imageBaseUrl + events[i].flyer;
            items.push({
                xtype: 'panel',
                cls: 'home-carousel-item-cls',
                data: events[i],
                // name : 'carousel-name',
                items: [{
                    xtype: 'image',
                    src: imgAdr,
                    cls: 'home-carousel-item-image-cls carousel_tint tint'
                }, {
                    xtype: 'panel',
                    cls: 'home-notice-details-panel-cls',
                    layout: {
                        type: 'vbox',
                        align: 'start',
                        pack: 'center'
                    },
                    items: [{
                        xtype: 'label',
                        cls: 'notice-details-label-cls',
                        html: events[i].title
                    }, 
                     {
                        xtype: 'button',
                        text : events[i].end_date,
                        ui: 'plain',
                        cls: 'home-notice-details-date-cls',
                        labelCls: 'home-notice-details-date-label-cls',
                        iconCls: 'home-notice-details-calander-icon-cls'

                    },
                    {
                        xtype: 'button',
                        text : events[i].city,
                        ui: 'plain',
                        cls: 'home-notice-details-location-cls',
                        labelCls: 'home-notice-details-location-label-cls',
                        iconCls: 'home-notice-details-map-icon-cls'

                    }
                    // {
                    //     xtype: 'panel',
                    //     layout: 'hbox',
                    //     style: 'margin: 6px 0 4px 0;',
                    //     items: [{
                    //         xtype: 'image',
                    //         cls: 'home-notice-details-calander-icon-cls'
                    //     }, {
                    //         xtype: 'label',
                    //         cls: 'home-notice-details-date-cls',
                    //         html: events[i].end_date
                    //     }]
                    // }, {
                    //     xtype: 'panel',
                    //     layout: 'hbox',
                    //     items: [{
                    //         xtype: 'image',
                    //         cls: 'home-notice-details-map-icon-cls'
                    //     }, {
                    //         xtype: 'label',
                    //         cls: 'home-notice-details-location-cls',
                    //         html: events[i].city
                    //     }]
                    // } 
                    ]
                }]
            });
            // if(events[i].hot_five=='Yes'){
            //     hotFiveItems.push(items[i]);
            // }
        }
        carousel_name.setItems(items);
        // home_hotfive_cr.setItems(hotFiveItems);

        if (items.length > 1) {
            carousel_name.setActiveItem(1);
        } else {
            carousel_name.setActiveItem(0);
        }
        // if (hotFiveItems.length > 1) {
        //     home_hotfive_cr.setActiveItem(1);
        // } else {
        //     home_hotfive_cr.setActiveItem(0);
        // }
        // home_hotfive_cr.setItems
    },
    //Function to Add Items in Carousel
    addItemInCarouselOnMyZonePage: function(carouselname, data) {
        var carousel_name = carouselname;
        var events = data;
        var carousel_upper_corner_right_btn_cls = 'carosel-item-close-cls';
        carousel_name.removeAll()
        var items = [];

        if(events.length<1){
            return;
        }
        if(listcontainer.indexOf('MyNoticesPanel') >= 0){
            carousel_upper_corner_right_btn_cls = 'carosel-item-edit-cls';
        }
        // setTimeout(function(){
        for (var i = 0; i < events.length; i++) {
            imgAdr = imageBaseUrl + events[i].flyer;
            items.push({
                xtype: 'panel',
                cls: 'carousel-item-cls',
                data: events[i],
                // name : 'carousel-name',
                items: [{
                    xtype: 'image',
                    cls: carousel_upper_corner_right_btn_cls,
                    name: 'carouselCloseIcon',
                    hidden: true
                }, {
                    xtype: 'image',
                    src: imgAdr,
                    cls: 'carousel-item-image-cls carousel_tint tint'
                }, {
                    xtype: 'panel',
                    cls: 'notice-details-panel-cls',
                    layout: {
                        type: 'vbox',
                        align: 'start',
                        pack: 'center'
                    },
                    items: [{
                        xtype: 'label',
                        cls: 'notice-details-label-cls',
                        html: events[i].title
                    }, 
                    {
                        xtype: 'button',
                        text : events[i].end_date,
                        ui: 'plain',
                        cls: 'notice-details-date-cls',
                        labelCls: 'notice-details-date-label-cls',
                        iconCls: 'notice-details-calander-icon-cls'

                    },
                    {
                        xtype: 'button',
                        text : events[i].city,
                        ui: 'plain',
                        cls: 'notice-details-location-cls',
                        labelCls: 'notice-details-location-label-cls',
                        iconCls: 'notice-details-map-icon-cls'

                    }
                    // ,{
                    //     xtype: 'panel',
                    //     layout: 'hbox',
                    //     style: 'margin: 6px 0 4px 0;',
                    //     items: [{
                    //         xtype: 'image',
                    //         cls: 'notice-details-calander-icon-cls'
                    //     }, {
                    //         xtype: 'label',
                    //         cls: 'notice-details-date-cls',
                    //         html: events[i].end_date
                    //     }
                    //     ]
                    // }, {
                    //     xtype: 'panel',
                    //     layout: 'hbox',
                    //     items: [{
                    //         xtype: 'image',
                    //         cls: 'notice-details-map-icon-cls'
                    //     }, {
                    //         xtype: 'label',
                    //         cls: 'notice-details-location-cls',
                    //         html: events[i].city
                    //     }]
                    // }
                     ]
                }]
            })
        }
        carousel_name.setItems(items);
        carousel_name.setActiveItem(0);
    },
    EditNoticeButtonTap: function(data) {
        // console.log(data);
        // return;

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
            editNoticeId=data.id;
            //console.log(record.data.id);
            DNB.app.getController('Events').ResetNoticeForm();
            DNB.app.getController('Events').FillNoticeForm(data.id);
            Ext.getCmp('NoticeTitleToolbar').setTitle('Edit Notice');
        },
        onEditPromotionButtonTap: function(data) {
        // console.log(data);
        // return;

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
        editPromotionId=data.id;
        //console.log(record.data);
        //console.log('2');
        DNB.app.getController('Events').ResetPromotionForm();
        DNB.app.getController('Events').FillPromotionForm(data.id);
        Ext.getCmp('PromotionTitleToolbar').setTitle('Edit Promotion');
    },
    removeRSVPNotice :function(data){
        // console.log(data);
        //  return;
          Ext.Msg.confirm('','Are you sure you want to remove notice from RSVP?',function(btn){
                if(btn=='yes'){
                    Ext.Viewport.setMasked({xtype:'loadmask',message:'Loading notices'});
                    Ext.Ajax.request({
                        url:DNB.util.Common.api.deleteAttend,
                        method:'POST',
                        params:{
                            notice_id:data.id,
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
    },
    removeFavoriteNotice : function(data){
         // console.log(data);
         // return;
            Ext.Msg.confirm('','Are you sure you want to remove notice from favourites?',function(btn){
                if(btn=='yes'){
                    Ext.Viewport.setMasked({xtype:'loadmask',message:'Loading notices'});

                    Ext.Ajax.request({
                        url:DNB.util.Common.api.deleteFavorite,
                        method:'POST',
                        params:{
                            notice_id:data.id,
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
});