import { ActivityIndicator, FlatList, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatTradePair } from '@/util';
import { router } from 'expo-router';
import { useGetTickersQuery } from '@/api';

const PAGE_SIZE = 15;

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data = [], error, isLoading, refetch } = useGetTickersQuery({
    page: currentPage,
    limit: PAGE_SIZE,
  });


  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderFooter = () => {
    return isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => router.navigate({ pathname: "(tabs)/details", params: { ticker: item } })} style={styles.contentContainer}>
      <Text style={styles.contentText}>{item[0] && formatTradePair(item[0])}</Text>
      <Text style={styles.contentText}>{item[7] && item[7]}</Text>
      <View style={item[6] > 0 ? styles.greenContainer : styles.redContainer}>
        <Text style={styles.changeText}>{item[6] && item[6]?.toFixed(2)}%</Text>
      </View>
    </Pressable>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>All Crypto info</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}> Crypto Name </Text>
          <Text style={styles.headerTitle}> Last </Text>
          <Text style={styles.headerTitle}> 24H chg % </Text>
        </View>
        <FlatList
          data={data.slice(0, currentPage * PAGE_SIZE)}
          renderItem={renderItem}
          keyExtractor={(item) => item[0]}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />

      </View>
    </SafeAreaView>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    padding: 20,
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: '500'
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  contentText: {
    color: "#000",
    fontSize: 12,
    fontWeight: '400',
    textAlign: "left"
  },
  contentTextView: {
    alignItems: "flex-start"
  },
  changeText: {
    color: "#fff",
    fontSize: 12,
  },
  redContainer: {
    backgroundColor: "red",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: 60,
    justifyContent: 'center',
    alignItems: "center",
  },
  greenContainer: {
    backgroundColor: "green",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: 60,
    justifyContent: 'center',
    alignItems: "center",
  }
});
