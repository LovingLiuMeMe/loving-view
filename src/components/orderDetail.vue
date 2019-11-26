<template>
  <div>
    <van-nav-bar title="订单详情" left-arrow @click-left="back" />
    <div class="address-container">
      <div class="address" v-if="userAddressArray.length > 0">
          <h3><span>收货人:{{activeUserAddress.name}}</span><span>{{activeUserAddress.tel}}</span></h3>
          <p>收货地址: {{activeUserAddress.province+activeUserAddress.city+activeUserAddress.county+activeUserAddress.addressdetail}}</p>
      </div>
      <div class="address" v-else>
        点击创建新的
      </div>
    </div>
    <div class="goodsinfo">
      <div class="goodsInfoList" v-for="item in order.orderItemList" :key="item.orderId">
        <van-card
          :num="item.goodsCount"
          :price="item.sellingPrice"
          :desc="item.goodsIntro"  
          :title="item.goodsName"
          :thumb="item.goodsCoverImg">
          <div slot="footer">
            <van-button size="mini" @click="open(item.goodsId)">查看</van-button>
          </div>
        </van-card>
        </div>
    </div>
    <div>
      <van-submit-bar v-if="order.orderStatus === 0"
        :price="order.totalPrice * 100"
        button-text="提交订单"
        @submit="onSubmit"
      />
      <div class="total" v-else>
        <span>合计:</span>
        <span class="total-price">¥{{order.totalPrice}}</span>
      </div>       
    </div>
  </div>
</template>

<script>
// 订单生成步骤  生成预订单详情 -> 生成未付款订单 -> 去付款 ->.....
import { Dialog } from 'vant'
export default {
  data() {
    return {
      order: {},
      userAddressArray: [],
      userId: this.$store.state.userInfo.userId
    };
  },
  computed: {
    activeUserAddress() {
      let defaultUserAddress = ''
      defaultUserAddress = this.userAddressArray.find(v => {
        if(v.isDefault === 1) {
          return v;
        }
      })
      if(!defaultUserAddress) {
        defaultUserAddress = this.userAddressArray[0]
      }
      return defaultUserAddress
    }
  },
  mounted() {
    this.getUserAddress()
    this.getOrder()
  },
  methods: {
    getUserAddress() {
      this.$axios.get(this.$baseUrl+"userAddress/list", {params: {userId: this.userId}}).then((res)=> {
        this.userAddressArray = res.data.data
      })
    },
    getOrder() {
      let id = this.$route.query.id
      if(id){
        // 获取订单信息
        this.$axios.get(this.$baseUrl+"userOrder/info",{ params: {
            orderId: id
        }}).then(res => {
          let tempOrder = {}
          if(res.data.code === 0 || res.data.code === 200 ){
            this.order = res.data.data
          }
        }).catch(err => {
            Toast.fail(err.message);
        })
      }else {
        console.log('tempOrder', this.$store.state.tempOrder)
        this.order = this.$store.state.tempOrder
      }
    },
    back() {
      this.$router.go(-1)
    },
    onSubmit() {
      Dialog.confirm({
        title: '支付',
        message: `确认支付${this.order.totalPrice}吗?`
      }).then(() => {
        // 生成付款订单
        this.order.orderStatus = 1
        this.order.payStatus = 1
        this.order.userName = this.activeUserAddress.name
        this.order.userPhone = this.activeUserAddress.tel
        this.order.extraInfo = '手机客户端'
        this.order.userAddress = this.addressObjectToStr(this.activeUserAddress)
        this.order.userId = 1
        this.$axios.post(this.$baseUrl+"userOrder/save",this.order).then(res => {
          console.log(res)
        })
      }).catch(() => {
        this.order.userName = this.activeUserAddress.name
        this.order.userPhone = this.activeUserAddress.telephone
        this.order.userAddress = this.addressObjectToStr(this.activeUserAddress)
        this.order.userId = 1
        // 生成未付款订单
        this.$axios.post(this.$baseUrl+"userOrder/save",this.order).then(res => {
          console.log(res)
        })
      });
    },
    open(id){
        this.$router.push({path:"goodDetail",query:{id:id}})
    },
    addressObjectToStr(address){
      let addressStr = ''
      let keys = Object.keys(address)
      keys.map((key,index) => {
        addressStr += (key + '=' + address[key])
        if(index !== (keys.length - 1)){
          addressStr += ";"
        }
      })
      return addressStr
    }
  }
};

</script>
<style lang='scss' scoped>
.address-container {
  position: relative;
}
.address {
  padding: 20px;
  display: flex;
  flex-direction: column;
  h3 {
    line-height: 30px;
    display: flex;
    justify-content: space-between;
  }
}
.address::before {
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    position: absolute;
    background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background-size: 80px;
}
.total {
  height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 50px;
  text-align: right;
  span:nth-child(1) {
    font-weight: 500;
    text-align: right;
    color: #323233;
    padding-right: 12px;
  }
  .total-price {
    color: #f44;
    font-size: 18px;
    padding-right: 20px;
  }
}
</style>