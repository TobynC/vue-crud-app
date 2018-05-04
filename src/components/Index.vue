<template>
  <div class="index container">
    <div v-for="smoothie in smoothies" :key="smoothie.id" class="card">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="ingredients">
          <li>
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditSmoothie', params: { id: smoothie.slug } }">
          <i class="material-icons edit">edit</i>
        </router-link>                            
      </span>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
    }
  },
  methods:{
    deleteSmoothie(id){
      //remove smoothie
      db.collection('smoothies').doc(id).delete().then(() => 
        {
          this.smoothies = this.smoothies.filter(smoothie => smoothie.id !== id)
        })      
    }
  },
  created(){
    db.collection('smoothies').get().then(snapshot => {
      snapshot.forEach(document => {
        let smoothie = document.data();
        smoothie.id = document.id
        this.smoothies.push(smoothie);
      })
    })
  }
}
</script>

<style scoped>
  .index {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    margin-top: 4rem;
  }
  .index h2{
    font-size: 2.3rem;
    align-content: center;
    margin-top: 0;
  }
  .ingredients{
    display: inline-block;
    margin: 0.2rem;
  }
  .index .card {
    max-width: 20rem;
  }
  .index .delete{
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
    color: grey;
  }
</style>