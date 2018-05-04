<template>
    <div class="add-smoothie container">
        <h2 center-align indigo-text>
            Add New Smoothie Recipe
        </h2>
        <form @submit.prevent="addSmoothie()">
            <div v-if="titleFeedback" class="feedback">{{ titleFeedback }}</div>
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-if="ingredientFeedback" class="feedback">{{ ingredientFeedback }}</div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient</label>
                <input @keydown.tab.prevent="addIngredient()" @keydown.enter.prevent="addIngredient()" v-model="another" name="add-ingredient" type="text" />
            </div>   
            <div class="field">
                <ul v-for="(ingredient, index) in this.ingredients" :key="index" class="ingredients">
                    <li>
                        <span @click="deleteIngredient(ingredient)" class="chip">{{ ingredient }}</span>
                    </li>
                </ul>    
            </div>   
            <div class="field center-align">
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      ingredientFeedback: null,
      titleFeedback: null
    };
  },
  methods: {
    addSmoothie() {
      if(this.title){
          db.collection('smoothies').add({
              title: this.title,
              ingredients: this.ingredients,
              slug: this.generateSlug(this.title)
          }).then(() => {
              this.$router.push({ name: 'Index' })
          }).catch(error => console.log('error :', error))

          this.titleFeedback = null;
      }else{
          this.titleFeedback = 'you must enter a smoothie title.'
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      }else{
          this.ingredientFeedback = 'You must enter a value to add an ingredient.'
      }
    },
    deleteIngredient(ingredient){
        this.ingredients = this.ingredients.filter(ing => ing !== ingredient);
    },
    generateSlug(data){
        return data.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    }
  }
};
</script>

<style scoped>
.add-smoothie {
  margin-top: 3rem;
  padding: 1rem;
  max-width: 35rem;
}
.add-smoothie h2 {
  font-size: 2rem;
  margin: 1rem auto;
}
.add-smoothie .field {
  margin: 1rem auto;
}
.ingredients{
    display: inline-block;
}
.feedback{
    color: red;
}
.chip{
    cursor: pointer;
}
</style>