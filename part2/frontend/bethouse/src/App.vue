<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
    <Footer></Footer>
    <!--
    <S></Subcategories>
    <div class="col-lg-12">
      <div class="row">
        <Categories></Categories>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Subcategories from './components/Subcategories'
import Categories from './components/Categories'
import Footer from './components/Footer'
import Events from './components/Events'
export default {
  name: 'App',
  components: {
    'Navbar': Navbar,
    'Subcategories': Subcategories,
    'Categories': Categories,
    'Footer': Footer,
    'Events': Events
  }
}
</script>

<style>
  #app {
    overflow: auto;
  }
</style>
