<template>
  <div>
    <van-panel v-for="(order,i) in filterOrderList" :key="i" class="orders">
      <div slot="header" class="order-header">
          <van-row>
              <van-col span="18" style="font-size:18px;line-height:30px">
                  <p>Apple官方旗舰店</p>
              </van-col>
              <van-col span="6" style="font-size:16px;line-height:30p;color:red">
                  <p v-if="order.orderStatus === 0" class="orderStatus" >未付款</p>
                  <p v-else-if="order.orderStatus === 1" class="orderStatus">已付款</p>
                  <p v-else-if="order.orderStatus === 2" class="orderStatus">已发货</p>
                  <p v-else-if="order.orderStatus === -1" class="orderStatus">客户已取消</p>
                  <p v-else-if="order.orderStatus === -2" class="orderStatus">订单超时</p>
                  <p v-else-if="order.orderStatus === -3" class="orderStatus">商家已取消</p>
                  <p v-else class="orderStatus">订单异常</p>
              </van-col>
          </van-row>
          <van-row>
              <van-col span="12" style="font-size:12px;line-height:30p;color:#ccc">
                  <p>订单号：{{ order.orderId }}</p>
              </van-col>
              <van-col span="12" style="font-size:12px;line-height:30p;color:#ccc">
                  <p>下单时间：{{ order.createTime }}</p>
              </van-col>
          </van-row>
      </div>
      
      <div class="order-body" v-for="item in order.orderItemList" :key="item.orderItemId">
          <div class="orderImage">
              <img :src="item.goodsCoverImg" alt="图片">
          </div>
          <div class="order-text">
              <div class="orderName"><span>{{item.goodsName}}</span></div>
              <div class="orderColor"><span>商品详情:{{item.goodsIntro}}</span></div>
              <div class="orderPrice"><span>￥{{item.sellingPrice}}</span></div>
          </div>
          <p >×{{item.goodsCount}}</p>
      </div>
      <div slot="footer" class="order-total">
          <van-row>
              <van-col span="14" style="font-size:14px;line-height:30px">
                  共<i style="color:red">&nbsp;{{order.orderItemList.length}}&nbsp;</i>件商品 总计:&nbsp;<i style="color:red">￥{{order.totalPrice}}</i>
              </van-col>
              <van-col span="10" style="display:flex;justify-content: space-around;">
                <van-button size="small" type="danger" @click="orderdel(i)">删除</van-button>
                <van-button size="small" plain hairline type="primary" @click="open(order.orderId)">查看</van-button>
              </van-col>
          </van-row>
      </div>
    </van-panel>
  </div>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Array,
      default: function(){
        return []
      }
    },
    orderStatus: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
    };
  },
  computed: {
    filterOrderList() {
      console.log(this.orderStatus)
      console.log(this.orderList)
      if(this.orderStatus != null){
        return this.orderList.filter(v => {
          if(v.orderStatus === this.orderStatus){
            return true
          }
        })
      }
      return this.orderList
    }
  },
  methods: {
    open(orderId) {
      this.$router.push({path:"orderDetail",query:{id:orderId}})
    }
  }
}

</script>
<style lang='scss' scoped>
.orderStatus {
  font-size: 14px;
  text-align: right;
}
</style>