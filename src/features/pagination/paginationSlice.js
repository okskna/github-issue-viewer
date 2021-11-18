import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../common/constants';
import { makeReposQueryString } from '../../common/util';
import {
  getIssueCount,
  getIssueList,
  getLikedIssueList,
} from './paginationAPI';

const getLikedListFromLocalStorage = () => {
  if (!window) {
    return [];
  }

  const likedListString = window.localStorage.getItem(
    'issue-viewer-liked-list'
  );

  try {
    const likedList = JSON.parse(likedListString);

    return likedList;
  } catch (e) {
    console.error('⏳ local storage load error');
    return [];
  }
};

const setLikedListToLocalStorage = (likedList) => {
  if (!window) {
    return;
  }

  window.localStorage.setItem(
    'issue-viewer-liked-list',
    JSON.stringify(likedList)
  );
};

const initialState = {
  urlInfo: {
    username: '',
    reponame: '',
  },
  page: 0,
  maxPage: 0,
  totalCount: 0,
  issueList: [],

  searchMode: CONSTANTS.LIKED_SEARCH,
  isLoading: false,
  isHome: true,
  error: '',

  likedList: getLikedListFromLocalStorage() || [],
};

export const getIssueCountAsync = createAsyncThunk(
  'pagination/getIssueCount',
  async (urlInfo) => {
    const { username, reponame, page = 1 } = urlInfo;

    try {
      const response = await getIssueCount(username, reponame, page);

      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  }
);

export const getLikedIssueListAsync = createAsyncThunk(
  'pagination/getLikedIssueList',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { page, likedList } = state.pagination;

    if (!likedList.length) {
      throw new Error('Liked list is empty.');
    }

    const reposQueryString = makeReposQueryString(likedList);

    try {
      const response = await getLikedIssueList(reposQueryString, page);

      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  }
);

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setUrlInfo: (state, action) => {
      const { username, reponame } = action.payload;

      state.urlInfo = { username, reponame };
    },
    setPage: (state, action) => {
      const page = action.payload;

      state.page = page;
    },
    setIsHome: (state, action) => {
      const isHome = action.payload;
      state.isHome = isHome;

      if (isHome) {
        state.issueList = [];
        state.page = 0;
        state.maxPage = 0;
        state.urlInfo = {
          username: '',
          reponame: '',
        };
      }
    },
    addLikedLink: (state, action) => {
      if (state.likedList.length >= 4) {
        console.warn('liked list is full.');
        state.error = 'liked list is full.';
        return;
      }

      const newLiked = action.payload;

      if (
        state.likedList.filter(
          (liked) =>
            liked.username === newLiked.username &&
            liked.reponame === newLiked.reponame
        ).length
      ) {
        console.warn('duplicated.');
        state.error = 'duplicated.';
        return;
      }

      state.likedList.push(newLiked);
      setLikedListToLocalStorage(state.likedList);
    },
    deleteLikedLink: (state, action) => {
      const targetLink = action.payload;

      state.likedList = state.likedList.filter(
        (liked) =>
          liked.username !== targetLink.username ||
          liked.reponame !== targetLink.reponame
      );

      setLikedListToLocalStorage(state.likedList);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
    setSearchMode: (state, action) => {
      state.searchMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIssueCountAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getIssueCountAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getIssueCountAsync.fulfilled, (state, action) => {
        const { totalCount, titleList: issueList } = action.payload;

        state.totalCount = totalCount;
        state.maxPage = Math.ceil(totalCount / CONSTANTS.PER_PAGE);
        state.issueList = issueList;
        state.isLoading = false;
      });

    builder
      .addCase(getLikedIssueListAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLikedIssueListAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getLikedIssueListAsync.fulfilled, (state, action) => {
        const { titleList: issueList, totalCount } = action.payload;

        state.isHome = false;
        state.maxPage = Math.ceil(totalCount / CONSTANTS.PER_PAGE);
        state.issueList = issueList;
        state.totalCount = totalCount;
        state.isLoading = false;
      });
  },
});

export const {
  setUrlInfo,
  setPage,
  setPageNext,
  setIsHome,
  addLikedLink,
  deleteLikedLink,
  setError,
  clearError,
  setSearchMode,
} = paginationSlice.actions;

export const selectUrlInfo = (state) => state.pagination.urlInfo;
export const selectTotalCount = (state) => state.pagination.totalCount;
export const selectIssueList = (state) => state.pagination.issueList;
export const selectPage = (state) => state.pagination.page;
export const selectMaxPage = (state) => state.pagination.maxPage;
export const selectIsLoading = (state) => state.pagination.isLoading;
export const selectIsHome = (state) => state.pagination.isHome;
export const selectLikedList = (state) => state.pagination.likedList;
export const selectError = (state) => state.pagination.error;
export const selectSearchMode = (state) => state.pagination.searchMode;

export default paginationSlice.reducer;
