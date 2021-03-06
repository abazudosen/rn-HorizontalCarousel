import React, { useEffect } from "react";
import { LogBox } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  Animated,
  Text,
  Image,
  FlatList,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
} from "react-native";
//import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get("screen");

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;

const images = [
  "https://static.zara.net/photos///2020/I/0/2/p/7545/373/800/2/w/1024/7545373800_2_1_1.jpg?ts=1604057497725",
  "https://static.zara.net/photos///2020/I/0/3/p/3905/560/506/2/w/1024/3905560506_3_1_1.jpg?ts=1593690131479",
  "https://static.zara.net/photos///2020/I/1/2/p/2406/520/040/2/w/1024/2406520040_2_2_1.jpg?ts=1603715995175",
  "https://static.zara.net/photos///2020/I/0/2/p/7545/373/800/2/w/1024/7545373800_2_3_1.jpg?ts=1604057543631",
  "https://static.zara.net/photos///2020/I/0/2/p/7545/373/800/2/w/1024/7545373800_6_4_1.jpg?ts=1604046334912",
  "https://static.zara.net/photos///2020/V/0/3/p/6048/512/406/2/w/1024/6048512406_2_1_1.jpg?ts=1591792136907",
  "https://static.zara.net/photos///2020/I/0/1/p/6254/138/800/2/w/1024/6254138800_6_2_1.jpg?ts=1598600637783",
  "https://static.zara.net/photos///2020/I/0/2/p/5372/315/807/2/w/1024/5372315807_2_1_1.jpg?ts=1605516779258"
];

const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const product = {
  title: "SOFT CHECKED BLACK & WHITE SHIRT LONGSLEVES",
  description: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ",
    'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"',
  ],
  price: "29.99£",
};

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
      LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, [])

  return (
    <View style={{flex: 1}}>
      <StatusBar hidden />
      <View style={{ height: ITEM_HEIGHT, overflow: "hidden" }}>
        <Animated.FlatList
          data={images}
          keyExtractor={(_, index) => index.toString()}
          snapToInterval={ITEM_HEIGHT}
          showVerticalIndicators={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          decelerationRate="fast"
          renderItem={({ item }) => {
            return (
              <View>
                <Image source={{ uri: item }} style={styles.image} />
              </View>
            );
          }}
        />
        <View style={styles.pagination}>
          {images.map((_, index) => {
            return <View key={index} style={[styles.dot]} />;
          })}
          <Animated.View
            style={[
              styles.dotIndicator,
              {
                transform: [
                  {
                    translateY: Animated.divide(
                      scrollY,
                      ITEM_HEIGHT
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, DOT_INDICATOR_SIZE],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
      <BottomSheet
        initialSnapIndex={0}
        snapPoints={[height - ITEM_HEIGHT, height]}
      >
        <BottomSheetScrollView
          style={{ backgroundColor: "white" }}
          contentContainerStyle={{ padding: 20 }}
        >
          <Text
            style={{
              fontWeight: "800",
              fontSize: 16,
              textTransform: "uppercase",
            }}
          >
            {product.title}
          </Text>
          <Text style={{ fontSize: 16 }}>{product.price}</Text>
          <View style={{ marginVertical: 20 }}>
            {product.description.map((text, index) => {
              return <Text key={index} style={{marginBottom: 10, lineHeight: 22}}>{text}</Text>;
            })}
          </View>
          <View style={{ marginVertical: 20 }}>
            {product.description.map((text, index) => {
              return <Text key={index} style={{marginBottom: 10, lineHeight: 22}}>{text}</Text>;
            })}
          </View>
          <View style={{ marginVertical: 20 }}>
            {product.description.map((text, index) => {
              return <Text key={index} style={{marginBottom: 10, lineHeight: 22}}>{text}</Text>;
            })}
          </View>
          <View style={{ marginVertical: 20 }}>
            {product.description.map((text, index) => {
              return <Text key={index} style={{marginBottom: 10, lineHeight: 22}}>{text}</Text>;
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheet> 
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  pagination: {
    position: "absolute",
    top: ITEM_HEIGHT / 2,
    left: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: "#333",
    marginBottom: DOT_SPACING,
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 1,
    borderColor: "#333",
    position: "absolute",
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
});
