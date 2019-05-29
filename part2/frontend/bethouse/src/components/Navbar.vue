<template>
    <div>
        <b-navbar class="navbar" toggleable="lg" type="dark">
            <b-navbar-nav style="margin-left: 44.4%">
                <b-nav-item href="/">
                    <img class="logo" src="../assets/logo.png"/>
                </b-nav-item>
            </b-navbar-nav>

            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item style="font-size: 20px"><router-link style="color: silver" to="/login">Login</router-link></b-nav-item>
                <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content"><em style="font-size: 20px">User</em></template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>
.navbar {
    height: 120px;
    background-color: black;
}

.logo {
    width: 140px;
    height: 95px;
}
</style>
