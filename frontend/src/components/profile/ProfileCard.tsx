import Avatar from "../Avatar";

export default function ProfileCard() {
  return (
    <div className="relative rounded-lg shadow bg-white dark:bg-gray-900">
      <img src="/img/grey_header.jpg" alt="Profile Cover" className="block w-full h-28 object-cover rounded-t-lg" />
      <div className="user-info relative gap-4 flex items-center px-4 py-1 h-12 mb-2">
        <div className="overflow-hidden shrink-0 w-20 h-20 rounded-full">
          <Avatar size="md" src="/img/no-avatar.png" alt="Avatar" className="absolute -top-8 border-2 block object-cover w-20 h-20" />
        </div>
        <div className="user-name w-full flex flex-col">
          <div className="name text-xl font-semibold">Admin</div>
          <div className="id text-sm text-slate-700">@admin</div>
        </div>
      </div>
      <div className="stats border border-slate-200 py-2">
        <div className="grid grid-cols-3 text-center stats dark:text-white">
          <div className="block w-full">
            <div className="block font-semibold">
              Tweets
            </div>
            <div className="block text-xl">
              1
            </div>
          </div>
          <div className="block">
            <div className="block font-semibold">
              Images
            </div>
            <div className="block text-xl">
              1
            </div>
          </div>
          <div className="block">
            <div className="block font-semibold">
              Videos
            </div>
            <div className="block text-xl">
              1
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
