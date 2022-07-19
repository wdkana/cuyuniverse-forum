import { Link } from '@inertiajs/inertia-react';
import Avatar from 'avataaars';

const Navbar = ({ user, title, root }) => {

  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <label className="swap swap-flip">
          <input type="checkbox" className='hidden' />
          <div className="swap-off">🅱🌜</div>
          <div className="swap-on">T 🅰</div>
        </label>
        {title !== root && title &&
          <Link href={route('outer.main')} as="button" className="btn btn-ghost btn-sm normal-case">{root || "HOME"}</Link>
        }
        <Link href={route('outer.posts')} as="button" className="btn btn-sm btn-ghost normal-case">Posts</Link>
        <Link href="/cuypeople/status" as="button" className="btn btn-sm btn-ghost normal-case">User Stats</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10  rounded-full">
              <Avatar style={{ width: '100%', height: '100%' }}
                avatarStyle='Circle'
                topType='WinterHat3'
                accessoriesType='Prescription02'
                hatColor='Red'
                facialHairType='BeardMedium'
                facialHairColor='Red'
                clotheType='BlazerSweater'
                eyeType='WinkWacky'
                eyebrowType='RaisedExcited'
                mouthType='Smile'
                skinColor='Light'
              />
            </div>
          </label>
          <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52">
            {user ? (
              <>
                <li>
                  <Link href={route('dash.main')} as="button" className="justify-between">
                    Dashboard
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>
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