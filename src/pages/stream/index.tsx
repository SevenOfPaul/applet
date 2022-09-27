import { useEffect, useState } from 'react'
import { Grid,GridItem, Skeleton } from '@nutui/nutui-react-taro'
//引入请求链接
import { baseUrl } from '../../data/index'
//引入less文件
import stream from './index.module.less'
import Taro, { useReachBottom } from '@tarojs/taro'
import { IRoom, IStreamDta } from './type'

export default function index() {
  //数据层
  const [query,setQuery]=useState<IStreamDta>({
    nowPage:0,
    pageCount:0
  })
  const [rooms,setRooms]=useState<IRoom[]>([])
  //show骨架屏
  const [showSkeleton ,changeShow]=useState<boolean>(false)
  //拿取数据
  useEffect(()=>{
    Taro.request({url:baseUrl.stream}).then(
      res=>{
    if(res.statusCode!==200) throw new Error(res.errMsg)
   let result=[...res.data.data.list]
    Taro.request({url:baseUrl.stream,data:{page:query.nowPage+1}}).then(
      res=>{
    if(res.statusCode!==200) throw new Error(res.errMsg)
    res.data.data.list=[...result,...res.data.data.list]
    changeShow(!showSkeleton)
    setQuery({nowPage:query.nowPage++,pageCount:res.data.data.pageCount})
     setRooms(res.data.data.list)
      }
    )
      }
    ).catch(err=>{
      console.log(err)
    })
  },[])
  //触底更新
  useReachBottom(()=>{
    if(query.nowPage>query.pageCount){
      Taro.showToast({
        title: '数据都用光啦',
        icon: 'error',
        duration: 2000
      })
 
    }else{
    Taro.request({url:baseUrl.stream,data:{page:query.nowPage+1}}).then(
      res=>{
    if(res.statusCode!==200) throw new Error(res.errMsg)
    console.log(res)
     setQuery({nowPage:query.nowPage+1,pageCount:res.data.data.pageCount})
       setRooms([...rooms,...res.data.data.list])
      }
    ).catch(err=>{
      console.log(err)
    })
    }
  })
  return (
  <view>
    {showSkeleton?
     <Grid columnNum={2}>
    {rooms.map(room=> <GridItem className={stream.room}>
      <view className={stream.hn}>
        <text>{room.hn}</text>
      </view>
      <img className={stream.roomPic} src={`https://images.weserv.nl/?url=${room.verticalSrc}`} />
      <view className={stream.nickname}>
        <text>{room.nickname}</text>
      </view>
      <img className={stream.avatar} src={`https://images.weserv.nl/?url=${room.avatar}`}/>
      <text className={stream.roomName}>{room.roomName}</text>
    </GridItem>)}
    </Grid>:<Skeleton width="400Px" height="30Px" row={10} title animated />
}
  </view>
  )
}
