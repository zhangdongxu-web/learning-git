(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/IdentRoom/IdentRoom2","components/uni-popup/uni-popup"],{"0793":function(t,e,i){"use strict";i.r(e);var o=i("ed34"),n=i.n(o);for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);e["default"]=n.a},3280:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},n=[];i.d(e,"a",function(){return o}),i.d(e,"b",function(){return n})},"47e0":function(t,e,i){},4996:function(t,e,i){"use strict";i.r(e);var o=i("51ed"),n=i("4cfd");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("fa8e");var a=i("2877"),r=Object(a["a"])(n["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},"4cfd":function(t,e,i){"use strict";i.r(e);var o=i("f963"),n=i.n(o);for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);e["default"]=n.a},"4d2c":function(t,e,i){"use strict";(function(t){i("5605"),i("921b");o(i("66fd"));var e=o(i("bf0a"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"51ed":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},n=[];i.d(e,"a",function(){return o}),i.d(e,"b",function(){return n})},6491:function(t,e,i){"use strict";var o=i("47e0"),n=i.n(o);n.a},bf0a:function(t,e,i){"use strict";i.r(e);var o=i("3280"),n=i("0793");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("6491");var a=i("2877"),r=Object(a["a"])(n["default"],o["a"],o["b"],!1,null,"76d0c833",null);e["default"]=r.exports},c7b2:function(t,e,i){},ed34:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("a34a"));n(i("4996")),n(i("2571")),i("058c");function n(t){return t&&t.__esModule?t:{default:t}}function s(t,e,i,o,n,s,a){try{var r=t[s](a),c=r.value}catch(u){return void i(u)}r.done?e(c):Promise.resolve(c).then(o,n)}function a(t){return function(){var e=this,i=arguments;return new Promise(function(o,n){var a=t.apply(e,i);function r(t){s(a,o,n,r,c,"next",t)}function c(t){s(a,o,n,r,c,"throw",t)}r(void 0)})}}function r(t){return h(t)||u(t)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function h(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}var l=t.getRecorderManager(),d=t.createInnerAudioContext(),f={data:function(){return{quanju:!1,id:"",state:"",auth:"",identTab:"",exId:[],jtext:"",orderState:"",choselist:[],datainfo:{},voicePlay:!1,record:!1,start:5,activeStartIndex:null,activeStartText:"",goodsInfo:{},istext:"2",voicePath:"",timer:"",voiceNum:"",voiceLength:"",toBeIdentifiedList:[],toBePersonTeacherList:[],attach:[],appraisalSuccess:1,ident_success_btn_show:0,sort:getApp().globalData.sort,imglist:[],istrue:"",resIco:"",choseImgList:{exp:[],upload:[]}}},onLoad:function(e){var i=this;console.log("option",e),this.id=e.id,this.state=e.type,this.auth=e.auth,this.identTab=e.identTab,this.goodsInfo=t.getStorageSync("userinfo")||"",l.onError(function(t){console.log("#######录音失败############")}),l.onStop(function(e){console.log("录音结束----------------------------",e.tempFilePath),i.voiceNum=Math.round(e.duration/1e3),i.voiceLength=Math.round(e.duration/1e3),t.showLoading({title:"正在上传",mask:!0}),t.uploadFile({url:i.$upLoadUrl,filePath:e.tempFilePath,name:"file",header:{"content-type":"multipart/form-data"},formData:{pathname:"lisence"},success:function(e){if(console.log(e),t.hideLoading(),200==e.statusCode){var o=JSON.parse(e.data);console.log("*****data",o),i.voicePath=o.data,t.hideToast()}else t.showModal({title:"提示",content:"上传失败",showCancel:!1})},fail:function(e){console.log(e),t.hideLoading(),t.hideToast(),t.showModal({title:"提示",content:"上传失败",showCancel:!1})}})}),d.onEnded(function(t){i.voicePlay=!1,i.timer&&(i.voiceNum=i.voiceLength,clearInterval(i.timer)),i.toBePersonTeacherList.forEach(function(t){t.assayer.voicePlay=!1,t.assayer.seconds=t.assayer.len,clearInterval(t.assayer.timer),t.user&&(t.user.voicePlay=!1,t.user.seconds=t.user.len,clearInterval(t.user.timer))})})},onShow:function(){var t=this,e={id:this.id};this.$requestApi.getBeIdentifiedList(e).then(function(e){console.log(e,"获取用户信息"),t.orderState=e.data.orderState}),this.$requestApi.authpoolinfo(e).then(function(e){t.imglist=r(e.data.list)}),this.$requestApi.onlineOver(e).then(function(e){t.istrue="1"==e.data.isture?"正":"伪",t.resIco="1"==e.data.isture?"resTrue":"resFalse"}),this.sort=getApp().globalData.sort,this.getBeIdentifiedListHand(),this.getChoseImg()},methods:{userReply:function(e){var i={id:this.id,tid:e.id,talk:{images:"",text:this.jtext,voice:this.voicePath,seconds:this.voiceNum}};0!=this.choselist.length?(i.talk.images=this.choselist.map(function(t){return JSON.stringify(t)}),i.talk=JSON.stringify(i.talk),this.$requestApi.roomtalk(i).then(function(e){1e3==e.code?(t.showToast({icon:"none",title:"回复成功"}),setTimeout(function(){t.navigateBack()},1e3)):t.showToast({icon:"none",title:e.message})})):t.showToast({icon:"none",title:"请选择补拍图片"})},reply:function(){var e={id:this.id,tid:"",talk:{images:"",text:this.jtext,voice:this.voicePath,seconds:this.voiceNum}};0!=this.choselist.length?(e.talk.images=this.choselist.map(function(t){return JSON.stringify(t)}),e.talk=JSON.stringify(e.talk),this.$requestApi.roomtalk(e).then(function(e){1e3==e.code?(t.showToast({icon:"none",title:"回复成功"}),setTimeout(function(){t.navigateBack()},1e3)):t.showToast({icon:"none",title:e.message})})):t.showToast({icon:"none",title:"请选择补拍图片"})},clickImg:function(t){t.succ=!t.succ,this.choseImgList.exp.push({}),this.choseImgList.upload.push({}),this.choseImgList.exp.pop(),this.choseImgList.upload.pop(),console.log(this.choseImgList,"qwertyuiop");var e=this.choseImgList.exp.filter(function(t){return 1==t.succ}),i=this.choseImgList.upload.filter(function(t){return 1==t.succ});this.choselist=[].concat(r(e),r(i)),this.choselist.push({}),this.choselist.pop()},closeBrand:function(){this.$refs.choseimg.close()},AddImgMessage:function(){this.$refs.choseimg.open()},getChoseImg:function(){var t=this,e={id:this.id};this.$requestApi.chooseimg(e).then(function(e){t.choseImgList=e.data})},startActive:function(t){this.activeStartIndex=t},startBtn:function(){var e=a(o.default.mark(function e(){var i,n;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return i={id:this.id,star:this.activeStartIndex,memo:this.activeStartText},e.next=3,this.$requestApi.postevaluate(i);case 3:n=e.sent,1e3==n.code&&(this.$refs.popup.close(),t.showToast({icon:"none",title:"评价成功"}),this.ident_success_btn_show=1);case 5:case"end":return e.stop()}},e,this)}));function i(){return e.apply(this,arguments)}return i}(),appraisalProductReport:function(){t.navigateTo({url:"/pages/appraisalProductReport/appraisalProductReport?id="+this.id})},change_text:function(t){this.istext=t,2==t&&(this.voicePath="")},startRecord:function(){console.log("开始录音"),this.record=!0,l.start({duration:6e4,format:"mp3"})},endRecord:function(){this.record=!1,console.log("录音结束"),l.stop()},playVoice:function(t,e,i){var o=this,n=t&&1==t?"user":"assayer";0==t||1==t?(this.toBePersonTeacherList[e][n]["voicePlay"]=!0,this.toBePersonTeacherList[e][n]["len"]=i.seconds,console.log("this.toBePersonTeacherList[index]",this.toBePersonTeacherList[e]),d.src=i.voice,d.play(),this.toBePersonTeacherList[e][n]["timer"]=setInterval(function(){o.toBePersonTeacherList[e][n].seconds>=1&&o.toBePersonTeacherList[e][n].seconds--},1e3)):(this.voicePlay=!0,this.timer&&clearInterval(this.timer),this.voicePath&&(d.src=this.voicePath,d.play(),this.timer=setInterval(function(){o.voiceNum>=1&&o.voiceNum--},1e3)))},openPopup:function(){this.$refs.popup.open()},getBeIdentifiedListHand:function(){var t=a(o.default.mark(function t(){var e,i;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e={id:this.id},t.next=3,this.$requestApi.getBeIdentifiedList(e);case 3:i=t.sent,1e3==i.code&&(this.datainfo=i.data.info,this.toBeIdentifiedList=i.data.list,this.attach=i.data.attach,i.data.exchange.forEach(function(t){t.assayer.images.forEach(function(e,i){t.assayer.images[i]=JSON.parse(e),t.assayer.len=t.assayer.seconds}),t.user&&t.user.images.forEach(function(e,i){t.user.images[i]=JSON.parse(e),t.user.len=t.user.seconds})}),console.log("sort",this.sort),0==this.sort?(this.toBePersonTeacherList=0==i.data.exchange.length?[{assayer:"",user:null}]:i.data.exchange,console.log(this.toBePersonTeacherList),this.toBePersonTeacherList[this.toBePersonTeacherList.length-1].user&&this.toBePersonTeacherList.push({assayer:"",user:null}),console.log("toBePersonTeacherList",this.toBePersonTeacherList)):this.toBePersonTeacherList=i.data.exchange);case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),closePopup:function(){this.$refs.popup.close()},userAddImgMessage:function(e){var i=this;console.log(e,"indexindex"),t.showActionSheet({itemList:["拍照","相册"],success:function(o){var n=o.tapIndex,s=["camera","album"];s=[s[n]],i.$uploadPhoto(s,function(o){console.log(i.toBePersonTeacherList[e].assayer.images.length),i.choselist.length>=i.toBePersonTeacherList[e].assayer.images.length?setTimeout(function(){t.showToast({icon:"none",title:"不得超过鉴定师补拍数量"})},200):i.choselist.push({image:o.data})})},fail:function(t){console.log(t.errMsg)}})},goScore:function(){console.log(this),console.log(this.id+"&&type="+this.state+"&&auth="+this.auth+"&&identTab="+this.identTab),t.navigateTo({url:"../onlineAppraisalDetail/onlineAppraisalDetail?id="+this.id+"&type=3&auth=1&identTab="+this.identTab})}},computed:{ismode:function(){var t=this.goodsInfo.mode;return 1==t?"标准鉴定":2==t?"精细鉴定":3==t?"专家鉴定":void 0}}};e.default=f}).call(this,i("543d")["default"])},f963:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"UniPopup",props:{animation:{type:Boolean,default:!0},type:{type:String,default:"bottom"},custom:{type:Boolean,default:!1},maskClick:{type:Boolean,default:!0},show:{type:Boolean,default:!0}},data:function(){return{ani:"",showPopup:!1}},watch:{show:function(t){t?this.open():this.close()}},created:function(){},methods:{clear:function(){},open:function(){var t=this;this.$emit("change",{show:!0}),this.showPopup=!0,this.$nextTick(function(){setTimeout(function(){t.ani="uni-"+t.type},30)})},close:function(t){var e=this;!this.maskClick&&t||(this.$emit("change",{show:!1}),this.ani="",this.$nextTick(function(){setTimeout(function(){e.showPopup=!1},300)}))}}};e.default=o},fa8e:function(t,e,i){"use strict";var o=i("c7b2"),n=i.n(o);n.a}},[["4d2c","common/runtime","common/vendor"]]]);