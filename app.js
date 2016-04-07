/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
Ext.Loader.setConfig({
    paths: {
        storage: './storage'
    }
});

Ext.application({
    name: 'DNB',
    viewport: {
        autoBlurInput: false
   },

    requires: [
        'DNB.util.Common',
        'storage.WebSql',
        'Ext.MessageBox',
        'DNB.util.Twitter',
        'Ext.device.Geolocation'
    ],
    models: [
        'Notices',
        'FavouriteNotices',
        'EventVideos',
        'EventAudios',
        'EventGallery',
        'EventCategory',
        'NoticeComments',
        'EventPayStatus',
        'Promotions',
        'EventTime',
        'NoticeMedia',
        'FreeLocations'
    ],
    stores: [
        'NoticesStore',
        'FavouriteNoticesStore',
        'HotFiveNoticesStore',
        'GalleryNoticesStore',
        'EventVideosStore',
        'EventAudiosStore',
        'EventGalleryStore',
        'EventCategoryStore',
        'NoticeCommentStore',
        'PromotionsStore',
        'MyNoticesStore',
        'EventCategoryMultiSelectStore',
        'OtherNoticesStore',
        'NotificationCategoryMultiSelectStore',
        'EventCategorySearchStore',
        'NoticesSearchStore',
        'NoticeMediaStore',
        'PromotionsCategoryStore',
        'FreeLocationsStore'
    ],
   views: [
        'Splash',
        'DNBView',
        'imagePopup',
        'Promotion',
        'TermsConditions',
        'TMShow',
        'CategoryMultiSelect',
        'DNBMessage',
        'UserProfile',
        'NoticeFreeLocations',
        'locationView'
    ],
    controllers: [
        'Events',
        'Login',
        'EventDetail',
        'Home',
        'Settings',
        'Account',
        'Registeration',
        'UserEmail',
        'AddEvent',
        'AddPromotion',
        'ServicesController',
        'UserProfile',
        'locationController'
    ],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {

        promotionFlag = false;
        userRadius = localStorage.getItem('radius');

        if(userRadius==0 || userRadius==null ||userRadius=='null' ||userRadius=='0' ||userRadius==''){
                userRadius=200;
            }else{
                userRadius = localStorage.getItem('radius');
            }
        currentLat = localStorage.getItem('latitude');
        currentLong = localStorage.getItem('longitude');
        if(currentLat==0||currentLat==null ||currentLat ==''|| currentLat=='null' || currentLat=='0' || localStorage.getItem('locationlocked')=='yes'){
            console.log('if working');
            window.navigator.geolocation.getCurrentPosition(function(position){
                                    currentLat =  position.coords.latitude;
                                    currentLong = position.coords.longitude;
                                    localStorage.setItem('latitude',currentLat);
                                    localStorage.setItem('longitude',currentLong);
                                    
                            }, function(error){
                                console.log(error);
                                currentLat = 18.015967 ;
                                currentLong = -76.801973;  
                            },{enableHighAccuracy: true, timeout: 10000});
        }else{
            currentLat  = localStorage.getItem('latitude');
            currentLong = localStorage.getItem('longitude');
        }
        if(localStorage.getItem('userSelectedCategories')!=null){
             userSelectedCategories =   JSON.parse(localStorage.getItem('userSelectedCategories')); 
             catSelectedList = userSelectedCategories;
            }

        
        setTimeout(function(){

            Ext.fly('appLoadingIndicator').destroy();
            Ext.Viewport.add({xtype:'dnbview'}).show();

            Ext.Viewport.add({xtype:'categorymultiselect'}).hide();

            Ext.Viewport.add({xtype:'dnbmessage'}).hide();
            Ext.Viewport.setMasked({xtype:'loadmask',message:'Loading notices'});
            
            DNB.app.getController('Events').GetNotices();
            DNB.app.getController('Events').GetHotFiveNotices();
            DNB.app.getController('Events').GetPromotions();

            DNB.app.getController('Events').GetCategories();
            DNB.app.getController('Events').GetNoticesCategories();
            DNB.app.getController('Events').GetPromotionsCategories();
            DNB.app.getController('Events').GetFreeLocations();



            if(localStorage.getItem('isLogin')=='YES'){
                isLogin=true;
            }

            if(localStorage.getItem('isLoginWithFB')=='YES'){
                isLoginWithFB=true;
            }
            if (localStorage.getItem('isLoginWithTwitter') == 'YES') {
                isLoginWithTwitter=true;
            }
            Ext.getCmp('MainTabView').setActiveItem(0);
            DNB.app.getController('Events').SetDateOnOtherEventButton(currentSearchDate);
            document.body.style.backgroundImage='none';
        },6000);
        
       
    }
    //,
    // onUpdated: function() {
    //     Ext.Msg.confirm(
    //         "Application Update",
    //         "This application has just successfully been updated to the latest version. Reload now?",
    //         function(buttonId) {
    //             if (buttonId === 'yes') {
    //                 window.location.reload();
    //             }
    //         }
    //     );
    // }
});
