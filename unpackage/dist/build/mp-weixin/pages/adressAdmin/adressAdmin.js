(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/adressAdmin/adressAdmin"],{2312:function(e,t,n){"use strict";n.r(t);var o=n("b764"),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);t["default"]=r.a},"26dd":function(e,t,n){},"3c10":function(e,t,n){"use strict";var o=n("26dd"),r=n.n(o);r.a},"534e":function(e,t,n){"use strict";n.r(t);var o=n("e161"),r=n("2312");for(var i in r)"default"!==i&&function(e){n.d(t,e,function(){return r[e]})}(i);n("3c10");var c=n("2877"),s=Object(c["a"])(r["default"],o["a"],o["b"],!1,null,"ace0358e",null);t["default"]=s.exports},b402:function(e,t,n){"use strict";(function(e){n("5605"),n("921b");o(n("66fd"));var t=o(n("534e"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},b764:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("a5ac"));function r(e){return e&&e.__esModule?e:{default:e}}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){c(e,t,n[t])})}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(){return Promise.all([n.e("common/vendor"),n.e("components/w-picker/w-picker")]).then(n.bind(null,"352a"))},u=[{name:"username",checkType:"string",checkRule:"1,12",errorMsg:"姓名应为1-12个字符"},{name:"tel",checkType:"phoneno",checkRule:"",errorMsg:"请输入正确手机号"},{name:"code",checkType:"zipcode",checkRule:"",errorMsg:"请输入正确邮政编码"},{name:"address",checkType:"notnull",checkRule:"",errorMsg:"地址不能为空"},{name:"detailAddress",checkType:"notnull",checkRule:"",errorMsg:"地址不能为空"}],a={components:{wPicker:s},data:function(){return{type:"",id:"",userInfo:{receiver:"",phone:"",postcode:"",area:"",address:""}}},computed:{},onLoad:function(t){this.type=t.type,this.id=t.id||"",console.log(this.type),e.setNavigationBarTitle({title:1==this.type?"新增地址":"编辑地址"})},onShow:function(){""!=this.id&&this.getaddressInfo()},methods:{getaddressInfo:function(){var e=this,t={id:this.id};this.$requestApi.getaddressinfo(t).then(function(t){e.userInfo=i({},t.data)})},getAddress:function(){this.$refs["getAddress"].show()},onConfirm:function(e){this.userInfo.area=e.result,console.log("修改")},formSubmit:function(t){var n=t.detail.value,r=o.default.check(n,u);if(r){var i={id:this.id,type:"add",address:JSON.stringify(this.userInfo)};console.log(this.type,"typetype"),1==this.type?(i.type="add",console.log(22222)):(i.type="edit",console.log(33333)),this.$requestApi.addressop(i).then(function(t){e.showToast({icon:"none",title:"操作成功"}),setTimeout(function(){e.navigateBack()},1e3)})}else e.showToast({title:o.default.error,icon:"none"})}}};t.default=a}).call(this,n("543d")["default"])},e161:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return r})}},[["b402","common/runtime","common/vendor"]]]);