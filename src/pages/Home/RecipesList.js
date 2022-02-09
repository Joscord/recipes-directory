import Recipe from './Recipe'

const RecipesList = ({recipes}) => {
    return (
            recipes.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe}/>
            ))
    )
}
export default RecipesList