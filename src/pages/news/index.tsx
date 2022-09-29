import { Component, PropsWithChildren, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import newsStyle from "./index.module.less"
import { baseUrl } from '../../data/index'
import Taro from '@tarojs/taro'
import INewsData from './type'
import { Grid, GridItem,Skeleton } from '@nutui/nutui-react-taro'

export default function index() {
 const [newsList,setList]=useState<Inews>([])
   const [showSkeleton ,changeShow]=useState<boolean>(false)
  useEffect(()=>{
    try{
  (async()=>{
   let listRes=await  Taro.request({url:`${baseUrl.news}`})
   if(listRes.statusCode!==200) throw new Error(listRes.errMsg)
   setList(JSON.parse(listRes.data.slice(0,listRes.data.length-4)).news)
     changeShow(true)
  })()
}catch(e){
   Taro.showToast({
        title: '网络出错了',
        icon: 'error',
        duration: 2000
      })
}
  },[])
  return (
    <view>
     {showSkeleton?<Grid columnNum={1}>
   {newsList.map(news=>{
    return (
      <GridItem className={newsStyle.item}>
      <text>{news.title}</text>
      <img src={news.image}/>
      </GridItem>
      )
   })}
    </Grid>:<Skeleton width="400Px" height="30Px" row={10} title animated />
  }</view>
  )
}

