import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';

import toast, { Toaster } from 'react-hot-toast';

import {BsFillTrashFill,BsFillPencilFill} from 'react-icons/bs';

const App = () => {
  const [list , setList]=useState([]); 
  const [title,setTitle]=useState('');
  const [isEditing , setIsEditing] =useState(false);
  const [itemtoEdit,setItemToEdit] = useState({})
  const clickHandler = ()=>{
    if(title){
      if(isEditing){
        const updatedItems = list.map((item)=>{
          if(item.id === itemtoEdit.id){
            const updatedItem = {...item,title}
            return updatedItem;
          }
          else{
            return item;
          }
        })

        setList (updatedItems)
        setTitle('');
        setIsEditing(false);
        setItemToEdit({});
        toast.success(`Item updated Successfully`)
      }

      else{
        const newItem={
          id:uuidv4(),
          title, 
          // Here key name and value name are same so put title
        }
        setList([...list,newItem]);
        setTitle('')
        toast.success(`Item added successfully`,{duration:2000})
     
      }
    }
    else{
      toast.error('Title is required', {duration:2000})
    }
    }

    const deleteItem=(id)=>{
      const remainingItems=list.filter((item)=>item.id !== id);
      setList(remainingItems);
      toast.error(`Item Deleted`)

    }

    const editItem = (id)=>{
      setIsEditing(true);
      setItemToEdit (list.find((item)=> item.id === id));
      setTitle(itemtoEdit.title);



    }
  return (
    <>
    <Toaster />
    <main className="flex flex-col items-center
     justify-center min-h-screen gap-8">


<section className="w-[28rem] p-6 rounded
    shadow-lg bg-teal-100 flex gap-2">
      <div className="flex items-center gap-2">
        <label htmlFor="title"
         className="text-base font-medium">
          Title
        </label>
        <input type="text"
         id="title"
         className="px-6 py-2 rounded
          shadow-xl text-lg"
         value={title}
         onChange={(e)=> setTitle(e.target.value)}
         />
      </div>
      <button className="px-6 py-2 rounded
          shadow-xl text-lg bg-teal-400
           hover:text-white font-bold" onClick={clickHandler }  >
             {isEditing ? 'Edit': 'Add'} 
             

             </button>

    </section>

    <section className="w-[28rem] p-6 rounded
    shadow-lg bg-teal-100 flex gap-2">

      <ul className="flex flex-col gap-4 w-full">
     

        {list.length ? (
          list.map((item)=>(
            <li className="text-xl font-bold flex gap-8 w-full justify-between item-center" 
            key={item.id}
            > 
            <span> {item.title}</span>
           
            <button onClick={()=>
              editItem(item.id)}>
              <BsFillPencilFill/>
            </button>
            <button onClick={()=>
            deleteItem(item.id)}>
              <BsFillTrashFill/>
            </button>

            </li>

          ))
          )
           :
        (
        <h2 className="text-xl my-4 font-bold">
          No Items Exist</h2> 
          ) }
       
      </ul>
    </section>

     </main>

     
    </>
  )
    
   
}
 
export default App;