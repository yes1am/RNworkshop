# 基于 [create-react-native-app](https://reactnative.dev/blog/2017/03/13/introducing-create-react-native-app.html?utm_campaign=React%2BNewsletter&utm_medium=web&utm_source=React_Newsletter_67) 的 RN 本地开发环境

## 痛点
在实际工作开发中，我们开发的 RN 代码可能只是作为公司整体 RN 代码中的一个小插件。  

但是在本地开发的时候，必须将公司整体的 RN 代码运行起来，这样可能引入了一些问题:  

**繁杂的业务代码，底层组件的封装导致调试难度加大，各种奇怪的 console.log, 或者由于某些业务代码导致 chrome 远程调试失败**  

以致于我们想要个纯净环境写写 demo 来理解 RN 组件(如 FlatList)的 Api 都变得异常困难，基于此，我们需要一个**最基础的，易调试的** RN 开发环境。 

## Why create-react-native-app?

RN 的本地开发环境依赖较多，可能会涉及 XCode，JDK，Android Stdio 等。 而使用 create-react-native-app 可以省略开发环境的配置。   

只需运行该项目，手机端安装 `expo` app 扫描项目生成的二维码即可调试。