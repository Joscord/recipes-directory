
const RecipesList = ({recipes}) => {
    return (
            recipes.map((recipe) => {
                <Recipe key={recipeid} recipe={...recipe}/>
            })
    )
}
export default RecipesList