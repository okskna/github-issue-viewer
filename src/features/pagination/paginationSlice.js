import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../common/constants';
import { makeReposQueryString } from '../../common/util';
import {
  getIssueCount,
  getIssueList,
  getLikedIssueList,
} from './paginationAPI';

const getLikedListFromLocalStorage = () => {
  const likedListString = localStorage.getItem('issue-viewer-liked-list');

  try {
    const likedList = JSON.parse(likedListString);

    return likedList;
  } catch (e) {
    console.error('⏳ local storage load error');
    return [];
  }
};

const setLikedListToLocalStorage = (likedList) => {
  localStorage.setItem('issue-viewer-liked-list', JSON.stringify(likedList));
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

  isLoading: false,
  isHome: true,
  error: '',

  likedList: getLikedListFromLocalStorage() || [],
};

export const getIssueCountAsync = createAsyncThunk(
  'pagination/getIssueCount',
  async (urlInfo) => {
    const { username, reponame } = urlInfo;

    try {
      const response = await getIssueCount(username, reponame);

      return response;
    } catch (e) {
      throw new Error('server error');
    }
  }
);

export const getIssueListAsync = createAsyncThunk(
  'pagination/getIssueList',
  async (urlInfo, thunkAPI) => {
    const { username, reponame } = urlInfo;
    const state = thunkAPI.getState();
    const { page } = state.pagination;

    try {
      const response = await getIssueList(username, reponame, page);

      return response;
    } catch (e) {
      throw new Error('server error');
    }
  }
);

export const getLikedIssueListAsync = createAsyncThunk(
  'pagination/getLikedIssueList',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { page, likedList } = state.pagination;
    const reposQueryString = makeReposQueryString(likedList);

    console.log('reposQueryString:', reposQueryString);

    try {
      const response = await getLikedIssueList(reposQueryString, page);

      return response;
    } catch (e) {
      throw new Error('server error');
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
    setPageNext: (state) => {
      if (state.page + CONSTANTS.PAGINATION_MAX_LENGTH > state.maxPage) {
        state.page = state.maxPage;
        return;
      }
      state.page = state.page + CONSTANTS.PAGINATION_MAX_LENGTH;
    },
    setIsHome: (state, action) => {
      const isHome = action.payload;
      state.isHome = isHome;

      if (isHome) {
        state.issueList = [];
        state.page = 0;
        state.maxPage = 0;
      }
    },
    addLikedLink: (state, action) => {
      if (state.likedList.length >= 4) {
        console.warn('liked list is full.');
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIssueCountAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getIssueCountAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getIssueCountAsync.fulfilled, (state, action) => {
        const totalCount = action.payload;

        state.totalCount = totalCount;
        state.maxPage = Math.ceil(totalCount / CONSTANTS.PER_PAGE);
        state.isLoading = false;
      });

    builder
      .addCase(getIssueListAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getIssueListAsync.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(getIssueListAsync.fulfilled, (state, action) => {
        const issueList = action.payload;

        state.issueList = issueList;
        state.isLoading = false;
      });

    builder
      .addCase(getLikedIssueListAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLikedIssueListAsync.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(getLikedIssueListAsync.fulfilled, (state, action) => {
        const { titleList: issueList, totalCount } = action.payload;

        state.isHome = false;
        state.page = 1;
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
} = paginationSlice.actions;

export const selectUrlInfo = (state) => state.pagination.urlInfo;
export const selectTotalCount = (state) => state.pagination.totalCount;
export const selectIssueList = (state) => state.pagination.issueList;
export const selectPage = (state) => state.pagination.page;
export const selectMaxPage = (state) => state.pagination.maxPage;
export const selectIsLoading = (state) => state.pagination.isLoading;
export const selectIsHome = (state) => state.pagination.isHome;
export const selectLikedList = (state) => state.pagination.likedList;

export default paginationSlice.reducer;
