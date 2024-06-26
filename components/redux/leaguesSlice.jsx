import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  leagues: [],
  status: 'idle',
  error: null,
  openModal: false,
};


// fetchLeagues  is used to fetch the list of leagues.
export const fetchLeagues = createAsyncThunk('fetchLeagues', async (userId) => {
  try {
    const response = await axios.post(
      'https://api.bracketocracy.com/v1.0/api.php?query=league/getLeagues',
      { userId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.data.leagues;
  } catch (error) {
    return error;
  }
});


// createNewLeague  is used to create a new league.
export const createNewLeague = createAsyncThunk('createNewLeague', async ({ title, members, userId }) => {
  try {
    const response = await axios.post(
      'https://api.bracketocracy.com/v1.0/api.php?query=league/createLeague',
      {
        title,
        members,
        userId,
        allowInvitation: 0,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
});


// editLeague is used to edit an existing league.
// As i am trying to do for editLeague, i am getting { "success": false,"message": "Invalid request name"}
//if required payload is given I will update my code
  

// export const editLeague = createAsyncThunk('editLeague', async ({ leagueId, title, members, userId }) => {
//   try {
//     const response = await axios.post(
//       'https://api.bracketocracy.com/v1.0/api.php?query=league/editLeague',
//       {
//         leagueId,
//         title,
//         members,
//         userId,
//         allowInvitation: 0,
//       },
//       {
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//     return { leagueId, title, members };
//   } catch (error) {
//     return error;
//   }
// });




// deleteLeague is used to delete an existing league.
export const deleteLeague = createAsyncThunk('deleteLeague', async (leagueId) => {
  try {
    const response = await axios.post(
      'https://api.bracketocracy.com/v1.0/api.php?query=league/deleteLeague',
      { userId: '33',
        leagueId,
         },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return leagueId;
    
  } catch (error) {
    throw error;
  }
});

const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {
    //  Toggle the modal visibility. 
    toggleModal: (state) => {
      // Toggle the value of the openModal property to
      // show or hide the modal.
      state.openModal = !state.openModal;
    },
    
    toggleMembers: (state, action) => {
      // Toggle members based on the league id which is passed as an action.
      state.leagues = state.leagues.map((league) =>
        league.id === action.payload ? { ...league, isOpen: !league.isOpen } : league
      );
    },
  },
  
    // The `extraReducers` function is used to define additional reducers for the
    // `leaguesSlice` reducer. It defines reducers for the `fetchLeagues` and
    // `createNewLeague` async thunks. It also defines reducers for the status and
    // error properties of the state.
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagues.pending, (state) => {
        // Set the status of the state to 'loading' when the async thunk is pending
        state.status = 'loading';
      })
      .addCase(fetchLeagues.fulfilled, (state, action) => {
        // Set the status of the state to 'idle' when the async thunk is fulfilled
        // and update the leagues property 
        state.status = 'idle';
        state.leagues = action.payload;
      })
      .addCase(fetchLeagues.rejected, (state, action) => {
        // Set the status of the state to 'error' when the async thunk is rejected
        // and update the error property with the error message
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(createNewLeague.fulfilled, (state) => {
        // Set the status of the state to 'idle' when the async thunk is fulfilled
        // and close the modal by setting the openModal to false
        state.status = 'idle';
        state.openModal = false;
      })
      .addCase(createNewLeague.rejected, (state, action) => {
        // Set the status of the state to 'error' when the async thunk is rejected
        // and update the error property with the error message
        state.status = 'error';
        state.error = action.error.message;
      })
      // .addCase(editLeague.fulfilled, (state, action) => {
      //   // Update the league details in the state when the async thunk is fulfilled
      //   state.status = 'idle';
      //   state.leagues = state.leagues.map((league) =>
      //     league.id === action.payload.leagueId
      //       ? { ...league, title: action.payload.title, members: action.payload.members }
      //       : league
      //   );
      // })
      // .addCase(editLeague.rejected, (state, action) => {
      //   // Set the status of the state to 'error' when the async thunk is rejected
      //   // and update the error property with the error message
      //   state.status = 'error';
      //   state.error = action.error.message;
      // })
      .addCase(deleteLeague.fulfilled, (state, action) => {
        // Set the status of the state to 'idle' when the async thunk is fulfilled
        // and close the modal by setting the openModal to false
        state.status = 'idle';
        state.leagues = state.leagues.filter((league) => league.id !== action.payload);
      })
      .addCase(deleteLeague.rejected, (state, action) => {
        // Set the status of the state to 'error' when the async thunk is rejected
        // and update the error property with the error message
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const { toggleModal, toggleMembers } = leaguesSlice.actions;

export default leaguesSlice.reducer;
















