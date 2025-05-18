import React from "react";
import {useStore} from '../store/useStore'
import { useState } from "react";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
}


const RecipeApp = () => {
  const { recipes, addRecipe, removeRecipe } = useStore()
  
  const [name, setName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string>("");
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);


  const handleAddRecipe = () => {
    if (name && ingredients.length > 0 && instructions) {
      addRecipe({
        id: Date.now(),
        name,
        ingredients,
        instructions,
      })
   
    }
    setName("");
    setIngredients([]);
    setInstructions("");
    
  }
  const handleDeleteRecipe = (id: number) => {
    removeRecipe(id);
  };
  const handleEditRecipe = (recipe: Recipe) => {
    setName(recipe.name);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setEditingRecipe(recipe);
  };
  const handleUpdateRecipe = () => {
    if (editingRecipe) {
      const updatedRecipe: Recipe = {
        ...editingRecipe,
        name,
        ingredients,
        instructions,
      };
      removeRecipe(editingRecipe.id);
      addRecipe(updatedRecipe);
      setName("");
      setIngredients([]);
      setInstructions("");
      setEditingRecipe(null);
    }
  };
  const handleCancelEdit = () => {
    setName("");
    setIngredients([]);
    setInstructions("");
    setEditingRecipe(null);
  };
  
  
  return <div className="min-h-screen flex justify-center items-center bg-green-200">
    <div className="bg-white p-4 rounded-2xl shadow-lg max-w-2xl w-full">
      <h1 className="text-2xl text-center text-green-700 font-bold mb-4">Recipe Book</h1>

      <div className="space-y-4 mb-6">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Recipe Name" className="w-full  px-4 py-2 border rounded-lg focus:outline-none border-gray-200 focus:ring-2 focus:ring-green-700"/>
          <input type="text" value={ingredients.join(", ")} onChange={e => setIngredients(e.target.value.split(",").map(s => s.trim()))} placeholder="Ingredients (comma separated)" className="w-full  px-4 py-2 border rounded-lg focus:outline-none border-gray-200 focus:ring-2 focus:ring-green-700"/>
        <textarea value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="Instructions" className="w-full  px-4 py-2 border rounded-lg focus:outline-none border-gray-200 focus:ring-2 focus:ring-green-700" />
        
        <div className="flex justify-between">
          {editingRecipe ? (
            <>
              <button onClick={handleUpdateRecipe} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                Update Recipe
              </button>

              <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Cancel
              </button>
            </>
          ) : (
              <>
              <button onClick={handleAddRecipe} className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                  Add Recipe
              </button>
              </>
          )}
            </div>

      </div>


      <ul className="space-y-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="p-4 bg-green-100 m-1 rounded-lg shadow-md">
            <h2 className="text-lg mb-2 font-bold text-green-700">{recipe.name}</h2>
              
            <p className="text-gray-700 mb-4">
              <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              
            </p>
            <div className="flex justify-between">
              <button onClick={() => handleEditRecipe(recipe)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"> 
                Edit
              </button>

              <button onClick={() => handleDeleteRecipe(recipe.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Delete
              </button>

            </div>
          </li>
        ))}
            </ul>

      
    </div>

  </div>;
};

export default RecipeApp;

