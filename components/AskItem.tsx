import { Order } from "@/api";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const AskItem: React.FC<{ item: Order }> = React.memo(({ item }) => {
    return (
      <View
        key={item[0].toString()}
        style={styles.rowItem}
      >
        <Text style={styles.num}>{item[0]}</Text>
        <Text style={styles.num}>{Math.abs(item[2]).toFixed(2)}</Text>
      </View>
    );
  });

  const styles = StyleSheet.create({
    rowItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    num: {
        fontSize: 12
    }
  })