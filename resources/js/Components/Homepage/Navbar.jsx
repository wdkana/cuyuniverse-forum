import { Link } from '@inertiajs/inertia-react';
import Avatar from 'avataaars';

const Navbar = ({ user, title }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" as="button" className="btn btn-ghost normal-case text-xl">{title}</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Avatar style={{ width: '100%', height: '100%' }}
                avatarStyle='Circle'
                topType='ShortHairTheCaesarSidePart'
                accessoriesType='Wayfarers'
                hairColor='Red'
                facialHairType='BeardMajestic'
                facialHairColor='Red'
                clotheType='Hoodie'
                clotheColor='Red'
                eyeType='Squint'
                eyebrowType='UnibrowNatural'
                mouthType='Concerned'
                skinColor='Light'
              />
            </div>
          </label>
          <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            {user ? (
              <>
                <li>
                  <Link href={route('dashboard')} as="button" className="justify-between">
                    Dashboard
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                <li><Link href={route('setting')} as="button">Settings</Link></li>
                <li><Link href="/logout" method='post' as="button">Logout</Link></li>
              </>
            )
              : <>
                <li>
                  <Link href={route('login')} method="get" as="button" className="justify-between">
                    Login
                  </Link>
                </li>
                <li><Link href={route('register')} method="get" as="button">Register</Link></li>
              </>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar