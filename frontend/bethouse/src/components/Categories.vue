<template>
  <div class="cat">
    <v-navigation-drawer
      stateless
      value="true"
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>fas fa-list</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Categories</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          prepend-icon="far fa-futbol"
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Football</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>UEFA Champions League</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="(admin, i) in admins"
              :key="i"
            >
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-group
            sub-group
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>UEFA Europa League</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(crud, i) in cruds"
              :key="i"
            >
              <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  data: () => ({
    admins: [
      ['Management', 'people_outline'],
      ['Settings', 'settings']
    ],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete']
    ]
  })
}
</script>

<style>
.cat {
  background-color: #ffa64d;
}
</style>
