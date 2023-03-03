export default function UserNft({ userNft }) {
  const unixTime = parseInt(userNft.metadata.expires_at)
  const date = new Date(unixTime /1000000)
  console.log('date:', date)
  const month = date.toLocaleString('en-US', { month: 'short' })
  console.log('date:', date)
  const year = date.getFullYear()
  console.log('date:', date)
  const expires_at = `${date.getDate()} ${month} ${year}`
  return (
    <div key={userNft.token_id} className="col-span-1 md:col-span-2 lg:col-span-3">
      <div className="w-full p-2 text-center space-y-2">
        <div className="w-24 mx-auto">
          <img
            src={userNft.metadata.media}
            alt="media"
            className="h-24 w-full shadow-lg rounded-full shadow-lg"
          />
        </div>
        <div className="text-sm font-bold">{userNft.metadata.title}</div>
        <div className="text-sm">Expired At: {expires_at}</div>
      </div>
    </div>
  )
}
