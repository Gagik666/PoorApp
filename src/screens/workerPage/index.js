export const reduser = (state, action) => {
  if (action.type === "change") {
    state.lat = action.payload.lat;
    state.long = action.payload.long;
    return {
      state,
    };
  }
};

export const setTimeInfoStatus = async (status) => {
  try {
    await AsyncStorage.setItem("timeInfo", status);
  } catch (eror) {
    console.log(eror);
  }
};

export const setDayInfo = async (txt) => {
  try {
    await AsyncStorage.setItem("day", txt);
  } catch (eror) {
    console.log(eror);
  }
};
