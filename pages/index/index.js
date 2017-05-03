Page({

  goToVr:function(){
    wx.navigateTo({
      url: '../vr/vr',
    })
  },

  goToSao:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  data:{
    tit: "速度与激情",
    price: "9.00",
    num: 123456
  },
  onLoad:function(){
      console.log('***************');
       wx.login({
        success: function (code) {
          console.log(code);
          wx.getUserInfo({
            success: function (res) {
              console.log('##########');
              console.log(res);
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
  }

})