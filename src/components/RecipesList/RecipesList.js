const RecipesList = ({recipes}) => {
    return (
            recipes.map((recipe) => (
                <div>
                    <h2>{recipe.title}</h2>
                </div>
            ))
    )
}
export default RecipesList