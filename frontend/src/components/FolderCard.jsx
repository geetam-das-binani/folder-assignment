import { FaFolder } from 'react-icons/fa'
import './foldercard.css'
import { Link } from 'react-router-dom'

const FolderCard = ({folder}) => {
  return (
    <Link to={`/folder/${folder._id}`} className='folder__card'>
        <FaFolder /> 
      {
        folder.name
      } 
      
    </Link>
  )
}

export default FolderCard
