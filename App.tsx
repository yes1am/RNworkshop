import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
 } from 'react-native';

 // 当上一次滑动到底部，加载错误时，此时即使是【向上】滑动
 // 只要还属于可以触发加载更多的区域内，就可以触发加载
 // 不一定【一定是向下拉】才可以进行加载
 // 豆瓣网的逻辑

 const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    // marginTop: 10,
    marginBottom: 1,
    height: 100,
    backgroundColor: 'blue',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
  height20: {
    height: 20,
  },
});

let id = 0;
let count = 0;

const EndReachedThreshold = 0.3;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
    this.flatListRef = React.createRef()
    this.onEndReached = this.onEndReached.bind(this);
    // 确保只有用户主动操作，才会触发加载更多
    this.hasDragged = false;
    this.direction = 'down'
    this.offset = 0;
  }

  loadData() {
    const {data} = this.state;
    // this.flatListRef.current.scrollToEnd()
    this.setState({
      loading: true,
    },() => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        console.log("滚动到底部 scrollToEnd", this.flatListRef.current.scrollToEnd)
        this.flatListRef && this.flatListRef.current && this.flatListRef.current.scrollToEnd  && this.flatListRef.current.scrollToEnd()
      })
    });
    setTimeout(() => {
      count++;
      // console.log('count', count);
      if (count <= 2) {
        for (let i = 0; i < 10; i++) {
          id++;
          data.push({
            id,
          });
        }
      }
      // 大于 2 认为请求出错的情况，不会新增数据
      this.setState({
        data,
        loading: false
      });
      console.log("处理完毕")
    }, 3000);
  }
  componentDidMount() {
    this.loadData();
  }
  componentWillUnmount() {
    this.setState = () => {}
  }
  onEndReached() {
    this.loadData();
  }
  render() {
    const {data, loading} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          ref={this.flatListRef}
          onScrollEndDrag={(e) => {
            if(loading) {
              return
            }
            const event = e.nativeEvent;
            const contentLength = event.contentSize.height;  // 内容高度
            const visibleLength = event.layoutMeasurement.height;  // 屏幕高度
            const offset = event.contentOffset.y;  // 滚动距离
            const distanceFromEnd = contentLength - visibleLength - offset;
            if(distanceFromEnd < 10 ) {
              console.log('到达底部, 正在请求数据');
              this.onEndReached()
            }
          }}
          // onScrollEndDrag={(e) => {
          //   // this.canRecord = false
          //   // let currentOffset = e.nativeEvent.contentOffset.y;
          //   // console.log(currentOffset, this.offset);
          //   // const oldDirection = this.direction;
          //   // let newDirection = 'notmodify';
          //   // if(currentOffset > this.offset) {
          //   //   newDirection = 'down'
          //   // } else if (currentOffset < this.offset) {
          //   //   newDirection = 'up'
          //   // }
          //   //   this.direction = newDirection
          //   //   console.log(newDirection)
          // }}
          // onScroll={(e) => {
          //   if(!this.canRecord) {
          //     return
          //   }
          //   console.log('正在滚动')
          //   let currentOffset = e.nativeEvent.contentOffset.y;
          //   const oldDirection = this.direction;
          //   let newDirection = 'notmodify';
          //   if(currentOffset > this.offset) {
          //     newDirection = 'down'
          //   } else if (currentOffset < this.offset) {
          //     newDirection = 'up'
          //   }
          //   this.direction = newDirection
          //   this.offset = currentOffset;
          //   console.log(this.direction)
          // }}
          // onEndReachedThreshold={EndReachedThreshold}
          showsVerticalScrollIndicator={false}
          data={data}
          // onScrollEndDrag={() => {console.log('拖拽结束'); }}
          // onScrollBeginDrag={(e) => {
          //   console.log("begin");
          //   if(loading) {
          //     return
          //   }
          //   // onScroll={(e) => {
          //     const event = e.nativeEvent;
          //     const contentLength = event.contentSize.height;  // 内容高度
          //     const visibleLength = event.layoutMeasurement.height;  // 屏幕高度
          //     const offset = event.contentOffset.y;  // 滚动距离
          //     const distanceFromEnd = contentLength - visibleLength - offset;
          //     if(distanceFromEnd < 50) {
          //       console.log('到达底部, 正在请求数据');
          //       this.onEndReached()
          //     }
          //     console.log('滚动动画结束',event.layoutMeasurement.height)
          //   }}
          // }}
          // onMomentumScrollBegin={(e) => {
          //   console.log('sss');
          //   this.offset = e.nativeEvent.contentOffset.y || 0;
          //   this.hasDragged = true;
          // }}
          // onScrollBeginDrag={(e) => {
          //   // console.log('sss');
          //   // this.offset = e.nativeEvent.contentOffset.y || 0;
          //   // this.canRecord = true
          // }}
          onMomentumScrollEnd={(e) => {
            // console.log("动画结束");
            // console.log("end", e);
            // this.hasDragged = false;
          // onScroll={(e) => {
            if(loading) {
              return
            }
            const event = e.nativeEvent;
            const contentLength = event.contentSize.height;  // 内容高度
            const visibleLength = event.layoutMeasurement.height;  // 屏幕高度
            const offset = event.contentOffset.y;  // 滚动距离
            const distanceFromEnd = contentLength - visibleLength - offset;
            if(distanceFromEnd < 10 ) {
              console.log('到达底部, 正在请求数据');
              this.onEndReached()
            }
            // console.log('滚动动画结束',event.layoutMeasurement.height)}}
          }}
          // onEndReached={() => {
          //   console.log("触发了 onEndReached");
          //   // if(this.hasDragged) {
          //     // this.hasDragged = false
          //   this.onEndReached()
          //   // }
          // }}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.text}>{item.id}</Text>
            </View>
          )}
          keyExtractor={(item, index) => String(item.id)}
          ListFooterComponent={
            loading
            ? <ActivityIndicator /> 
            // : <View style={styles.height20}><Text></Text></View>
            : null
          }
        />
      </View>
    );
  }
}

export default App;