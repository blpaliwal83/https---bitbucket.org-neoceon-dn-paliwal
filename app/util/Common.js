Ext.define('DNB.util.Common',{
	singleton:true,
	webserviceURL:'http://www.bitazure.com/dnb/',
	imageBaseUrl:'http://www.bitazure.com/dnb/img/',
	audioBaseUrl:'http://www.bitazure.com/dnb/img/audio/',
	addImageIcon:'<img width="32px" height="32px" src="resources/images/plus-icon.png">',
	selectedEventDetail:{},
	EventsData:{},
	freeLocations:[],
	api: (function () {
	// This is the base API url 
	var webserviceBaseUrl = 'http://www.bitazure.com/dnb/';  
	return {
		baseUrl: webserviceBaseUrl, 
		getAllNotices: webserviceBaseUrl + 'notices/get_all_notices.json',
		getAllCategories: webserviceBaseUrl + 'Categories/get_all_categories.json', 
		getNoticeCategories:webserviceBaseUrl+'Notices/add_notice.json',
        getPromotionCategories:webserviceBaseUrl+'promotions/add_promotion.json',
		getCommentsByNoticeId:function(id){
			//url:webserviceURL+'Comments/numberofComment/'+id+'.json',
			return webserviceBaseUrl+'Comments/numberofComment/'+id+'.json';
		},
		getAllPromotions:webserviceBaseUrl+'promotions/getAllPromotions.json',
		getPromotionsBrUserId:webserviceBaseUrl+'users/get_my_pramotion/'+localStorage.getItem('userid')+'.json',
		getPromotionsByUserId:function(id){
			return webserviceBaseUrl+'users/get_my_pramotion/'+id+'.json';
		},
		getMyNotices:function(url,id){
			return webserviceBaseUrl+url+id+'.json';
		},
		getNoticeById:function(id){
			return webserviceBaseUrl+'Notices/get_specific_notice/'+id+'.json';
		},
		getNoticeImagesById:function(id){
			return webserviceBaseUrl+'media/get_media/'+id+'.json';
		},
		getPromotionById:function(id){
			return webserviceBaseUrl+'promotions/get_specific_promotion/'+id+'.json';
		},
		addFlag:webserviceBaseUrl+'NoticeFlags/add_flag.json',
		attendNotice:webserviceBaseUrl+'NoticeAttends/add_noticeAttend.json',
		addFavorite:webserviceBaseUrl+'Favorites/add_favorite.json',
		mLogin:webserviceBaseUrl+'users/mlogin.json',
		userRegistration:webserviceBaseUrl+'users/reg_user.json',
		twitterSignUp:webserviceBaseUrl+'users/twitter_signup.json',
		getUserById:function(id){
			return webserviceBaseUrl+'users/get_specific_user/'+id+'.json';
		},
		changename:webserviceBaseUrl+'users/changeName.json',
		addStatusMessage:webserviceBaseUrl+'users/add_status_message.json',
		updateNotice:webserviceBaseUrl+'Notices/update_notice.json',
		notificationCategory:webserviceBaseUrl+'UserNotificationCategries/notificationCategory.json',
		updateUserPassword:webserviceBaseUrl+'users/update_user_password.json',
		deleteAttend:webserviceBaseUrl+'NoticeAttends/delete_attend.json',
		deleteFavorite:webserviceBaseUrl+'Favorites/delete_favorite.json',
		addCommentFlag:webserviceBaseUrl+'CommentFlags/add_flag.json',
		addComment:webserviceBaseUrl+'comments/add_comment.json',
		addLike:webserviceBaseUrl+'likes/add_like.json',
		feedback:webserviceBaseUrl+'Users/feedback.json',
		resetPassword:webserviceBaseUrl+'Users/resetpass.json',
		notificationCategory:webserviceBaseUrl+'UserNotificationCategries/notificationCategory.json',
		userRegisteration:webserviceBaseUrl+'users/reg_user.json',
		resendEmail:webserviceBaseUrl+'Users/resend_email.json',
		saveUserNotification:webserviceBaseUrl+'users/notification.json',
		saveUserLocation:webserviceBaseUrl+'users/location.json',
		setRadius:webserviceBaseUrl+'users/set_radius.json',
		addTwitterEmail:webserviceBaseUrl+'users/add_twitter_user_email.json',
		about: webserviceBaseUrl + 'about',
		getFreeLocations: webserviceBaseUrl + '/locations/free.json',
		getHotFive: webserviceBaseUrl + '/Notices/HotFive.json'	,
		//New functions
		getHotFive_v2: webserviceBaseUrl + '/Notices/gethotfivenotices.json',
		checkHotFiveSlot: webserviceBaseUrl + '/Notices/checkhotfiveslot.json',
		getAllNotices_v2: webserviceBaseUrl + '/Notices/getallnotices.json'			
	}
	})(),
	config:{
		//imageBaseUrl:'http://192.169.199.42/DNB/DNB_admin/app/webroot/img/'
		//alert(DNB.util.Common.getImageBaseUrl());

	},
	constructor: function(config) {
        this.initConfig(config);
    }

});
var imageBaseUrl='http://www.bitazure.com/dnb/img/';
var selectedEventDetail={};
var EventsData=[];//store all notices
var audioBaseUrl='http://www.bitazure.com/dnb/img/audio/';
var webserviceURL='http://www.bitazure.com/dnb/';

//Category
var categoryAllListData=[];//all category list
var categoryListData=[];//all category list used for selection in hom page
var categorySearchListData=[];//all category list used for search in Search page
var categorySearchOpenFromPage='';//open from home page or search page
var noticesCategoryListData=new Array();
var promotionsCategoryListData=[];
var catSelectedList=[];//only selected category's ids
var selectedCategoryIDsToAdd='';//This is used to add notice and promotion
var categoryDataToAdd=[];//selected category's ids
var categoryMultiSelectOpenFromPage='';
var totalCategoryAmount=0;

var hogiveNoticesAllData=[];

var categorySelectedOnSearchPage=[];
//Notification Category
var NotificationCategory=[];

var promotionsAllData=[];//This will have all data without any filter
var promotionsData=[];// this will  have data with catgory filter
var promotionsHotFiveData=[];
var promotionImageFILEURI='';
var promotionAudioFILEURI='';
var noticeImageFILEURI='';
var noticeImageBannerFILEURI='';
var noticeAudioFILEURI='';

//Banner/Promotion
var currentPromotioIndex=0;
var isBannerActive=true;
var currentBannerPageName='';
// var promotionFlag=false;
var promotionFlag=false;

var promotionStartFlag=false;

var commentEventId='';
var promotionCategorySelectedList=[];

var galleryPageOpenFrom=''; //it will open either from event detail or albums list page.

var termconditionsPageOpenFrom='';
var currentGalleryImageURL='';


//Login
var isLogin=false;
var isLoginWithFB=false;
var isLoginWithTwitter=false;
var isAlreadyAttendNotice=false;
var isAlreadyLikedNotice=false;
var isAlreadyFavoriteNotice=false;
var loginPageOpenFrom='';
var isUserNameFocus=false;//in ios when tap on usrename then submit button click is called


var currentLat=null;
var currentLong=null;

var selectedCategoryID=0;
var currentDateOfApp = '';

var userSelectedCategories = [];

var userRadius = null;
var noticeCallFrom = null;
var oldRadius = null;

var usreName = null;

var selectedEditPromotion = null;

var currentPromotion = null;
var usersCurrentLocation = null;
var usersCurrentLocationLat= null;
var usersCurrentLocationLong = null;

var noticeLocationLat= null;
var noticeLocationLong = null;

//Event Search Based on Calendar
var eventCalendarName='';
var currentSearchDate=new Date();


var monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                 ];

//Event Location On Map
var mapPageOpenFrom='';

//Event Location On Map
var eventDetailPageOpenFrom='';

//Used Services URLs
var dnbServices={
    addNoticeView:webserviceURL+'NoticeViews/add_NoticeView.json',
    //url:webserviceURL+'Notices/get_specific_notice/'+eventInfo.id+'.json',
    noticeDetailByNoticeId:webserviceURL+'NoticeViews/get_specific_notice/'
};

var deviceName=Ext.os.deviceType.toLowerCase();
//alert(deviceName);
 var deviceOSName=Ext.os.name.toLowerCase();//iOS
//alert(deviceOSName);
var deviceHeight=parseInt(window.innerHeight);
var deviceWidth=parseInt(window.innerWidth);
//ios 4s :320 x 400
//alert('w:'+deviceWidth+'\nH:'+deviceHeight);
var myZoneImageClass='';
if(deviceOSName=='ios'){
	if(deviceName=='phone')
	{
		if(deviceHeight>1000)
		{
			myZoneImageClass= deviceName+'400';
		}
		else if(deviceHeight>800)
		{
			myZoneImageClass= deviceName+'300';
		}
		else if(deviceHeight>700)
		{
			myZoneImageClass= deviceName+'220';
		}
		else if(deviceHeight>600)
		{
			myZoneImageClass= deviceName+'200';
		}
		else if(deviceHeight>500)
		{
			myZoneImageClass= deviceName+'160';
		}
		else if(deviceHeight>400)
		{
			myZoneImageClass= deviceName+'150';
		}
	}
	else
		myZoneImageClass= deviceName;
}
else if(deviceOSName=='desktop'){
	
	if(deviceHeight>1000)
	{
		myZoneImageClass= deviceName+'400';
	}
	else if(deviceHeight>800)
	{
		myZoneImageClass= deviceName+'300';
	}
	else if(deviceHeight>700)
	{
		myZoneImageClass= deviceName+'220';
	}
	else if(deviceHeight>600)
	{
		myZoneImageClass= deviceName+'200';
	}
	else if(deviceHeight>500)
	{
		myZoneImageClass= deviceName+'160';
	}
	else if(deviceHeight>400)
	{
		myZoneImageClass= deviceName+'150';
	}
	
}
var tapOnSubmit=false;
var isDateSelectedFromCalendar=true;
var calendarOpenFromPage='';//Calendar will be opened either from Home or RSVP page

var NoticesSearchStoreData=[];
var addImageIcon='<img width="32px" height="32px" src="resources/images/plus-icon.png">';

//Add/Edit Promotion
var isEditPromotion=false,editPromotionId='';

//Add/Edit Notice
var isEditNotice=false,editNoticeId='';
var isLocationServiceToggleButtonSet=false;
var commentPageOpenFrom='';
var noticeImages=[];
var isUserMessagePanelHidden=true;
var clientIDs = {
	 "PayPalEnvironmentProduction": "Avl8O2VrFFIMtG2Pr1yQkIfSavnTATmc-wDKnWGkkzHvfc-aRYL5ZIc2",
	 "PayPalEnvironmentSandbox": "AanDbtTxRqrytXvImDbI82MEProGy-T2CadLzc96u7ce8oGHaSi9WWNXQx5m7szsR7SzHalzkHvgXbM5"
 };
 
 var media='';
 var mediaTimer='';
 var currentRSVPSearchDate=new Date();
 var promotionUploadSetting={audio:{},image:{}};
 var hotFivePrice=2.99;
 var perWeekPrice=0.99;
 var isAudioPlaying=false;
 var duration=0;
 var mediaTimer=null;
 var isStarted=false;
 var isPaused=false;
 var audioPlayerOpenFrom='';
 var isCalendaralreadyOpen=false;
 var loaderTimer='';
 var devicetokenid='';
function ShowHideHomePages(showPageName , pageFlag){
    DNB.app.getController('Events').ShowHideHomePages(showPageName , pageFlag);
}

function ShowHidePagesOnSettingsTab(showPagename){
    if(Ext.getCmp('Account'))
        Ext.getCmp('Account').hide();
    if(Ext.getCmp('Feedback'))
        Ext.getCmp('Feedback').hide();
    if(Ext.getCmp('TermsConditions'))
        Ext.getCmp('TermsConditions').hide();
    if(Ext.getCmp('About'))
        Ext.getCmp('About').hide();

    if(Ext.getCmp(showPagename))
        Ext.getCmp(showPagename).show();
}

function fnShowEventImageInGalleryDetailPage(img){
    currentGalleryImageURL=img.getSrc();
    Ext.getCmp('GalleryContainer').hide();
    Ext.getCmp('GalleryImageContainer').show();
    Ext.getCmp('GalleryImage').setSrc(img.getSrc());
    Ext.getCmp('ActionImageSheet').show();
}


function fnShowEventDetailPageFromHome(eventInfo){
	DNB.app.getController('EventDetail').FillEventDetail(eventInfo);
}

function fnShowNoticeWebsite(){
    if(selectedEventDetail.Notice.website=='null' ||
       selectedEventDetail.Notice.website==null){return;}
    window.open(selectedEventDetail.Notice.website, '_blank', 'location=yes');
}

function loadPreviousMonth(calendarId) {
    Ext.getCmp('Calendar').loadMonthDelta(-1);
}

function loadNextMonth(calendarId) {
    Ext.getCmp('Calendar').loadMonthDelta(1);
}

function getEventsByDateFilter(val,obj){
    //alert(val+'\n'+obj);
    /*if(isDateSelectedFromCalendar==false){
        isDateSelectedFromCalendar=true;
        return;
    }*/
    //console.log(obj);//17_5_2015//d/m/y
    console.log(obj);
    var str=obj.split('_');
    var d=new Date(str[2],str[1],str[0]);//y.m.d
	console.log(d);
    if(Ext.getCmp('Calendar'))
        Ext.getCmp('Calendar').hide();

    if(calendarOpenFromPage=='Home'){
		DNB.app.getController('Events').SetDateOnOtherEventButton(d);
		DNB.app.getController('Events').SearchNoticesByCategoryandDate('date');
	}else if(calendarOpenFromPage=='RSVP'){
		isCalendaralreadyOpen=false;
		currentRSVPSearchDate=d;
		DNB.app.getController('Events').SetDateOnRSVPEventSearchByDateButton(d);
		DNB.app.getController('Events').GetMyNotices('NoticeAttends/total/','RSVPNoticesPanel');
	}else{
		DNB.app.getController('Events').SetDateOnOtherEventButton(d);
		DNB.app.getController('Events').SearchNoticesByCategoryandDate('date');
	}
}

function CloseCalendar(){
	isCalendaralreadyOpen=false;
    if(Ext.getCmp('Calendar'))
        Ext.getCmp('Calendar').hide();
}

var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

