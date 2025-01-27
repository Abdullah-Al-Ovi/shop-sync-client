
import { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';



const Faq = () => {
    const [items,setItems]= useState([])
   

    useEffect(()=>{
        fetch('/faq.json')
        .then(res=>res.json())
        .then(data=>setItems(data))
    },[])
    return (
       <div className={`my-11 shadow-2xl w-[90%] mx-auto`}>

        <div className='text-center mb-5'>
            <h1 className='text-2xl font-semibold '>Frequently asked questions</h1>
        </div>

<Accordion  allowZeroExpanded>
{items.map((item) => (
    <AccordionItem key={item.id}>
        <AccordionItemHeading >
            <AccordionItemButton>
                {item.question}
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          {item.answer}
        </AccordionItemPanel>
    </AccordionItem>
))}
</Accordion>

       </div>
        
    );
};

export default Faq;