import { BookCopy } from "lucide-react"
import Button from "./Button"
import NumberButton from "./NumberButton"
import {useEffect} from "react"
const Card = ({profile}) => {
    useEffect(() => {
  const buttonContainers = document.querySelectorAll(".buttons");

  let maxWidth = 0;

  buttonContainers.forEach(container => {
    maxWidth = Math.max(maxWidth, container.scrollWidth);
  });

  document.querySelectorAll(".card").forEach(card => {
    card.style.width = `${maxWidth + 80}px`;
  });
}, []);
  return (
    <div className="card">

      <div className="top">
        <h3 className="top-right-position">${profile.hourlyRate}/hr</h3>
        {
        <button className="top-Left-position">{profile.status}</button>
        }
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhOSeqzS1l4uwPDaTB96bQxJe2PBqyOglGQ&s" alt="Wade Wilson" />
          <h1>{profile.name}</h1>
          <h4>{profile.designation}</h4>
          <div className="Job"><BookCopy size={16} color="rgb(11, 180, 180)" className="Job"/><span>{profile.company}</span></div>
        </div>
      </div>
      <div className="center">
        <div className="buttons">
            {
                profile.skills.map((skill,index)=>(
                    <div key={index}>
                        <Button content={skill}/>
                    </div>
                ))
            }
         
          <NumberButton content={profile.additionalSkills} />
        </div>
        <p>{profile.description}</p>
      </div>
      <div className="bottom">
            <h4>VIEW PROFILE</h4>
      </div>  
</div>
  )
}

export default Card