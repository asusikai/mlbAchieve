import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerData {
  id: number;
  name: string;
  isPlaying: boolean;
  height: number;
  weight:number;
  mainPosition: any;
  mainHand: any;
  debutDate: Date;
  retireDate: Date | null;
  email: string;
  image: string;
  // 만약 서버에서 profileImage를 Bolb 객체로 준다면
  // profileImage: Blob;
}
interface PlayerState {
  playerData: any,
  playerActive: any,
  playerHitting: any,
  playerPitching: any,
  playerFielding: any,
  error: Error | null,
}
const initialState: PlayerState = {
  playerData: null,
  playerActive: null,
  playerHitting: null,
  playerPitching: null,
  playerFielding: null,
  error: null,
}
export const playerDetailSlice = createSlice({
  name: 'playerDetail',
  initialState,
  reducers: {
    fetchPlayerDetailData: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
    },
    fetchPlayerDataSuccess: (state, action: PayloadAction<any>) => {
      const {activeYears, ...restData} = action.payload.info
      state.playerData = restData
      state.playerActive = activeYears
      state.playerHitting = action.payload.hitting
      state.playerPitching = action.payload.pitching
      state.playerFielding = action.payload.fielding
    },
    fetchPlayerDataError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
    },
  }
})

export const {
  fetchPlayerDetailData,
  fetchPlayerDataSuccess,
  fetchPlayerDataError
} = playerDetailSlice.actions
export default playerDetailSlice.reducer