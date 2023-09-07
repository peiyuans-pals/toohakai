

export const ProfileButton = () => {

  return <div className="flex items-center justify-center rounded-full h-12 w-12 bg-green-600">

    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost rounded-btn">
        <p className="font-bold text-white">
          AB
        </p>
      </label>
      <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
        <li><a>User's name</a></li>
        <li><a>Settings</a></li>
      </ul>
    </div>
  </div>
}
