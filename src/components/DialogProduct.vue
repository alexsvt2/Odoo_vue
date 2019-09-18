<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn text small color="primary" v-on="on">
        <v-icon>search</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>{{ title }}</v-card-title>

      <v-card-text>
        <!-- Aqui voy a poner la descripcion detallada del Producto -->
        Cantidad: {{ product_qty }}
        Precio de Lista: {{ list_price }}
      </v-card-text>

      <!-- <v-divider></v-divider> -->

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="dialog = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: [
    "title",
    "product_qty",
    "list_price"
    ],
  data() {
    return {
      dialog: false
    };
  }
};
</script>