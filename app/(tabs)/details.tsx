import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import useTickerWebSocket from '@/hooks/useTickerWebSocket';
import { OrderBook } from '@/components/OrderBook';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { formatTradePair } from '@/util';

const PAGE_SIZE = 10;

export default function Details() {
  const params = useLocalSearchParams();
  const { ticker = [] } = params;
  const tickerInfo = (ticker as string)?.split(',')
  const tickerData = useTickerWebSocket(tickerInfo[0]);

  if (!tickerData) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.header}>
        {router?.canGoBack() && (
          <>
            <Pressable onPress={() => router.dismiss()}>
              <FontAwesome name="arrow-left" size={20} />
            </Pressable>
          </>
        )}
        <Text style={styles.headerText}>
          Details of {formatTradePair(tickerInfo[0])}
        </Text>
      </View>
        <ScrollView style={styles.container}>
            {
                tickerData ? (
                    <>
                    <View style={styles.rowItem}>
                        <Text style={styles.title}> Last price: </Text>
                        <Text style={styles.content}>${tickerData.last_price?.toFixed(2)}</Text>
                    </View>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                    <View style={styles.rowItem}>
                        <Text style={styles.title}>Ask price: </Text>
                        <Text style={styles.content}>${tickerData.ask?.toFixed(2)}</Text>
                    </View>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                    <View style={styles.rowItem}>
                        <Text style={styles.title}> Bid: </Text>
                        <Text style={styles.content}>${tickerData.bid?.toFixed(2)}</Text>
                    </View>

                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                    <View style={styles.rowItem}>
                        <Text style={styles.title}> Daily Change Relative: </Text>
                        <Text style={styles.content}>{tickerData.daily_change_relative?.toFixed(2)}%</Text>
                    </View>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                    <View style={styles.rowItem}>
                        <Text style={styles.title}> Volume: </Text>
                        <Text style={styles.content}>{tickerData.volume?.toFixed(2)}</Text>
                    </View>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                    <View style={styles.rowItem}>
                        <Text style={styles.title}> High: </Text>
                        <Text style={styles.content}>${tickerData.high?.toFixed(2)}</Text>
                    </View>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                    <View style={styles.rowItem}>
                        <Text style={styles.title}> Low: </Text>
                        <Text style={styles.content}>${tickerData.low?.toFixed(2)}</Text>
                    </View>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <OrderBook ticker={tickerInfo[0]} />

                    </>

                ) : <></>
            }

        </ScrollView>
        

      </SafeAreaView>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  headerText: {
    textAlign: "center",
    marginLeft: 20,
    fontWeight: "700",
    fontSize: 20,
  },
  wrapper: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff"
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {

  },
  content: {

  },
  titleView: {

  }
});
