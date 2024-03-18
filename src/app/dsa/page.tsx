import TopicCard from '@/components/TopicCard'

const links =[
  {
    name:"Bubble Sort",
    link:"bubblesort",
  },
  {
    name:"Merge Sort",
    link:"mergesort",
  },
  {
    name:"Quick Sort",
    link:"quicksort",
  },
  {
    name:"Insertion Sort",
    link:"insertionsort",
  },
  {
    name:"Counting Sort",
    link:"countingsort",
  },
  {
    name:"Selection Sort",
    link:"selectionsort",
  },
  {
    name:"Arays",
    link:"arrays",
  },
  {
    name:"Stack",
    link:"stack",
  },
  {
    name:"Queue",
    link:"queue",
  },
  {
    name:"Linked List",
    link:"linkedlist",
  },
  {
    name:"Tree",
    link:"Trees",
  },
  
]

const DSA = () => {
  return (
    <section className='flex border-2 m-2 p-2 flex-wrap gap-2 justify-around'>
      {links.map((link,index)=>(
        <TopicCard info={link} key={index}/>

      ))}
      
    </section>
  )
}

export default DSA