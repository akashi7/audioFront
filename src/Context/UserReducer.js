export const UserReducer = (state, action) => {

  switch (action.type) {

    case 'SONG_LISTS':
      return {
        ...state,
        songList: action.payload
      };

    case 'VIEW_SONG':
      return {
        ...state,
        song: action.payload
      };

    case 'PROFILE':
      return {
        ...state,
        userProfile: action.payload
      };
    case 'ALL':
      return {
        ...state,
        allUsers: action.payload
      };
    default:
      return null;
  }

}