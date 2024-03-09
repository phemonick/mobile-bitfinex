import { Order, Precision } from "@/api";
import { useBook } from "@/hooks/useBook";
import { formatTradePair } from "@/util";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { BidItem } from "./BidItem";
import { AskItem } from "./AskItem";

export const OrderBook: React.FC<{ ticker: string }> = React.memo(({ ticker }) => {
    const [precision, setPrecision] = useState<Precision>("P0");

    const { book, isConnected, toggleConnection } = useBook(
        ticker,
        precision
      );

      const calculatePrecisionLevel = (precisionString: string): number | null => {
        if (
          typeof precisionString === "string" &&
          !isNaN(Number(precisionString[1]))
        ) {
          return parseInt(precisionString[1]);
        }
        return null;
      };
    
      const isIncrementDisabled = useMemo(() => {
        const precisionLevel = calculatePrecisionLevel(precision);
        return precisionLevel === null || precisionLevel === 4;
      }, [precision]);
    
      const isDecrementDisabled = useMemo(() => {
        const precisionLevel = calculatePrecisionLevel(precision);
        return precisionLevel === null || precisionLevel === 0;
      }, [precision]);
    
      const toggle = useCallback(() => {
        toggleConnection();
        setPrecision("P0" as Precision);
      }, [toggleConnection]);

      const bids = useMemo(() => {
        return book.filter(([, , amount]) => amount >= 0).slice(0, 10);
      }, [book]);
    
      const asks = useMemo(() => {
        return book.filter(([, , amount]) => amount < 0).slice(0, 10);
      }, [book]);

      const increment = () => {
        const presc = parseInt(precision[1]) + 1;
        if (presc <= 4) {
          setPrecision(`P${presc}` as Precision);
        }
      };
    
      const decrement = () => {
        const presc = parseInt(precision[1]) - 1;
        if (presc >= 0) {
          setPrecision(`P${presc}` as Precision);
        }
      };

    return (
      <View style={styles.headerContainer}>
        <View style={styles.topContent}>
            <Text style={styles.title}>ORDER BOOK ( {formatTradePair(ticker)} )</Text>
            <Pressable
            style={styles.btn}
            onPress={toggle}
            >
            <Text style={styles.btnText}>
                {isConnected ? "Disconnect" : "Connect"}
            </Text>
            </Pressable>
        </View>
        <View style={styles.margin} />
        {isConnected && (
            <View style={styles.containerView}>
                <Pressable
                style={[styles.prescIncr]}
                onPress={decrement}
                disabled={isDecrementDisabled}
                >
                <Text style={styles.btnText}>-</Text>
                </Pressable>
                <Text>{precision}</Text>
                <Pressable
                style={[styles.prescIncr]}
                onPress={increment}
                disabled={isIncrementDisabled}
                >
                <Text style={styles.btnText}>+</Text>
                </Pressable>
            </View>
            )}
            <View style={styles.margin} />
        {
            book?.length === 0 ? 
            <Text style={styles.displayText}>
                Click the connect button to view Order
            </Text>
            : 
            (
                <View style={styles.rowItem}>  
                <View style={styles.bidView}>
                   {bids.map((bid) => (
                        <BidItem key={bid[0].toString()} item={bid} />
                    ))}
                </View>
                <View style={styles.askView}>
                    {asks.map((ask) => (
                        <AskItem key={ask[0].toString()} item={ask} />
                    ))}
                </View>
                </View>
            )
        }
        
      </View>
    );
  });

  const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "column",
      },
      displayText: {
        textAlign: "center"
      },
      topContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
      },
    title: {
        fontSize: 16,
        fontWeight: "500",
    },
    containerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "50%"
    },
    btn: {
        backgroundColor: "#0C11FF",
        borderRadius: 2,
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    prescIncr: {
        backgroundColor: "#838FAE",
        borderRadius: 2,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    btnText: {
        color: "#fff"
    },
    margin: {
        marginBottom: 10,
    },
    rowItem: {
        flexDirection: "row"
    },
    bidView: {
        flex: 1,
        backgroundColor: "#90ee90"
    },
    askView: {
        flex: 1,
        backgroundColor: "#ffcccb"
    }
  })