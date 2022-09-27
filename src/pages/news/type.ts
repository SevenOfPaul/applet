interface IVideo {
  coverUrl:string
  duration: string
  id: number
  playUrl:string,
  title: string,
  userName: string
  userPic: string
}
interface INewsData{
    list:IVideo[],
    total:number
}
export default INewsData;
