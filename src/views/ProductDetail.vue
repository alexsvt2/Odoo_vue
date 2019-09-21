<template>
    <div>
        Detail Page for ProductId: {{ productId }}
        <br>
        {{ products[0].display_name }}
    </div>
</template>

<script>
import axios from "axios";


export default {
    data () {
        return {
            products: [],
            productId: 0
        }
    },
    created() {
        this.productDetail(this.productDetail)
    },
    methods: {
        productDetail(productId) {
      axios
        .get(`http://192.168.100.59:3000/stock-inventory/stock-details/get-product-by-filters?value=${productId}`
        )
        .then(response => {
          this.products = response.data;
          console.log(this.products);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    }
}
</script>