import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Order = [number, number, number];

interface BookState {
  data: Order[];
}

const initialState: BookState = {
  data: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    updatebook: (state, action: PayloadAction<Order[]>) => {
        const book = action.payload;
  
        if (Array.isArray(book) && Array.isArray(book[0])) {
          state.data = book;
        } else if (Array.isArray(book) && typeof book[0] === "number") {
          // receive the book snapshot and create your in-memory book structure
          const [price, count, amount] = book as unknown as Order;
  
          // delete the price level if exist
          const newBook = state.data.filter(([_price]) => _price !== price);
  
          // update
          if (count > 0) {
            newBook.push([price, count, amount]);
          }
  
          // Sort by price
          newBook.sort(([p1, , a1], [p2, , a2]) =>
            a1 > 0 ? p2 - p1 : p1 - p2
          );
  
          state.data = newBook;
        }
      },
    clearbook: () => initialState,
  },
});

export const { updatebook, clearbook } = bookSlice.actions;

export default bookSlice.reducer;
