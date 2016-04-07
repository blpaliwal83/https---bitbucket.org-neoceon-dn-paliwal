Ext.define('DNB.controller.ServicesController', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.data.JsonP'],
    config: {},
    /*=================================================
      Get Hotfive Notices according to Location
    ================================================= */
    getHotfive: function(params_, successFunction, failedFunction) {
        var url = DNB.util.Common.api.getHotFive_v2;
        var servicesController = this;

        currentLat = localStorage.getItem('latitude');
        currentLong = localStorage.getItem('longitude');
        
        if(currentLat == null ||currentLong == null || currentLong == 0 || currentLat == 0){
            currentLat = 18.015967 ;
            currentLong = -76.801973;  
        }

        var params = {
            "latitude": currentLat,
            "longitude": currentLong,
            "radius": userRadius
        };
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: params,
            scope: this,
            success: function(response) {
                var data = JSON.parse(response.responseText).response_data;
                storage.WebSql.truncateHotFiveTable();
                // adding hotfive notices details to persistent storage websql
                var noticesCollections = [];
                for (var i = 0; i < data.length; i++) {
                    var notice_data = {
                        notice_id: parseInt(data[i].Notice.id),
                        jsoncollection: JSON.stringify(data[i])
                    };
                    noticesCollections.push(notice_data);
                }
                for (var i = 0; i < noticesCollections.length; i++) {
                    // setTimeout(function(){
                    storage.WebSql.setHotFive(noticesCollections[i]);
                    // },500)
                }
                storage.WebSql.getTableRecords('hot_five', 'loadHotFive');
                // DNB.app.fireEvent(successFunction, response);
            },
            failure: function(response) {
                console.log('InterNet Connection is not available');
                storage.WebSql.getTableRecords('hot_five', 'loadHotFive');
            }
        });
        // servicesController.postRequest(url, params, successFunction, failedFunction);
    },
    /*=================================================
        Get All Notices according to Location
    ================================================= */
    getAllNotices: function(params_, successFunction, failedFunction) {
        var url = DNB.util.Common.api.getAllNotices_v2;
        var servicesController = this;
        var successFunction = 'getAllNoticesSuccess';
        var failedFunction = 'getAllNoticesFailed';

        currentLat = localStorage.getItem('latitude');
        currentLong = localStorage.getItem('longitude');
        
        if(currentLat == null ||currentLong == null || currentLong == 0 || currentLat == 0){
            currentLat = 18.015967 ;
            currentLong = -76.801973;  
        }
        if(userRadius==0 || userRadius==null ||userRadius=='null' ||userRadius=='0' ||userRadius==''){
            userRadius=200;
        }
        var params = {
            "latitude": currentLat,
            "longitude": currentLong,
            "radius": userRadius
        };
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: params,
            scope: this,
            success: function(response) {
                // debugger
                // console.log(response);
                var data = JSON.parse(response.responseText).response_data;
                if(data.length>0){
                    // var notices = [];
                    // Truncate table before adding new notices
                    storage.WebSql.truncateNoticesTable();
                    // adding notices details to persistent storage websql

                    var noticesCollections = [];
                    for (var i = 0; i < data.length; i++) {
                        var notice_data = {
                            notice_id: parseInt(data[i].Notice.id),
                            jsoncollection: JSON.stringify(data[i])
                        };
                        noticesCollections.push(notice_data);
                    }
                    for (var i = 0; i < noticesCollections.length; i++) {
                        
                        storage.WebSql.setNotices(noticesCollections[i]);

                        storage.WebSql.setNoticeDetails(noticesCollections[i]);
                    }
                    storage.WebSql.getTableRecords('notices', 'loadAllNotices');
                    if(noticeCallFrom=='radius'){
                        Ext.Msg.alert('','Notices updated successfully according to radius.');
                        noticeCallFrom='';
                        localStorage.setItem('radius',userRadius); 
                        servicesController.setRadius();  
                    }

                }else{
                    if(noticeCallFrom=='radius'){
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert('','We are unable to find notices in selected radius. Displayed notices are within '+oldRadius+' miles.');
                        localStorage.setItem('radius',oldRadius);
                        userRadius = oldRadius;
                        Ext.getCmp('RadiusLabelValue').setHtml(oldRadius+' miles');
                        Ext.getCmp('Radius').setValue(oldRadius);
                        sliderControlInterval=  setInterval(function(){
                        thumb=Ext.getCmp('Radius').getComponent().getThumb();
                        if(thumb.translatableBehavior.translatable.x>0){
                            slidercolor.style.cssText=''.concat(
                                '-webkit-text-fill-color: blue;',
                                'fill: rgb(0, 255, 255);',
                                'width: '+(thumb.translatableBehavior.translatable.x-10)+'px !important;',
                                ' height: 5px !important;',
                                ' margin-left: 15px !important;',
                                ' margin-top: -33px !important;',
                                ' background-color: #32AFE7;');
                            clearInterval(sliderControlInterval);
                        }
                        else{
                            slidercolor.style.cssText=''.concat(
                                '-webkit-text-fill-color: blue;',
                                'fill: rgb(0, 255, 255);',
                                'display:none;',
                                'width: 0px !important;',
                                ' height: 5px !important;',
                                ' margin-left: 16px !important;',
                                ' margin-top: -33px !important;',
                                ' background-color: #32AFE7;');
                            if(iRadius<5)
                                clearInterval(sliderControlInterval);
                        }

                    },100);

                        noticeCallFrom='';
                    }else{
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert('','No notice found.');
                    }
                    
                }
            },
            failure: function(response) {
                console.log('InterNet Connection is not available');
                storage.WebSql.getTableRecords('notices', 'loadAllNotices');
            }
        });
    },
    /*=================================================
      Check Hotfive according to Location
    ================================================= */
    checkHotFiveSlot: function(params_, successFunction, failedFunction) {
        var servicesController = this;
        var url = DNB.util.Common.api.checkHotFiveSlot;
        if(currentLat == null ||currentLong == null || currentLong == 0 || currentLat == 0){
            currentLat = 18.015967 ;
            currentLong = -76.801973;  
        }

        var params = {
            "latitude": currentLat,
            "longitude": currentLong,
            "category_id": selectedCategoryID
        };
        servicesController.postRequest(url, params, successFunction, failedFunction);
    },
    /*=================================================
     Get MY All Nottices
    ================================================= */
    getMyNotices: function(url, successFunction, failedFunction) {
        var servicesController = this;
        var url = DNB.util.Common.api.getMyNotices(url, localStorage.getItem('userid'));
        listcontainer = lc;
        var type = '';
        if (listcontainer.indexOf('FavoriteNoticesPanel') >= 0) {
            type = 'favourite';
        } else if (listcontainer.indexOf('RSVPNoticesPanel') >= 0) {
            type = 'rsvp';
        } else {
            type = 'mynotice';
        }
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            scope: this,
            success: function(response) {
                
                var data = JSON.parse(response.responseText);
                if (listcontainer.indexOf('FavoriteNoticesPanel') >= 0 || listcontainer.indexOf('RSVPNoticesPanel') >= 0) {
                    data = data.result;
                } else {
                    data = data.response_data;
                }
                var myzone_data = {
                    notice_type: type,
                    jsoncollection: JSON.stringify(data)
                };
                storage.WebSql.setMyZone(myzone_data)

                // var noticesCollections = [];
                for (var i = 0; i < data.length; i++) {
                    var notice_data = {
                        notice_id: parseInt(data[i].Notice.id),
                        jsoncollection: JSON.stringify(data[i])
                    };
                    storage.WebSql.setNoticeDetails(notice_data);
                }
                storage.WebSql.getMyZoneRecords(type, 'loadMyNotices');
                // DNB.app.fireEvent(successFunction, response);
            },
            failure: function(response) {
                console.log('InterNet Connection is not available');
                storage.WebSql.getMyZoneRecords(type, 'loadMyNotices');
                // DNB.app.fireEvent(failedFunction, response);
            }
        });
        // servicesController.getRequest(url, successFunction, failedFunction);
    },
    /*=================================================
      Get Promotions By User
    ================================================= */
    getPromotions : function(_params){

        currentLat = localStorage.getItem('latitude');
        currentLong = localStorage.getItem('longitude');

        if(currentLat == null ||currentLong == null || currentLong == 0 || currentLat == 0){
            currentLat = 18.015967 ;
            currentLong = -76.801973;  
        }

        var params = {
            "latitude": currentLat,
            "longitude": currentLong,
            "radius": userRadius
        };

        Ext.Ajax.request({
            url: DNB.util.Common.api.getAllPromotions,
            method: 'POST',
            jsonData: params,
            scope: this,
            success: function(res) {
                // console.log(res)
                var data = JSON.parse(res.responseText).response_data;
                storage.WebSql.truncatePromotionTable();
                // adding notices details to persistent storage websql
                var promotionCollections = [];
                for (var i = 0; i < data.length; i++) {
                    var promotion_data = {
                        promotion_id: parseInt(data[i].Promotion.id),
                        jsoncollection: JSON.stringify(data[i])
                    };
                    promotionCollections.push(promotion_data);
                }
                for (var i = 0; i < promotionCollections.length; i++) {
                    storage.WebSql.setPromotion(promotionCollections[i])
                }
                storage.WebSql.getTableRecords('promotions', 'loadAllPromotions');
            },
            failure: function(error) {
                console.log('InterNet Connection is not available');
                storage.WebSql.getTableRecords('promotions', 'loadAllPromotions');
            }
        });
    },
    getNoticesCategories : function(_params){
        Ext.Ajax.request({
            url: DNB.util.Common.api.getNoticeCategories,
            success: function(res) {
                var data = JSON.parse(res.responseText).all_data[1];
                 storage.WebSql.truncateNoticeCategoryTable();
                 var catgory_data = {
                        type: 'N',
                        jsoncollection: JSON.stringify(data)
                    };

                 storage.WebSql.setNoticeCategory(catgory_data);
                 storage.WebSql.getTableRecords('notice_catgories','loadNoticeCategories');

            },
            failure: function(res) {
                console.log('InterNet Connection is not available');
                storage.WebSql.getTableRecords('notice_catgories','loadNoticeCategories');
            }
        });
    },
    fillEventDetails : function(params){
          Ext.Ajax.request({
            url:webserviceURL+'NoticeViews/add_NoticeView.json',
            method:'POST',
            jsonData: params,
            success: function(res){
                // console.log('first success');
                // console.log(res);
                Ext.Ajax.request({
                    url:webserviceURL+'Notices/get_specific_notice/'+params.notice_id+'.json',
                    success: function(res){
                        // console.log('2nd success');
                        // console.log(res);
                        var data=JSON.parse(res.responseText).response_data;
                        storage.WebSql.updateNoticeDetailTableById(params.notice_id,JSON.stringify(data));
                        storage.WebSql.getNoticeRecordById(params.notice_id ,'showEventDetails');
                        

                    },failure:function(res){
                        console.log('InterNet Connection is not available');
                        storage.WebSql.getNoticeRecordById(params.notice_id ,'showEventDetails');
                    }
                });


            },failure:function(res){
                console.log('InterNet Connection is not available');
                storage.WebSql.getNoticeRecordById(params.notice_id ,'showEventDetails');
            }
        });

    },
    setRadius : function(){
          Ext.Ajax.request({
                url:DNB.util.Common.api.setRadius,
                method:'POST',
                params :  {
                    radius:userRadius,uid:localStorage.getItem('userid')
                },
                success:function(res,options){
                    localStorage.setItem('radius',userRadius);
                    var res=Ext.decode(res.responseText).Result;
                    // Ext.Msg.alert('','Location radius set.');
                },
                failure:function(res,options){
                    // Ext.Viewport.setMasked(false);
                    // Ext.Msg.alert('','failure'+res.responseText);
                }
            });

    },
    /*=================================================
      POST Request
    ================================================= */
    postRequest: function(url, params, successFunction, failedFunction) {
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: params,
            scope: this,
            success: function(response) {
                DNB.app.fireEvent(successFunction, response);
            },
            failure: function(response) {
                DNB.app.fireEvent(failedFunction, response);
            }
        });
    },
    /*=================================================
      GET Request
    ================================================= */
    getRequest: function(url, successFunction, failedFunction) {
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            scope: this,
            success: function(response) {
                DNB.app.fireEvent(successFunction, response);
            },
            failure: function(response) {
                DNB.app.fireEvent(failedFunction, response);
            }
        });
    }
});