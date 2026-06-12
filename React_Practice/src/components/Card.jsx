
const Card = (props) => {
  return (
    <section className="bg-zinc-600 p-4 rounded-xl max-w-xl text-center my-1">
        <h1 className='text-3xl text-center font-bold m-3'>{props.user}</h1>
        <p className="m-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi nobis vero ad. Nisi quam quia nesciunt vel ipsum voluptates maiores delectus, deserunt necessitatibus vero. Nostrum laudantium qui dicta sit veritatis.</p>
        <button className="px-6 py-3 border border-black text-xl font-bold bg-zinc-800 text-white rounded-3xl">Profile</button>
    </section>
  )
}

export default Card;