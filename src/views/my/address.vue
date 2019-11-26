<template>
    <div class="addressInfo">
        <van-nav-bar title="收货地址" left-arrow @click-left="back" />
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            tel="telephone"
            @add="toAdd"
            @edit="toEdit"
            @select="addressIdChange"
            class="addressList"
        />
        <!-- 添加地址 -->  
        <van-popup v-model="isAdd" position="bottom" :style="{ height: '60%' }">
            <van-address-edit
                :area-list="areaList"
                show-set-default
                show-postal
                save-button-text="保存地址"
                @save="onAdd"
                class="addressChange"
            />
        </van-popup>
        
        <!-- 编辑地址 -->
        <van-popup v-model="isEdit" position="bottom" :style="{ height: '60%' }">
            <van-address-edit
                :area-list="areaList"
                show-postal
                show-delete
                :address-info="addressInfo"
                @save="onEdit"
                @delete="onDelete"
                class="addressChange"
            />
        </van-popup>
        
        <!-- 省市列表 -->
        <van-area :area-list="areaList" value="110101" v-show="isChoose"/>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { AddressEdit } from 'vant';
import { Area } from 'vant';
import { Popup } from 'vant';
import AreaList from '@/lib/area';
export default {
    data() {
        return {
            isAdd: false,
            isEdit: false,
            areaList:AreaList,
            addressInfo:{},
            isChoose:false,
            // 默认选择的ID
            chosenAddressId: '',
            editId:-1,
            list:[],
            userId: this.$store.state.userInfo.userId
        }
    },
    computed: {},
    mounted() {
        this.getData()
    },
    methods: {
        getData(){
            this.$axios.get(this.$baseUrl + "userAddress/list",{ params:{
                userId: this.userId
            }}).then((res)=>{
                if(res.data.code === 0 || res.data.code === 200){
                    // 遍历
                    this.list = res.data.data;
                    console.log('list', this.list)
                    if(this.list.length > 0){
                        this.list.map((item,index)=>{
                            if(item.isDefault){
                                this.chosenAddressId = item.id
                            }
                        })
                        if(!this.chosenAddressId) {
                            this.chosenAddressId = this.list[0].id
                        }                             
                    }else {
                        Toast.fail('快去新增一个收货地址吧!')
                    }
                    console.log(this.chosenAddressId)
                }else {
                    Toast.fail(res.data.message)
                }

            })
        },
        back(){
            this.$router.go(-1)
        }, 
        toAdd() {
            if(this.list.length>=5){
                Toast("最多只能设置五个常用地址")
                return
            }else{
                this.isAdd = true
            }
            
        },
        /**
         * 添加新的收货地址
         */
        onAdd(data) {
            (async () => {
                let newAddress={
                    name:data.name,
                    tel:data.tel,
                    isDefault:data.isDefault? 1 : 0,
                    province:data.province,
                    city:data.city,
                    county:data.county,
                    addressDetail:data.addressDetail,
                    postalCode:data.postalCode,
                    areaCode: data.areaCode,
                    address:`${data.province}${data.city}${data.county}${data.addressDetail}`
                }
                await this.addAddress(newAddress)
                console.log('newAddress',newAddress)
                this.isAdd=false
            })()
        },
        toEdit(item,index) {
            this.isEdit = true
            this.addressInfo=this.list[index]
            this.editId=index
        },
        /**
         * 修改收货地址
         */
        onEdit(item){
            (async () => {
                console.log('item',item)
                let newAddress={
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    isDefault: item.isDefault? 1 : 0,
                    province: item.province,
                    city: item.city,
                    county: item.county,
                    addressDetail: item.addressDetail,
                    postalCode: item.postalCode,
                    areaCode: item.areaCode,
                    address:`${item.province}${item.city}${item.county}${item.addressDetail}`
                }
                await this.addAddress(newAddress)
                console.log('newAddress',newAddress)
                this.isEdit=false
            })()
        },
        /**
         * 删除地址
         */
        onDelete() {
            this.list.splice(this.editId,1)
            this.isEdit = false
        },
        addAddress(newAddress) {
            newAddress.userId = this.userId
            // 新增
            this.$axios.post(this.$baseUrl + "userAddress/save",newAddress).then( res => {
                if(res.data.code === 0 || res.data.code === 200) {
                    Toast.success(res.data.msg);
                    this.getData();
                }else{
                Toast.fail(res.data.msg);
                }
            }).catch( err => {
                Toast.fail(err.message)
            })
        },
        addressIdChange(item, index) {
            (async () => {
                let newAddress={
                    id: item.id,
                    isDefault: 1
                }
                await this.addAddress(newAddress)
                console.log('newAddress',newAddress)
                this.isEdit=false
            })()  
        }
    }
}
</script>

<style lang="scss">
.addressInfo{
    position: fixed;
    background: white;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    z-index:99;
    overflow-x: hidden;
    overflow-y: auto;
    .addressList{
        height: auto;
        padding-bottom: 50px;
        .van-address-list__add{
            z-index: 666
        }
    }
    .addressChange{
        height: 100%;
        overflow: hidden;
        position: relative;
        .van-address-edit__buttons{
            padding: 10px 15px;
            width: calc(100% - 30px);
            position: absolute;
            bottom: 0;
            button{
                margin: 10px 0;
            }
        }
    }
}

</style>
