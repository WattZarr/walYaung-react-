const Item = (item) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg item-card relative item">
        <img src={process.env.NEXT_PUBLIC_API+`items/${item.value.image}`} className="w-full"/>
        <p className="ml-3 mb-2">{item.value.item_name}</p>
        <p className="ml-3 mb-2">{item.value.price} ကျပ်</p>
        {item.value.is_sold == 1 && (
        <span className="bg-red-500 text-white py-1 px-4 absolute top-0 right-0">sold out</span>
        )}
    </div>
  )
}

export default Item