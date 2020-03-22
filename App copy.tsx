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
    this.onEndReached = this.onEndReached.bind(this);
    // 确保只有用户主动操作，才会触发加载更多
    this.hasDragged = false;
  }

  loadData() {
    const {data} = this.state;
    this.setState({
      loading: true,
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
        loading: false,
      });
    }, 3000);
  }
  componentDidMount() {
    this.loadData();
  }
  componentWillUnmount() {
    this.setState = () => {}
  }
  onEndReached() {
    console.log('到达底部, 正在请求数据');
    this.loadData();
  }
  render() {
    const {data, loading} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          // 只有主动拖拽才会触发，onScrollBeginDrag 和 onScrollEndDrag
          // 当 loader 高度发生变化时,导致的 onScroll 事件触发，不会触发以下两个事件
          // 拖拽开始 => 手指开始触碰屏幕开始滑动
          // 拖拽结束 => 手指离开屏幕
          // onScrollEndDrag={() => {console.log('拖拽结束',this.hasDragged); }}
          // onScrollBeginDrag={() => {console.log('拖拽开始', this.hasDragged); this.hasDragged = true}}

          // 如果 loader 高度发生变化，会触发 onScroll 事件，导致死循环
          onScroll={() => {console.log('正在滚动')}}
          
          // 滚动开始和拖拽结束时间差不多,在拖拽结束之后触发
          // 但是滚动结束，可能发生在拖拽结束之后，因为存在惯性的运动


          onMomentumScrollBegin={() => {console.log('滚动动画开始'); this.hasDragged = true}}
          // onMomentumScrollEnd={(e) => {console.log('滚动动画结束',e)}}
          onMomentumScrollEnd={(e) => {
            const event = e.nativeEvent;
            const contentLength = event.contentSize.height;  // 内容高度
            const visibleLength = event.layoutMeasurement.height;  // 屏幕高度
            const offset = event.contentOffset.y;  // 滚动距离
            const distanceFromEnd = contentLength - visibleLength - offset;
            if(distanceFromEnd < 20) {
              this.onEndReached()
            }
            // console.log('滚动动画结束',event.layoutMeasurement.height)}}
          }}
          // onMomentumScrollEnd={(e) => {console.log('滚动动画结束',e.nativeEvent.contentOffset.y,this.hasDragged); this.hasDragged = false}}

          // onMomentumScrollBegin={() => {this.hasDragged = true}}
          // onMomentumScrollEnd={() => {this.hasDragged = false}}
          // onEndReached={() => {
          //   console.log("触发了 onEndReached");
          //   if(this.hasDragged) {
          //     // this.hasDragged = false
          //     this.onEndReached()
          //   }
          // }}
          onEndReachedThreshold={EndReachedThreshold}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.text}>{item.id}</Text>
            </View>
          )}
          keyExtractor={(item, index) => String(item.id)}
          ListFooterComponent={
            loading 
            ? <ActivityIndicator /> 
            // : <View style={styles.height20}><Text>没有了</Text></View>
            : null
          }
        />
      </View>
    );
  }
}

export default App;