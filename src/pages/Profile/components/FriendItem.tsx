import { Link } from 'react-router-dom'

interface Props {
  friend: UserCompact
}

function FriendItem({ friend }: Props) {
  return (
    <div>
      <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
        <img src={friend.Profile?.profile_picture} alt='' className='inset-0 h-full w-full object-cover' />
      </div>
      <Link to={`/profile/${friend.user_id}`} className='mt-2 line-clamp-1 cursor-pointer hover:text-primary'>
        {friend.last_name} {friend.first_name}{' '}
      </Link>
    </div>
  )
}

export default FriendItem
