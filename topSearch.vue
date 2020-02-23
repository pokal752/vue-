<template>
  <div class="topSearch">
    <div class="main">
      <div class="search">
        <div class="searchtag">
          <ul>
            <li v-for="(item,index) in searchObj" :class="[item.index==classIndex?'tag-active':'']" :key="index" v-on:click="changeTag(item.index)">
              {{item.name}}
            </li>
          </ul>
        </div>
        <el-input v-bind:placeholder="tagstr" v-model="searchValue" class="input-with-select" @keyup.enter.native="clickSearch()">
          <el-button slot="append" icon="el-icon-search" @click="clickSearch()"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
// 搜索栏
export default {
  name: 'topSearch',
  data () {
    return {
      tagstr: '',
      classIndex: 0,
      searchObj: [],
      searchValue: ''
    }
  },
  computed: {
    searchStr: function () {
      return this.$store.getters.searchStr.filter(s => _.contains(this.$store.getters.showTagArr, s.index))
    },
    getSearchValue: function () {
      return this.$store.getters.searchValue || ''
    },
    getClassIndex: function () {
      return this.$store.getters.tagIndex || 0
    }
  },
  created () {
    this.searchValue = this.getSearchValue
    this.searchObj = this.searchStr
    this.classIndex = this.getClassIndex
    this.changeTag(this.classIndex)
  },
  watch: {
    searchStr: function (newValue, oldValue) {
      this.searchObj = newValue
    },
    getSearchValue: function (newValue, oldValue) {
      this.searchValue = newValue
    },
    getClassIndex: function (newValue, oldValue) {
      this.classIndex = newValue
    }
  },
  methods: {
    changeTag (index) {
      this.searchStr.forEach(item => {
        if (item.index === index) {
          this.tagstr = item.placeholder
        }
      })
      this.classIndex = index
    },
    clickSearch () {
      this.$store.dispatch('search/SAVE_SEARCH', {index: this.classIndex, value: this.searchValue})
      .then(r => {
        this.$emit('ClickSearchButton')
      })
    }
  }
}
</script>


<style lang="scss" scoped>
@import "src/styles/variables.scss";
.topSearch {
  width: 100%;
  height: 80px;
  background-color: $searchTopGround;
  position: relative;
  z-index: 1000;
  .main {
    .search {
      margin: auto;
      height: 80px;
      width: 580px;
      .searchtag {
        padding-top: 5px;        
        .tag-active {
          border-bottom: 1px solid $searchUnderline;
        }
        ul {
          display: block;
          height: 25px;
          margin-bottom: 5px;
          li:hover {
              border-bottom: 1px solid $searchUnderline;
            }
          li {
            list-style: none;
            float: left;
            font-size: 14px;
            padding: 1px 10px;
            margin-right: 8px;
            color: $searchUnderline;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
