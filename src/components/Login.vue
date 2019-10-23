<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field label="Login" name="login" prepend-icon="person" type="text"></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn to="/home" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    /*
    Formulario que ejecuta una consulta al servidor, y espera de respuesta UID > 2 (Id del usuario en la base de datos)
    Odoo por defecto devuelve un hash

    Logica Nefi
    Si el uid > 0, se va a ejeuctar el guardia de navegacion, va a comprobar que el uid sea mayor a cero, si cumpli la condicion, se va a redigidir a dashbord(Home)

    Si no cumple se va a quedar todo en login
    */
  })
};
</script>
